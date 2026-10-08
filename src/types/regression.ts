export type DiffMode = 'split-slider' | 'side-by-side' | 'onion-skin' | 'difference-map';

export type ViewportMode = 'desktop-1440' | 'tablet-768' | 'mobile-375';

export interface VisualTestSnapshot {
  id: string;
  name: string;
  component: string;
  category: 'primitives' | 'components' | 'themes' | 'failures';
  viewport: ViewportMode;
  theme: string;
  status: 'passed' | 'failed' | 'new';
  mismatchPercentage: number;
  deltaE: number;
  baselineTimestamp: string;
  currentTimestamp: string;
  diffRegionsCount: number;
  notes: string;
}
