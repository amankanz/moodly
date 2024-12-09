/*
"use client";

import React, { useContext, useState, useEffect, ReactNode } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return <AuthContext.Provider></AuthContext.Provider>;
}
*/

"use client";

import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useContext, useState, ReactNode, useEffect } from "react";

// Define the shape of your context value
interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
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

  // const login = (username: string) => {
  //   setUser(username);
  // };

  // const logout = () => {
  //   setUser(null);
  // };

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
      } catch (error) {
        console.log("error:", error);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
