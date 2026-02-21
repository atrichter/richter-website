import { defineType, defineField } from 'sanity'
import { textStyles, headingStyles, bodyStyles } from '../consts'

/**
 * String + style select with all options (Normal, H1–H4, Quote).
 */
const styledText = defineType({
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
 */
const styledHeadingText = defineType({
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
 */
const styledBodyText = defineType({
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

export default [styledText, styledHeadingText, styledBodyText]
