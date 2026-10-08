import React, { useState } from 'react';
import { Timer, AlertTriangle, ArrowRight, Layers, Sliders } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

export const TimeoutState: React.FC = () => {
  const [selectedRecovery, setSelectedRecovery] = useState<'optimized' | 'async' | 'flatten'>('optimized');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resolved, setResolved] = useState(false);

  const handleResolve = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setResolved(true);
    }, 1500);
  };

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet max-w-2xl mx-auto">
      {/* Failure Header */}
      <div className="flex items-start gap-4 pb-5 border-b border-[var(--border-hairline)]">
        <div className="p-3 bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20 shrink-0">
          <Timer className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-warning)] font-semibold">
            Failure Mode 02 · Gateway Timeout (30.0s)
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
            {resolved ? 'Raster Job Re-queued Successfully' : 'Plate Rasterization Gateway Timed Out'}
          </h3>
          <p className="text-sm text-[var(--ink-secondary)] mt-1">
            {resolved
              ? 'Job #COL-RIP-9041 dispatched to high-throughput queue with 600 DPI raster downsampling.'
              : 'The Heidelberg 2400 DPI postscript RIP worker took longer than 30 seconds to generate separation plates.'}
          </p>
        </div>
      </div>

      {/* Plate Trapping Diagnostics */}
      <div className="py-5 space-y-4">
        {!resolved ? (
          <>
            <div className="space-y-2">
              <div className="text-xs font-mono text-[var(--ink-muted)] flex justify-between">
                <span>SEPARATION STAGES:</span>
                <span>ELAPSED: 30.04s (TIMEOUT)</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between p-2 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#0087B5]" /> Cyan Separation Plate
                  </span>
                  <span className="text-[var(--color-success)] font-semibold">COMPLETED (4.2s)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[var(--surface-muted)] border border-[var(--border-hairline)]">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#D61A5E]" /> Magenta Separation Plate
                  </span>
                  <span className="text-[var(--color-success)] font-semibold">COMPLETED (6.8s)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/30">
                  <span className="flex items-center gap-2 text-[var(--color-danger)]">
                    <span className="w-2.5 h-2.5 bg-[#E5B20D]" /> Yellow Separation Plate
                  </span>
                  <span className="text-[var(--color-danger)] font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> STALLED AT 94%
                  </span>
                </div>
              </div>
            </div>

            {/* User-facing Recovery Selection */}
            <div className="border border-[var(--border-hairline)] p-4 bg-[var(--surface-canvas)] space-y-3">
              <span className="text-xs font-mono uppercase font-semibold text-[var(--ink-primary)]">
                Select Automatic Recovery Strategy:
              </span>

              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2.5 bg-[var(--surface-card)] border border-[var(--border-hairline)] cursor-pointer hover:border-[var(--border-strong)] transition-colors">
                  <input
                    type="radio"
                    name="recovery"
                    checked={selectedRecovery === 'optimized'}
                    onChange={() => setSelectedRecovery('optimized')}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[var(--ink-primary)]">
                      Downsample to 600 DPI Commercial Press Baseline (Recommended)
                    </div>
                    <div className="text-[11px] text-[var(--ink-muted)]">
                      Reduces raster payload by 72% while maintaining ISO 12647-2 commercial offset fidelity.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-2.5 bg-[var(--surface-card)] border border-[var(--border-hairline)] cursor-pointer hover:border-[var(--border-strong)] transition-colors">
                  <input
                    type="radio"
                    name="recovery"
                    checked={selectedRecovery === 'async'}
                    onChange={() => setSelectedRecovery('async')}
                    className="mt-0.5"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[var(--ink-primary)]">
                      Dispatch Heavy Asynchronous Background Worker
                    </div>
                    <div className="text-[11px] text-[var(--ink-muted)]">
                      Maintains full 2400 DPI; sends email notification when plate generation finishes (approx 3 min).
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 font-mono text-xs space-y-1 text-[var(--color-success)]">
            <div className="font-semibold">QUEUE CONFIRMATION: #RIP-JOB-8422</div>
            <div>Yellow & Black separation rasterized with 600 DPI pre-flight profile.</div>
            <div className="text-[var(--ink-muted)] pt-1">Execution completed in 2.8 seconds.</div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[var(--ink-muted)] font-mono">
          DIAGNOSTIC: <span className="text-[var(--ink-primary)]">HTTP 504 GATEWAY_TIMEOUT</span>
        </div>
        <div className="flex items-center gap-2">
          {!resolved ? (
            <PressButton
              variant="primary"
              size="sm"
              onClick={handleResolve}
              disabled={isProcessing}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {isProcessing ? 'Executing Strategy...' : 'Apply Recovery & Continue'}
            </PressButton>
          ) : (
            <PressButton variant="outline" size="sm" onClick={() => setResolved(false)}>
              Reset Timeout Simulation
            </PressButton>
          )}
        </div>
      </div>
    </div>
  );
};
