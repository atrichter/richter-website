import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const sectionFullWidthMediaName = 'section.fullWidthMedia'

export default defineType({
  name: sectionFullWidthMediaName,
  title: 'Full Width Media',
  icon: ImageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alternative Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Full Width Media' }
    },
  },
})
