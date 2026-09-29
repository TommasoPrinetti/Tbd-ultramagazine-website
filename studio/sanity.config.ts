import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'TBD-ULTRAMAGAZINE',

  projectId: '8c5n4win',
  dataset: 'tbd_issues',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
