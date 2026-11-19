import React, { useState } from 'react';
import { ArrowUpRight, Check, Layers, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  ServiceOption,
  ShowcaseProject,
  WorkFilter,
} from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';

interface WorkAndProcessProps {
  onSelectService: (service: ServiceOption) => void;
  onConsultProject: (project: ShowcaseProject) => void;
}

export function WorkAndProcess({ onSelectService, onConsultProject }: WorkAndProcessProps) {
  const { copy, isRtl } = useLanguage();
  const [workFilter, setWorkFilter] = useState<WorkFilter>('all');
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleProjects =
    workFilter === 'all'
      ? copy.workSection.projects
      : copy.workSection.projects.filter((project) => project.category === workFilter);

  return (
    <>
      <section id="work" className="bg-slate-50 py-24">
        <ScrollReveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
                {copy.workSection.eyebrow}
              </p>
              <h2
                className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                {copy.workSection.headline}
              </h2>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-end">
                {copy.workSection.subtitle}
              </p>
              <div
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1"
                role="tablist"
                aria-label={copy.workSection.filterAria}
              >
                {copy.workSection.filters.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={workFilter === tab.id}
                    onClick={() => setWorkFilter(tab.id)}
                    className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                      workFilter === tab.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-transform duration-200 hover:-translate-y-0.5 hover:border-slate-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  {!failedImages[project.id] ? (
                    <img
                      src={project.imagePath}
                      alt={project.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [project.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#0e1936] to-[#1a3366] p-8 text-center text-white">
                      <Layers className="h-10 w-10 text-blue-300" aria-hidden="true" />
                      <p className="font-display mt-3 text-xl font-bold">{project.title}</p>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <p className="absolute bottom-4 start-5 text-xs font-semibold tracking-wider text-white/90 uppercase">
                    {copy.workSection.showcaseLabel}
                  </p>
                </div>

                <div className="flex flex-1 flex-col justify-between p-7">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                      {project.categoryLabel}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-extrabold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{project.summary}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                    <span className="text-xs font-medium text-slate-500">
                      {project.subtitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span>{copy.workSection.inspectDirection}</span>
                      <ArrowUpRight
                        className={`h-3.5 w-3.5 ${isRtl ? '-scale-x-100' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section id="process" className="bg-white py-24">
        <ScrollReveal className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
              {copy.processSection.eyebrow}
            </p>
            <h2
              className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              {copy.processSection.headline}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {copy.processSection.subtitle}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {copy.processSection.steps.map((step, idx) => (
              <div
                key={step.number}
                className={`border-t-2 pt-6 ${
                  idx === 0 ? 'border-blue-700' : 'border-slate-200'
                }`}
              >
                <p className="font-mono text-sm font-bold tabular-nums text-blue-700">
                  {step.number}
                </p>
                <h3 className="font-display mt-3 text-xl font-extrabold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-semibold tracking-wider text-blue-700 uppercase">
                  {activeProject.categoryLabel}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display mt-1.5 text-2xl font-extrabold text-slate-900"
                >
                  {activeProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                aria-label={copy.workSection.closeModalAria}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">{activeProject.summary}</p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                {copy.workSection.targetOutcome}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900">
                {activeProject.outcomeFocus}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold tracking-wider text-slate-700 uppercase">
                {copy.workSection.includedDeliverables}
              </p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {activeProject.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => {
                  const chosen = activeProject;
                  setActiveProject(null);
                  onConsultProject(chosen);
                }}
                className="inline-flex min-h-[42px] shrink-0 items-center whitespace-nowrap rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                {copy.workSection.askAiAboutThis}
              </button>
              <button
                type="button"
                onClick={() => {
                  const service = activeProject.recommendedService;
                  setActiveProject(null);
                  onSelectService(service);
                }}
                className="inline-flex min-h-[42px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-blue-700 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800"
              >
                <span>{copy.workSection.startSimilarProject}</span>
                <ArrowUpRight
                  className={`h-3.5 w-3.5 ${isRtl ? '-scale-x-100' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
