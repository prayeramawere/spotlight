import React, { useState } from "react";
import { cn } from "../lib/utils/helpers";

const TeamAuth = () => {
  type Mode = "signin" | "signup";
  interface TeamAuthPayload {
    email: string;
    password: string;
    fullName?: string;
    inviteCode?: string;
  }
  const [mode, setMode] = useState<Mode>("signup");
  const [form, setForm] = useState<TeamAuthPayload>({
    email: "",
    password: "",
    fullName: "",
    inviteCode: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const update = (field: keyof TeamAuthPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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
                "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <div className="relative">
            <p className="text-[#38BDF8] text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Team Workspace
            </p>
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              {isSignup ? "Join the team" : "Staff sign in"}
            </h1>
            <p className="text-slate-400 text-sm mb-8">
              {isSignup
                ? "Use your invite code to set up your team account."
                : "Sign in to access internal dashboards and client projects."}
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
                    value={form.inviteCode ?? ""}
                    placeholder="AXIS-XXXX-XXXX"
                    autoComplete="off"
                  />
                </>
              )}

              <input
                type="email"
                value={form.email}
                placeholder="you@axis.agency"
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
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="••••••••"
                    autoComplete={
                      isSignup ? "new-password" : "current-password"
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#38BDF8]/50 transition-colors pr-12"
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
                    className="text-xs text-slate-500 hover:text-[#38BDF8] transition-colors"
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
                    : "bg-[#38BDF8] text-[#080C14] hover:bg-white",
                )}
              >
                {loading
                  ? "Please wait..."
                  : isSignup
                    ? "Create Team Account"
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
                    <span className="text-[#38BDF8] font-bold">Sign in</span>
                  </>
                ) : (
                  <>
                    Have an invite code?{" "}
                    <span className="text-[#38BDF8] font-bold">
                      Join the team
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Are you a client?{" "}
          <a
            href="/client/auth"
            className="text-slate-400 hover:text-[#38BDF8] transition-colors"
          >
            Client sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default TeamAuth;
