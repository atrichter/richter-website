import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { componentNameField } from '../fields'

export const sectionFullWidthMediaName = 'section.fullWidthMedia'

export default defineType({
  name: sectionFullWidthMediaName,
  title: 'Full Width Media',
  icon: ImageIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
