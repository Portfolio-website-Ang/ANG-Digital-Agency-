import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../lib/firebase';

interface FirebaseContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  clearAuthError: () => void;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

const BOOTSTRAPPED_ADMIN_EMAIL = 'mustafaischoolpakistan@gmail.com';

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (currentUser && currentUser.emailVerified) {
        const userDocPath = `users/${currentUser.uid}`;
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const existingSnap = await getDoc(userRef);
          if (!existingSnap.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              displayName: (currentUser.displayName || 'ANG Client').slice(0, 120),
              email: (currentUser.email || '').slice(0, 180),
              company: '',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } else {
            await setDoc(
              userRef,
              {
                displayName: (currentUser.displayName || existingSnap.data().displayName || 'ANG Client').slice(0, 120),
                email: (currentUser.email || existingSnap.data().email || '').slice(0, 180),
                updatedAt: serverTimestamp(),
              },
              { merge: true }
            );
          }
        } catch (error) {
          console.error('Failed to sync user profile:', error);
          try {
            handleFirestoreError(error, OperationType.WRITE, userDocPath);
          } catch (wrappedError) {
            setAuthError(
              wrappedError instanceof Error ? wrappedError.message : 'Unable to sync user profile.'
            );
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Google sign-in failed.';
      setAuthError(msg);
    }
  };

  const signOutUser = async () => {
    setAuthError(null);
    try {
      await signOut(auth);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Sign-out failed.';
      setAuthError(msg);
    }
  };

  const isAdmin = Boolean(
    user?.emailVerified && user.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL
  );

  return (
    <FirebaseContext.Provider
      value={{
        user,
        authReady,
        isAdmin,
        authError,
        signInWithGoogle,
        signOutUser,
        clearAuthError: () => setAuthError(null),
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error('useFirebase must be used inside FirebaseProvider');
  }
  return ctx;
}
