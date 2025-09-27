import type * as bsky from '#/types/bsky'
import {getOCbwoy3Settings} from '../constants'

export function canBypassBlocks() {
  return getOCbwoy3Settings().ignoreBlockRelationships === true ? true : false
}

export function isBlockedOrBlocking(profile: bsky.profile.AnyProfileView) {
  return profile.viewer?.blockedBy || profile.viewer?.blocking
}

export function isMuted(profile: bsky.profile.AnyProfileView) {
  return profile.viewer?.muted || profile.viewer?.mutedByList
}
