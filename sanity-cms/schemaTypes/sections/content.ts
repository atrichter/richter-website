import { defineType, defineField } from 'sanity'
import { StackIcon } from '@sanity/icons'
import { componentCardName } from '../components'
import { componentNameField } from '../fields'

export const sectionContentName = 'section.content'

export default defineType({
  name: sectionContentName,
  title: 'Content',
  icon: StackIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array' as const,
      description: 'Components in this content section (cards, etc.).',
      of: [
        {
          type: 'reference',
          to: [{ type: componentCardName }],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
