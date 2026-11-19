import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONTACT } from '../data/agencyData';

interface ClientLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientLoginModal({ isOpen, onClose }: ClientLoginModalProps) {
  const { signInWithGoogle, authError, clearAuthError } = useFirebase();
  const { copy, isRtl } = useLanguage();
  const [signingIn, setSigningIn] = useState(false);
  const [bannerFailed, setBannerFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setSigningIn(true);
    clearAuthError();
    try {
      await signInWithGoogle();
      onClose();
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-login-title"
    >
      <div className="relative grid w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#080d1b] text-white shadow-2xl md:grid-cols-[1.15fr_0.85fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.loginModal.closeAria}
          className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-lg border border-white/15 bg-[#080d1b]/80 text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-[#050914] md:border-b-0 md:border-e">
          <div className="relative aspect-[16/10] w-full flex-1 overflow-hidden bg-[#050914]">
            {!bannerFailed ? (
              <img
                src={AGENCY_CONTACT.loginBannerImage}
                alt="ANG Digital Agency — Elevating Brands. Inspiring Growth. A Proud Partner of Al Nibras Group"
                referrerPolicy="no-referrer"
                onError={() => setBannerFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[260px] w-full flex-col items-center justify-center bg-gradient-to-br from-[#0e1b3d] to-[#050914] p-8 text-center">
                <p className="font-display text-2xl font-extrabold text-amber-400">
                  {copy.brand.fullName}
                </p>
                <p className="mt-2 text-xs tracking-widest text-slate-300 uppercase">
                  {copy.hero.partnerLabel}
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-[#080d1b] px-6 py-4 text-xs text-slate-300">
            <p className="font-semibold text-amber-300">
              {copy.loginModal.bannerCaptionTitle}
            </p>
            <p className="mt-1 text-slate-400">
              {copy.hero.eyebrow} · {AGENCY_CONTACT.websiteLabel}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between p-7 sm:p-9">
          <div>
            <div className="flex items-center gap-3.5">
              {!logoFailed ? (
                <img
                  src={AGENCY_CONTACT.logoImage}
                  alt={copy.brand.fullName}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="h-14 w-14 rounded-xl border border-amber-400/30 bg-[#050914] object-cover"
                />
              ) : (
                <div className="font-display grid h-14 w-14 place-items-center rounded-xl border border-amber-400/40 bg-blue-950 text-lg font-extrabold text-amber-300">
                  {copy.brand.shortName}
                </div>
              )}
              <div>
                <p className="font-display text-lg font-extrabold tracking-tight text-white">
                  {copy.brand.fullName}
                </p>
                <p className="text-xs text-amber-300">{copy.loginModal.portalSubtitle}</p>
              </div>
            </div>

            <h2
              id="client-login-title"
              className="font-display mt-7 text-2xl font-extrabold tracking-tight text-white"
            >
              {copy.loginModal.title}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
              {copy.loginModal.description}
            </p>

            <div className="mt-7 space-y-3">
              <button
                type="button"
                disabled={signingIn}
                onClick={() => void handleGoogleLogin()}
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition-opacity hover:opacity-95 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <span>
                  {signingIn ? copy.loginModal.connecting : copy.loginModal.continueGoogle}
                </span>
                <ArrowRight
                  className={`h-4 w-4 ${isRtl ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {authError && (
                <div className="rounded-lg border border-red-400/30 bg-red-950/50 px-3.5 py-2.5 text-xs text-red-200">
                  {authError}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-start gap-2.5 border-t border-white/10 pt-5 text-xs text-slate-400">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
            <p className="leading-relaxed">{copy.loginModal.securityNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
