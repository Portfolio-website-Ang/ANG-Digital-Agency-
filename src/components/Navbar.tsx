import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useLanguage } from '../context/LanguageContext';
import { AGENCY_CONTACT } from '../data/agencyData';

interface NavbarProps {
  onOpenLogin: () => void;
  onPortalClick: () => void;
}

export function Navbar({ onOpenLogin, onPortalClick }: NavbarProps) {
  const { user } = useFirebase();
  const { language, setLanguage, copy } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  const handlePrimaryAction = () => {
    setMobileOpen(false);
    if (user) {
      onPortalClick();
    } else {
      onOpenLogin();
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080d1b]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-5 lg:px-8">
        <a
          href="#home"
          className="font-display flex shrink-0 items-center gap-2.5 whitespace-nowrap text-xl font-extrabold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
        >
          {!logoFailed && (
            <img
              src={AGENCY_CONTACT.logoImage}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              onError={() => setLogoFailed(true)}
              className="h-9 w-9 rounded-lg border border-amber-400/30 bg-[#050914] object-cover"
            />
          )}
          <span>{copy.brand.shortName}</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {copy.nav.links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-slate-300 underline-offset-4 transition-colors duration-150 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <div
            className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-white/15 bg-white/[0.04] p-0.5"
            role="group"
            aria-label={copy.nav.languageGroupAria}
          >
            <Globe className="mx-1.5 hidden h-3.5 w-3.5 shrink-0 text-slate-400 sm:block" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              lang="en"
              className={`min-h-[34px] shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              aria-pressed={language === 'ar'}
              lang="ar"
              className={`min-h-[34px] shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                language === 'ar'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrimaryAction}
            className="hidden min-h-[38px] shrink-0 items-center whitespace-nowrap rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition-opacity duration-150 hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:inline-flex"
          >
            {user ? copy.nav.clientPortal : copy.nav.clientLogin}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 md:hidden"
            aria-label={mobileOpen ? copy.nav.closeMenuAria : copy.nav.openMenuAria}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-t border-white/10 bg-[#080d1b] px-5 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-3">
            {copy.nav.links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950"
            >
              {user ? copy.nav.clientPortal : copy.nav.clientLogin}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
