/**
 * Reusable schema constants and types.
 * Add other shared lists, options, or types here so multiple schema types can use them.
 */

// --- Text styles (block-level style values, used by blockContent, styledText, etc.) ---

export const headingStyles = [
  { title: 'H1', value: 'h1' },
  { title: 'H2', value: 'h2' },
  { title: 'H3', value: 'h3' },
  { title: 'H4', value: 'h4' },
] as const

export const bodyStyles = [
  { title: 'Normal', value: 'normal' },
  { title: 'Quote', value: 'blockquote' },
] as const

export const textStyles = [
  bodyStyles[0],
  ...headingStyles,
  bodyStyles[1],
] as const

export type TextStyleValue = (typeof textStyles)[number]['value']
