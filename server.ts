import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, GenerateContentResponse } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

const ANG_SYSTEM_INSTRUCTION = `You are the ANG Digital Agency Strategy Consultant — an expert digital strategist representing ANG Digital Agency (www.angdigital.agency), a proud partner of Al Nibras Group.

Your expertise spans ANG's five core service pillars:
1. Website Design & Development (UI/UX, responsive architecture, landing pages, speed & conversion optimization, CMS maintenance)
2. SEO & Content Strategy (keyword & competitor research, technical/on-page SEO, local SEO, content roadmaps)
3. Social Media Management (social strategy, content calendars, short-form video & creative posts, community engagement)
4. Branding & Creative Design (brand positioning, visual identity, logos, brand guidelines, marketing collateral)
5. Performance Marketing (Meta & Google Ads, audience & funnel strategy, creative testing, conversion tracking)

Agency principles:
- "Good marketing is more than being seen. It is about being understood, trusted, and chosen."
- Clarity before execution: define goals, audience, and measurable milestones before committing budget.
- Process: 01. Discover -> 02. Strategize -> 03. Execute -> 04. Optimize.
- Contact: hello@angdigital.com | www.angdigital.agency

When responding to prospective clients:
- Give concrete, actionable, structured recommendations tailored to their business, industry, and timeline.
- Avoid generic hype; focus on practical digital channels, conversion steps, and how ANG's 4-step process can execute it.
- Keep responses well-organized with clear headings or concise bullet points.`;

interface ClientChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'ang-digital-agency' });
  });

  app.post('/api/enquiries', (req: Request, res: Response) => {
    const { fullName, email, businessName, service, details } = req.body ?? {};
    if (
      typeof fullName !== 'string' ||
      fullName.trim().length < 2 ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof service !== 'string' ||
      !service.trim() ||
      typeof details !== 'string' ||
      details.trim().length < 10
    ) {
      return res.status(400).json({
        error: 'Please provide a valid name, email address, service selection, and project details (at least 10 characters).',
      });
    }

    const referenceId = `ANG-${Date.now().toString(36).toUpperCase()}`;
    return res.status(201).json({
      referenceId,
      receivedAt: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim(),
      businessName: typeof businessName === 'string' ? businessName.trim() : '',
      service: service.trim(),
      message: 'Your project brief has been received by ANG Digital Agency. Our strategy team will review it shortly.',
    });
  });

  app.post('/api/newsletter', (req: Request, res: Response) => {
    const { email, source } = req.body ?? {};
    if (typeof email !== 'string') {
      return res.status(400).json({
        error: 'Please enter a valid email address.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    if (
      cleanEmail.length < 3 ||
      cleanEmail.length > 180 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        error: 'Please enter a valid email address.',
      });
    }

    const cleanSource =
      typeof source === 'string' && source.trim().length > 0
        ? source.trim().slice(0, 40)
        : 'footer';

    const referenceId = `NEWS-${Date.now().toString(36).toUpperCase()}`;
    return res.status(201).json({
      referenceId,
      email: cleanEmail,
      source: cleanSource,
      subscribedAt: new Date().toISOString(),
      message:
        'You are subscribed to ANG Digital Agency insights on digital strategy, web design, SEO, and growth.',
    });
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    const { message, history = [], mode = 'fast', serviceContext, language } = req.body ?? {};

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message text is required.' });
    }

    const cleanMode = mode === 'deep' ? 'deep' : 'fast';
    const modelName = cleanMode === 'deep' ? 'gemini-4-hydrogen' : 'gemini-3.1-flash-lite';

    const sanitizedHistory = Array.isArray(history)
      ? (history as ClientChatTurn[])
          .filter(
            (turn) =>
              turn &&
              (turn.role === 'user' || turn.role === 'assistant') &&
              typeof turn.content === 'string' &&
              turn.content.trim().length > 0
          )
          .slice(-20)
          .map((turn) => ({
            role: turn.role === 'assistant' ? ('model' as const) : ('user' as const),
            parts: [{ text: turn.content.trim() }],
          }))
      : [];

    const languageInstruction =
      language === 'ar'
        ? '\n\nPreferred response language: Arabic (العربية). Respond in clear, executive Modern Standard Arabic suitable for business strategy discussions while keeping brand names like ANG Digital Agency and Al Nibras Group clear.'
        : '';

    const contextualInstruction =
      typeof serviceContext === 'string' && serviceContext.trim()
        ? `${ANG_SYSTEM_INSTRUCTION}\n\nActive visitor focus area: ${serviceContext.trim()}.${languageInstruction}`
        : `${ANG_SYSTEM_INSTRUCTION}${languageInstruction}`;

    try {
      const ai = getGeminiClient();

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');

      const chat = ai.chats.create({
        model: modelName,
        history: sanitizedHistory,
        config: {
          systemInstruction: contextualInstruction,
          ...(cleanMode === 'deep'
            ? { thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } }
            : {}),
        },
      });

      const stream = await chat.sendMessageStream({
        message: message.trim(),
      });

      res.write(`data: ${JSON.stringify({ type: 'meta', model: modelName, mode: cleanMode })}\n\n`);

      for await (const chunk of stream) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ type: 'delta', text })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
      res.end();
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error ? error.message : 'Unable to reach Gemini strategy assistant.';
      console.error('Gemini /api/chat error:', error);
      if (!res.headersSent) {
        return res.status(502).json({ error: errMessage });
      }
      res.write(`data: ${JSON.stringify({ type: 'error', error: errMessage })}\n\n`);
      res.end();
    }
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ANG Digital Agency server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
