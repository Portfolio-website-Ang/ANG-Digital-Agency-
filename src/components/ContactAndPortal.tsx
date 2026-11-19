import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  AlertCircle,
  Archive,
  ArrowUpRight,
  CheckCircle2,
  LogIn,
  LogOut,
  Trash2,
} from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { useLanguage } from '../context/LanguageContext';
import {
  AGENCY_CONTACT,
  SERVICE_OPTIONS,
  ServiceOption,
} from '../data/agencyData';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ScrollReveal } from './ScrollReveal';

interface StoredEnquiry {
  id: string;
  ownerId: string;
  fullName: string;
  email: string;
  businessName: string;
  serviceType: ServiceOption;
  details: string;
  status: 'submitted' | 'in_review' | 'archived';
}

interface ContactAndPortalProps {
  selectedService: ServiceOption | '';
  prefilledDetails?: string;
  onOpenLogin: () => void;
}

export function ContactAndPortal({
  selectedService,
  prefilledDetails,
  onOpenLogin,
}: ContactAndPortalProps) {
  const { user, authReady, isAdmin, signOutUser, authError } = useFirebase();
  const { copy, isRtl, language } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceType, setServiceType] = useState<ServiceOption | ''>(
    selectedService || ''
  );
  const [details, setDetails] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [portalError, setPortalError] = useState<string | null>(null);
  const [viewAllAdmin, setViewAllAdmin] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setServiceType(selectedService);
    }
  }, [selectedService]);

  useEffect(() => {
    if (prefilledDetails) {
      const heading =
        language === 'ar' ? 'مرجع ملخص الاستراتيجية:' : 'Strategy Brief Reference:';
      const tail =
        language === 'ar' ? 'الجدول الزمني والأهداف:' : 'Timeline & Objectives:';
      setDetails(`${heading}\n${prefilledDetails}\n\n${tail}`);
    }
  }, [prefilledDetails, language]);

  useEffect(() => {
    if (user) {
      setFullName((prev) => prev || user.displayName || '');
      setEmail((prev) => prev || user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) {
      setEnquiries([]);
      return;
    }

    const q =
      isAdmin && viewAllAdmin
        ? query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'))
        : query(
            collection(db, 'enquiries'),
            where('ownerId', '==', user.uid)
          );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: StoredEnquiry[] = snapshot.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              ownerId: String(data.ownerId || ''),
              fullName: String(data.fullName || ''),
              email: String(data.email || ''),
              businessName: String(data.businessName || ''),
              serviceType: data.serviceType as ServiceOption,
              details: String(data.details || ''),
              status: (data.status === 'in_review' || data.status === 'archived'
                ? data.status
                : 'submitted') as 'submitted' | 'in_review' | 'archived',
              createdAtMs: data.createdAt?.toMillis?.() ?? 0,
            };
          })
          .sort((a, b) => b.createdAtMs - a.createdAtMs)
          .map(({ createdAtMs: _unused, ...rest }) => rest);
        setEnquiries(items);
        setPortalError(null);
      },
      (error) => {
        try {
          handleFirestoreError(error, OperationType.LIST, 'enquiries');
        } catch (err) {
          setPortalError(
            err instanceof Error ? err.message : 'Unable to fetch saved enquiries.'
          );
        }
      }
    );

    return () => unsubscribe();
  }, [authReady, user, isAdmin, viewAllAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanBusiness = businessName.trim();
    const cleanDetails = details.trim();

    if (cleanName.length < 2) {
      setSubmitStatus({ type: 'error', message: copy.contact.validationName });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setSubmitStatus({ type: 'error', message: copy.contact.validationEmail });
      return;
    }
    if (!serviceType) {
      setSubmitStatus({ type: 'error', message: copy.contact.validationService });
      return;
    }
    if (cleanDetails.length < 10) {
      setSubmitStatus({
        type: 'error',
        message: copy.contact.validationDetails,
      });
      return;
    }

    setSubmitting(true);
    try {
      const apiRes = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: cleanName,
          email: cleanEmail,
          businessName: cleanBusiness,
          service: serviceType,
          details: cleanDetails,
        }),
      });
      const apiData = await apiRes.json().catch(() => ({}));
      if (!apiRes.ok) {
        throw new Error(apiData.error || 'Unable to submit enquiry.');
      }

      if (user && user.emailVerified) {
        try {
          await addDoc(collection(db, 'enquiries'), {
            ownerId: user.uid,
            fullName: cleanName.slice(0, 120),
            email: cleanEmail.slice(0, 180),
            businessName: cleanBusiness.slice(0, 120),
            serviceType,
            details: cleanDetails.slice(0, 3000),
            status: 'submitted',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } catch (fsError) {
          handleFirestoreError(fsError, OperationType.CREATE, 'enquiries');
        }
      }

      setDetails('');
      setBusinessName('');
      const refId = String(apiData.referenceId || '');
      setSubmitStatus({
        type: 'success',
        message: user
          ? copy.contact.successSignedIn(refId)
          : copy.contact.successGuest(refId),
      });
    } catch (error: unknown) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Submission failed. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleArchiveEnquiry = async (enquiryId: string) => {
    const path = `enquiries/${enquiryId}`;
    try {
      await updateDoc(doc(db, 'enquiries', enquiryId), {
        status: 'archived',
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleAdminStatusChange = async (
    enquiryId: string,
    newStatus: 'submitted' | 'in_review' | 'archived'
  ) => {
    const path = `enquiries/${enquiryId}`;
    try {
      await updateDoc(doc(db, 'enquiries', enquiryId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleDeleteEnquiry = async (enquiryId: string) => {
    const path = `enquiries/${enquiryId}`;
    try {
      await deleteDoc(doc(db, 'enquiries', enquiryId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  return (
    <section id="contact" className="bg-slate-50 py-24">
      <ScrollReveal className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
                {copy.contact.eyebrow}
              </p>
              <h2
                className="font-display mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                {copy.contact.headline}
              </h2>
              <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
                {copy.contact.subtitle}
              </p>

              <div className="mt-10 space-y-6 border-t border-slate-200 pt-8">
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                    {copy.contact.directEmailLabel}
                  </p>
                  <a
                    href={`mailto:${AGENCY_CONTACT.email}`}
                    className="mt-1.5 inline-block text-lg font-bold text-slate-900 transition-colors hover:text-blue-700"
                    dir="ltr"
                  >
                    {AGENCY_CONTACT.email}
                  </a>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                    {copy.contact.allianceLabel}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-slate-700">
                    {copy.contact.allianceValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <p className="font-display text-base font-bold text-slate-900">
                    {copy.contact.portalTitle}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user
                      ? `${copy.contact.portalSignedInPrefix} ${user.email}`
                      : copy.contact.portalGuestSubtitle}
                  </p>
                </div>

                {user ? (
                  <button
                    type="button"
                    onClick={() => void signOutUser()}
                    className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{copy.contact.signOut}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{copy.contact.clientLogin}</span>
                  </button>
                )}
              </div>

              {authError && (
                <p className="mt-3 text-xs text-red-700">{authError}</p>
              )}

              {user && isAdmin && (
                <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
                  <span className="font-semibold text-blue-700">{copy.contact.adminView}</span>
                  <button
                    type="button"
                    onClick={() => setViewAllAdmin((prev) => !prev)}
                    className="font-semibold text-slate-700 underline hover:text-slate-900"
                  >
                    {viewAllAdmin ? copy.contact.showMyBriefs : copy.contact.showAllBriefs}
                  </button>
                </div>
              )}

              {portalError && (
                <p className="mt-3 text-xs text-red-700">{portalError}</p>
              )}

              {user ? (
                enquiries.length === 0 ? (
                  <p className="mt-4 text-xs leading-relaxed text-slate-500">
                    {copy.contact.noSavedBriefs}
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {enquiries.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {copy.servicesSection.serviceLabels[item.serviceType] ||
                                item.serviceType}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {item.businessName || item.fullName} · {copy.contact.statusLabel}:{' '}
                              <span className="font-semibold text-slate-800">
                                {copy.contact.statuses[item.status]}
                              </span>
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isAdmin && (
                              <select
                                aria-label="Update enquiry status"
                                value={item.status}
                                onChange={(e) =>
                                  void handleAdminStatusChange(
                                    item.id,
                                    e.target.value as 'submitted' | 'in_review' | 'archived'
                                  )
                                }
                                className="rounded border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700"
                              >
                                <option value="submitted">{copy.contact.statuses.submitted}</option>
                                <option value="in_review">{copy.contact.statuses.in_review}</option>
                                <option value="archived">{copy.contact.statuses.archived}</option>
                              </select>
                            )}
                            {!isAdmin && item.status !== 'archived' && (
                              <button
                                type="button"
                                onClick={() => void handleArchiveEnquiry(item.id)}
                                title={copy.contact.archiveAria}
                                aria-label={copy.contact.archiveAria}
                                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                              >
                                <Archive className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => void handleDeleteEnquiry(item.id)}
                              title={copy.contact.deleteAria}
                              aria-label={copy.contact.deleteAria}
                              className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                          {item.details}
                        </p>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-[#050914]">
                    <img
                      src={AGENCY_CONTACT.loginBannerImage}
                      alt="ANG Digital Agency Client Portal — Elevating Brands. Inspiring Growth."
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {copy.contact.guestPortalNote}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-9">
            <h3 className="font-display text-2xl font-extrabold text-slate-900">
              {copy.contact.formTitle}
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">{copy.contact.formRequiredNote}</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="enquiry-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {copy.contact.fullNameLabel}
                  </label>
                  <input
                    id="enquiry-name"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={copy.contact.fullNamePlaceholder}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {copy.contact.emailLabel}
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={copy.contact.emailPlaceholder}
                    dir="ltr"
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="enquiry-business"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {copy.contact.businessLabel}
                  </label>
                  <input
                    id="enquiry-business"
                    name="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder={copy.contact.businessPlaceholder}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="enquiry-service"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {copy.contact.serviceLabel}
                  </label>
                  <select
                    id="enquiry-service"
                    name="serviceType"
                    required
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as ServiceOption)}
                    className="min-h-[44px] w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:bg-white"
                  >
                    <option value="">{copy.contact.chooseService}</option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {copy.servicesSection.serviceLabels[option]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-details"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  {copy.contact.detailsLabel}
                </label>
                <textarea
                  id="enquiry-details"
                  name="details"
                  rows={5}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={copy.contact.detailsPlaceholder}
                  className="w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-600 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span>{submitting ? copy.contact.submitting : copy.contact.submitButton}</span>
                <ArrowUpRight
                  className={`h-4 w-4 ${isRtl ? '-scale-x-100' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {submitStatus && (
                <div
                  role={submitStatus.type === 'error' ? 'alert' : 'status'}
                  className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs leading-relaxed ${
                    submitStatus.type === 'success'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                      : 'border-red-200 bg-red-50 text-red-900'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                      aria-hidden="true"
                    />
                  ) : (
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
                      aria-hidden="true"
                    />
                  )}
                  <span>{submitStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
