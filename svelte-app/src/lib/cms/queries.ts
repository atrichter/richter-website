/**
 * GROQ queries for Sanity. Keep in sync with sanity-cms schema.
 */

export const HOMEPAGE_QUERY = `*[_type == "homepage"][0] {
  _id,
  test,
  hero {
    title { text, style },
    subtitle { text, style },
    description { text, style },
    heroImage {
      _type,
      asset,
      "assetUrl": asset->url,
      hotspot,
      crop
    }
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
    _type == "section.hero" => {
      title { text, style },
      subtitle { text, style },
      background {
        _type,
        asset,
        "assetUrl": asset->url,
        hotspot,
        crop
      },
      altText
    },
    _type == "section.blockContent" => {
      content[] {
        _type,
        _key,
        style,
        children[] { _type, text, marks },
        markDefs[] { _key, _type, href },
        asset,
        "assetUrl": asset->url
      }
    },
    _type == "section.fullWidthMedia" => {
      image {
        _type,
        asset,
        "assetUrl": asset->url,
        hotspot,
        crop
      },
      altText
    },
    _type == "section.grid" => {
      heading,
      items[]-> {
        _id,
        _type,
        _type == "component.card" => {
          image {
            _type,
            asset,
            "assetUrl": asset->url,
            hotspot,
            crop
          },
          imageAlt,
          title,
          subtitle,
          description,
          link { href, text }
        }
      }
    }
  }
}`
