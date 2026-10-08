import React from 'react';

interface SpecimenCardProps {
  kicker?: string;
  title: string;
  description: string;
  metadata?: Array<{ label: string; value: string }>;
  accentColor?: string;
  onClick?: () => void;
  actionLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SpecimenCard: React.FC<SpecimenCardProps> = ({
  kicker,
  title,
  description,
  metadata = [],
  onClick,
  actionLabel,
  className = '',
  children
}) => {
  return (
    <article
      onClick={onClick}
      className={`group relative bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 shadow-press-sheet hover:border-[var(--border-strong)] transition-all flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <div>
        {/* Editorial unboxed kicker */}
        {kicker && (
          <div className="text-[11px] font-mono tracking-wider uppercase text-[var(--ink-muted)] mb-1">
            {kicker}
          </div>
        )}

        {/* Primary headline with balance wrap */}
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--ink-primary)] leading-tight tracking-tight mb-2">
          {title}
        </h3>

        {/* Prose description */}
        <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-4">
          {description}
        </p>

        {children}
      </div>

      {/* Footer with Zero-Pill unboxed metadata & quiet action */}
      <div className="mt-4 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
        {metadata.length > 0 && (
          <div className="flex items-center gap-2 text-[var(--ink-muted)]">
            {metadata.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span aria-hidden="true" className="opacity-40">·</span>}
                <span>
                  <strong className="font-medium text-[var(--ink-secondary)]">{item.label}:</strong> {item.value}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}

        {actionLabel && (
          <span className="font-medium text-[var(--ink-accent)] group-hover:underline underline-offset-4 ml-auto">
            {actionLabel} →
          </span>
        )}
      </div>
    </article>
  );
};
