import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { ImageInput } from '../../components/ImageInput'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Main Title',
          type: 'styledHeadingText',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'styledHeadingText',
          validation: (Rule) => Rule.required(),
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
          components: {
            input: ImageInput,
          },
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
