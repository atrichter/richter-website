import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'
import { styledTextFieldValidation } from '../types/styledText'

export const sectionFullWidthMediaName = 'section.fullWidthMedia'

export default defineType({
  name: sectionFullWidthMediaName,
  title: 'Full Width Media',
  icon: ImageIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'styledHeadingText',
      validation: styledTextFieldValidation(true),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'styledHeadingText',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title.text', subtitle: 'subtitle.text', media: 'image' },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Card',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})
