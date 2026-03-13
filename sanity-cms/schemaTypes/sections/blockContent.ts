import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const sectionBlockContentName = 'section.blockContent'

export default defineType({
  name: sectionBlockContentName,
  title: 'Content Section',
  icon: DocumentTextIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Content Section' }
    },
  },
})
