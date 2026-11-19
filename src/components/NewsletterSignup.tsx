import React, { useEffect, useState } from 'react';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useLanguage } from '../context/LanguageContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscriptionFeedback {
  type: 'success' | 'error';
  message: string;
}

export function NewsletterSignup() {
  const { user, authReady } = useFirebase();
  const { copy, isRtl } = useLanguage();

  const [email, setEmail] = useState('');
  const [hasTyped, setHasTyped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<SubscriptionFeedback | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) {
      return;
    }

    if (!hasTyped && user.email) {
      setEmail((prev) => prev || user.email || '');
    }

    let cancelled = false;
    const subPath = `newsletterSubscriptions/${user.uid}`;
    const subRef = doc(db, 'newsletterSubscriptions', user.uid);

    void (async () => {
      try {
        const snap = await getDoc(subRef);
        if (cancelled) return;
        if (snap.exists()) {
          const data = snap.data();
          if (data.status === 'subscribed' && typeof data.email === 'string') {
            setSubscribedEmail(data.email);
            if (!hasTyped) {
              setEmail(data.email);
            }
          }
        }
      } catch (error) {
        if (cancelled) return;
        try {
          handleFirestoreError(error, OperationType.GET, subPath);
        } catch (wrapped) {
          console.error('Unable to load newsletter preference:', wrapped);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, user, hasTyped]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail.length < 3 || cleanEmail.length > 180 || !EMAIL_PATTERN.test(cleanEmail)) {
      setFeedback({
        type: 'error',
        message: copy.newsletter.validationError,
      });
      return;
    }

    setSubmitting(true);
    try {
      const apiRes = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, source: 'footer' }),
      });

      const apiData = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) {
        throw new Error(apiData.error || 'Unable to subscribe right now. Please try again.');
      }

      if (user && user.emailVerified) {
        const subPath = `newsletterSubscriptions/${user.uid}`;
        const subRef = doc(db, 'newsletterSubscriptions', user.uid);
        try {
          const existingSnap = await getDoc(subRef);
          if (!existingSnap.exists()) {
            await setDoc(subRef, {
              ownerId: user.uid,
              email: cleanEmail.slice(0, 180),
              status: 'subscribed',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } else {
            await updateDoc(subRef, {
              email: cleanEmail.slice(0, 180),
              status: 'subscribed',
              updatedAt: serverTimestamp(),
            });
          }
        } catch (fsError) {
          handleFirestoreError(fsError, OperationType.WRITE, subPath);
        }
      }

      setSubscribedEmail(cleanEmail);
      const refId = String(apiData.referenceId || 'confirmed');
      setFeedback({
        type: 'success',
        message: user?.emailVerified
          ? copy.newsletter.successSignedIn(cleanEmail, refId)
          : copy.newsletter.successGuest(cleanEmail, refId),
      });
    } catch (error: unknown) {
      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Subscription failed. Please verify your email and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1630]/80 p-6 sm:p-7">
      <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
        {copy.newsletter.eyebrow}
      </p>
      <h3
        className="font-display mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl"
        style={{ textWrap: 'balance' }}
      >
        {copy.newsletter.headline}
      </h3>
      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-slate-300">
        {copy.newsletter.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-5" noValidate>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="flex-1">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              {copy.newsletter.emailLabel}
            </label>
            <input
              id="footer-newsletter-email"
              name="newsletterEmail"
              type="email"
              autoComplete="email"
              required
              maxLength={180}
              dir="ltr"
              value={email}
              onChange={(e) => {
                setHasTyped(true);
                setEmail(e.target.value);
              }}
              placeholder={copy.newsletter.emailPlaceholder}
              aria-describedby="footer-newsletter-note"
              className="min-h-[44px] w-full rounded-lg border border-white/15 bg-[#080d1b] px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-blue-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            <span>
              {submitting
                ? copy.newsletter.subscribing
                : subscribedEmail && subscribedEmail === email.trim().toLowerCase()
                ? copy.newsletter.subscribed
                : copy.newsletter.subscribe}
            </span>
            <ArrowUpRight
              className={`h-4 w-4 shrink-0 ${isRtl ? '-scale-x-100' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        <p id="footer-newsletter-note" className="mt-3 text-xs text-slate-400">
          {copy.newsletter.note}
        </p>

        {feedback && (
          <div
            role={feedback.type === 'error' ? 'alert' : 'status'}
            className={`mt-4 flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed ${
              feedback.type === 'success'
                ? 'border-emerald-400/30 bg-emerald-950/50 text-emerald-100'
                : 'border-red-400/35 bg-red-950/50 text-red-100'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-red-300"
                aria-hidden="true"
              />
            )}
            <span>{feedback.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
