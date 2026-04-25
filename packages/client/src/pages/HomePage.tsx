import { useState, type JSX } from "react";
import type { Page, Project, ProjectStatus } from "../lib/types";
import { PROJECTS } from "../lib/utils/data";
import { cn, getProgress } from "../lib/utils/helpers";

interface HomePageProps {
  setPage: (p: Page) => void;
  setSelectedProject: (proj: Project | null) => void;
}

export function HomePage({
  setPage,
  setSelectedProject,
}: HomePageProps): JSX.Element {
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered: Project[] =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <div className="min-h-screen bg-[#080C14]">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end pb-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,255,148,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,148,0.03) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,255,148,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-32">
          <div className="flex items-start gap-4 mb-8">
            <div className="mt-3 w-12 h-[2px] bg-[#00FF94]" />
            <p className="text-[#00FF94] text-sm font-bold tracking-[0.3em] uppercase">
              Digital Agency — Est. 2019
            </p>
          </div>

          <h1 className="text-[clamp(56px,10vw,130px)] font-black leading-none tracking-tighter text-white mb-8">
            WE BUILD
            <br />
            <span className="text-[#00FF94]">DIGITAL</span>
            <br />
            FUTURES
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Strategy, design & development for ambitious brands ready to own
              their market.
            </p>
            <div className="flex items-center gap-12">
              {(
                [
                  ["$707K+", "Revenue Managed"],
                  ["5", "Active Clients"],
                  ["76%", "On Schedule"],
                ] as [string, string][]
              ).map(([val, label]) => (
                <div key={label}>
                  <p className="text-3xl font-black text-white">{val}</p>
                  <p className="text-xs text-slate-500 tracking-widest uppercase mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[#00FF94] text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Selected Work
            </p>
            <h2 className="text-5xl font-black text-white tracking-tight">
              Our Projects
            </h2>
          </div>
          <div className="flex gap-2">
            {(["all", "active", "completed"] as ("all" | ProjectStatus)[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded text-xs font-bold tracking-widest uppercase transition-all",
                    filter === f
                      ? "bg-[#00FF94] text-[#080C14]"
                      : "border border-white/10 text-slate-400 hover:border-white/30 hover:text-white",
                  )}
                >
                  {f}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
          {filtered.map((proj) => {
            const progress = getProgress(proj.tasks);
            return (
              <button
                key={proj.id}
                className="relative bg-[#0A0F1C] p-8 text-left hover:bg-[#0D1525] transition-all duration-300 group"
                onMouseEnter={() => setHovered(proj.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  setSelectedProject(proj);
                  setPage("dashboard");
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 rounded-t"
                  style={{
                    background:
                      hovered === proj.id ? proj.color : "transparent",
                  }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center font-black text-sm"
                    style={{
                      background: proj.color + "20",
                      color: proj.color,
                      border: `1px solid ${proj.color}30`,
                    }}
                  >
                    {proj.logo}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded",
                      proj.status === "active"
                        ? "bg-[#00FF94]/10 text-[#00FF94] border border-[#00FF94]/20"
                        : "bg-white/5 text-slate-500 border border-white/5",
                    )}
                  >
                    {proj.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mb-2">
                  {proj.industry}
                </p>
                <h3 className="text-xl font-black text-white mb-1 leading-tight">
                  {proj.client}
                </h3>
                <p className="text-slate-400 text-sm mb-6">{proj.project}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Progress</span>
                    <span style={{ color: proj.color }} className="font-bold">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${progress}%`, background: proj.color }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-slate-500 px-2 py-0.5 rounded border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-600">
                    {proj.year} · {proj.duration}
                  </span>
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors flex items-center gap-1">
                    View Details <span className="text-lg leading-none">→</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative rounded-2xl overflow-hidden bg-[#0A0F1C] border border-white/5 p-16 text-center">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(0,255,148,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <p className="text-[#00FF94] text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Ready to Start?
            </p>
            <h2 className="text-5xl font-black text-white mb-6 tracking-tight">
              Let's Build Something
              <br />
              Extraordinary
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-10">
              We partner with forward-thinking companies to craft digital
              experiences that drive measurable growth.
            </p>
            <button
              onClick={() => setPage("contact")}
              className="bg-[#00FF94] text-[#080C14] font-black px-10 py-4 rounded text-sm tracking-wider uppercase hover:bg-white transition-colors duration-200"
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
