/*
"use client";

import { auth, DB } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of your context value
interface AuthContextType {
  user: string | null;
  userDataObj: object; // Adjust the type if necessary
  isLoading: boolean;
  signup: ({ email, password }: SignUp) => Promise<any>; // Replace `any` with a more specific type if possible
  login: ({ email, password }: SignUp) => Promise<any>;
  logout: () => Promise<void>;
}

// Create the context with a default value of null
const AuthContext = React.createContext<AuthContextType | null>(null);

// Custom hook for using the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface SignUp {
  email: string;
  password: string;
}


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [userDataObj, setUserDataObj] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // AUTH Helpers
  function signup({ email, password }: SignUp) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login({ email, password }: SignUp) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj({});
    setUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // Set user to local context state
        setIsLoading(true);
        setUser(user);

        if (!user) {
          return;
        }

        // if user exists, fetch data from firestore database
        console.log("Fetching User Data");
        const docRef = doc(DB, "user", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};
        if (docSnap.exists()) {
          console.log("Found User Data");
          firebaseData = docSnap.data();
          console.log("firebaseDATA:", firebaseData);
        }

        setUserDataObj(firebaseData);
      } catch (error) {
        console.log("error:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userDataObj,
    signup,
    logout,
    login,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
*/

/*
"use client";

import { auth, DB } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of your context value
interface AuthContextType {
  user: string | null;
  userDataObj: object; // Adjust the type if necessary
  isLoading: boolean;
  signup: ({ email, password }: SignUp) => Promise<any>; // Replace `any` with a more specific type if possible
  login: ({ email, password }: SignUp) => Promise<any>;
  logout: () => Promise<void>;
}

// Create the context with a default value of null
const AuthContext = React.createContext<AuthContextType | null>(null);

// Custom hook for using the Auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface SignUp {
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [userDataObj, setUserDataObj] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function signup({ email, password }: SignUp) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login({ email, password }: SignUp) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj({});
    setUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setIsLoading(true);
        setUser(user?.uid || null);

        if (user) {
          const docRef = doc(DB, "user", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDataObj(docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userDataObj,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
*/

/*
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth, DB } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: string | null;
  userDataObj: Record<string, any>;
  isLoading: boolean;
  signup: ({ email, password }: SignUp) => Promise<any>;
  login: ({ email, password }: SignUp) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface SignUp {
  email: string;
  password: string;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [userDataObj, setUserDataObj] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function signup({ email, password }: SignUp) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login({ email, password }: SignUp) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj({});
    setUser(null);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setIsLoading(true);
        setUser(user?.uid || null);

        if (user) {
          const docRef = doc(DB, "user", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserDataObj(docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    userDataObj,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
*/

/*
"use client";

import React, {
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { auth, DB } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Define types for context value and props
interface AuthContextType {
  user: string | null;
  userDataObj: Record<string, any>;
  isLoading: boolean;
  signup: (credentials: SignUp) => Promise<void>;
  login: (credentials: SignUp) => Promise<void>;
  logout: () => Promise<void>;
}

interface SignUp {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [userDataObj, setUserDataObj] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signup = async ({ email, password }: SignUp) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async ({ email, password }: SignUp) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserDataObj({});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        setUser(firebaseUser.uid);
        try {
          const userDoc = doc(DB, "user", firebaseUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            setUserDataObj(userSnapshot.data());
          } else {
            setUserDataObj({});
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserDataObj({});
        }
      } else {
        setUser(null);
        setUserDataObj({});
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      userDataObj,
      isLoading,
      signup,
      login,
      logout,
    }),
    [user, userDataObj, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
*/

"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { auth, DB } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Type definitions for the context value
interface AuthContextType {
  user: string | null;
  userDataObj: Record<string, any>;
  isLoading: boolean;
  signup: (credentials: SignUp) => Promise<void>;
  login: (credentials: SignUp) => Promise<void>;
  logout: () => Promise<void>;
}

interface SignUp {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook for using the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [userDataObj, setUserDataObj] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const signup = async ({ email, password }: SignUp) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async ({ email, password }: SignUp) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUserDataObj({});
    setUser(null);
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsLoading(true);
      if (currentUser) {
        setUser(currentUser.uid);
        try {
          const userDoc = doc(DB, "user", currentUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            setUserDataObj(userSnapshot.data());
          } else {
            setUserDataObj({});
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
        setUserDataObj({});
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userDataObj,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
