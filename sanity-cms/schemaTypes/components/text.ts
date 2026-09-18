import { defineType, defineField } from 'sanity'
import { TextIcon } from '@sanity/icons'
import { componentNameField } from '../fields'

export const componentTextName = 'component.text'

export default defineType({
  name: componentTextName,
  title: 'Text',
  icon: TextIcon,
  type: 'document',
  fields: [
    componentNameField,
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
