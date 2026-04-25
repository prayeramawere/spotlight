import { useState } from "react";
import { cn } from "../lib/utils/helpers";

export interface ContactForm {
  name: string;
  company: string;
  email: string;
  budget: string;
  message: string;
  service: string;
}

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    company: "",
    email: "",
    budget: "",
    message: "",
    service: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleSubmit(): void {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#080C14] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/30 flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            We'll Be in Touch
          </h2>
          <p className="text-slate-400 text-lg">
            Thanks, {form.name}. Our team reviews every brief personally and
            will respond within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080C14] pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[#00FF94] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            New Project
          </p>
          <h2 className="text-6xl font-black text-white tracking-tight mb-6">
            Tell Us About
            <br />
            Your Vision
          </h2>
          <p className="text-slate-400 text-lg max-w-lg">
            Every great project starts with a conversation. Fill out the brief
            below and we'll respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ["name", "Your Name", "text"],
                  ["company", "Company", "text"],
                ] as [keyof ContactForm, string, string][]
              ).map(([field, ph, type]) => (
                <div key={field}>
                  <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-2">
                    {ph}
                  </label>
                  <input
                    type={type}
                    placeholder={ph}
                    value={form[field]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [field]: e.target.value }))
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#00FF94]/50 transition-colors"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="hello@company.com"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#00FF94]/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-2">
                Service Needed
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Branding",
                  "Web Dev",
                  "UX Design",
                  "Campaign",
                  "Product",
                  "Strategy",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm((p) => ({ ...p, service: s }))}
                    className={cn(
                      "py-2 px-3 rounded-lg text-xs font-bold border transition-all",
                      form.service === s
                        ? "border-[#00FF94]/50 bg-[#00FF94]/10 text-[#00FF94]"
                        : "border-white/10 text-slate-500 hover:border-white/20 hover:text-white",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-2">
                Budget Range
              </label>
              <select
                value={form.budget}
                onChange={(e) =>
                  setForm((p) => ({ ...p, budget: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-[#00FF94]/50 transition-colors"
              >
                <option value="" className="bg-[#0A0F1C]">
                  Select budget range
                </option>
                {[
                  "$10K–$25K",
                  "$25K–$50K",
                  "$50K–$100K",
                  "$100K–$250K",
                  "$250K+",
                ].map((b) => (
                  <option key={b} value={b} className="bg-[#0A0F1C]">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 tracking-widest uppercase block mb-2">
                Project Brief
              </label>
              <textarea
                placeholder="Tell us about your project, goals, and timeline..."
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-[#00FF94]/50 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#00FF94] text-[#080C14] font-black py-4 rounded-xl text-sm tracking-widest uppercase hover:bg-white transition-colors duration-200"
            >
              Submit Brief →
            </button>
          </div>

          {/* Side info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">
                What Happens Next
              </p>
              <div className="space-y-4">
                {(
                  [
                    ["01", "We review your brief within 24 hours"],
                    ["02", "Discovery call to align on vision"],
                    ["03", "Custom proposal in 3 business days"],
                    ["04", "Kickoff & project begins"],
                  ] as [string, string][]
                ).map(([n, text]) => (
                  <div key={n} className="flex gap-3">
                    <span className="text-xs font-black text-[#00FF94] w-6 flex-shrink-0 mt-0.5">
                      {n}
                    </span>
                    <p className="text-sm text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-4">
                By the Numbers
              </p>
              <div className="space-y-3">
                {(
                  [
                    ["$707K+", "Revenue Managed"],
                    ["5", "Satisfied Clients"],
                    ["100%", "On-time Delivery"],
                    ["24h", "Response Time"],
                  ] as [string, string][]
                ).map(([val, label]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-sm font-black text-[#00FF94]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-6">
              <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
                Direct Contact
              </p>
              <p className="text-sm text-white font-bold">hello@axis.agency</p>
              <p className="text-xs text-slate-600 mt-1">
                Avg response under 4 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
