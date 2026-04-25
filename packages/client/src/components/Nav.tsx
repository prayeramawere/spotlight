import type { Page } from "../lib/types";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils/helpers";

interface NavProps {
  page: Page;
  setPage: (p: Page) => void;
}

export function Nav({ page, setPage }: NavProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const fn = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#080C14]/95 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => setPage("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 bg-[#00FF94] rounded flex items-center justify-center">
            <span className="text-[#080C14] font-black text-sm">A</span>
          </div>
          <span className="font-black text-white tracking-tight text-lg">
            AXIS<span className="text-[#00FF94]">.</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {(["home", "dashboard"] as Page[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={cn(
                "px-4 py-2 rounded text-sm font-semibold tracking-wider uppercase transition-all duration-200",
                page === p
                  ? "text-[#00FF94] bg-[#00FF94]/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5",
              )}
            >
              {p === "home" ? "Work" : "Dashboard"}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage("contact")}
          className="bg-[#00FF94] text-[#080C14] font-bold text-sm px-5 py-2 rounded hover:bg-white transition-colors duration-200 tracking-wide"
        >
          New Project
        </button>
      </div>
    </nav>
  );
}
