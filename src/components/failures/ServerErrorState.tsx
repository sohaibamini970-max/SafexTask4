import React, { useState } from 'react';
import { AlertOctagon, Copy, Check, Download, RefreshCw, FileText } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

export const ServerErrorState: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [recovered, setRecovered] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const incidentId = 'ERR_IMPOSITION_MATRIX_OVERFLOW_500_SIG4';

  const copyIncidentId = () => {
    navigator.clipboard?.writeText(incidentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setRecovered(true);
    }, 1200);
  };

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet max-w-2xl mx-auto">
      {/* Failure Header */}
      <div className="flex items-start gap-4 pb-5 border-b border-[var(--border-hairline)]">
        <div className="p-3 bg-[var(--color-danger)]/10 text-[var(--color-danger)] border border-[var(--color-danger)]/20 shrink-0">
          <AlertOctagon className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-danger)] font-semibold">
            Failure Mode 03 · Internal Server Error (500)
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
            {recovered ? 'Imposition Engine Fallback Activated' : 'Sheet Folding Calculation Failure'}
          </h3>
          <p className="text-sm text-[var(--ink-secondary)] mt-1">
            {recovered
              ? 'Switched to human workshop routing: Senior pressman will hand-verify sheet creep & trim margins.'
              : 'The automated imposition engine encountered an unhandled boundary exception while calculating page creep on 450gsm board stock.'}
          </p>
        </div>
      </div>

      {/* Incident Details & Trace */}
      <div className="py-5 space-y-4">
        {!recovered ? (
          <>
            <div className="bg-[var(--surface-muted)] p-4 border border-[var(--border-hairline)] font-mono text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[var(--ink-muted)]">INCIDENT REFERENCE:</span>
                <button
                  onClick={copyIncidentId}
                  className="flex items-center gap-1.5 text-[var(--ink-primary)] hover:text-[var(--ink-accent)] font-semibold"
                >
                  {incidentId}
                  {copied ? <Check className="w-3.5 h-3.5 text-[var(--color-success)]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-2">
                <span className="text-[var(--ink-muted)]">STACK TRACE POINT:</span>
                <span className="text-[var(--color-danger)]">calculateCreep(pages=32, caliper=0.48mm)</span>
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-2">
                <span className="text-[var(--ink-muted)]">SAFEGUARD STATUS:</span>
                <span className="text-[var(--color-success)] font-semibold">ZERO JOB DATA CORRUPTED</span>
              </div>
            </div>

            {/* User guidance callout */}
            <div className="p-4 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-xs text-[var(--ink-secondary)] space-y-2">
              <div className="font-semibold text-[var(--ink-primary)]">What happens next?</div>
              <p>
                Our server telemetry has already logged this exception to the engineering bindery queue. You can download your current raw job ticket specs below or request manual imposition verification.
              </p>
            </div>
          </>
        ) : (
          <div className="p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 font-mono text-xs space-y-1 text-[var(--color-success)]">
            <div className="font-semibold">ROUTED TO MANUAL PRE-PRESS WORKBENCH</div>
            <div>Ticket assigned to Master Lithographer: Markus V. (Station 02)</div>
            <div className="text-[var(--ink-muted)] pt-1">Estimated turn-around: 15 minutes.</div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
        <PressButton
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-3.5 h-3.5" />}
          onClick={() => {
            const data = JSON.stringify({ job: 'COL-8492', paper: 'Somerset 450gsm', err: incidentId }, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'colophon-press-ticket-backup.json';
            a.click();
          }}
        >
          Download Job Backup (JSON)
        </PressButton>

        <div className="flex items-center gap-2">
          {!recovered ? (
            <PressButton
              variant="primary"
              size="sm"
              onClick={handleRetry}
              disabled={isRetrying}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />}
            >
              {isRetrying ? 'Switching Imposition Engine...' : 'Route to Manual Imposition'}
            </PressButton>
          ) : (
            <PressButton variant="outline" size="sm" onClick={() => setRecovered(false)}>
              Reset 500 Simulation
            </PressButton>
          )}
        </div>
      </div>
    </div>
  );
};
