# ANG Digital Agency — Firestore Security Specification

## 1. Data Invariants
1. **Strict Ownership**: Every `UserProfile`, `ProjectEnquiry`, `ChatSession`, and `ChatMessage` document belongs to a single verified Firebase Auth UID (`ownerId == request.auth.uid` or `uid == userId`).
2. **Master Gate on Subcollections**: `/chatSessions/{sessionId}/messages/{messageId}` must verify via `get()` that the parent `/chatSessions/{sessionId}` exists and is owned by `request.auth.uid`.
3. **Zero Privilege Escalation**: Client-side writes cannot grant admin access (`admins` collection is read-only / non-writable from clients). Admin verification checks `request.auth.token.email_verified == true`.
4. **Immutable Ownership & Creation Timestamps**: `ownerId`, `uid`, and `createdAt` cannot be modified after creation.
5. **Terminal State Lock**: Once an enquiry reaches `status == 'archived'`, non-admin users cannot mutate it.
6. **Strict Payload Boundaries**: Every create and update runs `isValid[Entity](incoming())`, enforcing `keys().hasAll(...)`, `keys().hasOnly(...)`, enum allowlists, and `.size()` limits.
7. **Temporal Integrity**: `createdAt` and `updatedAt` must equal `request.time`.

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Unauthenticated Enquiry Create**: Anonymous user attempts `create` on `/enquiries/enq-1` -> `PERMISSION_DENIED`.
2. **Unverified Email Spoof**: User with `email_verified: false` and admin email attempts `list` on `/enquiries` -> `PERMISSION_DENIED`.
3. **Identity Spoofing on Create**: User `alice` tries to create `/enquiries/enq-2` with `ownerId: "bob"` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection**: User `alice` creates `/enquiries/enq-3` with extra ghost field `isApproved: true` -> `PERMISSION_DENIED`.
5. **Status Shortcutting on Create**: User `alice` creates `/enquiries/enq-4` with `status: "in_review"` instead of `"submitted"` -> `PERMISSION_DENIED`.
6. **Owner Reassignment on Update**: User `alice` updates `/enquiries/enq-1` changing `ownerId` to `"bob"` -> `PERMISSION_DENIED`.
7. **Terminal State Mutation**: User `alice` updates an `'archived'` enquiry back to `'submitted'` -> `PERMISSION_DENIED`.
8. **Cross-Tenant PII Read**: User `bob` attempts `get` on `/users/alice` or `/enquiries/alice-enq` -> `PERMISSION_DENIED`.
9. **Blanket Collection List**: User `bob` runs unfiltered `list` on `/enquiries` without `where('ownerId', '==', 'bob')` -> `PERMISSION_DENIED`.
10. **Oversized Document ID Poisoning**: User `alice` attempts `create` at `/enquiries/` + 200-char ID -> `PERMISSION_DENIED`.
11. **Oversized String Exhaustion**: User `alice` sends 10,000-character `details` in `/enquiries/enq-5` -> `PERMISSION_DENIED`.
12. **Orphaned / Cross-Owner Chat Message**: User `bob` writes `/chatSessions/alice-session/messages/msg-1` -> `PERMISSION_DENIED`.
