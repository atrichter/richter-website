import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { sectionFullWidthMediaName } from '../sections'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'test',
      title: 'Test',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'reference' as const,
      to: [{ type: sectionFullWidthMediaName }],
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Homepage' }
    },
  },
})
