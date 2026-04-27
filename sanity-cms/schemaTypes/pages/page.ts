import { defineType, defineField, defineArrayMember } from 'sanity'
import { BookIcon } from '@sanity/icons'
import { sectionFullWidthMediaName, sectionGridName } from '../sections'
import { definePreview } from '../preview'

export const pageSchemaName = 'page'

export default defineType({
  name: pageSchemaName,
  title: 'Page',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used for Studio and SEO',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array' as const,
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: sectionFullWidthMediaName }, { type: sectionGridName }],
        }),
      ],
    }),
  ],
  preview: definePreview({
    title: 'title',
    subtitle: 'slug.current',
    fallbackTitle: 'Untitled Page',
  }),
})
