import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { componentNameField } from '../fields'

export const componentMediaName = 'component.media'

export default defineType({
  name: componentMediaName,
  title: 'Media',
  icon: ImageIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct MP4 link',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
  ],
})
