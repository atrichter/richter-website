import { defineType, defineField } from 'sanity'
import { textStyles, headingStyles, bodyStyles } from './shared'

/**
 * String + style select with all options (Normal, H1–H4, Quote).
 * Use when the field can be either a heading or body/quote.
 */
export const styledText = defineType({
  title: 'Styled Text',
  name: 'styledText',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: [...textStyles],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})

/**
 * String + style select limited to headings (H1–H4).
 * Use for titles, section headings, or any short heading line.
 */
export const styledHeadingText = defineType({
  title: 'Styled Text (Headings)',
  name: 'styledHeadingText',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'h2',
      options: {
        list: [...headingStyles],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})

/**
 * String + style select limited to body styles (Normal, Quote).
 * Use for lead-ins, captions, or quoted text without heading levels.
 */
export const styledBodyText = defineType({
  title: 'Styled Text (Body)',
  name: 'styledBodyText',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: [...bodyStyles],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
