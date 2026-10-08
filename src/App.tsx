/**
 * Colophon Design System & Visual Regression Suite
 * Regional Printing Press (Est. 1954)
 * Week 4 Portfolio Deliverable: Tokens, Theming, Visual Regression Tests & 5 Failure Modes
 */

import React, { useState, useEffect } from 'react';
import { THEMES } from './tokens/themes';
import { TopBar } from './components/layout/TopBar';
import { HeroSection } from './components/layout/HeroSection';
import { ColophonFooter } from './components/layout/ColophonFooter';
import { TokenCatalogView } from './components/showcase/TokenCatalogView';
import { PrimitivesShowcase } from './components/showcase/PrimitivesShowcase';
import { ThemingEngineView } from './components/showcase/ThemingEngineView';
import { VisualRegressionSuite } from './components/visual-regression/VisualRegressionSuite';
import { FailureMatrix } from './components/failures/FailureMatrix';
import { PressOrderDemo } from './components/showcase/PressOrderDemo';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('tokens');
  const [currentThemeId, setCurrentThemeId] = useState<string>('light-cotton');
  const [customCssVars, setCustomCssVars] = useState<Record<string, string>>({});

  // Sync active theme's CSS variables to document root
  useEffect(() => {
    const theme = THEMES[currentThemeId] || THEMES['light-cotton'];
    const mergedVars = { ...theme.cssVariables, ...customCssVars };

    const root = document.documentElement;
    Object.entries(mergedVars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
  }, [currentThemeId, customCssVars]);

  const handleUpdateCustomCssVar = (key: string, value: string) => {
    setCustomCssVars((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetCustomVars = () => {
    setCustomCssVars({});
  };

  const handleRunGlobalTests = () => {
    setActiveTab('regression');
  };

  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--ink-primary)] selection:bg-[var(--ink-accent)] selection:text-white transition-colors duration-200">
      {/* 3-Zone Top Navigation Contract */}
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentThemeId={currentThemeId}
        onThemeChange={setCurrentThemeId}
        onRunAllTests={handleRunGlobalTests}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreTokens={() => setActiveTab('tokens')}
        onRunVisualTests={() => setActiveTab('regression')}
        onExploreFailures={() => setActiveTab('failures')}
      />

      {/* Main Dynamic Workspace Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'tokens' && <TokenCatalogView />}

        {activeTab === 'primitives' && <PrimitivesShowcase />}

        {activeTab === 'theming' && (
          <ThemingEngineView
            currentThemeId={currentThemeId}
            onThemeChange={setCurrentThemeId}
            customCssVars={customCssVars}
            onUpdateCustomCssVar={handleUpdateCustomCssVar}
            onResetCustomVars={handleResetCustomVars}
          />
        )}

        {activeTab === 'regression' && (
          <VisualRegressionSuite onRunGlobalTests={handleRunGlobalTests} />
        )}

        {activeTab === 'failures' && <FailureMatrix />}

        {activeTab === 'ticket' && <PressOrderDemo />}
      </main>

      {/* Institutional Colophon Footer */}
      <ColophonFooter />
    </div>
  );
}
