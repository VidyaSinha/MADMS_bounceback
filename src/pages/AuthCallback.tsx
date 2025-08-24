// src/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔄 AuthCallback mounted, checking session...");

    const handleAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log("🔍 Full session result from getSession:", { session, error });

      if (error) {
        console.error("❌ Error fetching session:", error.message);
        navigate("/login", { replace: true });
        return;
      }

      if (session) {
        console.log("✅ Logged in as:", session.user.email);
        navigate("/dashboard", { replace: true });
      } else {
        console.warn("⚠️ No session found yet after redirect");
      }
    };

    handleAuth();

    // 🔄 Listen for ALL auth events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("📡 Auth event received:", event, { session });

      if (event === "SIGNED_IN" && session) {
        console.log("✅ Session restored:", session.user.email);
        navigate("/dashboard", { replace: true });
      } else if (event === "SIGNED_OUT") {
        console.warn("🚪 Signed out, redirecting to login...");
        navigate("/login", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return <p>⏳ Finishing sign in...</p>;
}
