import {type ID as PolicyUpdate202508} from '#/components/PolicyUpdateOverlay/updates/202508/config'

/**
 * Device data that's specific to the device and does not vary based account
 */

export const DummyOCbwoy3SettingsSchema = {
  // LABELER OPTS
  disableAppLabelers: true,
  disableBlueskyLabelerAtproto: false,
  increaseLabelerLimit: true,

  // ATPROTO HACKS
  blueskyForWeb: true,
  restoreBackdatedPosts: false,
  ignoreBlockRelationships: false,

  // BLUESKY
  skipModSettingAgeCheck: false, // bypass nsfw
  bypassHideWarning: false,
  unverifyNyt: true,

  // QOL
  theGooberProject: true,

  // Fun
  forceAgeVerification: false, // uk mode
  fixTrending: false,
  skeets: false,
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
