import { defineType, defineField } from 'sanity'
import { BlockElementIcon } from '@sanity/icons'
import { styledTextFieldValidation } from '../types/styledText'

export const sectionHeroName = 'section.hero'

export default defineType({
  name: sectionHeroName,
  title: 'Hero Section',
  icon: BlockElementIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'styledHeadingText',
      validation: styledTextFieldValidation(true),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'styledHeadingText',
    }),
    defineField({
      name: 'background',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Background Alt Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title.text' },
    prepare({ title }) {
      return { title: title || 'Hero Section' }
    },
  },
})
