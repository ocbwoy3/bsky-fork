// Written by OCbwoy3 (@ocbwoy3.dev) - Bluesky Mod

// useCustomProfileMetadataFromAtprotoRecord - Fetches custom profile metadata (e.g. birthday, pronouns) from the user's PDS using the AppView agent

/*

const {
    data: profile,
    error: profileError,
    refetch: refetchProfile,
    isLoading: isLoadingProfile,
    isPlaceholderData: isPlaceholderProfile,
} = useCustomProfileMetadataFromAtprotoRecord({
    did: resolvedDid,
})

*/

import {STALE} from '#/state/queries'
import {useAgent} from '#/state/session'
import {AppBskyActorProfile} from '@atproto/api'
import {useQuery} from '@tanstack/react-query'
import {_ocbwoy3AppViewAgent} from './lib'

/**
 * We can't validate the validity of this, so treat the data with caution, especially links.
 * @see https://pdsls.dev/at://did:plc:s7cesz7cr6ybltaryy4meb6y/app.bsky.actor.profile/self
 * @author OCbwoy3 <ocbwoy3@ocbwoy3.dev>
 */
export type CustomProfileMetadata = AppBskyActorProfile.Record & {
  /** The user's pronouns */
  pronouns?: string
  /** Any links the user defined on their profile (max 3) */
  links: {
    url: string
    label: string
  }[]
  /**
   * What the user set their birthday to on their profile
   * July 16, 2009 -> {day: 16, month: 7, year: 2009}
   */
  publicBirthday?: {
    day?: number
    month?: number
    year?: number
  }
  /** A thought/speech bubble coming out of the user's PFP */
  speechBubble?: string
}

const RQKEY_ROOT = 'profileCustom'
export const RQKEY = (did: string) => [RQKEY_ROOT, did]

/**
 * Fetches custom profile metadata (e.g. birthday, pronouns) from the user's PDS using the AppView agent
 * @author OCbwoy3 <ocbwoy3@ocbwoy3.dev>
 */
export function useCustomProfileMetadataFromAtprotoRecord({
  did,
  staleTime = STALE.MINUTES.FIVE,
}: {
  did: string | undefined
  staleTime?: number
}) {
  return useQuery<CustomProfileMetadata | undefined>({
    staleTime,
    refetchOnWindowFocus: true,
    queryKey: RQKEY(did ?? ''),
    queryFn: async () => {
      const res = await _ocbwoy3AppViewAgent.app.bsky.actor.profile.get({
        repo: did!,
        // collection: "app.bsky.actor.profile",
        rkey: 'self',
      })
      console.warn("[ocbwoy3]","useCustomProfileMetadataFromAtprotoRecord",did,res.value)
      return res.value ? res.value as CustomProfileMetadata : undefined
    },
    placeholderData: () => {
      return undefined
    },
    enabled: !!did,
  })
}
