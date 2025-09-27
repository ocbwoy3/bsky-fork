// Written by OCbwoy3 (@ocbwoy3.dev) - Bluesky Mod

import {PUBLIC_APPVIEW} from '#/lib/constants'
import AtpAgent from '@atproto/api'

export const _ocbwoy3Agent = new AtpAgent({service: "https://bsky.social"})

export const TGP_ROBLOX_CENSOR_REGEXP = /rr34/i

export const TGP_ROBLOX_AB_REGEXP: {a: RegExp; b: RegExp}[] = []
