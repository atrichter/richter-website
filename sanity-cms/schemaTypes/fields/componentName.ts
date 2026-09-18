import { defineField } from 'sanity'

/**
 * Required component name for CMS use only (list views, preview).
 */
export const componentNameField = defineField({
  name: 'name',
  title: 'Component Name',
  type: 'string',
  description: 'Only for CMS use',
  initialValue: 'Untitled',
  validation: (Rule) => Rule.required(),
})
