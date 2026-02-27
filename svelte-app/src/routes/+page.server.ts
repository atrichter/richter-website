import { sanityClient } from '$lib/sanity'
import { HOMEPAGE_QUERY } from '$lib/cms/queries'
import type { HomepageDocument } from '$lib/cms/types'

export async function load() {
	let homepage: HomepageDocument | null = null
	try {
		homepage = await sanityClient.fetch<HomepageDocument>(HOMEPAGE_QUERY)
	} catch (e) {
		console.error('Failed to fetch homepage from Sanity:', e)
	}
	return { homepage }
}
