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

// Type definitions for the context value
interface AuthContextType {
  user: string | null;
  userDataObj: Record<string, any>;
  setUserDataObj: React.Dispatch<React.SetStateAction<Record<string, any>>>;
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
        console.log("User Not found!");
        setUserDataObj({});
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userDataObj,
    setUserDataObj,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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
  User, // Import the User type from Firebase
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Type definitions for the context value
interface AuthContextType {
  user: User | null; // Updated to use Firebase's User type
  userDataObj: Record<string, any>;
  setUserDataObj: React.Dispatch<React.SetStateAction<Record<string, any>>>;
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
  const [user, setUser] = useState<User | null>(null); // Updated type for `user`
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
        setUser(currentUser); // Assign the full `User` object

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
        console.log("User not found!");
        setUserDataObj({});
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userDataObj,
    setUserDataObj,
    isLoading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
