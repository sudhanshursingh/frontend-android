export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  fontFamily: string;
  colors: {
    primary: string;
    primaryContainer: string;
    onPrimary: string;
    onPrimaryContainer: string;
    secondary: string;
    secondaryContainer: string;
    tertiary: string;
    tertiaryContainer: string;
    surface: string;
    surfaceContainer: string;
    surfaceContainerLow: string;
    surfaceContainerHigh: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
  };
}

export const THEMES: Record<string, ThemeDefinition> = {
  vibrant: {
    id: 'vibrant',
    name: 'Vibrant B2B Commerce',
    description: 'Electric mint & deep forest emerald with sunset marigold accents',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    colors: {
      primary: '#006c4b',
      primaryContainer: '#00c48c',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#004a33',
      secondary: '#855300',
      secondaryContainer: '#fea619',
      tertiary: '#4d44e3',
      tertiaryContainer: '#a5a3ff',
      surface: '#faf8ff',
      surfaceContainer: '#eaedff',
      surfaceContainerLow: '#f2f3ff',
      surfaceContainerHigh: '#e2e7ff',
      onSurface: '#131b2e',
      onSurfaceVariant: '#3c4a42',
      outline: '#6c7a72',
    },
  },
  industrial: {
    id: 'industrial',
    name: 'Industrial High-Contrast',
    description: 'Precision steel navy, safety cyan, and high-visibility indicators',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    colors: {
      primary: '#0f766e',
      primaryContainer: '#14b8a6',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#042f2e',
      secondary: '#c2410c',
      secondaryContainer: '#fb923c',
      tertiary: '#2563eb',
      tertiaryContainer: '#93c5fd',
      surface: '#f8fafc',
      surfaceContainer: '#e2e8f0',
      surfaceContainerLow: '#f1f5f9',
      surfaceContainerHigh: '#cbd5e1',
      onSurface: '#0f172a',
      onSurfaceVariant: '#334155',
      outline: '#64748b',
    },
  },
  eco: {
    id: 'eco',
    name: 'Eco Organic Mill',
    description: 'Earth-toned sustainable textile palette with sage and raw linen',
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    colors: {
      primary: '#2d5a27',
      primaryContainer: '#529b46',
      onPrimary: '#ffffff',
      onPrimaryContainer: '#143111',
      secondary: '#854d0e',
      secondaryContainer: '#facc15',
      tertiary: '#0d9488',
      tertiaryContainer: '#5eead4',
      surface: '#fafaf9',
      surfaceContainer: '#e7e5e4',
      surfaceContainerLow: '#f5f5f4',
      surfaceContainerHigh: '#d6d3d1',
      onSurface: '#1c1917',
      onSurfaceVariant: '#44403c',
      outline: '#78716c',
    },
  },
};
