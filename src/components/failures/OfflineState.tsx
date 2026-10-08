import React, { useState } from 'react';
import { WifiOff, RefreshCw, HardDrive, CheckCircle2, Clock } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

interface OfflineStateProps {
  onSimulateReconnect?: () => void;
}

export const OfflineState: React.FC<OfflineStateProps> = ({ onSimulateReconnect }) => {
  const [retrying, setRetrying] = useState(false);
  const [isReconnected, setIsReconnected] = useState(false);
  const [localDraftSaved, setLocalDraftSaved] = useState(true);

  const handleManualRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setIsReconnected(true);
      if (onSimulateReconnect) onSimulateReconnect();
    }, 1200);
  };

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet max-w-2xl mx-auto">
      {/* Failure Header */}
      <div className="flex items-start gap-4 pb-5 border-b border-[var(--border-hairline)]">
        <div className="p-3 bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20 shrink-0">
          <WifiOff className="w-6 h-6" />
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--color-warning)] font-semibold">
            Failure Mode 01 · Connection Severed
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
            {isReconnected ? 'Press Link Restored' : 'Workshop Uplink Offline'}
          </h3>
          <p className="text-sm text-[var(--ink-secondary)] mt-1">
            {isReconnected
              ? 'Synchronized 3 queued print orders with central imposition server.'
              : 'Unable to reach the plate imposition cluster. Your press job ticket is preserved in local browser storage.'}
          </p>
        </div>
      </div>

      {/* User-facing Local Queue Ledger */}
      <div className="py-5 space-y-4">
        <div className="bg-[var(--surface-muted)] p-4 border border-[var(--border-hairline)] font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[var(--ink-primary)]">
            <span className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[var(--ink-accent)]" />
              Local Press Cache Status:
            </span>
            <span className="text-[var(--color-success)] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% PERSISTED
            </span>
          </div>
          <div className="text-[var(--ink-muted)] border-t border-[var(--border-hairline)] pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Job Ticket:</span>
              <span className="text-[var(--ink-secondary)] font-semibold">#COL-8492-LETTRA (600gsm Cotton)</span>
            </div>
            <div className="flex justify-between">
              <span>Separation Plates:</span>
              <span className="text-[var(--ink-secondary)]">4 Plates Stored (184 MB in Cache)</span>
            </div>
            <div className="flex justify-between">
              <span>Last Offline Sync:</span>
              <span className="text-[var(--ink-secondary)]">Today, 05:42:18 PST</span>
            </div>
          </div>
        </div>

        {/* Ambient Recovery Notice */}
        {!isReconnected ? (
          <div className="flex items-center justify-between p-3.5 bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-xs text-[var(--ink-secondary)]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--ink-muted)] animate-pulse" />
              <span>Automatic reconnect polling active (attempting every 15s)</span>
            </div>
            <span className="font-mono text-[var(--ink-muted)]">Attempt 3/10</span>
          </div>
        ) : (
          <div className="p-3.5 bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 text-xs text-[var(--color-success)] font-mono">
            SUCCESS: Background synchronization completed with zero data loss.
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[var(--ink-muted)] font-mono">
          STATUS CODE: <span className="text-[var(--ink-primary)]">ERR_NET_DISCONNECTED</span>
        </div>
        <div className="flex items-center gap-2">
          {!isReconnected ? (
            <PressButton
              variant="primary"
              size="sm"
              onClick={handleManualRetry}
              disabled={retrying}
              leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />}
            >
              {retrying ? 'Pinging Press Engine...' : 'Retry Connection Now'}
            </PressButton>
          ) : (
            <PressButton
              variant="outline"
              size="sm"
              onClick={() => setIsReconnected(false)}
            >
              Simulate Network Drop Again
            </PressButton>
          )}
        </div>
      </div>
    </div>
  );
};
