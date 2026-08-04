/**
 * Types matching the Sanity schema (sanity-cms) for type-safe rendering.
 */

/** Styled text object: text + style (normal, h1–h4, blockquote) */
export interface StyledText {
  text?: string | null
  style?: string | null
}

/** Sanity image with optional hotspot/crop. assetUrl is set when query uses asset->.url */
export interface SanityImage {
  _type: 'image'
  asset?: { _ref?: string } | null
  /** Resolved CDN URL when query uses asset->.url */
  assetUrl?: string | null
  /** From asset->altText in GROQ */
  alt?: string | null
  hotspot?: { width: number; height: number; x: number; y: number } | null
  crop?: { top: number; bottom: number; left: number; right: number } | null
}

/** Portable text span (inline) */
export interface PortableTextSpan {
  _type: 'span'
  text: string
  marks?: string[]
}

/** Portable text block */
export interface PortableTextBlock {
  _type: 'block'
  _key?: string
  style?: string
  children?: PortableTextSpan[]
  markDefs?: { _key: string; _type: string; href?: string }[]
}

/** Image in block content (has _key) */
export interface BlockContentImage extends SanityImage {
  _key?: string
}

/** Block content array: blocks and images */
export type BlockContentItem = PortableTextBlock | BlockContentImage

export const COMPONENT_MEDIA = 'component.media'

/** Resolved component.media document */
export interface MediaComponent {
  _id: string
  _type: typeof COMPONENT_MEDIA
  mediaType?: 'image' | 'video' | null
  image?: SanityImage | null
  videoUrl?: string | null
}

export interface HomepageDocument {
  _id: string
  hero?: SectionFullWidthMedia | null
  content?: BlockContentItem[] | null
}

// --- Page builder: sections (resolved from references) ---

export const SECTION_CONTENT = 'section.content'
export const SECTION_FULL_WIDTH_MEDIA = 'section.fullWidthMedia'

export interface SectionFullWidthMedia {
  _type: typeof SECTION_FULL_WIDTH_MEDIA
  _id: string
  media?: MediaComponent | null
}

/** Card component data (used inside content sections and elsewhere). */
export interface CardData {
  _id: string
  title?: StyledText | null
  subtitle?: StyledText | null
  description?: string | null
  url?: string | null
  media?: MediaComponent | null
}

export const COMPONENT_CARD = 'component.card'
export const COMPONENT_TEXT = 'component.text'

export interface TextData {
  _id: string
  body?: BlockContentItem[] | null
}

/** Union of component data types that can appear in a content section. Each has _type for discrimination. */
export type GridItem =
  | (TextData & { _type: typeof COMPONENT_TEXT })
  | (MediaComponent & { _type: typeof COMPONENT_MEDIA })
  | (CardData & { _type: typeof COMPONENT_CARD })

/** Content section: stack of component references */
export interface SectionContent {
  _type: typeof SECTION_CONTENT
  _id: string
  items?: GridItem[] | null
}

export type PageSection = SectionContent | SectionFullWidthMedia

export interface PageDocument {
  _id: string
  title?: string | null
  slug?: string | null
  sections?: PageSection[] | null
}
