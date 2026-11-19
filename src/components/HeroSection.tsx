import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONTACT } from '../data/agencyData';

interface HeroSectionProps {
  onStartProject: () => void;
  onOpenAssistant: () => void;
}

export function HeroSection({ onStartProject, onOpenAssistant }: HeroSectionProps) {
  const { copy, isRtl } = useLanguage();
  const [bannerFailed, setBannerFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <section id="home" className="relative overflow-hidden bg-[#080d1b] pt-28 text-white lg:pt-36">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, black 35%, transparent 95%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-6 lg:px-8 lg:pb-24">
        <div className="grid items-stretch gap-12 lg:grid-cols-[1.03fr_0.97fr]">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.16em] text-amber-300 uppercase">
              {copy.hero.eyebrow}
            </p>

            <h1
              className="font-display mt-5 max-w-2xl font-extrabold tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)',
                lineHeight: 1.12,
                textWrap: 'balance',
              }}
            >
              {copy.hero.headline}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {copy.hero.subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={onStartProject}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <span>{copy.hero.primaryCta}</span>
                <ArrowUpRight
                  className={`h-4 w-4 ${isRtl ? '-scale-x-100' : ''}`}
                  aria-hidden="true"
                />
              </a>

              <button
                type="button"
                onClick={onOpenAssistant}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-amber-400/35 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:border-amber-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                <span>{copy.hero.secondaryCta}</span>
                <ArrowRight
                  className={`h-4 w-4 text-amber-300 ${isRtl ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-6 text-xs font-medium tracking-wide text-slate-400">
              <span>{copy.hero.partnerLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{AGENCY_CONTACT.websiteLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{copy.hero.trustNote}</span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-amber-400/20 bg-[#0b1328] p-4 sm:p-5">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-[#050914]">
              {!bannerFailed ? (
                <img
                  src={AGENCY_CONTACT.bannerImage}
                  alt="ANG Digital Agency — Elevating Brands. Inspiring Growth. A Proud Partner of Al Nibras Group"
                  referrerPolicy="no-referrer"
                  onError={() => setBannerFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0f1c3f] to-[#050914] p-6 text-center">
                  <Compass className="h-10 w-10 text-amber-300" aria-hidden="true" />
                  <p className="font-display mt-3 text-2xl font-extrabold text-white">
                    {copy.brand.fullName}
                  </p>
                  <p className="mt-1 text-xs tracking-widest text-slate-300 uppercase">
                    {copy.hero.partnerLabel}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              {!logoFailed && (
                <img
                  src={AGENCY_CONTACT.logoImage}
                  alt={copy.brand.fullName}
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="h-14 w-14 shrink-0 rounded-xl border border-amber-400/30 bg-[#050914] object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-bold text-white">
                  {copy.brand.fullName}
                </p>
                <p className="mt-0.5 text-xs text-slate-300">
                  {copy.hero.cardPartnerPrefix}{' '}
                  <span className="font-semibold text-amber-300">
                    {copy.brand.partnerName}
                  </span>
                </p>
              </div>
              <a
                href="#services"
                className="shrink-0 whitespace-nowrap rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-300 hover:text-white"
              >
                {copy.hero.cardCapabilitiesCta}
              </a>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-slate-400">
              <span>{copy.hero.cardFooterLeft}</span>
              <span className="font-semibold text-amber-300">{AGENCY_CONTACT.websiteLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#0b1224]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-5 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {copy.hero.capabilityStrip.map((item) => (
            <div
              key={item}
              className="text-center text-xs font-medium tracking-wide text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
