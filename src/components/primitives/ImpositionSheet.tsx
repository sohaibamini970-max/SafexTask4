import React from 'react';

interface ImpositionSheetProps {
  signatureName?: string;
  sheetSize?: string;
  pages?: number;
  scale?: 'compact' | 'normal';
  showRegistration?: boolean;
  className?: string;
}

export const ImpositionSheet: React.FC<ImpositionSheetProps> = ({
  signatureName = 'SIG-04-A / 16-PAGE WORK & TURN',
  sheetSize = '25 × 38 in (635 × 965 mm)',
  pages = 8,
  scale = 'normal',
  showRegistration = true,
  className = ''
}) => {
  const pageNumbers = [1, 16, 13, 4, 8, 9, 12, 5];

  return (
    <div
      className={`relative bg-[var(--surface-card)] border border-[var(--border-strong)] p-4 sm:p-6 shadow-press-sheet transition-all ${
        scale === 'compact' ? 'text-xs' : 'text-sm'
      } ${className}`}
    >
      {/* Registration Crosshairs in Corners */}
      {showRegistration && (
        <>
          <div className="absolute top-2 left-2 flex items-center gap-1 font-mono text-[9px] text-[var(--ink-muted)]">
            <span className="w-3 h-3 border border-current rounded-full flex items-center justify-center">
              <span className="w-1.5 h-[1px] bg-current" />
            </span>
            <span>REG: 0.05pt</span>
          </div>
          <div className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] text-[var(--ink-muted)]">
            <span>CMYK DENSITY: 1.85</span>
            <span className="w-3 h-3 border border-current rounded-full flex items-center justify-center">
              <span className="w-[1px] h-1.5 bg-current" />
            </span>
          </div>
        </>
      )}

      {/* Sheet Header Metadata */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--border-hairline)] pb-3 mb-4 mt-2">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--ink-muted)] font-mono">
            IMPOSITION SIGNATURE
          </span>
          <h4 className="font-serif font-semibold text-base text-[var(--ink-primary)]">
            {signatureName}
          </h4>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--ink-muted)] font-mono">
          <span>{sheetSize}</span>
          <span>·</span>
          <span>3.0mm BLEED SAFE</span>
        </div>
      </div>

      {/* Imposed Grid representation */}
      <div className="relative border-2 border-dashed border-[var(--press-bleed)] p-2 bg-[var(--surface-muted)]/50">
        <div className="grid grid-cols-4 gap-2">
          {pageNumbers.slice(0, pages).map((page, idx) => (
            <div
              key={idx}
              className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-3 min-h-[90px] flex flex-col justify-between shadow-press-deboss hover:border-[var(--border-focus)] transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start text-[10px] text-[var(--ink-muted)] font-mono">
                <span>P.{page.toString().padStart(2, '0')}</span>
                <span className="text-[9px] opacity-60">F-{idx % 2 === 0 ? 'RECTO' : 'VERSO'}</span>
              </div>
              <div className="text-center py-2">
                <span className="text-[11px] font-serif text-[var(--ink-secondary)] group-hover:text-[var(--ink-primary)]">
                  Folio {page}
                </span>
                <div className="w-6 h-[1px] bg-[var(--border-hairline)] mx-auto mt-1" />
              </div>
              <div className="flex justify-between items-end text-[9px] font-mono text-[var(--ink-muted)]">
                <span className="text-[8px]">HEAD-UP</span>
                <span className="text-[8px] text-[var(--ink-accent)]">TRIM 0.0</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fold & Cut Guideline Overlay */}
        <div className="absolute inset-y-0 left-1/2 w-[1px] border-r border-dotted border-[var(--color-danger)] pointer-events-none opacity-50" />
        <div className="absolute inset-x-0 top-1/2 h-[1px] border-b border-dotted border-[var(--color-danger)] pointer-events-none opacity-50" />
      </div>

      {/* CMYK Calibration Strip Footer */}
      <div className="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <span className="text-[9px] uppercase font-mono text-[var(--ink-muted)] mr-2">Color Bar:</span>
          <div className="w-5 h-3 bg-[#0087B5]" title="Cyan 100%" />
          <div className="w-5 h-3 bg-[#D61A5E]" title="Magenta 100%" />
          <div className="w-5 h-3 bg-[#E5B20D]" title="Yellow 100%" />
          <div className="w-5 h-3 bg-[#141413]" title="Key / Black 100%" />
          <div className="w-5 h-3 bg-[#B8321B]" title="Spot Vermilion" />
          <div className="w-5 h-3 bg-[#966324]" title="Spot Ochre" />
        </div>
        <div className="text-[10px] font-mono text-[var(--ink-muted)]">
          GRACoL 2013 / ISO 12647-2 CERTIFIED
        </div>
      </div>
    </div>
  );
};
