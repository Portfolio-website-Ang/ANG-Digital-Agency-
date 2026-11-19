import React, { useState } from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ServiceOption, TestimonialFilter } from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';

interface ClientTestimonialsProps {
  onSelectService: (service: ServiceOption) => void;
}

export function ClientTestimonials({ onSelectService }: ClientTestimonialsProps) {
  const { copy, isRtl } = useLanguage();
  const [filter, setFilter] = useState<TestimonialFilter>('all');

  const visibleTestimonials =
    filter === 'all'
      ? copy.testimonialsSection.items
      : copy.testimonialsSection.items.filter((item) => item.category === filter);

  return (
    <section id="testimonials" className="border-t border-slate-200 bg-slate-50 py-24">
      <ScrollReveal className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
              {copy.testimonialsSection.eyebrow}
            </p>
            <h2
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              {copy.testimonialsSection.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {copy.testimonialsSection.subtitle}
            </p>
          </div>

          <div
            className="inline-flex w-fit flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-white p-1"
            role="tablist"
            aria-label={copy.testimonialsSection.filterAria}
          >
            {copy.testimonialsSection.filters.map((tab) => (
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
          {visibleTestimonials.map((item) => {
            const isFeatured = filter === 'all' && item.featured;
            const localizedService = copy.servicesSection.serviceLabels[item.service];
            return (
              <article
                key={item.id}
                className={`flex flex-col justify-between rounded-2xl border p-7 transition-transform duration-200 hover:-translate-y-0.5 ${
                  isFeatured
                    ? 'border-slate-800 bg-[#080d1b] text-white md:col-span-2 lg:col-span-2'
                    : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'
                }`}
              >
                <div>
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 border-b pb-4 text-xs ${
                      isFeatured
                        ? 'border-white/10 text-slate-300'
                        : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    <span
                      className={`font-mono font-semibold tabular-nums ${
                        isFeatured ? 'text-amber-300' : 'text-blue-700'
                      }`}
                    >
                      {item.number}. {localizedService}
                    </span>
                    <span className="text-slate-400">{item.engagementDuration}</span>
                  </div>

                  <p
                    className={`font-display mt-5 text-lg font-extrabold tracking-tight tabular-nums sm:text-xl ${
                      isFeatured ? 'text-amber-300' : 'text-slate-900'
                    }`}
                  >
                    {item.metricOutcome}
                  </p>

                  <blockquote
                    className={`mt-4 flex items-start gap-3 text-sm leading-7 sm:text-base ${
                      isFeatured ? 'text-slate-200' : 'text-slate-600'
                    }`}
                  >
                    <Quote
                      className={`mt-1.5 h-4 w-4 shrink-0 ${
                        isFeatured ? 'text-amber-400' : 'text-blue-600'
                      }`}
                      aria-hidden="true"
                    />
                    <p>{item.quote}</p>
                  </blockquote>
                </div>

                <div
                  className={`mt-7 flex flex-wrap items-center justify-between gap-4 border-t pt-5 ${
                    isFeatured ? 'border-white/10' : 'border-slate-100'
                  }`}
                >
                  <div>
                    <p
                      className={`font-display text-sm font-bold ${
                        isFeatured ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {item.authorName}
                    </p>
                    <p
                      className={`mt-0.5 text-xs ${
                        isFeatured ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {item.authorRole} · {item.organization}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectService(item.service)}
                    className={`inline-flex min-h-[38px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      isFeatured
                        ? 'bg-white text-slate-900 hover:bg-amber-300'
                        : 'border border-slate-200 text-slate-800 hover:border-slate-900 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{copy.testimonialsSection.exploreScope}</span>
                    <ArrowUpRight
                      className={`h-3.5 w-3.5 ${isRtl ? '-scale-x-100' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
