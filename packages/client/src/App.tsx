import { useState, type JSX } from "react";
import { Nav } from "./components/Nav";
import type { Page, Project } from "./lib/types";
import { ContactPage } from "./pages/ContactPage";
import { Dashboard } from "./pages/Dashboard";
import { StatsPage } from "./pages/StatsPage";
import { HomePage } from "./pages/HomePage";
import Footer from "./components/Footer";

export default function App(): JSX.Element {
  const [page, setPage] = useState<Page>("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const goTo = (p: Page): void => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <div
      className="bg-[#080C14] min-h-screen"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080C14; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        select option { background: #0A0F1C; color: white; }
        .bg-white\\/3 { background: rgba(255,255,255,0.03); }
        .bg-white\\/4 { background: rgba(255,255,255,0.04); }
        .bg-white\\/8 { background: rgba(255,255,255,0.08); }
        .border-white\\/3 { border-color: rgba(255,255,255,0.03); }
        .border-white\\/8 { border-color: rgba(255,255,255,0.08); }
      `}</style>

      <Nav page={page} setPage={goTo} />

      {page === "home" && (
        <HomePage setPage={goTo} setSelectedProject={setSelectedProject} />
      )}

      {page === "dashboard" && (
        <div>
          <div className="fixed top-16 left-0 right-0 z-40 bg-[#080C14] border-b border-white/5">
            <div className="ml-72 px-8 h-12 flex items-center gap-4">
              <button
                onClick={() => goTo("dashboard")}
                className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded text-white bg-white/5 border border-white/10 transition-all"
              >
                Project Tracker
              </button>
              <button
                onClick={() => goTo("stats")}
                className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded text-slate-500 hover:text-white transition-all"
              >
                Analytics
              </button>
            </div>
          </div>
          <div className="pt-12">
            <Dashboard
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          </div>
        </div>
      )}

      {page === "stats" && (
        <div>
          <div className="fixed top-16 left-0 right-0 z-40 bg-[#080C14] border-b border-white/5">
            <div className="px-8 h-12 flex items-center gap-4">
              <button
                onClick={() => goTo("dashboard")}
                className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded text-slate-500 hover:text-white transition-all"
              >
                Project Tracker
              </button>
              <button
                onClick={() => goTo("stats")}
                className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded text-white bg-white/5 border border-white/10 transition-all"
              >
                Analytics
              </button>
              yes this is a hack to prevent content shift when switching between
              dashboard and stats whatever
            </div>
          </div>
          <div className="pt-12">
            <StatsPage />
          </div>
        </div>
      )}

      {page === "contact" && <ContactPage />}

      {page === "home" && <Footer />}
    </div>
  );
}
