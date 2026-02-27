import { defineType, defineField } from 'sanity'
import { DashboardIcon } from '@sanity/icons'
import { componentCardName } from '../components'

export const sectionGridName = 'section.grid'

export default defineType({
  name: sectionGridName,
  title: 'Grid',
  icon: DashboardIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional section heading above the grid.',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
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
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: heading || 'Grid' }
    },
  },
})
