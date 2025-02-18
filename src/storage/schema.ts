/**
 * Device data that's specific to the device and does not vary based account
 */

export const DummyOCbwoy3SettingsSchema = {
  // LABELER OPTS
  disableForcedLabelers: false,
  disableBlueskyLabeler: false,
  remove20LabelerLimit: false,

  // ATPROTO HACKS
  postingClientInRecord: false,
  useSelfIdentifiedTimestamp: false,
  ignoreBlockRelationships: false,

  // BLUESKY
  bypass18PlusAgeRestriction: false,
  defyAtprotoRules: false,

  // AI
  enableGenaiFeatures: false,
  geminiApiKey: '',
}

export type Device = {
  fontScale: '-2' | '-1' | '0' | '1' | '2'
  fontFamily: 'system' | 'theme'
  lastNuxDialog: string | undefined
  geolocation?: {
    countryCode: string | undefined
  }
  trendingBetaEnabled: boolean
  devMode: boolean
  ocbwoy3?: Partial<typeof DummyOCbwoy3SettingsSchema>
}

export type Account = {
  searchTermHistory?: string[]
  searchAccountHistory?: string[]
}
