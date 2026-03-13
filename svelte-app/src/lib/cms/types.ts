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
