import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, KeyRound, ArrowRight } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

export const ExpiredSessionState: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.length < 4) {
      setErrorMsg('Please enter your 4-digit pressman operator PIN (try 1954).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsUnlocked(true);
    }, 800);
  };

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-strong)] p-6 sm:p-8 shadow-press-sheet max-w-2xl mx-auto">
      {/* Failure Header */}
      <div className="flex items-start gap-4 pb-5 border-b border-[var(--border-hairline)]">
        <div
          className={`p-3 border shrink-0 ${
            isUnlocked
              ? 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/30'
              : 'bg-[var(--ink-primary)] text-[var(--surface-card)] border-[var(--border-strong)]'
          }`}
        >
          {isUnlocked ? <Unlock className="w-6 h-6 text-[var(--color-success)]" /> : <Lock className="w-6 h-6" />}
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--ink-muted)] font-semibold">
            Failure Mode 05 · Session Timeout (401 / CSRF)
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
            {isUnlocked ? 'Operator Session Re-Authenticated' : 'Pressman Session Locked (Idle Timeout)'}
          </h3>
          <p className="text-sm text-[var(--ink-secondary)] mt-1">
            {isUnlocked
              ? 'Cryptographic handshake verified. Form state restored and pending order submitted to press queue.'
              : 'For security, your operator session paused after 45 minutes of inactivity. All configured job parameters remain protected in memory.'}
          </p>
        </div>
      </div>

      {/* State Preservation Guarantee */}
      <div className="py-5 space-y-4">
        <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border-hairline)] space-y-2 text-xs">
          <div className="flex items-center justify-between font-mono">
            <span className="font-semibold text-[var(--ink-primary)] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--color-success)]" /> State Preservation Active:
            </span>
            <span className="text-[var(--color-success)] font-semibold">0% DATA LOSS</span>
          </div>
          <div className="text-[var(--ink-secondary)] text-[12px] leading-relaxed">
            Your current draft specs (Stock: <em>Mohawk 600gsm Alabaster</em>, Run: <em>2,500 copies</em>, Foil: <em>Matte Satin Gold #402</em>, 3 spot inks) are safely frozen in browser memory.
          </div>
        </div>

        {/* Quick Re-Auth In-Place Dialog */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-3 p-4 bg-[var(--surface-canvas)] border border-[var(--border-hairline)]">
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full space-y-1">
                <label className="text-xs font-mono font-semibold text-[var(--ink-primary)] flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[var(--ink-muted)]" /> Operator PIN or Password:
                </label>
                <input
                  type="password"
                  placeholder="Enter 4-digit PIN (e.g. 1954)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full text-sm bg-[var(--surface-card)] border border-[var(--border-strong)] px-3 py-2 font-mono text-[var(--ink-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                />
              </div>
              <PressButton
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {isSubmitting ? 'Verifying...' : 'Unlock & Submit Ticket'}
              </PressButton>
            </div>
            {errorMsg && <div className="text-xs text-[var(--color-danger)] font-mono">{errorMsg}</div>}
            <div className="text-[11px] text-[var(--ink-muted)] flex items-center gap-1">
              <span>Demo tip: Enter PIN</span>
              <button
                type="button"
                onClick={() => setPasscode('1954')}
                className="font-mono text-[var(--ink-accent)] underline"
              >
                1954
              </button>
              <span>to unlock immediately without full page reload.</span>
            </div>
          </form>
        ) : (
          <div className="p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 font-mono text-xs text-[var(--color-success)] space-y-1">
            <div className="font-semibold">SESSION RENEWED: JWT TOKEN ROTATED</div>
            <div>Order #COL-8492-LETTRA submitted to Heidelberg Letterpress platen #1.</div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-[var(--ink-muted)] font-mono">
          STATUS: <span className="text-[var(--ink-primary)]">{isUnlocked ? 'AUTHENTICATED' : '401_SESSION_EXPIRED'}</span>
        </div>
        {isUnlocked && (
          <PressButton
            variant="outline"
            size="sm"
            onClick={() => {
              setIsUnlocked(false);
              setPasscode('');
            }}
          >
            Simulate Session Timeout Again
          </PressButton>
        )}
      </div>
    </div>
  );
};
