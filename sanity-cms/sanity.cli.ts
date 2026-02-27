import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '650bubqo',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'development',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    /**
     * Set after first `sanity deploy` so CI/non-interactive deploys use this host.
     * Example: 'richter-website' → https://richter-website.sanity.studio
     */
    // host: 'richter-website',
  },
})
