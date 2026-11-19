import React, { useState } from 'react';
import { ArrowUpRight, Building2, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import {
  AGENCY_CONTACT,
  ServiceCategoryFilter,
  ServiceOption,
} from '../data/agencyData';

interface ServicesAndAboutProps {
  onSelectService: (service: ServiceOption) => void;
  onConsultService: (service: ServiceOption) => void;
}

function ServiceCategoryIcon({ title }: { title: ServiceOption }) {
  switch (title) {
    case 'Website Design & Development':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18" />
          <path d="M9.5 13.5 7.5 15l2 1.5" />
          <path d="M14.5 13.5 16.5 15l-2 1.5" />
          <path d="M12.5 12.5 11.5 17.5" />
        </svg>
      );
    case 'SEO & Content Strategy':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5 21 21" />
          <path d="M7.5 12 9.8 9.7l1.6 1.6L14 8.5" />
        </svg>
      );
    case 'Social Media Management':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="18" cy="5.5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="18.5" r="2.5" />
          <path d="M8.3 10.8 15.7 6.7" />
          <path d="M8.3 13.2 15.7 17.3" />
        </svg>
      );
    case 'Branding & Creative Design':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m14.5 3.5 6 6-9.5 9.5H5v-6l9.5-9.5Z" />
          <path d="M12.5 5.5 18.5 11.5" />
          <path d="M4 20h16" />
        </svg>
      );
    case 'Performance Marketing':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 3v18h18" />
          <path d="m7 15 4-4 3 3 6-7" />
          <path d="M16 7h4v4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="m14.8 9.2-1.8 4.6-4.6 1.8 1.8-4.6 4.6-1.8Z" />
        </svg>
      );
  }
}

export function ServicesAndAbout({ onSelectService, onConsultService }: ServicesAndAboutProps) {
  const { copy, isRtl } = useLanguage();
  const [filter, setFilter] = useState<ServiceCategoryFilter>('all');
  const [studioImgFailed, setStudioImgFailed] = useState(false);

  const visibleServices =
    filter === 'all'
      ? copy.servicesSection.items
      : copy.servicesSection.items.filter((item) => item.category === filter);

  return (
    <>
      <section className="border-b border-slate-200 bg-white py-20">
        <ScrollReveal className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
              {copy.approach.eyebrow}
            </p>
            <h2
              className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {copy.approach.headline}
            </h2>
          </div>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            {copy.approach.body}
          </p>
        </ScrollReveal>
      </section>

      <section id="services" className="bg-slate-50 py-24">
        <ScrollReveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
                {copy.servicesSection.eyebrow}
              </p>
              <h2
                className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                {copy.servicesSection.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                {copy.servicesSection.subtitle}
              </p>
            </div>

            <div
              className="inline-flex w-fit flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1"
              role="tablist"
              aria-label={copy.servicesSection.filterAria}
            >
              {copy.servicesSection.filters.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    filter === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((service) => {
              const spanClass =
                filter === 'all' && service.featured ? 'md:col-span-2 lg:col-span-2' : '';
              const localizedTitle = copy.servicesSection.serviceLabels[service.title];
              return (
                <article
                  key={service.number}
                  className={`flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition-transform duration-200 hover:-translate-y-0.5 hover:border-slate-300 ${spanClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-blue-700">
                          <ServiceCategoryIcon title={service.title} />
                        </span>
                        <span className="font-mono tabular-nums text-blue-700">
                          {service.number}. {service.discipline}
                        </span>
                      </div>
                      <span className="text-slate-400">
                        {copy.servicesSection.coreCapabilityLabel}
                      </span>
                    </div>

                    <h3 className="font-display mt-5 text-xl font-extrabold text-slate-900 sm:text-2xl">
                      {localizedTitle}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      {service.description}
                    </p>

                    <ul
                      className={`mt-6 grid gap-2.5 text-sm text-slate-700 ${
                        filter === 'all' && service.featured ? 'sm:grid-cols-2' : ''
                      }`}
                    >
                      {service.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.title)}
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span>{copy.servicesSection.requestScope}</span>
                      <ArrowUpRight
                        className={`h-3.5 w-3.5 ${isRtl ? '-scale-x-100' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onConsultService(service.title)}
                      className="inline-flex min-h-[40px] shrink-0 items-center whitespace-nowrap rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      {copy.servicesSection.planWithAi}
                    </button>
                  </div>
                </article>
              );
            })}

            <article className="flex flex-col justify-between rounded-2xl bg-[#080d1b] p-7 text-white">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-400/25 bg-white/[0.06] text-amber-300">
                    <ServiceCategoryIcon title="Multiple Services / Strategy" />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.16em] text-blue-300 uppercase">
                    {copy.servicesSection.customRoadmapTag}
                  </p>
                </div>
                <h3 className="font-display mt-5 text-2xl font-extrabold leading-snug">
                  {copy.servicesSection.customRoadmapTitle}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {copy.servicesSection.customRoadmapBody}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectService('Multiple Services / Strategy')}
                className="mt-8 inline-flex min-h-[44px] w-full items-center justify-between rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>{copy.servicesSection.customRoadmapCta}</span>
                <ArrowUpRight
                  className={`h-4 w-4 ${isRtl ? '-scale-x-100' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </article>
          </div>
        </ScrollReveal>
      </section>

      <section id="about" className="bg-white py-24">
        <ScrollReveal className="mx-auto grid max-w-7xl items-stretch gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              {!studioImgFailed ? (
                <img
                  src={AGENCY_CONTACT.studioImage}
                  alt={copy.about.studioFallbackTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setStudioImgFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-slate-900 p-8 text-center">
                  <Building2 className="h-10 w-10 text-blue-400" aria-hidden="true" />
                  <p className="font-display mt-3 text-lg font-bold text-white">
                    {copy.about.studioFallbackTitle}
                  </p>
                </div>
              )}
            </div>

            <div className="p-7 sm:p-8">
              <p className="text-xs font-bold tracking-[0.16em] text-blue-300 uppercase">
                {copy.about.workingPrincipleEyebrow}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {copy.about.principles.map((principle) => (
                  <div
                    key={principle.number}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="font-mono text-lg font-bold tabular-nums text-blue-300">
                      {principle.number}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-white">{principle.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{principle.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
              {copy.about.eyebrow}
            </p>
            <h2
              className="font-display mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {copy.about.headline}
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              {copy.about.paragraphOnePrefix}{' '}
              <strong className="font-semibold text-slate-900">{copy.brand.partnerName}</strong>,{' '}
              {copy.about.paragraphOneSuffix}
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600">
              {copy.about.paragraphTwo}
            </p>

            <div className="mt-8 space-y-5 border-t border-slate-200 pt-7">
              {copy.about.pillars.map((pillar) => (
                <div key={pillar.title} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-slate-900">{pillar.title}</p>
                    <p className="mt-0.5 text-sm text-slate-600">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
