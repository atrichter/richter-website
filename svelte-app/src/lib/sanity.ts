import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? '650bubqo'
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'development'

export const sanityClient = createClient({
	projectId,
	dataset,
	apiVersion: '2025-02-19',
	useCdn: true
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(
	source: { _type?: string; asset?: { _ref?: string; _id?: string } | string | null } | null | undefined
): string | null {
	if (!source?.asset) return null
	const ref =
		typeof source.asset === 'string'
			? source.asset
			: (source.asset as { _ref?: string; _id?: string })?._ref ??
				(source.asset as { _ref?: string; _id?: string })?._id
	if (!ref) return null
	return builder.image(ref).url()
}
