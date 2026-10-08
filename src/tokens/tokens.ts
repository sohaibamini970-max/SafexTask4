import { ColorToken, TypographyToken, SpacingToken, ElevationToken } from '../types/tokens';

export const COLOR_TOKENS: ColorToken[] = [
  // Primary Inks & Paper fundamentals
  {
    id: 'ink-lampblack',
    name: 'Lampblack Offset Ink',
    variable: '--ink-lampblack',
    hex: '#141413',
    cmyk: 'C:60 M:50 Y:50 K:100',
    description: 'Deep carbonaceous lampblack used for dense editorial lead type and solid woodblocks.',
    category: 'ink'
  },
  {
    id: 'ink-lead-charcoal',
    name: 'Cast Lead Charcoal',
    variable: '--ink-charcoal',
    hex: '#2B2A27',
    cmyk: 'C:40 M:35 Y:35 K:80',
    description: 'Muted handset metal type tone; ideal for secondary body prose with low eye fatigue.',
    category: 'ink'
  },
  {
    id: 'paper-cotton-alabaster',
    name: 'Mohawk 600gsm Alabaster',
    variable: '--paper-alabaster',
    hex: '#F9F8F5',
    cmyk: 'C:1 M:1 Y:3 K:0',
    description: 'Unbleached pure cotton rag paper with subtle archival warmth.',
    category: 'paper'
  },
  {
    id: 'paper-somerset-buff',
    name: 'Somerset Velvet Buff',
    variable: '--paper-buff',
    hex: '#F2EDE4',
    cmyk: 'C:3 M:4 Y:9 K:0',
    description: 'Warm limestone deckle-edged stock for fine art monotypes and limited editions.',
    category: 'paper'
  },
  {
    id: 'process-litho-cyan',
    name: 'Process Cyan (Euroscale)',
    variable: '--cmyk-cyan',
    hex: '#0087B5',
    cmyk: 'C:100 M:0 Y:0 K:0',
    description: 'Pure spectral cyan process ink tested against ISO 12647-2 offset standard.',
    category: 'process'
  },
  {
    id: 'process-litho-magenta',
    name: 'Process Magenta (ISO)',
    variable: '--cmyk-magenta',
    hex: '#D61A5E',
    cmyk: 'C:0 M:100 Y:0 K:0',
    description: 'High-purity rhodamine magenta ink formulated for 4-color halftone trapping.',
    category: 'process'
  },
  {
    id: 'process-litho-yellow',
    name: 'Process Yellow (Azo)',
    variable: '--cmyk-yellow',
    hex: '#E5B20D',
    cmyk: 'C:0 M:0 Y:100 K:0',
    description: 'Brilliant diarylide yellow for accurate warm trichromatic gamut calibration.',
    category: 'process'
  },
  {
    id: 'spot-vermilion',
    name: 'Heidelberg Vermilion',
    variable: '--spot-vermilion',
    hex: '#B8321B',
    cmyk: 'C:15 M:90 Y:100 K:5',
    description: 'Traditional pressman red used on proof correction stamps and colophon titles.',
    category: 'spot'
  },
  {
    id: 'spot-linseed-ochre',
    name: 'Linseed Gold Ochre',
    variable: '--spot-ochre',
    hex: '#966324',
    cmyk: 'C:25 M:55 Y:95 K:20',
    description: 'Earth pigment blended with boiled linseed oil for warm metallic borders.',
    category: 'spot'
  },
  {
    id: 'spot-forest-bindery',
    name: 'Bindery Spruce Green',
    variable: '--spot-spruce',
    hex: '#1D4537',
    cmyk: 'C:85 M:40 Y:75 K:45',
    description: 'Historical bookcloth dye used for foil-stamped hardcovers and marbled endpapers.',
    category: 'spot'
  }
];

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  {
    id: 'type-display-hero',
    name: 'Display Broadside (48pt / 4 pica)',
    variable: '--type-display',
    family: '"Cormorant Garamond", Georgia, serif',
    size: '48px',
    lineHeight: '1.08',
    tracking: '-0.025em',
    weight: '600',
    role: 'display'
  },
  {
    id: 'type-headline-title',
    name: 'Signature Headline (32px / 2.6 pica)',
    variable: '--type-headline',
    family: '"Cormorant Garamond", Georgia, serif',
    size: '32px',
    lineHeight: '1.15',
    tracking: '-0.015em',
    weight: '600',
    role: 'headline'
  },
  {
    id: 'type-section-subhead',
    name: 'Imprint Subhead (20px / 1.6 pica)',
    variable: '--type-subhead',
    family: '"Plus Jakarta Sans", -apple-system, sans-serif',
    size: '20px',
    lineHeight: '1.3',
    tracking: '-0.01em',
    weight: '600',
    role: 'headline'
  },
  {
    id: 'type-body-editorial',
    name: 'Editorial Body Prose (15px / 65ch measure)',
    variable: '--type-body',
    family: '"Plus Jakarta Sans", -apple-system, sans-serif',
    size: '15px',
    lineHeight: '1.65',
    tracking: '0.005em',
    weight: '400',
    role: 'body'
  },
  {
    id: 'type-caption-spec',
    name: 'Proof Specification Label (13px)',
    variable: '--type-caption',
    family: '"Plus Jakarta Sans", -apple-system, sans-serif',
    size: '13px',
    lineHeight: '1.4',
    tracking: '0.01em',
    weight: '500',
    role: 'caption'
  },
  {
    id: 'type-colophon-meta',
    name: 'Colophon Meta & Accession (11px Uppercase)',
    variable: '--type-colophon',
    family: '"Plus Jakarta Sans", -apple-system, sans-serif',
    size: '11px',
    lineHeight: '1.3',
    tracking: '0.08em',
    weight: '600',
    role: 'colophon'
  },
  {
    id: 'type-data-imposition',
    name: 'Tabular Impress Data (13px Monospace)',
    variable: '--type-data',
    family: '"JetBrains Mono", monospace',
    size: '13px',
    lineHeight: '1.45',
    tracking: '0',
    weight: '500',
    role: 'data'
  }
];

export const SPACING_TOKENS: SpacingToken[] = [
  {
    id: 'space-hair',
    name: 'Hair Space (0.25 pica)',
    pica: '0.25 pica',
    points: '3 pt',
    pixel: 4,
    variable: '--space-hair',
    usage: 'Hairline rule paddings and typographic kern micro-adjustments.'
  },
  {
    id: 'space-thin',
    name: 'Thin Space (0.5 pica)',
    pica: '0.5 pica',
    points: '6 pt',
    pixel: 8,
    variable: '--space-thin',
    usage: 'Tight badge gaps, inline icon margins, and caption gutters.'
  },
  {
    id: 'space-en',
    name: 'En Space (1.0 pica)',
    pica: '1.0 pica',
    points: '12 pt',
    pixel: 16,
    variable: '--space-en',
    usage: 'Standard button padding, modular form field spacing, card margins.'
  },
  {
    id: 'space-em',
    name: 'Em Space (1.5 pica)',
    pica: '1.5 pica',
    points: '18 pt',
    pixel: 24,
    variable: '--space-em',
    usage: 'Card inner padding, dialog gutter, and section group spacing.'
  },
  {
    id: 'space-double-pica',
    name: 'Double Pica (2.0 pica)',
    pica: '2.0 pica',
    points: '24 pt',
    pixel: 32,
    variable: '--space-2pica',
    usage: 'Content block vertical rhythm, responsive column gutters.'
  },
  {
    id: 'space-quad-pica',
    name: 'Quad Pica (4.0 pica)',
    pica: '4.0 pica',
    points: '48 pt',
    pixel: 64,
    variable: '--space-4pica',
    usage: 'Signature boundary margins, major section breakers, bleed offset.'
  }
];

export const ELEVATION_TOKENS: ElevationToken[] = [
  {
    id: 'elev-letterpress-deboss',
    name: 'Letterpress Inset (600gsm Deboss)',
    variable: '--elev-deboss',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.14), inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    description: 'Realistic physical depression of handset metal lead type pressed deeply into soft rag paper.'
  },
  {
    id: 'elev-blind-emboss',
    name: 'Blind Emboss (Raised Relief)',
    variable: '--elev-emboss',
    boxShadow: '-1px -1px 2px rgba(255, 255, 255, 0.8), 1px 2px 3px rgba(0, 0, 0, 0.12)',
    description: 'Plate relief without ink, creating natural tactile shadows from ambient overhead lighting.'
  },
  {
    id: 'elev-deckle-edge',
    name: 'Deckle-Edge Sheet Float',
    variable: '--elev-sheet',
    boxShadow: '0 4px 16px -2px rgba(20, 20, 19, 0.08), 0 1px 3px rgba(20, 20, 19, 0.04)',
    description: 'Single-elevation subtle float of high-grade paper stock resting on the proofing table.'
  },
  {
    id: 'elev-press-plate-raised',
    name: 'Hardcover Slipcase Depth',
    variable: '--elev-raised',
    boxShadow: '0 12px 28px -6px rgba(18, 18, 17, 0.12), 0 2px 6px rgba(18, 18, 17, 0.06)',
    description: 'Heavy archival portfolio or binding case sitting squarely in physical space.'
  }
];
