export const themeFonts = {
  stix: {
    name: 'STIX Two Text',
    fallback: 'serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 800,
    },
  },
  lato: {
    name: 'Lato',
    fallback: 'sans-serif',
    weights: {
      thin: 100,
      light: 300,
      regular: 400,
      bold: 700,
      black: 900,
    },
  },
} as const

export type ThemeFontName = keyof typeof themeFonts
export type ThemeFontConfig<T extends ThemeFontName = ThemeFontName> = (typeof themeFonts)[T]
export type ThemeFontWeightName<T extends ThemeFontName = ThemeFontName> = keyof ThemeFontConfig<T>['weights']

export const themeFontWeights = Object.fromEntries(
  Object.entries(themeFonts).map(([fontName, font]) => [fontName, font.weights])
) as { [K in ThemeFontName]: ThemeFontConfig<K>['weights'] }

export const themeColors = {
  black: '#000000',
  white: '#ffffff',
  ink: '#050a0f',
  paper: '#faf5f0',
  navy: '#051437',
  tan: '#faebc8',
  blue: '#0537c8',
  yellow: '#fac837',
  ocean: '#0f8cb9',
  orange: '#f07346',
  cyan: '#23cdf0',
  scarlet: '#dc320f',
  ice: '#d2e6f0',
  brown: '#2d190f',
  aqua: '#91faf5',
  maroon: '#6e050a',
  turquoise: '#32d7be',
  red: '#cd2841',
  teal: '#148278',
  rose: '#eb7d87',
  evergreen: '#052d2d',
  blush: '#fad2d2',
  green: '#059164',
  pink: '#fa6e9b',
  sage: '#91cda0',
  purple: '#6e325f',
  slate: '#50555a',
  gray: '#afaaa5',
} as const

export type ThemeColorName = keyof typeof themeColors

export const themeFontCssVars = Object.fromEntries(
  Object.entries(themeFonts).map(([name, value]) => [`--font-${name}`, `${value.name}, ${value.fallback}`])
) as Record<string, string>

export const themeFontWeightCssVars = Object.fromEntries(
  Object.entries(themeFonts).flatMap(([fontName, font]) =>
    Object.entries(font.weights).map(([weightName, value]) => [
      `--font-weight-${fontName}-${weightName}`,
      String(value),
    ])
  )
) as Record<string, string>

export const themeColorCssVars = Object.fromEntries(
  Object.entries(themeColors).map(([name, value]) => [`--color-${name}`, value])
) as Record<string, string>

export function setThemeVariables(root: HTMLElement = document.documentElement) {
  if (typeof document === 'undefined') return

  Object.entries(themeColorCssVars).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })

  Object.entries(themeFontCssVars).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })

  Object.entries(themeFontWeightCssVars).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })
}

export function fontCssVar(name: ThemeFontName) {
  return `var(--font-${name})`
}

export function fontWeightCssVar<F extends ThemeFontName>(font: F, weight: ThemeFontWeightName<F>) {
  return `var(--font-weight-${String(font)}-${String(weight)})`
}

export function colorCssVar(name: ThemeColorName) {
  return `var(--color-${name})`
}
