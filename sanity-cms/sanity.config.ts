import React from 'react'
import type { InputProps } from 'sanity'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
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
            S.documentListItem().id('homepage').schemaType('homepage').title('Homepage'),
            S.listItem()
              .title('Pages')
              .child(S.documentTypeList('page').title('Pages')),
            S.listItem()
              .title('Sections')
              .child(
                S.list()
                  .title('Sections')
                  .items([
                    S.listItem()
                      .title('Hero Sections')
                      .child(S.documentTypeList('section.hero').title('Hero Sections')),
                    S.listItem()
                      .title('Content Sections')
                      .child(S.documentTypeList('section.blockContent').title('Content Sections')),
                    S.listItem()
                      .title('Full Width Media Sections')
                      .child(S.documentTypeList('section.fullWidthMedia').title('Full Width Media Sections')),
                    S.listItem()
                      .title('Grid Sections')
                      .child(S.documentTypeList('section.grid').title('Grid Sections')),
                  ])
              ),
            S.listItem()
              .title('Components')
              .child(
                S.list()
                  .title('Components')
                  .items([
                    S.listItem()
                      .title('Cards')
                      .child(S.documentTypeList('component.card').title('Cards')),
                  ])
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
