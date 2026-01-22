import { useState, useEffect, type ReactNode } from "react";
import AuthContext, { type SessionType } from "@context/auth/AuthContext";
import type { AuthChangeEvent } from "@supabase/supabase-js";
import type { Session } from "@supabase/supabase-js";
import { authSubscription } from "@api/auth";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionType | null>(null);

  useEffect(() => {
    const handleInitial = (session: Session | null) => {
      if (session && session.user.email) {
        setSession({
          email: session.user.email,
          id: session.user.id,
        });
      } else {
        setSession(null);
      }
    };

    const handleLogin = (session: Session | null) => {
      if (session && session.user.email) {
        setSession({
          email: session.user.email,
          id: session.user.id,
        });
      }
    };

    const handleLogout = () => {
      setSession(null);
    };

    const handleAuthSubscription = (event: AuthChangeEvent, session: Session | null) => {
      if (event === "INITIAL_SESSION") {
        handleInitial(session);
      }

      if (event === "SIGNED_IN") {
        handleLogin(session);
      }

      if (event === "SIGNED_OUT") {
        handleLogout();
      }
    };

    const { subscription } = authSubscription(handleAuthSubscription);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext value={{ session: session }}>{children}</AuthContext>;
};

export default AuthProvider;
