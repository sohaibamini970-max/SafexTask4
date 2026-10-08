import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Sliders, Wrench, FileCheck, ArrowRight } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

export const InvalidDataState: React.FC = () => {
  const [fixedBleed, setFixedBleed] = useState(false);
  const [fixedColorSpace, setFixedColorSpace] = useState(false);
  const [fixedFonts, setFixedFonts] = useState(false);
  const [isFixingAll, setIsFixingAll] = useState(false);

  const allFixed = fixedBleed && fixedColorSpace && fixedFonts;

  const fixAll = () => {
    setIsFixingAll(true);
    setTimeout(() => {
      setFixedBleed(true);
      setFixedColorSpace(true);
      setFixedFonts(true);
      setIsFixingAll(false);
    }, 900);
  };

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet max-w-2xl mx-auto">
      {/* Failure Header */}
      <div className="flex items-start gap-4 pb-5 border-b border-[var(--border-hairline)]">
        <div
          className={`p-3 border shrink-0 ${
            allFixed
              ? 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30'
              : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] border-[var(--color-danger)]/20'
          }`}
        >
          {allFixed ? <FileCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
        </div>
        <div>
          <div
            className={`text-[11px] font-mono uppercase tracking-widest font-semibold ${
              allFixed ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'
            }`}
          >
            Failure Mode 04 · Pre-Flight Data Validation (422)
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
            {allFixed ? 'Pre-Flight Specifications Validated' : 'Plate Pre-Flight Inspection Rejected'}
          </h3>
          <p className="text-sm text-[var(--ink-secondary)] mt-1">
            {allFixed
              ? 'All 3 critical print specifications meet Colophon Press mechanical tolerances. Ready for platemaking.'
              : 'The uploaded PDF ticket failed automated mechanical validation. The print press cannot run with these parameters.'}
          </p>
        </div>
      </div>

      {/* Interactive Field-Level Diagnostic Matrix */}
      <div className="py-5 space-y-3">
        {/* Issue 1: Bleed */}
        <div className="p-3.5 bg-[var(--surface-muted)] border border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-semibold text-[var(--ink-primary)] flex items-center gap-2">
              {fixedBleed ? (
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[var(--color-danger)]" />
              )}
              Bleed Margin: {fixedBleed ? '3.0mm (Standard)' : '0.4mm (Insufficient)'}
            </div>
            <div className="text-[var(--ink-muted)]">
              {fixedBleed
                ? 'Mirror extension added to outer boundary.'
                : 'Guillotine cutting blade requires minimum 3.0mm trim bleed to prevent white sliver edges.'}
            </div>
          </div>
          {!fixedBleed && (
            <button
              onClick={() => setFixedBleed(true)}
              className="px-2.5 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-hairline)] border border-[var(--border-strong)] text-[var(--ink-primary)] font-mono text-[11px] transition-colors"
            >
              Auto-Extend +3mm Bleed
            </button>
          )}
        </div>

        {/* Issue 2: Color Space */}
        <div className="p-3.5 bg-[var(--surface-muted)] border border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-semibold text-[var(--ink-primary)] flex items-center gap-2">
              {fixedColorSpace ? (
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[var(--color-danger)]" />
              )}
              Color Space: {fixedColorSpace ? 'FOGRA39 CMYK Profile' : 'Uncalibrated RGB Gamut'}
            </div>
            <div className="text-[var(--ink-muted)]">
              {fixedColorSpace
                ? 'Color converted with perceptual rendering intent.'
                : 'Phosphor screen RGB will exhibit severe gamut shift when translated to lithographic pigments.'}
            </div>
          </div>
          {!fixedColorSpace && (
            <button
              onClick={() => setFixedColorSpace(true)}
              className="px-2.5 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-hairline)] border border-[var(--border-strong)] text-[var(--ink-primary)] font-mono text-[11px] transition-colors"
            >
              Convert to FOGRA39 CMYK
            </button>
          )}
        </div>

        {/* Issue 3: Unembedded fonts */}
        <div className="p-3.5 bg-[var(--surface-muted)] border border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <div className="font-semibold text-[var(--ink-primary)] flex items-center gap-2">
              {fixedFonts ? (
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[var(--color-danger)]" />
              )}
              Typography: {fixedFonts ? 'All Glyphs Outlined' : '2 Missing Font Subsets'}
            </div>
            <div className="text-[var(--ink-muted)]">
              {fixedFonts
                ? 'PostScript vectors converted to bezier curves.'
                : 'Missing font "Garamond Premier Pro Display" will substitute with Courier on the CTP plate setter.'}
            </div>
          </div>
          {!fixedFonts && (
            <button
              onClick={() => setFixedFonts(true)}
              className="px-2.5 py-1 bg-[var(--surface-card)] hover:bg-[var(--border-hairline)] border border-[var(--border-strong)] text-[var(--ink-primary)] font-mono text-[11px] transition-colors"
            >
              Outline Missing Glyphs
            </button>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[var(--ink-muted)] font-mono">
          PRE-FLIGHT PASS: <span className={allFixed ? 'text-[var(--color-success)] font-bold' : 'text-[var(--color-danger)]'}>
            {allFixed ? '100% (READY)' : '33% (REJECTED)'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {!allFixed ? (
            <PressButton
              variant="primary"
              size="sm"
              onClick={fixAll}
              disabled={isFixingAll}
              leftIcon={<Wrench className="w-3.5 h-3.5" />}
            >
              {isFixingAll ? 'Applying Pre-Flight Fixes...' : 'Auto-Correct All Parameters'}
            </PressButton>
          ) : (
            <PressButton
              variant="outline"
              size="sm"
              onClick={() => {
                setFixedBleed(false);
                setFixedColorSpace(false);
                setFixedFonts(false);
              }}
            >
              Reset Pre-Flight Errors
            </PressButton>
          )}
        </div>
      </div>
    </div>
  );
};
