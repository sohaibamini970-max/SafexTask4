import React, { useState } from 'react';
import { WifiOff, Timer, AlertOctagon, FileWarning, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { FailureType } from '../../types/failures';
import { OfflineState } from './OfflineState';
import { TimeoutState } from './TimeoutState';
import { ServerErrorState } from './ServerErrorState';
import { InvalidDataState } from './InvalidDataState';
import { ExpiredSessionState } from './ExpiredSessionState';

export const FailureMatrix: React.FC = () => {
  const [activeFailure, setActiveFailure] = useState<FailureType>('offline');

  const failureTabs = [
    {
      id: 'offline' as FailureType,
      label: '1. Offline Network',
      icon: <WifiOff className="w-3.5 h-3.5" />,
      rule: 'Local cache persistence & auto-reconnect backoff'
    },
    {
      id: 'timeout' as FailureType,
      label: '2. Gateway Timeout',
      icon: <Timer className="w-3.5 h-3.5" />,
      rule: '30s RIP limit with 600 DPI fallback strategy'
    },
    {
      id: 'server-error' as FailureType,
      label: '3. 500 Server Error',
      icon: <AlertOctagon className="w-3.5 h-3.5" />,
      rule: 'Incident trace + manual pressman handoff'
    },
    {
      id: 'invalid-data' as FailureType,
      label: '4. Invalid Pre-Flight',
      icon: <FileWarning className="w-3.5 h-3.5" />,
      rule: 'Field-level bleed/CMYK diagnostics & auto-cure'
    },
    {
      id: 'expired-session' as FailureType,
      label: '5. Expired Session',
      icon: <Lock className="w-3.5 h-3.5" />,
      rule: 'Non-destructive modal lock preserving form state'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-accent)] font-semibold mb-2">
          Special Constraint · Error-Handling Architecture
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tracking-tight">
          Failure Case Resilience Suite
        </h2>
        <p className="text-base text-[var(--ink-secondary)] mt-2 max-w-3xl leading-relaxed">
          In high-volume commercial printing, machine downtime and corrupted plate files cost thousands of dollars per hour. This design system enforces strictly defined, non-destructive user-facing behaviors for all 5 failure archetypes.
        </p>

        {/* Resilience Ledger Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {failureTabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveFailure(tab.id)}
              className={`p-3 border text-left cursor-pointer transition-all ${
                activeFailure === tab.id
                  ? 'bg-[var(--surface-card)] border-[var(--ink-accent)] shadow-sm'
                  : 'bg-[var(--surface-muted)]/50 border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--ink-primary)]">
                <span className={activeFailure === tab.id ? 'text-[var(--ink-accent)]' : 'text-[var(--ink-muted)]'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </div>
              <div className="text-[11px] text-[var(--ink-muted)] mt-1 line-clamp-2 leading-tight">
                {tab.rule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Failure Playground */}
      <div className="relative">
        <div className="mb-4 flex items-center justify-between text-xs text-[var(--ink-muted)] font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[var(--color-success)]" />
            PROTECTED BY CHROMATIC VISUAL SNAPSHOT REGRESSION TEST
          </span>
          <span>LIVE INTERACTIVE SIMULATION</span>
        </div>

        {activeFailure === 'offline' && <OfflineState />}
        {activeFailure === 'timeout' && <TimeoutState />}
        {activeFailure === 'server-error' && <ServerErrorState />}
        {activeFailure === 'invalid-data' && <InvalidDataState />}
        {activeFailure === 'expired-session' && <ExpiredSessionState />}
      </div>
    </div>
  );
};
