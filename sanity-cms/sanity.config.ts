import React from 'react'
import type { InputProps } from 'sanity'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './schemaTypes'
import { DatasetNavbar } from './components/DatasetNavbar'
import { ImageInput } from './components/ImageInput'
import { StyledTextInput } from './components/StyledTextInput'

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
          .items([S.documentListItem().id('homepage').schemaType('homepage')]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
