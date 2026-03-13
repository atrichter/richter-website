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
