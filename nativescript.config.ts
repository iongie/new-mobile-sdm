import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'org.nativescript.sdmabbproject',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'app',
} as NativeScriptConfig
