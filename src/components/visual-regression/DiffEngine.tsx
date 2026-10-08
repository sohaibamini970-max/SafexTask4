import React, { useState } from 'react';
import { VisualTestSnapshot, DiffMode, ViewportMode } from '../../types/regression';
import { Columns, Eye, Sliders, Check, X, ShieldAlert, Sparkles, Monitor, Tablet, Smartphone } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';
import { SpecimenCard } from '../primitives/SpecimenCard';
import { ImpositionSheet } from '../primitives/ImpositionSheet';
import { OfflineState } from '../failures/OfflineState';
import { TimeoutState } from '../failures/TimeoutState';
import { ServerErrorState } from '../failures/ServerErrorState';
import { InvalidDataState } from '../failures/InvalidDataState';
import { ExpiredSessionState } from '../failures/ExpiredSessionState';

interface DiffEngineProps {
  snapshot: VisualTestSnapshot;
  onApproveBaseline: (id: string) => void;
  onRejectChanges: (id: string) => void;
  isDriftInjected: boolean;
  onToggleDrift: () => void;
}

export const DiffEngine: React.FC<DiffEngineProps> = ({
  snapshot,
  onApproveBaseline,
  onRejectChanges,
  isDriftInjected,
  onToggleDrift
}) => {
  const [diffMode, setDiffMode] = useState<DiffMode>('split-slider');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [onionOpacity, setOnionOpacity] = useState<number>(0.5);
  const [viewport, setViewport] = useState<ViewportMode>('desktop-1440');

  // Renders the simulated component for visual comparison
  const renderComponent = (isMutated: boolean) => {
    // If drift is injected, introduce noticeable layout/color alterations
    const mutationClasses = isMutated && isDriftInjected
      ? 'p-10 border-4 border-amber-600 bg-amber-50/20 translate-x-2'
      : '';

    switch (snapshot.id) {
      case 'snap-btn-prim':
        return (
          <div className={`p-8 bg-[var(--surface-canvas)] flex flex-wrap items-center justify-center gap-4 ${mutationClasses}`}>
            <PressButton variant="primary" size="md">
              Primary Press Run
            </PressButton>
            <PressButton variant="deboss" size="md">
              Letterpress Inset (600gsm)
            </PressButton>
            <PressButton variant="stamp" size="md" isStamped>
              PROOF APPROVED
            </PressButton>
            <PressButton variant="outline" size="md">
              Cancel Signature
            </PressButton>
          </div>
        );

      case 'snap-specimen-card':
        return (
          <div className={`p-6 max-w-xl mx-auto ${mutationClasses}`}>
            <SpecimenCard
              kicker="Colophon Specimen · 1954 Archive"
              title="Cormorant Garamond 600 Display"
              description="Typeset with 1.65 line-height and relaxed 65ch measure for effortless optical rhythm across archival paper stocks."
              metadata={[
                { label: 'Caliper', value: '18pt / 0.45mm' },
                { label: 'Weight', value: '600gsm' },
                { label: 'Stock', value: 'Mohawk Superfine' }
              ]}
              actionLabel="Inspect Glyph Matrix"
            />
          </div>
        );

      case 'snap-imposition-grid':
        return (
          <div className={`p-4 max-w-2xl mx-auto ${mutationClasses}`}>
            <ImpositionSheet pages={8} signatureName="SIG-01 · 8-PAGE FOLD PROOF" />
          </div>
        );

      case 'snap-theme-dark-litho':
        return (
          <div className={`p-6 max-w-xl mx-auto bg-[#0F1012] text-[#F5F6F7] border border-white/20 ${mutationClasses}`}>
            <div className="font-mono text-xs text-[#00A3D9] uppercase tracking-wider mb-1">
              Litho Darkroom Gamut Test
            </div>
            <h4 className="font-serif text-2xl font-semibold mb-2">High-Density UV Curing</h4>
            <p className="text-sm text-neutral-400 mb-4">
              Tested against ISO 12647-7 proofing standard under D50 5000K daylight illumination.
            </p>
            <div className="flex gap-2 text-xs font-mono">
              <span className="px-2 py-1 bg-white/10 text-white">ΔE 0.48 (Pass)</span>
              <span className="px-2 py-1 bg-[#0087B5]/20 text-[#00A3D9]">Cyan Trapping 98%</span>
            </div>
          </div>
        );

      case 'snap-fail-offline':
        return (
          <div className={mutationClasses}>
            <OfflineState />
          </div>
        );

      case 'snap-fail-timeout':
        return (
          <div className={mutationClasses}>
            <TimeoutState />
          </div>
        );

      case 'snap-fail-server':
        return (
          <div className={mutationClasses}>
            <ServerErrorState />
          </div>
        );

      case 'snap-fail-invalid':
        return (
          <div className={mutationClasses}>
            <InvalidDataState />
          </div>
        );

      case 'snap-fail-session':
        return (
          <div className={mutationClasses}>
            <ExpiredSessionState />
          </div>
        );

      default:
        return (
          <div className={`p-6 ${mutationClasses}`}>
            <div className="font-serif text-lg text-[var(--ink-primary)]">{snapshot.name}</div>
          </div>
        );
    }
  };

  const isFailed = isDriftInjected;
  const mismatchValue = isDriftInjected ? 2.45 : snapshot.mismatchPercentage;
  const deltaEValue = isDriftInjected ? 3.18 : snapshot.deltaE;

  const viewportWidthClass = {
    'desktop-1440': 'w-full max-w-4xl',
    'tablet-768': 'w-full max-w-2xl',
    'mobile-375': 'w-full max-w-sm'
  }[viewport];

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-strong)] shadow-press-sheet">
      {/* Test Runner Navigation & Controls Bar */}
      <div className="p-4 border-b border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4 bg-[var(--surface-canvas)]">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isFailed ? 'bg-[var(--color-danger)] animate-pulse' : 'bg-[var(--color-success)]'
              }`}
            />
            <h3 className="font-serif text-lg font-semibold text-[var(--ink-primary)]">
              {snapshot.name}
            </h3>
            <span className="font-mono text-xs text-[var(--ink-muted)]">
              {snapshot.component}
            </span>
          </div>
          <div className="text-xs text-[var(--ink-muted)] flex items-center gap-3 mt-1 font-mono">
            <span>BASELINE: {snapshot.baselineTimestamp}</span>
            <span>·</span>
            <span>BUILD: #{snapshot.id.toUpperCase()}</span>
            <span>·</span>
            <span className={isFailed ? 'text-[var(--color-danger)] font-bold' : 'text-[var(--color-success)]'}>
              {isFailed ? `REGRESSION: ${mismatchValue}% MISMATCH (ΔE ${deltaEValue})` : 'PASSED: 0.00% MISMATCH'}
            </span>
          </div>
        </div>

        {/* Viewport & Diff Mode Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Viewport switcher */}
          <div className="flex items-center border border-[var(--border-hairline)] bg-[var(--surface-muted)] p-0.5">
            <button
              onClick={() => setViewport('desktop-1440')}
              title="Desktop 1440px"
              className={`p-1.5 transition-colors ${
                viewport === 'desktop-1440' ? 'bg-[var(--surface-card)] shadow-xs text-[var(--ink-primary)]' : 'text-[var(--ink-muted)]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet-768')}
              title="Tablet 768px"
              className={`p-1.5 transition-colors ${
                viewport === 'tablet-768' ? 'bg-[var(--surface-card)] shadow-xs text-[var(--ink-primary)]' : 'text-[var(--ink-muted)]'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile-375')}
              title="Mobile 375px"
              className={`p-1.5 transition-colors ${
                viewport === 'mobile-375' ? 'bg-[var(--surface-card)] shadow-xs text-[var(--ink-primary)]' : 'text-[var(--ink-muted)]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Diff Mode Selector */}
          <div className="flex items-center border border-[var(--border-hairline)] bg-[var(--surface-muted)] p-0.5 text-xs font-mono">
            <button
              onClick={() => setDiffMode('split-slider')}
              className={`px-2.5 py-1 transition-colors ${
                diffMode === 'split-slider'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-semibold shadow-xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Split Curtain
            </button>
            <button
              onClick={() => setDiffMode('side-by-side')}
              className={`px-2.5 py-1 transition-colors ${
                diffMode === 'side-by-side'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-semibold shadow-xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setDiffMode('onion-skin')}
              className={`px-2.5 py-1 transition-colors ${
                diffMode === 'onion-skin'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-semibold shadow-xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Onion Skin
            </button>
            <button
              onClick={() => setDiffMode('difference-map')}
              className={`px-2.5 py-1 transition-colors ${
                diffMode === 'difference-map'
                  ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-semibold shadow-xs'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
              }`}
            >
              Pixel Diff
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Drift Injection Banner */}
      <div className="px-4 py-2.5 bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[var(--ink-secondary)]">
          <Sparkles className="w-4 h-4 text-[var(--ink-accent)]" />
          <span>
            <strong>Interactive Chromatic Simulation:</strong> Test how our regression runner detects inadvertent CSS/token regressions.
          </span>
        </div>
        <button
          onClick={onToggleDrift}
          className={`font-mono text-xs px-2.5 py-1 border transition-colors ${
            isDriftInjected
              ? 'bg-[var(--color-danger)] text-white border-[var(--color-danger)] font-semibold'
              : 'bg-[var(--surface-card)] border-[var(--border-strong)] text-[var(--ink-primary)] hover:border-[var(--ink-accent)]'
          }`}
        >
          {isDriftInjected ? 'Revert Injected Visual Bug' : 'Inject Visual Bug (+8px padding drift)'}
        </button>
      </div>

      {/* Main Diff Stage */}
      <div className="p-6 bg-[var(--surface-canvas)] flex justify-center overflow-x-auto min-h-[420px]">
        <div className={`${viewportWidthClass} transition-all`}>
          {/* MODE 1: SPLIT SLIDER */}
          {diffMode === 'split-slider' && (
            <div className="relative border border-[var(--border-strong)] bg-[var(--surface-card)] select-none overflow-hidden shadow-press-sheet">
              {/* Baseline Container (Full width underneath) */}
              <div className="w-full">{renderComponent(false)}</div>

              {/* Current Candidate (Clipped on top by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="w-full h-full bg-[var(--surface-card)]">
                  {renderComponent(true)}
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-[var(--color-danger)] shadow-lg cursor-ew-resize z-20 flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-6 h-6 bg-[var(--color-danger)] text-white rounded-full flex items-center justify-center text-[10px] font-mono shadow-md">
                  ⇄
                </div>
              </div>

              {/* Visual Labels */}
              <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-[var(--ink-primary)] text-white font-mono text-[10px] uppercase">
                Baseline (Expected)
              </div>
              <div className="absolute top-2 right-2 z-10 px-2 py-0.5 bg-[var(--color-danger)] text-white font-mono text-[10px] uppercase">
                Candidate Build (Current)
              </div>

              {/* Range Slider Track */}
              <div className="p-2 border-t border-[var(--border-hairline)] bg-[var(--surface-muted)] flex items-center gap-3">
                <span className="text-[11px] font-mono text-[var(--ink-muted)]">Sweep Curtain:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full cursor-ew-resize accent-[var(--color-danger)]"
                />
                <span className="text-[11px] font-mono text-[var(--ink-primary)] w-10 text-right">
                  {sliderPosition}%
                </span>
              </div>
            </div>
          )}

          {/* MODE 2: SIDE-BY-SIDE */}
          {diffMode === 'side-by-side' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[var(--border-strong)] bg-[var(--surface-card)]">
                <div className="p-2 bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] flex justify-between items-center text-xs font-mono">
                  <span className="font-semibold text-[var(--ink-primary)]">BASELINE SNAPSHOT</span>
                  <span className="text-[var(--ink-muted)]">1440px / D50 Gamut</span>
                </div>
                <div className="p-2">{renderComponent(false)}</div>
              </div>

              <div className={`border bg-[var(--surface-card)] ${isFailed ? 'border-[var(--color-danger)]' : 'border-[var(--border-strong)]'}`}>
                <div className="p-2 bg-[var(--surface-muted)] border-b border-[var(--border-hairline)] flex justify-between items-center text-xs font-mono">
                  <span className={isFailed ? 'font-semibold text-[var(--color-danger)]' : 'font-semibold text-[var(--ink-primary)]'}>
                    CANDIDATE SNAPSHOT {isFailed && '(MISMATCH)'}
                  </span>
                  <span className="text-[var(--ink-muted)]">{snapshot.currentTimestamp}</span>
                </div>
                <div className="p-2">{renderComponent(true)}</div>
              </div>
            </div>
          )}

          {/* MODE 3: ONION SKIN */}
          {diffMode === 'onion-skin' && (
            <div className="relative border border-[var(--border-strong)] bg-[var(--surface-card)] overflow-hidden">
              <div className="relative">
                {/* Baseline Layer */}
                <div className="w-full">{renderComponent(false)}</div>
                {/* Current Layer on top with controlled opacity */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ opacity: onionOpacity }}
                >
                  {renderComponent(true)}
                </div>
              </div>

              <div className="p-3 border-t border-[var(--border-hairline)] bg-[var(--surface-muted)] flex items-center justify-between gap-4 text-xs font-mono">
                <span>Baseline (0%)</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={onionOpacity}
                  onChange={(e) => setOnionOpacity(Number(e.target.value))}
                  className="w-full max-w-md accent-[var(--ink-accent)]"
                />
                <span>Candidate (100%) [Current: {Math.round(onionOpacity * 100)}%]</span>
              </div>
            </div>
          )}

          {/* MODE 4: DIFFERENCE MAP */}
          {diffMode === 'difference-map' && (
            <div className="relative border-2 border-[var(--color-danger)] bg-neutral-950 p-6 overflow-hidden">
              <div className="text-center font-mono text-xs text-neutral-300 mb-4 flex items-center justify-center gap-2">
                <span className="w-3 h-3 bg-[#FF007F] inline-block" />
                <span>MAGENTA PIXELS HIGHLIGHT ALTERED LAYOUT / COLOR CHANNELS</span>
                <span className="text-neutral-500">· ΔE &gt; 1.0 THRESHOLD</span>
              </div>

              {isFailed ? (
                <div className="relative border border-neutral-800 bg-neutral-900 p-8 rounded-none">
                  {/* Visual simulated diff overlay */}
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-[#FF007F] bg-[#FF007F]/20 text-white font-mono text-xs">
                      [DIFF CLUSTER 01] +8px Padding Drift Detected (+16.4px bounding box dilation)
                    </div>
                    <div className="p-4 border border-[#FF007F] bg-[#FF007F]/10 text-neutral-300 font-mono text-xs">
                      [DIFF CLUSTER 02] Background Fill Color Shift: #FFFFFF → #FEF3C7 (Amber tint)
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-800 text-right font-mono text-xs text-[#FF007F]">
                    2 REGRESSIONS DETECTED · 2.45% SURFACE MISMATCH
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center font-mono text-xs text-emerald-400 border border-emerald-800 bg-emerald-950/20">
                  ✓ ZERO PIXEL DRIFT DETECTED (0.00% DELTA). ACCREDITED CHROMATIC BASELINE MATCH.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Regression Resolution Actions */}
      <div className="p-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-muted)]">
        <div className="text-xs text-[var(--ink-secondary)] font-mono">
          NOTES: <span className="text-[var(--ink-primary)]">{snapshot.notes}</span>
        </div>

        <div className="flex items-center gap-2">
          {isFailed ? (
            <>
              <PressButton
                variant="outline"
                size="sm"
                onClick={() => onRejectChanges(snapshot.id)}
                leftIcon={<X className="w-3.5 h-3.5 text-[var(--color-danger)]" />}
              >
                Reject & Revert Drift
              </PressButton>
              <PressButton
                variant="primary"
                size="sm"
                onClick={() => onApproveBaseline(snapshot.id)}
                leftIcon={<Check className="w-3.5 h-3.5" />}
              >
                Accept as New Baseline
              </PressButton>
            </>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-success)] font-semibold">
              <Check className="w-4 h-4" />
              <span>APPROVED CHROMATIC BASELINE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
