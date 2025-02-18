import {AppBskyActorDefs} from '@atproto/api'

import {getOCbwoy3Settings} from '../constants'

export function isBlockedOrBlocking(
  profile:
    | AppBskyActorDefs.ProfileViewBasic
    | AppBskyActorDefs.ProfileViewDetailed,
) {
  if (getOCbwoy3Settings().ignoreBlockRelationships === true) return false
  return profile.viewer?.blockedBy || profile.viewer?.blocking
}

export function canBypassBlocks() {
  return getOCbwoy3Settings().ignoreBlockRelationships === true ? true : false
}

export function isMuted(
  profile:
    | AppBskyActorDefs.ProfileViewBasic
    | AppBskyActorDefs.ProfileViewDetailed,
) {
  return profile.viewer?.muted || profile.viewer?.mutedByList
}
