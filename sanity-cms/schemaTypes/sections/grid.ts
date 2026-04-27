import { defineType, defineField } from 'sanity'
import { DashboardIcon } from '@sanity/icons'
import { componentCardName } from '../components'
import { componentNameField } from '../fields'

export const sectionGridName = 'section.grid'

export default defineType({
  name: sectionGridName,
  title: 'Grid',
  icon: DashboardIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array' as const,
      description: 'Components to display in the grid (cards, etc.).',
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
