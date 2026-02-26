import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { styledTextFieldValidation } from '../types/styledText'

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
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'styledHeadingText',
          validation: styledTextFieldValidation(true),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'styledHeadingText',
          validation: styledTextFieldValidation(true),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'styledBodyText',
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
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
