import React, { useState } from 'react';
import { PressButton } from '../primitives/PressButton';
import { Check, Printer, FileText, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-react';

export const PressOrderDemo: React.FC = () => {
  const [paperStock, setPaperStock] = useState('mohawk-600');
  const [printMethod, setPrintMethod] = useState('letterpress');
  const [quantity, setQuantity] = useState(1000);
  const [includeFoil, setIncludeFoil] = useState(true);
  const [includeDeckle, setIncludeDeckle] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Price calculations based on artisanal press economics
  const baseRate = printMethod === 'letterpress' ? 380 : 260;
  const unitRate = paperStock === 'mohawk-600' ? 0.85 : 0.65;
  const finishFee = (includeFoil ? 180 : 0) + (includeDeckle ? 120 : 0);
  const totalCost = Math.round(baseRate + quantity * unitRate + finishFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-accent)] font-semibold mb-2">
          Design System in Practice · Production Job Ticket
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tracking-tight">
          Regional Press Work Order &amp; Specimen Ticket
        </h2>
        <p className="text-base text-[var(--ink-secondary)] mt-2 max-w-3xl leading-relaxed">
          Experience the design system's form primitives, tactile button states, and layout primitives assembled into a production printing press job configuration workbench.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Configuration Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet space-y-6">
          <div className="flex justify-between items-center border-b border-[var(--border-hairline)] pb-4">
            <h3 className="font-serif text-xl font-semibold text-[var(--ink-primary)]">
              Job Ticket Specifications
            </h3>
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              TICKET #COL-2026-X8
            </span>
          </div>

          {/* 1. Paper Stock Primitive */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase font-semibold text-[var(--ink-primary)] flex justify-between">
              <span>1. Archival Paper Stock:</span>
              <span className="text-[var(--ink-accent)]">100% COTTON RAG</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'mohawk-600', name: 'Mohawk Superfine (600gsm)', desc: 'Ultra-heavyweight double thick cover' },
                { id: 'somerset-400', name: 'Somerset Velvet (400gsm)', desc: 'Fine art mould-made soft buff texture' },
                { id: 'lettra-300', name: 'Crane’s Lettra (300gsm)', desc: 'Fluffy unpressed cotton for deep deboss' },
                { id: 'fabriano-250', name: 'Fabriano Tiepolo (290gsm)', desc: 'Italian watermark archival broadsheet' }
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPaperStock(p.id)}
                  className={`p-3 border cursor-pointer transition-all ${
                    paperStock === p.id
                      ? 'bg-[var(--surface-muted)] border-[var(--ink-accent)] shadow-xs'
                      : 'border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="font-serif font-semibold text-sm text-[var(--ink-primary)]">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-[var(--ink-muted)] mt-0.5">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Printing Process Primitive */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase font-semibold text-[var(--ink-primary)]">
              2. Platen &amp; Impression Method:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPrintMethod('letterpress')}
                className={`p-3 border text-left font-mono text-xs transition-colors ${
                  printMethod === 'letterpress'
                    ? 'bg-[var(--surface-muted)] border-[var(--ink-accent)] font-bold text-[var(--ink-primary)]'
                    : 'border-[var(--border-hairline)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                }`}
              >
                HEIDELBERG LETTERPRESS (DEEP DEBOSS)
              </button>
              <button
                type="button"
                onClick={() => setPrintMethod('offset')}
                className={`p-3 border text-left font-mono text-xs transition-colors ${
                  printMethod === 'offset'
                    ? 'bg-[var(--surface-muted)] border-[var(--ink-accent)] font-bold text-[var(--ink-primary)]'
                    : 'border-[var(--border-hairline)] text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                }`}
              >
                4-COLOR LITHO OFFSET (EUROSCALE)
              </button>
            </div>
          </div>

          {/* 3. Run Quantity Stepper */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="uppercase font-semibold text-[var(--ink-primary)]">
                3. Production Impression Count:
              </span>
              <span className="font-bold text-[var(--ink-accent)] text-sm">
                {quantity.toLocaleString()} Sheets
              </span>
            </div>
            <input
              type="range"
              min="250"
              max="5000"
              step="250"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
              <span>250 Proof Run</span>
              <span>1,000 Signature</span>
              <span>2,500 Full Edition</span>
              <span>5,000 Broadside Run</span>
            </div>
          </div>

          {/* 4. Bindery & Finishings */}
          <div className="space-y-3 pt-2 border-t border-[var(--border-hairline)]">
            <span className="text-xs font-mono uppercase font-semibold text-[var(--ink-primary)] block">
              4. Master Bindery &amp; Embellishments:
            </span>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className="flex items-center gap-2 text-xs text-[var(--ink-secondary)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeFoil}
                  onChange={(e) => setIncludeFoil(e.target.checked)}
                />
                <span>Matte Gold Hot Foil Stamping (+$180)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-[var(--ink-secondary)] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeDeckle}
                  onChange={(e) => setIncludeDeckle(e.target.checked)}
                />
                <span>Hand-Torn Deckle Edge (+$120)</span>
              </label>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between">
            <div className="font-serif text-2xl font-bold text-[var(--ink-primary)]">
              ${totalCost.toLocaleString()} <span className="text-xs font-mono font-normal text-[var(--ink-muted)]">USD NET</span>
            </div>
            <PressButton
              type="submit"
              variant="primary"
              size="lg"
              leftIcon={<Printer className="w-4 h-4" />}
            >
              Submit Ticket to Press
            </PressButton>
          </div>
        </form>

        {/* Right Column: Physical Press Proof Ticket Visualizer */}
        <div className="lg:col-span-5 bg-[var(--surface-card)] border-2 border-dashed border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet relative">
          {/* Top Registration Markings */}
          <div className="flex justify-between items-center border-b border-[var(--border-hairline)] pb-3 mb-6 font-mono text-[10px] text-[var(--ink-muted)]">
            <span>COLOPHON MASTER TICKET</span>
            <span>REGISTRATION 0.05pt</span>
          </div>

          <div className="text-center space-y-1 mb-6">
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--ink-accent)] font-semibold">
              Johannes &amp; Sons Press
            </div>
            <h4 className="font-serif text-3xl font-bold text-[var(--ink-primary)]">
              Imprimatur Work Order
            </h4>
            <div className="text-xs text-[var(--ink-muted)] font-mono">
              JOB REF: #COL-2026-X8 · EST. 1954
            </div>
          </div>

          {/* Ticket Table */}
          <div className="space-y-3 font-mono text-xs border-y border-[var(--border-hairline)] py-4">
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">STOCK:</span>
              <span className="font-semibold text-[var(--ink-primary)] text-right">{paperStock.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">METHOD:</span>
              <span className="font-semibold text-[var(--ink-primary)] text-right">{printMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">RUN COUNT:</span>
              <span className="font-semibold text-[var(--ink-primary)]">{quantity} SHEETS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">HOT FOIL:</span>
              <span className="font-semibold text-[var(--ink-primary)]">{includeFoil ? 'INCLUDED' : 'NONE'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--ink-muted)]">DECKLE:</span>
              <span className="font-semibold text-[var(--ink-primary)]">{includeDeckle ? 'HAND-TORN' : 'TRIMMED'}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--border-hairline)] pt-2 text-sm">
              <span className="font-semibold text-[var(--ink-primary)]">EST. TOTAL:</span>
              <span className="font-serif font-bold text-lg text-[var(--ink-primary)]">${totalCost}</span>
            </div>
          </div>

          {/* Visual Stamp when Submitted */}
          {isSubmitted ? (
            <div className="mt-6 p-4 border-2 border-dashed border-[var(--color-danger)] text-center text-[var(--color-danger)] rotate-[-3deg] transition-all">
              <div className="font-mono text-base font-black tracking-widest uppercase">
                PROOF APPROVED FOR PRESS RUN
              </div>
              <div className="text-[10px] font-mono mt-1 opacity-90">
                DISPATCHED TO HEIDELBERG PLATEN #02 · TODAY
              </div>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-[var(--surface-muted)] text-center text-xs text-[var(--ink-muted)] font-mono">
              PENDING MASTER PRESSMAN APPROVAL
            </div>
          )}

          {/* Color Control Bar */}
          <div className="mt-8 pt-4 border-t border-[var(--border-hairline)] flex justify-between items-center">
            <div className="flex gap-1">
              <span className="w-4 h-3 bg-[#0087B5]" />
              <span className="w-4 h-3 bg-[#D61A5E]" />
              <span className="w-4 h-3 bg-[#E5B20D]" />
              <span className="w-4 h-3 bg-[#141413]" />
            </div>
            <span className="font-mono text-[9px] text-[var(--ink-muted)]">FOGRA39 COATED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
