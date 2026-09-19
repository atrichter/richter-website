import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '650bubqo',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // Studio is deployed to https://richter-website.sanity.studio
  studioHost: 'richter-website',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  },
})
