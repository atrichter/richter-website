/**
 * GROQ queries for Sanity. Keep in sync with sanity-cms schema.
 */

const sanityImageProjection = `{
  _type,
  asset,
  "assetUrl": asset->url,
  "alt": asset->altText,
  hotspot,
  crop
}`

const blockContentProjection = `{
  _type,
  _key,
  style,
  children[] { _type, text, marks },
  markDefs[] { _key, _type, href },
  asset,
  "assetUrl": asset->url,
  hotspot,
  crop
}`

const componentMediaProjection = `{
  _id,
  _type,
  mediaType,
  image ${sanityImageProjection},
  videoUrl
}`

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  _id,
  hero-> {
    _id,
    _type,
    media-> ${componentMediaProjection}
  },
  content[] ${blockContentProjection}
}`

/** Page by slug with sections resolved (for page builder). */
export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  sections[]-> {
    _id,
    _type,
    _type == "section.content" => {
      items[]-> {
        _id,
        _type,
        _type == "component.text" => {
          body[] ${blockContentProjection}
        },
        _type == "component.media" => {
          mediaType,
          image ${sanityImageProjection},
          videoUrl
        },
        _type == "component.card" => {
          title { text, style },
          subtitle { text, style },
          description,
          url,
          media-> ${componentMediaProjection}
        }
      }
    },
    _type == "section.fullWidthMedia" => {
      media-> ${componentMediaProjection}
    }
  }
}`
