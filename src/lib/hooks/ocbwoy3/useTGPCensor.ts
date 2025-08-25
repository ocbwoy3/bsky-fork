// Written by OCbwoy3 (@ocbwoy3.dev) - Bluesky Mod

// useTGPCensor - Checks if a post text goes against the principal guidelines of The Goober Project

import {useMemo} from 'react'
import {TGP_ROBLOX_CENSOR_REGEXP, TGP_ROBLOX_AB_REGEXP} from './lib'
import {getOCbwoy3Settings} from '#/lib/constants'

/**
 * Determines if the given text goes against the principal guidelines of The Goober Project
 * @returns a value which determines if this might be roblox nsfw, if `getOCbwoy3Settings().theGooberProject` is enabled
 */
export function useTGPCensor(text: string | undefined) {
  console.warn('[ocbwoy3]', 'useTGPCensor', text)
  return useMemo(() => {
    if (!text) return {violates: false, matches: []}

    if (getOCbwoy3Settings().theGooberProject === false) {
      return {violates: false, matches: []}
    }

    const matches: RegExp[] = []

    // Check main censor regexp
    if (TGP_ROBLOX_CENSOR_REGEXP.test(text)) {
      matches.push(TGP_ROBLOX_CENSOR_REGEXP)
    }

    // Check all AB regexps
    for (const {a, b} of TGP_ROBLOX_AB_REGEXP) {
      if (a.test(text) && b.test(text)) {
        matches.push(a, b)
      }
    }

    return {
      violates: matches.length > 0,
      matches,
    }
  }, [text])
}
