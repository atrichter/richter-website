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
	/** Resolved CDN URL when query uses asset->.url (avoids client-side ref resolution) */
	assetUrl?: string | null
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

/** Hero section on homepage */
export interface HomepageHero {
	title?: StyledText | null
	subtitle?: StyledText | null
	description?: StyledText | null
	heroImage?: SanityImage | null
}

export interface HomepageDocument {
	_id: string
	test?: string | null
	hero?: HomepageHero | null
	content?: BlockContentItem[] | null
}

// --- Page builder: sections (resolved from references) ---

export const SECTION_HERO = 'section.hero'
export const SECTION_BLOCK_CONTENT = 'section.blockContent'
export const SECTION_FULL_WIDTH_MEDIA = 'section.fullWidthMedia'
export const SECTION_GRID = 'section.grid'

export interface SectionHero {
	_type: typeof SECTION_HERO
	_id: string
	title?: StyledText | null
	subtitle?: StyledText | null
	background?: SanityImage | null
	altText?: string | null
}

export interface SectionBlockContent {
	_type: typeof SECTION_BLOCK_CONTENT
	_id: string
	content?: BlockContentItem[] | null
}

export interface SectionFullWidthMedia {
	_type: typeof SECTION_FULL_WIDTH_MEDIA
	_id: string
	image?: SanityImage | null
	altText?: string | null
}

/** Link object for card (and similar). */
export interface CardLink {
	href?: string | null
	text?: string | null
}

/** Card component data (used inside grid and elsewhere). */
export interface CardData {
	_id: string
	image?: SanityImage | null
	imageAlt?: string | null
	title?: string | null
	subtitle?: string | null
	description?: string | null
	link?: CardLink | null
}

export const COMPONENT_CARD = 'component.card'

/** Union of component data types that can appear in a grid. Each has _type for discrimination. */
export type GridItem = (CardData & { _type: typeof COMPONENT_CARD })

/** Grid section: optional heading + list of components (cards, etc.). */
export interface SectionGrid {
	_type: typeof SECTION_GRID
	_id: string
	heading?: string | null
	/** Resolved grid items. Add more component types to GridItem as you add them. */
	items?: GridItem[] | null
}

export type PageSection =
	| SectionHero
	| SectionBlockContent
	| SectionFullWidthMedia
	| SectionGrid

export interface PageDocument {
	_id: string
	title?: string | null
	slug?: string | null
	sections?: PageSection[] | null
}
