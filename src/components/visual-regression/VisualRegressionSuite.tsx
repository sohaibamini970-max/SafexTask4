import React, { useState } from 'react';
import { VisualTestSnapshot } from '../../types/regression';
import { INITIAL_TEST_SNAPSHOTS } from './regressionSuites';
import { DiffEngine } from './DiffEngine';
import { Play, CheckCircle2, AlertTriangle, ShieldCheck, Download, RefreshCw, Filter } from 'lucide-react';
import { PressButton } from '../primitives/PressButton';

interface VisualRegressionSuiteProps {
  onRunGlobalTests?: () => void;
}

export const VisualRegressionSuite: React.FC<VisualRegressionSuiteProps> = () => {
  const [snapshots, setSnapshots] = useState<VisualTestSnapshot[]>(INITIAL_TEST_SNAPSHOTS);
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string>(INITIAL_TEST_SNAPSHOTS[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [runProgress, setRunProgress] = useState(0);
  const [isDriftInjected, setIsDriftInjected] = useState(false);

  const selectedSnapshot = snapshots.find((s) => s.id === selectedSnapshotId) || snapshots[0];

  const handleRunAll = () => {
    setIsRunningAll(true);
    setRunProgress(0);

    const interval = setInterval(() => {
      setRunProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningAll(false);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleToggleDrift = () => {
    setIsDriftInjected((prev) => !prev);
  };

  const handleApproveBaseline = (id: string) => {
    setIsDriftInjected(false);
    setSnapshots((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: 'passed',
              mismatchPercentage: 0.0,
              currentTimestamp: new Date().toLocaleTimeString(),
              notes: 'Approved as accredited design baseline.'
            }
          : s
      )
    );
  };

  const handleRejectChanges = (id: string) => {
    setIsDriftInjected(false);
  };

  const filteredSnapshots = snapshots.filter((s) => {
    if (categoryFilter === 'all') return true;
    return s.category === categoryFilter;
  });

  const passedCount = isDriftInjected ? snapshots.length - 1 : snapshots.length;
  const failedCount = isDriftInjected ? 1 : 0;

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-accent)] font-semibold mb-2">
          Week 4 Primary Tooling & Deliverable
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tracking-tight">
              Chromatic Visual Regression Suite
            </h2>
            <p className="text-base text-[var(--ink-secondary)] mt-2 max-w-3xl leading-relaxed">
              Every design token mutation, responsive layout wrap, and failure state boundary is protected against unapproved visual drift across four themes and three viewport widths.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <PressButton
              variant="outline"
              size="sm"
              onClick={() => {
                const report = {
                  suite: 'Colophon Press Visual Regression',
                  timestamp: new Date().toISOString(),
                  totalTests: snapshots.length,
                  passed: passedCount,
                  failed: failedCount,
                  snapshots: snapshots.map((s) => ({
                    id: s.id,
                    name: s.name,
                    component: s.component,
                    mismatch: isDriftInjected && s.id === selectedSnapshot.id ? 2.45 : s.mismatchPercentage,
                    status: isDriftInjected && s.id === selectedSnapshot.id ? 'FAILED' : 'PASSED'
                  }))
                };
                const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `chromatic-test-report-${Date.now()}.json`;
                a.click();
              }}
              leftIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export Test Report (JSON)
            </PressButton>

            <PressButton
              variant="primary"
              size="md"
              onClick={handleRunAll}
              disabled={isRunningAll}
              leftIcon={<Play className={`w-3.5 h-3.5 ${isRunningAll ? 'animate-spin' : ''}`} />}
            >
              {isRunningAll ? `Running Suite (${runProgress}%)...` : 'Run All 9 Visual Tests'}
            </PressButton>
          </div>
        </div>

        {/* Test Progress Bar */}
        {isRunningAll && (
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-xs font-mono text-[var(--ink-muted)]">
              <span>CAPTURING HEADLESS DOM CHROMATIC BUILDS...</span>
              <span>{runProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-[var(--surface-muted)] overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)] transition-all duration-300"
                style={{ width: `${runProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Telemetry Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="p-3 bg-[var(--surface-card)] border border-[var(--border-hairline)]">
            <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)]">Total Snapshots</div>
            <div className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
              {snapshots.length}
            </div>
          </div>
          <div className="p-3 bg-[var(--surface-card)] border border-[var(--border-hairline)]">
            <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)]">Accredited Passed</div>
            <div className="font-serif text-2xl font-semibold text-[var(--color-success)] mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" /> {passedCount}
            </div>
          </div>
          <div className="p-3 bg-[var(--surface-card)] border border-[var(--border-hairline)]">
            <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)]">Visual Drift Flags</div>
            <div className={`font-serif text-2xl font-semibold mt-1 flex items-center gap-1.5 ${failedCount > 0 ? 'text-[var(--color-danger)]' : 'text-[var(--ink-muted)]'}`}>
              <AlertTriangle className="w-5 h-5" /> {failedCount}
            </div>
          </div>
          <div className="p-3 bg-[var(--surface-card)] border border-[var(--border-hairline)]">
            <div className="text-[10px] font-mono uppercase text-[var(--ink-muted)]">Tolerance Threshold</div>
            <div className="font-serif text-2xl font-semibold text-[var(--ink-primary)] mt-1">
              ΔE &lt; 0.10
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Test List & Active Diff Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Snapshot Inventory */}
        <div className="lg:col-span-4 space-y-3">
          {/* Filter Bar */}
          <div className="flex items-center justify-between p-2 bg-[var(--surface-muted)] border border-[var(--border-hairline)] text-xs font-mono">
            <span className="flex items-center gap-1 text-[var(--ink-muted)]">
              <Filter className="w-3.5 h-3.5" /> SUITE:
            </span>
            <div className="flex gap-1">
              {['all', 'primitives', 'components', 'failures'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 uppercase text-[10px] transition-colors ${
                    categoryFilter === cat
                      ? 'bg-[var(--surface-card)] text-[var(--ink-primary)] font-semibold shadow-xs'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Snapshot Cards List */}
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredSnapshots.map((snap) => {
              const isSelected = snap.id === selectedSnapshotId;
              const hasDrift = isDriftInjected && snap.id === selectedSnapshotId;

              return (
                <div
                  key={snap.id}
                  onClick={() => setSelectedSnapshotId(snap.id)}
                  className={`p-3.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--surface-card)] border-[var(--ink-accent)] shadow-sm'
                      : 'bg-[var(--surface-card)]/60 border-[var(--border-hairline)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif text-sm font-semibold text-[var(--ink-primary)] line-clamp-1">
                      {snap.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 uppercase ${
                        hasDrift
                          ? 'bg-[var(--color-danger)]/15 text-[var(--color-danger)] font-bold'
                          : 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                      }`}
                    >
                      {hasDrift ? 'DRIFT 2.4%' : 'PASSED'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--ink-muted)] font-mono mt-1">
                    <span>{snap.component}</span>
                    <span>·</span>
                    <span className="capitalize">{snap.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Diff Engine */}
        <div className="lg:col-span-8">
          <DiffEngine
            snapshot={selectedSnapshot}
            onApproveBaseline={handleApproveBaseline}
            onRejectChanges={handleRejectChanges}
            isDriftInjected={isDriftInjected}
            onToggleDrift={handleToggleDrift}
          />
        </div>
      </div>
    </div>
  );
};
