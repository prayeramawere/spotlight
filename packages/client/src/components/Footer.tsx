export const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#00FF94] rounded flex items-center justify-center">
            <span className="text-[#080C14] font-black text-xs">A</span>
          </div>
          <span className="font-black text-white">
            AXIS<span className="text-[#00FF94]">.</span>
          </span>
        </div>
        <p className="text-xs text-slate-600">
          © 2025 Axis Agency. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <button
              key={l}
              className="text-xs text-slate-600 hover:text-white transition-colors"
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
