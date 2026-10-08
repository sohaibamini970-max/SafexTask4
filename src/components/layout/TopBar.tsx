import React from 'react';
import { THEMES } from '../../tokens/themes';

interface TopBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  onRunAllTests: () => void;
  failedCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onTabChange,
  currentThemeId,
  onThemeChange,
  onRunAllTests,
  failedCount = 0
}) => {
  const navLinks = [
    { id: 'tokens', label: 'Design Tokens' },
    { id: 'primitives', label: 'Layout Primitives' },
    { id: 'theming', label: 'Theming Engine' },
    { id: 'regression', label: 'Visual Tests' },
    { id: 'failures', label: 'Failure Cases' },
    { id: 'ticket', label: 'Press Order' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--surface-canvas)]/90 backdrop-blur-md border-b border-[var(--border-hairline)] px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onTabChange('tokens');
          }}
          className="font-serif text-2xl font-bold tracking-tight text-[var(--ink-primary)] hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          Colophon Press
        </a>

        {/* Zone 2: 4-6 clean text navigation links (single line, zero pills) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
                  isActive
                    ? 'text-[var(--ink-primary)] border-[var(--ink-accent)] font-semibold'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink-primary)] border-transparent'
                }`}
              >
                {link.label}
                {link.id === 'failures' && (
                  <span className="ml-1 text-[11px] font-mono opacity-80">(5 Rules)</span>
                )}
                {link.id === 'regression' && failedCount > 0 && (
                  <span className="ml-1 text-[11px] font-mono text-[var(--color-danger)] font-bold">
                    ({failedCount} diff)
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Live Theme Quick Selector */}
          <select
            value={currentThemeId}
            aria-label="Select Theme"
            onChange={(e) => onThemeChange(e.target.value)}
            className="text-xs bg-[var(--surface-muted)] text-[var(--ink-primary)] border border-[var(--border-hairline)] py-1.5 px-2.5 rounded-none font-mono focus:outline-none focus:border-[var(--border-focus)] transition-colors cursor-pointer"
          >
            {Object.values(THEMES).map((th) => (
              <option key={th.id} value={th.id}>
                {th.name}
              </option>
            ))}
          </select>

          {/* Primary Action Button */}
          <button
            onClick={onRunAllTests}
            className="text-xs font-semibold py-1.5 px-3.5 bg-[var(--color-primary)] text-[var(--color-primary-fg)] hover:opacity-90 active:translate-y-px transition-all whitespace-nowrap"
          >
            Run Visual Suite
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-[var(--border-hairline)] mt-2">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => onTabChange(link.id)}
            className={`text-xs px-2.5 py-1 whitespace-nowrap border-b-2 font-medium ${
              activeTab === link.id
                ? 'text-[var(--ink-primary)] border-[var(--ink-accent)]'
                : 'text-[var(--ink-muted)] border-transparent'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
};
