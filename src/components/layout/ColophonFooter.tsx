import React from 'react';

export const ColophonFooter: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[var(--border-hairline)] bg-[var(--surface-canvas)] py-12 px-4 sm:px-6 lg:px-8 text-xs text-[var(--ink-secondary)]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Colophon Block */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 md:col-span-2">
            <h4 className="font-serif text-lg font-semibold text-[var(--ink-primary)]">
              Colophon Typographic &amp; Lithographic Press
            </h4>
            <p className="leading-relaxed text-[var(--ink-secondary)] max-w-md">
              A regional printing house established in 1954 dedicated to cast lead letterpress, cold-set lithography, and archival binding. This design system bridges mechanical physical print standards with production-grade digital software engineering.
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="font-semibold text-[var(--ink-primary)] uppercase tracking-wider mb-2">
              Typographic Imprint
            </div>
            <div>Display: Cormorant Garamond 600</div>
            <div>Body: Plus Jakarta Sans 400</div>
            <div>Tabular: JetBrains Mono 500</div>
            <div className="text-[var(--ink-muted)]">Typeset to 65ch measure</div>
          </div>

          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="font-semibold text-[var(--ink-primary)] uppercase tracking-wider mb-2">
              Physical Standards
            </div>
            <div>Gamut: ISO 12647-2 Euroscale</div>
            <div>Stock: 100% Cotton Rag (350–600gsm)</div>
            <div>Bleed: 3.0mm Mechanical Trim</div>
            <div className="text-[var(--ink-muted)]">ΔE Tolerance: &lt; 0.10 CIELAB</div>
          </div>
        </div>

        {/* Quiet Copyright Row */}
        <div className="pt-8 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[var(--ink-muted)]">
          <div>
            © 1954–2026 Colophon Regional Press · All Rights Reserved
          </div>
          <div className="flex items-center gap-4">
            <span>Tailwind CSS v4</span>
            <span>·</span>
            <span>CSS Variables Design Tokens</span>
            <span>·</span>
            <span>Chromatic Visual Regression Tests</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
