import { error } from '@sveltejs/kit'
import { sanityClient } from '$lib/sanity'
import { PAGE_BY_SLUG_QUERY } from '$lib/cms/queries'
import type { PageDocument } from '$lib/cms/types'

export async function load({ params }) {
	const slug = params.slug
	if (!slug) {
		throw error(404, 'Not found')
	}

	let page: PageDocument | null = null
	try {
		page = await sanityClient.fetch<PageDocument | null>(PAGE_BY_SLUG_QUERY, {
			slug,
		})
	} catch (e) {
		console.error('Failed to fetch page from Sanity:', e)
		throw error(500, 'Failed to load page')
	}

	if (!page) {
		throw error(404, 'Page not found')
	}

	return { page }
}
