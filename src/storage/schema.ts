import {type ID as PolicyUpdate202508} from '#/components/PolicyUpdateOverlay/updates/202508/config'

/**
 * Device data that's specific to the device and does not vary based account
 */

export const DummyOCbwoy3SettingsSchema = {
  // LABELER OPTS
  disableAppLabelers: false,
  disableBlueskyLabelerAtproto: false,
  increaseLabelerLimit: false,

  // ATPROTO HACKS
  blueskyForWeb: false,
  restoreBackdatedPosts: false,
  ignoreBlockRelationships: false,

  // BLUESKY
  skipModSettingAgeCheck: false,
  bypassHideWarning: false,
  unverifyNyt: false,

  // AI
  enableGenaiFeatures: false,
  geminiApiKey: ''
}

export type Device = {
  fontScale: '-2' | '-1' | '0' | '1' | '2'
  fontFamily: 'system' | 'theme'
  lastNuxDialog: string | undefined
  geolocation?: {
    countryCode: string | undefined
    isAgeRestrictedGeo: boolean | undefined
    isAgeBlockedGeo: boolean | undefined
  }
  trendingBetaEnabled: boolean
  devMode: boolean
  ocbwoy3?: Partial<typeof DummyOCbwoy3SettingsSchema>
  demoMode: boolean
  activitySubscriptionsNudged?: boolean

  /**
   * Policy update overlays. New IDs are required for each new announcement.
   */
  policyUpdateDebugOverride?: boolean
  [PolicyUpdate202508]?: boolean
}

export type Account = {
  searchTermHistory?: string[]
  searchAccountHistory?: string[]
}
