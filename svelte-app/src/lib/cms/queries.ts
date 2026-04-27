/**
 * GROQ queries for Sanity. Keep in sync with sanity-cms schema.
 */

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  _id,
  test,
  hero-> {
    _id,
    _type,
    image {
      _type,
      asset,
      "assetUrl": asset->url,
      hotspot,
      crop
    },
    altText
  },
  content[] {
    _type,
    _key,
    style,
    children[] { _type, text, marks },
    markDefs[] { _key, _type, href },
    asset
  }
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
      heading,
      items[]-> {
        _id,
        _type,
        _type == "component.card" => {
          media-> {
            _id,
            _type,
            mediaType,
            image {
              _type,
              asset,
              "assetUrl": asset->url,
              hotspot,
              crop
            },
            videoUrl
          },
          // compatibility for existing frontend expectations
          image: media->image,
          imageAlt: media->image.asset->altText,
          title,
          subtitle,
          description,
          link { href, text }
        }
      }
    },
    _type == "section.fullWidthMedia" => {
      media-> {
        _id,
        _type,
        mediaType,
        image {
          _type,
          asset,
          "assetUrl": asset->url,
          hotspot,
          crop
        },
        videoUrl
      },
      // keep legacy top-level fields for compatibility with the frontend
      image: media->image,
      altText: media->image.asset->altText
    }
  }
}`
