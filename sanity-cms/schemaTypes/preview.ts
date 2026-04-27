import type { SchemaTypeDefinition } from 'sanity'

type PreviewPathConfig = {
  title?: string
  subtitle?: string
  media?: string
}

export function definePreview(config: PreviewPathConfig) {
  const select: Record<string, string> = {}
  if (config.title) select.title = config.title
  if (config.subtitle) select.subtitle = config.subtitle
  if (config.media) select.media = config.media

  return {
    select,
    prepare(selection: { title?: string; subtitle?: string; media?: any }) {
      return {
        title: selection.title || 'Undefined',
        subtitle: selection.subtitle || undefined,
        media: selection.media,
      }
    },
  }
}

function createDefaultPreview(schemaType: SchemaTypeDefinition) {
  const fields = ('fields' in schemaType ? schemaType.fields : undefined) as Array<{ name?: string }> | undefined
  const normalizedFields = fields ?? []

  if (normalizedFields.length === 0) return undefined

  const hasTitle = normalizedFields.some((field) => field.name === 'title')
  const hasName = normalizedFields.some((field) => field.name === 'name')
  const hasImage = normalizedFields.some((field) => field.name === 'image')
  const hasMedia = normalizedFields.some((field) => field.name === 'media')

  if (!hasTitle && !hasName && !hasImage && !hasMedia) return undefined

  return definePreview({
    title: hasTitle ? 'title' : hasName ? 'name' : undefined,
    // prefer a referenced media object's image when present
    media: hasMedia ? 'media.image' : hasImage ? 'image' : undefined,
  })
}

export function applyDefaultPreview<T extends SchemaTypeDefinition>(schemaType: T): T {
  if ('preview' in schemaType && schemaType.preview) return schemaType

  const preview = createDefaultPreview(schemaType)
  if (!preview) return schemaType

  return {
    ...schemaType,
    preview,
  } as T
}
