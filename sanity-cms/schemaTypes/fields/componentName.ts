import { defineField } from 'sanity'

/**
 * Required component name for CMS use only (list views, preview).
 * Use in preview.select: { title: 'componentName' }
 */
export const componentNameField = defineField({
  name: 'name',
  title: 'Component Name',
  type: 'string',
  description: 'Only for CMS use',
  validation: (Rule) => Rule.required(),
})
