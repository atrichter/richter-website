export const themeFonts = {
  stix: {
    name: 'STIX Two Text',
    fallback: 'serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
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

  charcoal: `#1e2323`,
  cloud: `#e1dcdc`,
} as const
