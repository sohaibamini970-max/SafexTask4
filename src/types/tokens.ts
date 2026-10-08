/**
 * Design Tokens Schema & Definitions
 * Regional Printing Press: "Colophon Typographic & Lithographic Press"
 */

export interface ColorToken {
  id: string;
  name: string;
  variable: string;
  hex: string;
  cmyk: string;
  description: string;
  category: 'ink' | 'paper' | 'process' | 'spot' | 'semantic';
}

export interface TypographyToken {
  id: string;
  name: string;
  variable: string;
  family: string;
  size: string;
  lineHeight: string;
  tracking: string;
  weight: string;
  role: 'display' | 'headline' | 'body' | 'caption' | 'data' | 'colophon';
}

export interface SpacingToken {
  id: string;
  name: string;
  pica: string;
  points: string;
  pixel: number;
  variable: string;
  usage: string;
}

export interface ElevationToken {
  id: string;
  name: string;
  variable: string;
  boxShadow: string;
  description: string;
}

export interface ThemeConfig {
  id: 'light-cotton' | 'dark-litho' | 'letterpress-craft' | 'cmyk-proof';
  name: string;
  description: string;
  stockType: string;
  inkProfile: string;
  cssVariables: Record<string, string>;
}
