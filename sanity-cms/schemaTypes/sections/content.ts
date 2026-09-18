import { defineType, defineField, defineArrayMember } from 'sanity'
import { StackCompactIcon } from '@sanity/icons'
import { componentTextName, componentCardName, componentMediaName } from '../components'
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
        defineArrayMember({
          type: 'reference',
          to: [{ type: componentTextName }, { type: componentMediaName }, { type: componentCardName }],
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
})
