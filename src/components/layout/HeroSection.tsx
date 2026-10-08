import React from 'react';
import { PressButton } from '../primitives/PressButton';
import { ShieldCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreTokens: () => void;
  onRunVisualTests: () => void;
  onExploreFailures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTokens,
  onRunVisualTests,
  onExploreFailures
}) => {
  return (
    <section className="relative border-b border-[var(--border-hairline)] bg-[var(--surface-canvas)] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-Pill Unboxed Metadata Header */}
            <div className="flex items-center gap-2 text-xs text-[var(--ink-muted)] font-mono">
              <span>EST. 1954</span>
              <span aria-hidden="true">·</span>
              <span>REGIONAL LETTERPRESS &amp; LITHO</span>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--ink-accent)] font-semibold">WEEK 4 PORTFOLIO DELIVERABLE</span>
            </div>

            {/* Display Headline with Balance Wrap */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--ink-primary)] leading-[1.08] text-balance">
              Design System &amp; Visual Regression Suite for the Regional Press
            </h1>

            {/* Editorial Body Prose */}
            <p className="text-base sm:text-lg text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
              An artisanal, production-grade design system translating physical letterpress impression, Pica baseline scales, and Euroscale CMYK pigments into CSS variable design tokens—protected against unintended UI drift by an integrated Chromatic-style visual regression suite.
            </p>

            {/* Special Constraint Callout Note */}
            <div className="p-4 bg-[var(--surface-card)] border-l-2 border-[var(--ink-accent)] border-y border-r border-[var(--border-hairline)] shadow-press-sheet">
              <div className="text-xs font-mono font-semibold uppercase text-[var(--ink-primary)] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--ink-accent)]" /> Special Constraint Verified:
              </div>
              <p className="text-xs text-[var(--ink-secondary)] mt-1 leading-normal">
                Enforcing non-destructive user-facing behaviors for <strong>5 failure cases</strong> (offline network disconnection, 30s gateway RIP timeout, 500 server crash, invalid pre-flight bleed data, and expired session lock).
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <PressButton
                variant="primary"
                size="lg"
                onClick={onRunVisualTests}
                leftIcon={<ShieldCheck className="w-4 h-4" />}
              >
                Inspect Visual Tests
              </PressButton>

              <PressButton
                variant="deboss"
                size="lg"
                onClick={onExploreTokens}
                leftIcon={<BookOpen className="w-4 h-4" />}
              >
                Browse Design Tokens
              </PressButton>

              <PressButton
                variant="outline"
                size="lg"
                onClick={onExploreFailures}
              >
                Test 5 Failure Cases
              </PressButton>
            </div>
          </div>

          {/* Right Visual Image Card (Macro Letterpress Craftsmanship) */}
          <div className="lg:col-span-5">
            <div className="relative border border-[var(--border-strong)] p-3 bg-[var(--surface-card)] shadow-press-raised">
              {/* Image Frame with CSS Fallback */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900 border border-[var(--border-hairline)]">
                <img
                  src="/src/assets/images/press_letterpress_hero_1791462968019.jpg"
                  alt="Heidelberg cylinder printing press and handset lead typography typeset in a chase"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption & Technical Spec */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
                <span>PLN-1954 · HEIDELBERG PLATEN</span>
                <span className="text-[var(--ink-accent)] font-semibold">600GSM COTTON SPEC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
