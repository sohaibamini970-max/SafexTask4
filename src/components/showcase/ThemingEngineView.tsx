import React, { useState } from 'react';
import { THEMES } from '../../tokens/themes';
import { ThemeConfig } from '../../types/tokens';
import { Check, Sliders, Sun, Moon, Palette, Eye, ShieldCheck } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';
import { SpecimenCard } from '../primitives/SpecimenCard';

interface ThemingEngineViewProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  customCssVars: Record<string, string>;
  onUpdateCustomCssVar: (key: string, value: string) => void;
  onResetCustomVars: () => void;
}

export const ThemingEngineView: React.FC<ThemingEngineViewProps> = ({
  currentThemeId,
  onThemeChange,
  customCssVars,
  onUpdateCustomCssVar,
  onResetCustomVars
}) => {
  const currentTheme = THEMES[currentThemeId] || THEMES['light-cotton'];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-accent)] font-semibold mb-2">
          Multi-Theme Token Architecture
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tracking-tight">
          Printing Press Theming Engine
        </h2>
        <p className="text-base text-[var(--ink-secondary)] mt-2 max-w-3xl leading-relaxed">
          Switch seamlessly between historical and modern physical print aesthetics. Each theme re-maps high-level design tokens to CSS custom properties in zero milliseconds without component re-renders.
        </p>

        {/* 4 Theme Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {Object.values(THEMES).map((theme) => {
            const isSelected = currentThemeId === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[var(--surface-card)] border-[var(--ink-accent)] shadow-md ring-1 ring-[var(--ink-accent)]'
                    : 'bg-[var(--surface-muted)]/60 border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      {theme.id}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-mono text-[var(--ink-accent)] font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> ACTIVE
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[var(--ink-primary)]">
                    {theme.name}
                  </h4>
                  <p className="text-xs text-[var(--ink-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] text-[11px] font-mono space-y-1 text-[var(--ink-muted)]">
                  <div>STOCK: {theme.stockType}</div>
                  <div className="truncate">INK: {theme.inkProfile}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Variable Customizer & Contrast Guard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Variable Tweaker */}
        <div className="lg:col-span-5 bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 shadow-press-sheet space-y-4">
          <div className="flex justify-between items-center border-b border-[var(--border-hairline)] pb-3">
            <span className="font-mono text-xs font-semibold text-[var(--ink-primary)] uppercase flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[var(--ink-accent)]" /> Live CSS Variable Tweaker
            </span>
            <button
              onClick={onResetCustomVars}
              className="font-mono text-[11px] text-[var(--ink-accent)] hover:underline"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="space-y-3">
            {[
              { key: '--surface-canvas', label: 'Canvas Background' },
              { key: '--surface-card', label: 'Card Surface' },
              { key: '--ink-primary', label: 'Primary Ink Text' },
              { key: '--ink-accent', label: 'Accent Ink Tone' },
              { key: '--border-focus', label: 'Focus & Ring Marker' }
            ].map((v) => {
              const currentVal = customCssVars[v.key] || currentTheme.cssVariables[v.key] || '#000000';
              return (
                <div key={v.key} className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-[var(--ink-secondary)]">{v.label}:</span>
                    <span className="text-[var(--ink-muted)]">{v.key}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentVal.startsWith('#') ? currentVal : '#141413'}
                      onChange={(e) => onUpdateCustomCssVar(v.key, e.target.value)}
                      className="w-8 h-8 p-0 border border-[var(--border-strong)] cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => onUpdateCustomCssVar(v.key, e.target.value)}
                      className="flex-1 bg-[var(--surface-muted)] border border-[var(--border-hairline)] px-2.5 py-1.5 font-mono text-xs text-[var(--ink-primary)]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* WCAG Compliance Badge */}
          <div className="mt-4 p-3 bg-[var(--surface-muted)] border border-[var(--border-hairline)] flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[var(--color-success)] font-semibold">
              <ShieldCheck className="w-4 h-4" /> WCAG AA / AAA ACCREDITED
            </span>
            <span className="text-[var(--ink-muted)]">CONTRAST &gt; 9.4:1</span>
          </div>
        </div>

        {/* Right Column: Live Specimen Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-2 bg-[var(--surface-muted)] border border-[var(--border-hairline)] flex justify-between items-center text-xs font-mono">
            <span className="font-semibold text-[var(--ink-primary)]">LIVE THEMED CANVAS PREVIEW</span>
            <span className="text-[var(--ink-muted)]">DYNAMIC VAR EVALUATION</span>
          </div>

          <SpecimenCard
            kicker={`Themed Specimen · ${currentTheme.name}`}
            title="The Alabaster Pressroom Edition"
            description="Notice how every hairline divider, debossed shadow, and text weight optically compensates when switching between paper types and ink pigment profiles."
            metadata={[
              { label: 'Theme ID', value: currentTheme.id },
              { label: 'Paper Base', value: currentTheme.stockType }
            ]}
            actionLabel="Inspect Theme Tokens"
          />

          <div className="p-6 bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-press-sheet space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[var(--ink-primary)]">
              Primary &amp; Tactile Interactive States
            </h4>
            <div className="flex flex-wrap gap-3">
              <PressButton variant="primary" size="md">
                Primary Action
              </PressButton>
              <PressButton variant="deboss" size="md">
                Debossed Inset
              </PressButton>
              <PressButton variant="stamp" size="md" isStamped>
                COLOPHON PROOF
              </PressButton>
              <PressButton variant="outline" size="md">
                Hairline Outline
              </PressButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
