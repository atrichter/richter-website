type SchemaField = {
  name?: string
}

type SchemaTypeLike = {
  type?: string
  title?: string
  fields?: SchemaField[]
  preview?: unknown
  [key: string]: unknown
}

type PreviewPathConfig = {
  title?: string
  subtitle?: string
  media?: string
  fallbackTitle?: string
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
        title: selection.title || config.fallbackTitle || 'Untitled',
        subtitle: selection.subtitle || undefined,
        media: selection.media,
      }
    },
  }
}

function createDefaultPreview(schemaType: SchemaTypeLike) {
  const fields = schemaType.fields ?? []
  if (fields.length === 0) return undefined

  const hasTitle = fields.some((field) => field.name === 'title')
  const hasName = fields.some((field) => field.name === 'name')
  const hasImage = fields.some((field) => field.name === 'image')

  if (!hasTitle && !hasName && !hasImage) return undefined

  return definePreview({
    title: hasTitle ? 'title' : hasName ? 'name' : undefined,
    media: hasImage ? 'image' : undefined,
    fallbackTitle: schemaType.title || 'Untitled',
  })
}

export function applyDefaultPreview(schemaType: SchemaTypeLike): SchemaTypeLike {
  if (schemaType.preview) return schemaType

  const preview = createDefaultPreview(schemaType)
  if (!preview) return schemaType

  return {
    ...schemaType,
    preview,
  }
}
