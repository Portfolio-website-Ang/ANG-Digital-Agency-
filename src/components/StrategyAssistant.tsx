import React, { useEffect, useRef, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  ArrowUp,
  Bot,
  Brain,
  MessageSquarePlus,
  Send,
  User as UserIcon,
  Zap,
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useLanguage } from '../context/LanguageContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ScrollReveal } from './ScrollReveal';

export type ReasoningMode = 'fast' | 'deep';

export interface ChatTurn {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
}

interface StoredSession {
  id: string;
  title: string;
  mode: ReasoningMode;
}

interface StrategyAssistantProps {
  externalPrompt?: { text: string; serviceContext?: string; nonce: number } | null;
  onApplyToEnquiry: (summary: string) => void;
  onOpenLogin: () => void;
}

export function StrategyAssistant({
  externalPrompt,
  onApplyToEnquiry,
  onOpenLogin,
}: StrategyAssistantProps) {
  const { user, authReady } = useFirebase();
  const { language, isRtl, copy } = useLanguage();
  const [mode, setMode] = useState<ReasoningMode>('deep');
  const [messages, setMessages] = useState<ChatTurn[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: copy.assistant.welcomeMessage,
      model: copy.assistant.headerTitle,
    },
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serviceContext, setServiceContext] = useState<string | undefined>(undefined);

  const [sessions, setSessions] = useState<StoredSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && (prev[0].id === 'welcome' || prev[0].id.startsWith('welcome-'))) {
        return [
          {
            id: prev[0].id,
            role: 'assistant',
            content:
              prev[0].id === 'welcome'
                ? copy.assistant.welcomeMessage
                : copy.assistant.newThreadMessage,
            model: copy.assistant.headerTitle,
          },
        ];
      }
      return prev;
    });
  }, [language, copy.assistant.welcomeMessage, copy.assistant.newThreadMessage, copy.assistant.headerTitle]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isStreaming]);

  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) {
      setSessions([]);
      return;
    }

    const q = query(
      collection(db, 'chatSessions'),
      where('ownerId', '==', user.uid),
      limit(20)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: StoredSession[] = snapshot.docs
          .map((d) => ({
            id: d.id,
            title: String(d.data().title || 'Strategy Consultation'),
            mode: (d.data().mode === 'fast' ? 'fast' : 'deep') as ReasoningMode,
            updatedAtMs: d.data().updatedAt?.toMillis?.() ?? 0,
          }))
          .sort((a, b) => b.updatedAtMs - a.updatedAtMs)
          .slice(0, 8)
          .map(({ id, title, mode: sessionMode }) => ({
            id,
            title,
            mode: sessionMode,
          }));
        setSessions(list);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, 'chatSessions');
        } catch (err) {
          console.error(err);
        }
      }
    );

    return () => unsubscribe();
  }, [authReady, user]);

  useEffect(() => {
    if (!authReady || !user || !user.emailVerified || !activeSessionId) {
      return;
    }

    setLoadingSession(true);
    const messagesPath = `chatSessions/${activeSessionId}/messages`;
    const q = query(
      collection(db, 'chatSessions', activeSessionId, 'messages'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: ChatTurn[] = snapshot.docs
            .map((d) => ({
              id: d.id,
              role: (d.data().role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
              content: String(d.data().content || ''),
              model: String(d.data().model || ''),
              createdAtMs: d.data().createdAt?.toMillis?.() ?? 0,
            }))
            .sort((a, b) => a.createdAtMs - b.createdAtMs)
            .map(({ id, role, content, model: turnModel }) => ({
              id,
              role,
              content,
              model: turnModel,
            }));
          setMessages(loaded);
        }
        setLoadingSession(false);
      },
      (error) => {
        setLoadingSession(false);
        try {
          handleFirestoreError(error, OperationType.LIST, messagesPath);
        } catch (err) {
          setErrorMsg(err instanceof Error ? err.message : 'Unable to load saved chat history.');
        }
      }
    );

    return () => unsubscribe();
  }, [authReady, user, activeSessionId]);

  useEffect(() => {
    if (externalPrompt && externalPrompt.text) {
      setServiceContext(externalPrompt.serviceContext);
      setInput(externalPrompt.text);
    }
  }, [externalPrompt]);

  const startNewThread = () => {
    setActiveSessionId(null);
    setErrorMsg(null);
    setServiceContext(undefined);
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: copy.assistant.newThreadMessage,
        model: copy.assistant.headerTitle,
      },
    ]);
  };

  const persistMessage = async (
    sessionId: string,
    role: 'user' | 'assistant',
    content: string,
    modelName: string
  ) => {
    if (!user || !user.emailVerified) return;
    const messagesPath = `chatSessions/${sessionId}/messages`;
    try {
      await addDoc(collection(db, 'chatSessions', sessionId, 'messages'), {
        ownerId: user.uid,
        role,
        content: content.slice(0, 12000),
        model: modelName.slice(0, 80),
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, 'chatSessions', sessionId), {
        mode,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, messagesPath);
    }
  };

  const ensureSession = async (firstUserText: string): Promise<string | null> => {
    if (!user || !user.emailVerified) return null;
    if (activeSessionId) return activeSessionId;
    try {
      const docRef = await addDoc(collection(db, 'chatSessions'), {
        ownerId: user.uid,
        title: firstUserText.trim().slice(0, 80) || 'Strategy Consultation',
        mode,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setActiveSessionId(docRef.id);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'chatSessions');
    }
  };

  const sendMessage = async (overrideText?: string) => {
    const trimmed = (overrideText ?? input).trim();
    if (!trimmed || isStreaming) return;

    setErrorMsg(null);
    if (!overrideText) setInput('');

    const historyToSend = messages
      .filter((m) => m.id !== 'welcome' && !m.id.startsWith('welcome-'))
      .map((m) => ({ role: m.role, content: m.content }));

    const userTurnId = `user-${Date.now()}`;
    const assistantTurnId = `assistant-${Date.now()}`;
    const selectedModel = mode === 'deep' ? 'gemini-4-hydrogen' : 'gemini-3.1-flash-lite';

    setMessages((prev) => [
      ...prev,
      { id: userTurnId, role: 'user', content: trimmed },
      { id: assistantTurnId, role: 'assistant', content: '', model: selectedModel },
    ]);
    setIsStreaming(true);

    let sessionId: string | null = activeSessionId;
    if (user && user.emailVerified) {
      try {
        sessionId = await ensureSession(trimmed);
        if (sessionId) {
          await persistMessage(sessionId, 'user', trimmed, 'user');
        }
      } catch (err) {
        console.error('Session persistence skipped:', err);
      }
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyToSend,
          mode,
          serviceContext,
          language,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.error || `Request failed with status ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Streaming response body unavailable.');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let fullReply = '';
      let resolvedModel = selectedModel;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const block of lines) {
          const dataLine = block
            .split('\n')
            .find((line) => line.startsWith('data: '));
          if (!dataLine) continue;

          const payload = JSON.parse(dataLine.slice(6));
          if (payload.type === 'meta' && payload.model) {
            resolvedModel = payload.model;
          } else if (payload.type === 'delta' && payload.text) {
            fullReply += payload.text;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantTurnId
                  ? { ...m, content: fullReply, model: resolvedModel }
                  : m
              )
            );
          } else if (payload.type === 'error') {
            throw new Error(payload.error || 'Assistant streaming error.');
          }
        }
      }

      if (sessionId && fullReply.trim()) {
        try {
          await persistMessage(sessionId, 'assistant', fullReply.trim(), resolvedModel);
        } catch (err) {
          console.error('Assistant message persistence failed:', err);
        }
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unable to complete response.';
      setErrorMsg(msg);
      setMessages((prev) => prev.filter((m) => m.id !== assistantTurnId || m.content.length > 0));
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage();
  };

  const latestAssistantReply = [...messages]
    .reverse()
    .find(
      (m) =>
        m.role === 'assistant' &&
        m.id !== 'welcome' &&
        !m.id.startsWith('welcome-') &&
        m.content.trim()
    );

  return (
    <section id="assistant" className="border-t border-slate-200 bg-[#080d1b] py-24 text-white">
      <ScrollReveal className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-blue-300 uppercase">
                {copy.assistant.eyebrow}
              </p>
              <h2
                className="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                {copy.assistant.headline}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                {copy.assistant.subtitle}
              </p>

              <div className="mt-7 space-y-3">
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  {copy.assistant.suggestedPromptsLabel}
                </p>
                <div className="flex flex-col gap-2.5">
                  {copy.assistant.starterPrompts.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => void sendMessage(item.prompt)}
                      disabled={isStreaming}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-start text-xs font-medium text-slate-200 transition-colors hover:border-blue-400/50 hover:bg-white/[0.08] disabled:opacity-50"
                    >
                      <span>{item.label}</span>
                      <ArrowUp
                        className={`h-3.5 w-3.5 shrink-0 text-blue-300 ${
                          isRtl ? '-rotate-45' : 'rotate-45'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              {user ? (
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                      {copy.assistant.savedThreadsLabel}
                    </p>
                    <button
                      type="button"
                      onClick={startNewThread}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-blue-200"
                    >
                      <MessageSquarePlus className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{copy.assistant.newThread}</span>
                    </button>
                  </div>
                  {sessions.length > 0 ? (
                    <div className="mt-3 flex flex-col gap-2">
                      {sessions.slice(0, 4).map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setMode(s.mode);
                            setActiveSessionId(s.id);
                          }}
                          className={`truncate rounded-lg border px-3 py-2 text-start text-xs transition-colors ${
                            activeSessionId === s.id
                              ? 'border-blue-400 bg-blue-500/20 text-white'
                              : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-slate-400">
                      {copy.assistant.savedAutoNote}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs leading-relaxed text-slate-300">
                    {copy.assistant.guestLoginNote}
                  </p>
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="shrink-0 whitespace-nowrap rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 transition-opacity hover:opacity-95"
                  >
                    {copy.assistant.clientLogin}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex h-[560px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0e172f]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <Bot className="h-5 w-5 text-blue-400" aria-hidden="true" />
                <div>
                  <p className="font-display text-sm font-bold text-white">
                    {copy.assistant.headerTitle}
                  </p>
                  <p className="text-xs text-slate-400">
                    {mode === 'deep'
                      ? copy.assistant.deepModeSubtitle
                      : copy.assistant.fastModeSubtitle}
                  </p>
                </div>
              </div>

              <div
                className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#080d1b] p-1"
                role="tablist"
                aria-label={copy.assistant.modeAria}
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'fast'}
                  onClick={() => setMode('fast')}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    mode === 'fast'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{copy.assistant.fastBriefLabel}</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'deep'}
                  onClick={() => setMode('deep')}
                  className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                    mode === 'deep'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{copy.assistant.deepStrategyLabel}</span>
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
              aria-live="polite"
            >
              {loadingSession ? (
                <p className="text-xs text-slate-400">{copy.assistant.loadingConversation}</p>
              ) : (
                messages.map((turn) => (
                  <div
                    key={turn.id}
                    className={`flex gap-3 ${
                      turn.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {turn.role === 'assistant' && (
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-blue-600/20 text-blue-300">
                        <Bot className="h-4 w-4" aria-hidden="true" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        turn.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'border border-white/10 bg-[#131f3f] text-slate-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">
                        {turn.content || (isStreaming ? copy.assistant.thinkingPlaceholder : '')}
                      </p>
                      {turn.role === 'assistant' && turn.model && (
                        <p className="mt-2 text-[11px] font-medium text-slate-400">
                          {turn.model}
                        </p>
                      )}
                    </div>

                    {turn.role === 'user' && (
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/10 text-slate-200">
                        <UserIcon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                ))
              )}

              {errorMsg && (
                <div className="rounded-xl border border-red-400/30 bg-red-950/40 px-4 py-3 text-xs text-red-200">
                  {errorMsg}
                </div>
              )}
            </div>

            {latestAssistantReply && (
              <div className="flex items-center justify-between border-t border-white/10 bg-[#0b1328] px-5 py-2.5 text-xs">
                <span className="truncate text-slate-400">
                  {copy.assistant.copyPromptLabel}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onApplyToEnquiry(latestAssistantReply.content.slice(0, 900))
                  }
                  className="shrink-0 whitespace-nowrap font-semibold text-blue-300 hover:text-blue-200"
                >
                  {copy.assistant.copyToBrief}
                </button>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 border-t border-white/10 bg-[#080d1b] p-4"
            >
              <label htmlFor="strategy-chat-input" className="sr-only">
                {copy.assistant.inputAria}
              </label>
              <input
                id="strategy-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={copy.assistant.inputPlaceholder}
                className="min-h-[44px] flex-1 rounded-lg border border-white/15 bg-[#0e172f] px-4 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition-colors focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className={`h-4 w-4 ${isRtl ? '-scale-x-100' : ''}`} aria-hidden="true" />
                <span>{copy.assistant.send}</span>
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
