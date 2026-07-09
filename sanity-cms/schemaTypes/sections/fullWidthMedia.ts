import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { componentNameField } from '../fields'
import { componentMediaName } from '../components'

export const sectionFullWidthMediaName = 'section.fullWidthMedia'

export default defineType({
  name: sectionFullWidthMediaName,
  title: 'Full Width Media',
  icon: ImageIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'media',
      title: 'Media',
      type: 'reference',
      to: [{ type: componentMediaName }],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
