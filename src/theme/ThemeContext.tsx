import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, ThemeDefinition } from './themes.ts';

interface ThemeContextType {
  currentTheme: ThemeDefinition;
  setTheme: (themeId: string) => void;
  availableThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<string>('vibrant');

  const currentTheme = THEMES[themeId] || THEMES.vibrant;

  useEffect(() => {
    // Inject dynamic CSS variables into document.documentElement (:root)
    const root = document.documentElement;
    root.style.setProperty('--color-primary', currentTheme.colors.primary);
    root.style.setProperty('--color-primary-container', currentTheme.colors.primaryContainer);
    root.style.setProperty('--color-on-primary', currentTheme.colors.onPrimary);
    root.style.setProperty('--color-on-primary-container', currentTheme.colors.onPrimaryContainer);

    root.style.setProperty('--color-secondary', currentTheme.colors.secondary);
    root.style.setProperty('--color-secondary-container', currentTheme.colors.secondaryContainer);

    root.style.setProperty('--color-tertiary', currentTheme.colors.tertiary);
    root.style.setProperty('--color-tertiary-container', currentTheme.colors.tertiaryContainer);

    root.style.setProperty('--color-surface', currentTheme.colors.surface);
    root.style.setProperty('--color-surface-container', currentTheme.colors.surfaceContainer);
    root.style.setProperty('--color-surface-container-low', currentTheme.colors.surfaceContainerLow);
    root.style.setProperty('--color-surface-container-high', currentTheme.colors.surfaceContainerHigh);

    root.style.setProperty('--color-on-surface', currentTheme.colors.onSurface);
    root.style.setProperty('--color-on-surface-variant', currentTheme.colors.onSurfaceVariant);
    root.style.setProperty('--color-outline', currentTheme.colors.outline);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: (id) => setThemeId(id),
        availableThemes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
