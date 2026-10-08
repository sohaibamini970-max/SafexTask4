import React, { useState } from 'react';
import { COLOR_TOKENS, TYPOGRAPHY_TOKENS, SPACING_TOKENS, ELEVATION_TOKENS } from '../../tokens/tokens';
import { Copy, Check, Sliders, Code2, Sparkles, BookOpen } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

export const TokenCatalogView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'colors' | 'typography' | 'spacing' | 'elevation' | 'export'>('colors');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [sampleText, setSampleText] = useState('Johannes & Sons Regional Typographic Press · Est. 1954');
  const [dropCapEnabled, setDropCapEnabled] = useState(true);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-accent)] font-semibold mb-2">
          Design Token Architecture · Physical Print Foundations
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tracking-tight">
          Printing Press Design Tokens
        </h2>
        <p className="text-base text-[var(--ink-secondary)] mt-2 max-w-3xl leading-relaxed">
          Grounding digital interfaces in centuries of artisanal press heritage: Pica/point spatial scales, Euroscale CMYK pigment formulas, and physical 600gsm deboss reliefs mapped directly to atomic CSS variables.
        </p>

        {/* Category Nav Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { id: 'colors', label: 'Inks & Paper Stocks' },
            { id: 'typography', label: 'Typescale & Editorial' },
            { id: 'spacing', label: 'Pica & Point Scale' },
            { id: 'elevation', label: 'Deboss & Tactile Relief' },
            { id: 'export', label: 'Export Code (CSS/JSON)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-4 py-2 text-xs font-medium border transition-colors ${
                activeCategory === tab.id
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] border-[var(--ink-accent)] font-semibold shadow-xs'
                  : 'bg-[var(--surface-muted)] text-[var(--ink-muted)] border-transparent hover:text-[var(--ink-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. COLOR TOKENS */}
      {activeCategory === 'colors' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COLOR_TOKENS.map((token) => (
              <div
                key={token.id}
                className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-4 shadow-press-sheet hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Swatch */}
                  <div
                    className="w-full h-24 border border-black/10 relative shadow-inner mb-3 flex items-end p-2"
                    style={{ backgroundColor: token.hex }}
                  >
                    <span
                      className="px-2 py-0.5 text-[10px] font-mono tracking-wider font-semibold rounded-none uppercase"
                      style={{
                        backgroundColor: token.category === 'ink' ? '#FAF8F5' : '#141413',
                        color: token.category === 'ink' ? '#141413' : '#FAF8F5'
                      }}
                    >
                      {token.category}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[var(--ink-primary)]">
                    {token.name}
                  </h4>
                  <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed">
                    {token.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] font-mono text-xs space-y-1">
                  <div className="flex justify-between items-center text-[var(--ink-muted)]">
                    <span>HEX / RGB:</span>
                    <button
                      onClick={() => copyToClipboard(token.hex, token.id)}
                      className="font-semibold text-[var(--ink-primary)] flex items-center gap-1 hover:text-[var(--ink-accent)]"
                    >
                      {token.hex}
                      {copiedToken === token.id ? <Check className="w-3 h-3 text-[var(--color-success)]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[var(--ink-muted)]">
                    <span>PRINT CMYK:</span>
                    <span className="text-[var(--ink-secondary)]">{token.cmyk}</span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--ink-muted)]">
                    <span>CSS VAR:</span>
                    <span className="text-[var(--ink-accent)] text-[11px]">{token.variable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TYPOGRAPHY TOKENS */}
      {activeCategory === 'typography' && (
        <div className="space-y-6">
          {/* Interactive Specimen Box */}
          <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="font-semibold text-[var(--ink-primary)]">INTERACTIVE TYPESETTING SPECIMEN</span>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-[var(--ink-secondary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dropCapEnabled}
                    onChange={(e) => setDropCapEnabled(e.target.checked)}
                  />
                  <span>Drop-Cap Initial</span>
                </label>
              </div>
            </div>
            <input
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full text-sm bg-[var(--surface-card)] border border-[var(--border-strong)] px-3 py-2 text-[var(--ink-primary)] font-serif"
            />
          </div>

          {/* Typography Scale Table */}
          <div className="space-y-4">
            {TYPOGRAPHY_TOKENS.map((token) => (
              <div
                key={token.id}
                className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-5 shadow-press-sheet space-y-3"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border-hairline)] pb-2 text-xs font-mono text-[var(--ink-muted)]">
                  <span className="font-semibold text-[var(--ink-primary)]">{token.name}</span>
                  <div className="flex items-center gap-3">
                    <span>SIZE: {token.size}</span>
                    <span>·</span>
                    <span>LEADING: {token.lineHeight}</span>
                    <span>·</span>
                    <span>WEIGHT: {token.weight}</span>
                  </div>
                </div>

                <div
                  className={`text-[var(--ink-primary)] transition-all ${
                    token.role === 'body' && dropCapEnabled
                      ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1'
                      : ''
                  }`}
                  style={{
                    fontFamily: token.family,
                    fontSize: token.size,
                    lineHeight: token.lineHeight,
                    letterSpacing: token.tracking,
                    fontWeight: token.weight
                  }}
                >
                  {sampleText}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. SPACING TOKENS (PICA & POINT) */}
      {activeCategory === 'spacing' && (
        <div className="space-y-6">
          <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 shadow-press-sheet">
            <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)] mb-2">
              Typographic Spatial Ruler (1 Pica = 12 Points = 16 Pixels)
            </div>
            <div className="space-y-4 mt-6">
              {SPACING_TOKENS.map((sp) => (
                <div key={sp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs font-mono">
                    <span className="font-semibold text-[var(--ink-primary)]">{sp.name}</span>
                    <span className="text-[var(--ink-muted)]">{sp.points} · {sp.pixel}px · {sp.usage}</span>
                  </div>
                  <div className="w-full bg-[var(--surface-muted)] h-7 border border-[var(--border-hairline)] flex items-center p-1">
                    <div
                      className="bg-[var(--ink-accent)] h-full transition-all"
                      style={{ width: `${Math.min(sp.pixel * 4, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. ELEVATION TOKENS */}
      {activeCategory === 'elevation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ELEVATION_TOKENS.map((elev) => (
            <div
              key={elev.id}
              className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 shadow-press-sheet space-y-4"
            >
              <div>
                <span className="text-xs font-mono uppercase text-[var(--ink-accent)] font-semibold">
                  {elev.variable}
                </span>
                <h4 className="font-serif text-xl font-semibold text-[var(--ink-primary)] mt-1">
                  {elev.name}
                </h4>
                <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-relaxed">
                  {elev.description}
                </p>
              </div>

              {/* Physical relief preview box */}
              <div
                className="w-full h-32 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] flex items-center justify-center p-4 transition-all"
                style={{ boxShadow: elev.boxShadow }}
              >
                <div className="text-center">
                  <span className="font-serif text-xl font-semibold text-[var(--ink-primary)]">
                    600gsm Cotton Impression
                  </span>
                  <div className="text-[10px] font-mono text-[var(--ink-muted)] mt-1">
                    Tactile depth calibrated for letterpress platen
                  </div>
                </div>
              </div>

              <div className="pt-2 font-mono text-[11px] text-[var(--ink-muted)] break-all">
                <code>{elev.boxShadow}</code>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. EXPORT CODE */}
      {activeCategory === 'export' && (
        <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 shadow-press-sheet space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase">
              Production CSS Custom Properties (Tokens Bundle)
            </span>
            <PressButton
              variant="outline"
              size="sm"
              onClick={() => {
                const css = `:root {
  /* Ink Palette */
  --ink-lampblack: #141413;
  --ink-charcoal: #2B2A27;
  --paper-alabaster: #F9F8F5;
  --cmyk-cyan: #0087B5;
  --cmyk-magenta: #D61A5E;
  --cmyk-yellow: #E5B20D;
  --spot-vermilion: #B8321B;
  --spot-ochre: #966324;

  /* Typography Scale */
  --type-display: "Cormorant Garamond", serif;
  --type-body: "Plus Jakarta Sans", sans-serif;
  --type-mono: "JetBrains Mono", monospace;

  /* Pica Scale */
  --pica-1: 16px;
  --pica-2: 32px;
  --pica-4: 64px;
}`;
                navigator.clipboard?.writeText(css);
                setCopiedToken('export-css');
                setTimeout(() => setCopiedToken(null), 1800);
              }}
              leftIcon={<Copy className="w-3.5 h-3.5" />}
            >
              {copiedToken === 'export-css' ? 'Copied to Clipboard!' : 'Copy CSS Variables'}
            </PressButton>
          </div>

          <pre className="p-4 bg-[var(--surface-muted)] text-[var(--ink-primary)] font-mono text-xs overflow-x-auto leading-relaxed border border-[var(--border-hairline)]">
{`:root {
  /* Physical Printing Press Ink Tokens */
  --ink-lampblack: #141413; /* C:60 M:50 Y:50 K:100 */
  --ink-charcoal: #2B2A27;  /* C:40 M:35 Y:35 K:80 */
  --paper-alabaster: #F9F8F5; /* Mohawk 600gsm cotton */
  --cmyk-cyan: #0087B5;    /* ISO 12647 Euroscale Cyan */
  --cmyk-magenta: #D61A5E; /* ISO Rhodamine Magenta */
  --cmyk-yellow: #E5B20D;  /* ISO Diarylide Yellow */
  --spot-vermilion: #B8321B; /* Heidelberg Platen Red */
  --spot-ochre: #966324;   /* Boiled Linseed Earth Ochre */

  /* Pica/Point Baseline Grid */
  --space-hair: 4px;   /* 0.25 pica */
  --space-thin: 8px;   /* 0.5 pica */
  --space-en: 16px;    /* 1.0 pica */
  --space-em: 24px;    /* 1.5 pica */
  --space-2pica: 32px; /* 2.0 pica */
  --space-4pica: 64px; /* 4.0 pica */

  /* Tactile Depths */
  --elev-deboss: inset 0 1px 2px rgba(0,0,0,0.14), inset 0 2px 4px rgba(0,0,0,0.05);
  --elev-emboss: -1px -1px 2px rgba(255,255,255,0.75), 1px 2px 3px rgba(0,0,0,0.12);
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
