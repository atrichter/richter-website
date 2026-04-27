import { defineType, defineField } from 'sanity'
import { SquareIcon } from '@sanity/icons'
import { styledTextFieldValidation } from '../types/styledText'
import { definePreview } from '../preview'

export const componentCardName = 'component.card'

export default defineType({
  name: componentCardName,
  title: 'Card',
  icon: SquareIcon,
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: definePreview({
    title: 'title.text',
    subtitle: 'subtitle.text',
    media: 'image',
  }),
})
