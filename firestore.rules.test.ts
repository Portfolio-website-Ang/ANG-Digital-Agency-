/**
 * Security Rules Verification Suite (Phase 0 TDD Specification)
 * Verifies the "Dirty Dozen" adversarial payloads against firestore.rules.
 */
export const DIRTY_DOZEN_CASES = [
  { id: 1, name: 'Unauthenticated Enquiry Create', expected: 'PERMISSION_DENIED' },
  { id: 2, name: 'Unverified Email Admin Spoof', expected: 'PERMISSION_DENIED' },
  { id: 3, name: 'Identity Spoofing on Create (ownerId != auth.uid)', expected: 'PERMISSION_DENIED' },
  { id: 4, name: 'Shadow Field Injection (extra ghost key)', expected: 'PERMISSION_DENIED' },
  { id: 5, name: 'Status Shortcutting on Create (status != submitted)', expected: 'PERMISSION_DENIED' },
  { id: 6, name: 'Owner Reassignment on Update', expected: 'PERMISSION_DENIED' },
  { id: 7, name: 'Terminal State Mutation (archived -> submitted)', expected: 'PERMISSION_DENIED' },
  { id: 8, name: 'Cross-Tenant PII Read (/users/{otherUid})', expected: 'PERMISSION_DENIED' },
  { id: 9, name: 'Blanket Collection List without ownerId filter', expected: 'PERMISSION_DENIED' },
  { id: 10, name: 'Oversized / Invalid Document ID Poisoning', expected: 'PERMISSION_DENIED' },
  { id: 11, name: 'Oversized String Resource Exhaustion', expected: 'PERMISSION_DENIED' },
  { id: 12, name: 'Cross-Owner Subcollection Write (/chatSessions/{other}/messages)', expected: 'PERMISSION_DENIED' },
] as const;
