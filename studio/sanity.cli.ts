import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8c5n4win',
    dataset: 'tbd_issues'
  },
  deployment: {
    appId: 'dy644cxbkk4kuriyx4udnge3',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
