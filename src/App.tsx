import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FirebaseProvider } from './context/FirebaseContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesAndAbout } from './components/ServicesAndAbout';
import { FaqAccordion } from './components/FaqAccordion';
import { WorkAndProcess } from './components/WorkAndProcess';
import { ClientTestimonials } from './components/ClientTestimonials';
import { StrategyAssistant } from './components/StrategyAssistant';
import { ContactAndPortal } from './components/ContactAndPortal';
import { ClientLoginModal } from './components/ClientLoginModal';
import { NewsletterSignup } from './components/NewsletterSignup';
import { AGENCY_CONTACT, ServiceOption, ShowcaseProject } from './data/agencyData';

function AgencyExperience() {
  const { copy } = useLanguage();
  const [selectedService, setSelectedService] = useState<ServiceOption | ''>('');
  const [prefilledDetails, setPrefilledDetails] = useState<string>('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [footerLogoFailed, setFooterLogoFailed] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState<{
    text: string;
    serviceContext?: string;
    nonce: number;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceOption) => {
    setSelectedService(service);
    scrollToSection('contact');
  };

  const handleConsultService = (service: ServiceOption) => {
    const localizedLabel = copy.servicesSection.serviceLabels[service];
    setAssistantPrompt({
      text: copy.assistant.externalPromptTemplate(localizedLabel),
      serviceContext: service,
      nonce: Date.now(),
    });
    scrollToSection('assistant');
  };

  const handleConsultProject = (project: ShowcaseProject) => {
    setAssistantPrompt({
      text: copy.assistant.externalProjectTemplate(project.title, project.categoryLabel),
      serviceContext: project.recommendedService,
      nonce: Date.now(),
    });
    scrollToSection('assistant');
  };

  const handleApplyToEnquiry = (summary: string) => {
    setPrefilledDetails(summary);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <ScrollProgressBar />
      <Navbar
        onOpenLogin={() => setLoginModalOpen(true)}
        onPortalClick={() => scrollToSection('contact')}
      />

      <main>
        <HeroSection
          onStartProject={() => scrollToSection('contact')}
          onOpenAssistant={() => scrollToSection('assistant')}
        />

        <ServicesAndAbout
          onSelectService={handleSelectService}
          onConsultService={handleConsultService}
        />

        <FaqAccordion
          onContactClick={() => scrollToSection('contact')}
          onConsultClick={() => scrollToSection('assistant')}
        />

        <WorkAndProcess
          onSelectService={handleSelectService}
          onConsultProject={handleConsultProject}
        />

        <ClientTestimonials onSelectService={handleSelectService} />

        <StrategyAssistant
          externalPrompt={assistantPrompt}
          onApplyToEnquiry={handleApplyToEnquiry}
          onOpenLogin={() => setLoginModalOpen(true)}
        />

        <ContactAndPortal
          selectedService={selectedService}
          prefilledDetails={prefilledDetails}
          onOpenLogin={() => setLoginModalOpen(true)}
        />
      </main>

      <footer className="border-t border-white/10 bg-[#080d1b] py-14 text-slate-400">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-start gap-10 border-b border-white/10 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-3.5">
                {!footerLogoFailed && (
                  <img
                    src={AGENCY_CONTACT.logoImage}
                    alt={copy.brand.fullName}
                    referrerPolicy="no-referrer"
                    onError={() => setFooterLogoFailed(true)}
                    className="h-12 w-12 rounded-lg border border-amber-400/30 bg-[#050914] object-cover"
                  />
                )}
                <div>
                  <a
                    href="#home"
                    className="font-display text-xl font-extrabold tracking-tight text-white"
                  >
                    {copy.brand.fullName}
                  </a>
                  <p className="mt-1 text-xs text-slate-400">
                    {copy.footer.taglinePrefix} {copy.brand.partnerName}
                  </p>
                </div>
              </div>

              <p className="max-w-md text-sm leading-7 text-slate-300">
                {copy.footer.summary}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
                <a
                  href={`mailto:${AGENCY_CONTACT.email}`}
                  dir="ltr"
                  className="font-medium transition-colors hover:text-white"
                >
                  {AGENCY_CONTACT.email}
                </a>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span>{AGENCY_CONTACT.websiteLabel}</span>
              </div>
            </div>

            <NewsletterSignup />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-start">
            <nav
              className="flex flex-wrap justify-center gap-6 text-xs font-medium"
              aria-label={copy.footer.navAria}
            >
              {copy.footer.navLinks.map((link) => (
                <a
                  key={link.href}
                  className="transition-colors hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} {copy.footer.rights}
            </p>
          </div>
        </div>
      </footer>

      <ClientLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <FirebaseProvider>
          <AgencyExperience />
        </FirebaseProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
