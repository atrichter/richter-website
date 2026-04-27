import React from 'react'
import type { InputProps } from 'sanity'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { BlockElementIcon, ComponentIcon, HomeIcon } from '@sanity/icons'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { DatasetNavbar } from './studioComponents/DatasetNavbar'
import { ImageInput } from './studioComponents/inputs/ImageInput'
import { StyledTextInput } from './studioComponents/inputs/StyledTextInput'

// Map schema type names to custom input components
const customInputs: Partial<Record<string, React.ComponentType<InputProps>>> = {
  image: ImageInput as React.ComponentType<InputProps>,
  styledText: StyledTextInput as React.ComponentType<InputProps>,
  styledHeadingText: StyledTextInput as React.ComponentType<InputProps>,
  styledBodyText: StyledTextInput as React.ComponentType<InputProps>,
}

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

  form: {
    components: {
      input: (props) => {
        const name = props.schemaType?.name
        const CustomInput = name && customInputs[name]
        return CustomInput ? React.createElement(CustomInput, props) : props.renderDefault(props)
      },
    },
  },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .icon(HomeIcon)
              .child(S.editor().id('homepage').schemaType('homepage').documentId('homepage')),
            S.documentTypeListItem('page').title('Pages'),
            S.listItem()
              .title('Sections')
              .icon(BlockElementIcon)
              .child(
                S.list()
                  .title('Sections')
                  .items([S.documentTypeListItem('section.fullWidthMedia'), S.documentTypeListItem('section.grid')])
              ),
            S.listItem()
              .title('Components')
              .icon(ComponentIcon)
              .child(
                S.list()
                  .title('Components')
                  .items([S.documentTypeListItem('component.card')])
              ),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
