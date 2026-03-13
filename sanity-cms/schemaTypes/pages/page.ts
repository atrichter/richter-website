import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'
import {
  sectionHeroName,
  sectionBlockContentName,
  sectionFullWidthMediaName,
  sectionGridName,
} from '../sections'

export const pageSchemaName = 'page'

export default defineType({
  name: pageSchemaName,
  title: 'Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Used for Studio and SEO; not necessarily shown on the page.',
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
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: sectionHeroName },
            { type: sectionBlockContentName },
            { type: sectionFullWidthMediaName },
            { type: sectionGridName },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : undefined,
      }
    },
  },
})
