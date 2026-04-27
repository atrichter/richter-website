import types from './types'
import components from './components'
import sections from './sections'
import pages from './pages'
import { applyDefaultPreview } from './preview'

export const schemaTypes = [...types, ...pages, ...sections, ...components].map(applyDefaultPreview)
