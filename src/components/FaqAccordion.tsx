import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FaqCategory } from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';

interface FaqAccordionProps {
  onContactClick: () => void;
  onConsultClick: () => void;
}

export function FaqAccordion({ onContactClick, onConsultClick }: FaqAccordionProps) {
  const { copy, isRtl } = useLanguage();
  const [category, setCategory] = useState<FaqCategory>('all');
  const [openId, setOpenId] = useState<string>(copy.faqSection.items[0].id);

  const visibleFaqs =
    category === 'all'
      ? copy.faqSection.items
      : copy.faqSection.items.filter((item) => item.category === category);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  const handleCategoryChange = (nextCategory: FaqCategory) => {
    setCategory(nextCategory);
    const matching =
      nextCategory === 'all'
        ? copy.faqSection.items
        : copy.faqSection.items.filter((item) => item.category === nextCategory);
    if (matching.length > 0 && !matching.some((item) => item.id === openId)) {
      setOpenId(matching[0].id);
    }
  };

  return (
    <section id="faq" className="border-t border-slate-200 bg-white py-24">
      <ScrollReveal className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
              {copy.faqSection.eyebrow}
            </p>
            <h2
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              style={{ textWrap: 'balance' }}
            >
              {copy.faqSection.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {copy.faqSection.subtitle}
            </p>

            <div
              className="mt-7 inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1"
              role="tablist"
              aria-label={copy.faqSection.filterAria}
            >
              {copy.faqSection.filters.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={category === tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    category === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="font-display text-base font-bold text-slate-900">
              {copy.faqSection.ctaTitle}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {copy.faqSection.ctaBody}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span>{copy.faqSection.ctaProposal}</span>
                <ArrowUpRight
                  className={`h-3.5 w-3.5 ${isRtl ? '-scale-x-100' : ''}`}
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={onConsultClick}
                className="inline-flex min-h-[42px] shrink-0 items-center whitespace-nowrap rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {copy.faqSection.ctaAskAi}
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {visibleFaqs.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div key={item.id} className="py-1">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleToggle(item.id)}
                    className="flex min-h-[56px] w-full items-start justify-between gap-4 py-4 text-start transition-colors hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                      <span className="font-mono shrink-0 text-xs font-semibold tabular-nums text-blue-700">
                        {item.number}. {item.categoryLabel}
                      </span>
                      <span className="font-display text-base font-bold text-slate-900 sm:text-lg">
                        {item.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-blue-700' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="pb-5 pe-8 text-sm leading-7 text-slate-600 sm:text-base"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
