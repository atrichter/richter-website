import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { DatasetNavbar } from './components/DatasetNavbar'

export default defineConfig({
  name: 'default',
  title: 'richter-website',

  projectId: '650bubqo',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'development',

  studio: {
    components: {
      navbar: DatasetNavbar,
    },
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentListItem()
              .id('homepage')
              .schemaType('homepage'),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
