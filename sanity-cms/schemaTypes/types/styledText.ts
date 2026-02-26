import { defineType, defineField, Rule } from 'sanity'
import { textStyles, headingStyles, bodyStyles } from '../consts'

/** If one of text/style is set, the other is required. */
export function styledTextObjectValidation(value: { text?: string; style?: string } | undefined): true | string {
  if (!value) return true
  const hasText = Boolean(value?.text?.trim?.())
  const hasStyle = value?.style != null && value?.style !== ''
  if (hasText && !hasStyle) return 'Style is required when text is set'
  if (hasStyle && !hasText) return 'Text is required when style is set'
  return true
}

/**
 * Validation for fields using styledText / styledHeadingText / styledBodyText.
 * Use this when the field has its own validation (e.g. required) so both run — Sanity overrides type validation with field validation, so we compose them here.
 * @param required - Pass true to add Rule.required() in addition to the cross-field rule.
 */
/** Returns a validation function for use in defineField; composes required (when true) with the cross-field styledText rule. */
export function styledTextFieldValidation(required: boolean) {
  return (rule: Rule) =>
    required
      ? rule.required().custom(styledTextObjectValidation)
      : rule.custom(styledTextObjectValidation)
}

/**
 * String + style select with all options (Normal, H1–H4, Quote).
 */
const styledText = defineType({
  title: 'Styled Text',
  name: 'styledText',
  type: 'object',
  validation: (Rule) => Rule.custom(styledTextObjectValidation),
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [...textStyles],
        layout: 'dropdown',
      },
    }),
  ],
})

/**
 * String + style select limited to headings (H1–H4).
 */
const styledHeadingText = defineType({
  title: 'Styled Text (Headings)',
  name: 'styledHeadingText',
  type: 'object',
  validation: (Rule) => Rule.custom(styledTextObjectValidation),
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [...headingStyles],
        layout: 'dropdown',
      },
    }),
  ],
})

/**
 * String + style select limited to body styles (Normal, Quote).
 */
const styledBodyText = defineType({
  title: 'Styled Text (Body)',
  name: 'styledBodyText',
  type: 'object',
  validation: (Rule) => Rule.custom(styledTextObjectValidation),
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [...bodyStyles],
        layout: 'dropdown',
      },
    }),
  ],
})

export default [styledText, styledHeadingText, styledBodyText]
