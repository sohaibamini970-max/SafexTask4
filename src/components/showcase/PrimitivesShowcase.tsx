import React from 'react';
import { Stack } from '../primitives/Stack';
import { Cluster } from '../primitives/Cluster';
import { SidebarLayout } from '../primitives/SidebarLayout';
import { GridFrame } from '../primitives/GridFrame';
import { ImpositionSheet } from '../primitives/ImpositionSheet';
import { SpecimenCard } from '../primitives/SpecimenCard';
import { PressButton } from '../primitives/PressButton';

export const PrimitivesShowcase: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="border-b border-[var(--border-hairline)] pb-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[var(--ink-accent)] font-semibold mb-2">
          Responsive Primitives Catalog
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--ink-primary)] tracking-tight">
          Layout Primitives Architecture
        </h2>
        <p className="text-base text-[var(--ink-secondary)] mt-2 max-w-3xl leading-relaxed">
          Composable layout primitives built on print mathematics: Fixed pica gutters, asymmetric sidebar relations, and folding sheet imposition grids that respond fluidly from mobile (375px) to wide workstation displays (1440px).
        </p>
      </div>

      {/* 1. IMPOSITION SHEET PRIMITIVE */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-[var(--border-hairline)] pb-2">
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)]">
            1. &lt;ImpositionSheet /&gt;
          </h3>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            PRINT SIGNATURE PRIMITIVE · 8-UP &amp; 16-UP
          </span>
        </div>
        <p className="text-sm text-[var(--ink-secondary)]">
          Visualizes folding signatures, creep calibration, bleed boundaries (3.0mm standard), and ISO color density control strips.
        </p>
        <ImpositionSheet signatureName="SIG-08-BROADSIDE / FOLIO EDITION" pages={8} />
      </section>

      {/* 2. SPECIMEN CARD (ZERO-PILL) */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-[var(--border-hairline)] pb-2">
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)]">
            2. &lt;SpecimenCard /&gt; (Zero-Pill Architecture)
          </h3>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            SINGLE ELEVATION · BALANCED HEADLINES
          </span>
        </div>
        <GridFrame columns={3} gap="en">
          <SpecimenCard
            kicker="Mohawk Superfine · 350gsm"
            title="Archival Monotype Broadsheets"
            description="Printed on 100% post-consumer cotton with custom linseed oil black ink for extreme archival permanence."
            metadata={[
              { label: 'Caliper', value: '16.5pt' },
              { label: 'Finish', value: 'Eggshell' }
            ]}
            actionLabel="Order Run"
          />
          <SpecimenCard
            kicker="Crane's Lettra · 600gsm"
            title="Heavy Letterpress Invitations"
            description="Deep tactile platen impression with blind debossed borders and hand-gilded 24k gold leaf edges."
            metadata={[
              { label: 'Caliper', value: '32pt' },
              { label: 'Stock', value: 'Flax Pulp' }
            ]}
            actionLabel="View Proof"
          />
          <SpecimenCard
            kicker="Somerset Velvet · 400gsm"
            title="Lithographic Art Portfolio"
            description="Four-color Euroscale separation plates calibrated under D50 illumination for museum gallery exhibition."
            metadata={[
              { label: 'Caliper', value: '20pt' },
              { label: 'Gamut', value: 'FOGRA39' }
            ]}
            actionLabel="Inspect Plates"
          />
        </GridFrame>
      </section>

      {/* 3. SIDEBAR LAYOUT (ASYMMETRIC 70/30) */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-[var(--border-hairline)] pb-2">
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)]">
            3. &lt;SidebarLayout /&gt; (Asymmetric Press Rail)
          </h3>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            RESPONSIVE DESKTOP-TO-MOBILE COLLAPSE
          </span>
        </div>

        <SidebarLayout
          sidebarWidth="default"
          sidebar={
            <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-5 shadow-press-sheet space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
                Press Operator Rail
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1.5">
                  <span className="text-[var(--ink-muted)]">ACTIVE PLATEN:</span>
                  <span className="font-semibold text-[var(--ink-primary)]">Heidelberg T 10x15</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1.5">
                  <span className="text-[var(--ink-muted)]">INK TACK:</span>
                  <span className="font-semibold text-[var(--ink-primary)]">12.4 Units</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-hairline)] pb-1.5">
                  <span className="text-[var(--ink-muted)]">IMPRESSION PRESSURE:</span>
                  <span className="font-semibold text-[var(--ink-primary)]">4.8 Metric Tons</span>
                </div>
              </div>
              <PressButton variant="outline" size="sm" className="w-full">
                Calibrate Platen
              </PressButton>
            </div>
          }
        >
          <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 shadow-press-sheet space-y-4">
            <h4 className="font-serif text-xl font-semibold text-[var(--ink-primary)]">
              Main Press Imprint Canvas
            </h4>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed">
              The SidebarLayout enforces optimal desktop reading measure: 65–75 characters per line on the main reading column while pinning critical technical controls in an adjacent auxiliary panel. On mobile viewports (&lt;1024px), it gracefully stacks the sidebar above or beneath without horizontal overflow.
            </p>
            <div className="flex gap-2">
              <PressButton variant="primary" size="sm">
                Commit Plate Spec
              </PressButton>
              <PressButton variant="deboss" size="sm">
                Review Proof Sheet
              </PressButton>
            </div>
          </div>
        </SidebarLayout>
      </section>

      {/* 4. STACK & CLUSTER */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline border-b border-[var(--border-hairline)] pb-2">
          <h3 className="font-serif text-2xl font-semibold text-[var(--ink-primary)]">
            4. &lt;Stack /&gt; and &lt;Cluster /&gt;
          </h3>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            MICRO-SPATIAL ORCHESTRATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stack */}
          <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-5 shadow-press-sheet">
            <div className="font-mono text-xs text-[var(--ink-muted)] mb-3 uppercase">
              Stack (Divider = true, Gap = 'en')
            </div>
            <Stack gap="en" divider>
              <div className="py-2 text-xs font-mono text-[var(--ink-primary)]">
                Row 1: Lead Type Composition (12pt Caslon)
              </div>
              <div className="py-2 text-xs font-mono text-[var(--ink-primary)]">
                Row 2: Hand Inking with Leather Brayer
              </div>
              <div className="py-2 text-xs font-mono text-[var(--ink-primary)]">
                Row 3: Tympan & Frisket Alignment Check
              </div>
            </Stack>
          </div>

          {/* Cluster */}
          <div className="bg-[var(--surface-card)] border border-[var(--border-hairline)] p-5 shadow-press-sheet">
            <div className="font-mono text-xs text-[var(--ink-muted)] mb-3 uppercase">
              Cluster (Zero-Pill Metadata Controls)
            </div>
            <Cluster gap="thin" wrap>
              <span className="text-xs text-[var(--ink-secondary)]">Stock: Mohawk Superfine</span>
              <span className="text-[var(--ink-muted)]">/</span>
              <span className="text-xs text-[var(--ink-secondary)]">Run: 1,500 Sheets</span>
              <span className="text-[var(--ink-muted)]">/</span>
              <span className="text-xs text-[var(--ink-secondary)]">Binding: Smythe Sewn</span>
              <span className="text-[var(--ink-muted)]">/</span>
              <span className="text-xs text-[var(--ink-secondary)]">Foil: Matte Gold #204</span>
            </Cluster>
            <div className="mt-6 pt-4 border-t border-[var(--border-hairline)]">
              <Cluster gap="en">
                <PressButton variant="primary" size="sm">
                  Approve Order
                </PressButton>
                <PressButton variant="deboss" size="sm">
                  Simulate Impression
                </PressButton>
                <PressButton variant="outline" size="sm">
                  Export PDF
                </PressButton>
              </Cluster>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
