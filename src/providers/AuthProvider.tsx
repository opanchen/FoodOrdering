import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthData = {
  session: Session | null;
  profile: any;
  isAdmin: boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isAdmin: false,
  loading: true,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchProfile = async (session: Session | null) => {
      if (!session) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setProfile(data || null);
    };

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setLoading(false);

      if (session) {
        fetchProfile(session);
      }
      setMounted(true);
    };

    fetchSession();

    // Subscribe to session changes when the application mounts
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchProfile(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading: loading || !mounted,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
