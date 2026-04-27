import { defineType, defineField } from 'sanity'
import { StackCompactIcon } from '@sanity/icons'
import { componentCardName } from '../components'
import { componentNameField } from '../fields'

export const sectionContentName = 'section.content'

export default defineType({
  name: sectionContentName,
  title: 'Content',
  icon: StackCompactIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'items',
      title: 'Items',
      description: 'Stack of components in this section',
      type: 'array' as const,
      of: [
        {
          type: 'block',
          title: 'Block Text',
        },
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
        },
        {
          type: 'reference',
          to: [{ type: componentCardName }],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
