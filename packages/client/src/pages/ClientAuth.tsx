import { useState } from "react";
import { cn } from "../lib/utils/helpers";

const ClientAuth = () => {
  type Mode = "signin" | "signup";

  interface ClientAuthPayload {
    email: string;
    password: string;
    fullName?: string;
    companyName?: string;
  }

  const [mode, setMode] = useState<Mode>("signup");
  const [form, setForm] = useState<ClientAuthPayload>({
    email: "",
    password: "",
    fullName: "",
    companyName: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-[#080C14] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-9 h-9 bg-[#00FF94] rounded flex items-center justify-center">
            <span className="text-[#080C14] font-black text-sm">A</span>
          </div>
          <span className="font-black text-white tracking-tight text-xl">
            AXIS<span className="text-[#00FF94]">.</span>
          </span>
        </div>

        <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-8 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,148,0.08) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <div className="relative">
            <p className="text-[#00FF94] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Client Portal
            </p>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-slate-400 text-sm mb-8">
              {isSignup
                ? "Sign up to track your project progress and collaborate with our team."
                : "Sign in to view your project dashboard and updates."}
            </p>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-rose-900/30 border border-rose-700/40 text-rose-300 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-4">
              {isSignup && (
                <>
                  <input
                    type="text"
                    value={form.fullName ?? ""}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  <input
                    type="text"
                    value={form.companyName ?? ""}
                    placeholder="Acme Inc."
                    autoComplete="organization"
                  />
                </>
              )}

              <input
                type="email"
                value={form.email}
                placeholder="you@company.com"
                autoComplete="email"
              />

              <div>
                <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    placeholder="••••••••"
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#00FF94]/50 transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {isSignup && (
                  <p className="text-xs text-slate-600 mt-2">
                    Must be at least 8 characters.
                  </p>
                )}
              </div>

              {!isSignup && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-slate-500 hover:text-[#00FF94] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full font-black py-3.5 rounded-xl text-sm tracking-widest uppercase transition-colors duration-200",
                  loading
                    ? "bg-white/10 text-slate-500 cursor-not-allowed"
                    : "bg-[#00FF94] text-[#080C14] hover:bg-white",
                )}
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? "Create Account"
                    : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode(isSignup ? "signin" : "signup");
                  setError(null);
                }}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {isSignup ? (
                  <>
                    Already have an account?{" "}
                    <span className="text-[#00FF94] font-bold">Sign in</span>
                  </>
                ) : (
                  <>
                    New client?{" "}
                    <span className="text-[#00FF94] font-bold">
                      Create an account
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Are you a team member?{" "}
          <a
            href="/team/auth"
            className="text-slate-400 hover:text-[#00FF94] transition-colors"
          >
            Staff sign in
          </a>
        </p>
      </div>
    </div>
  );
};
