import { useMemo } from 'react'
import { msg } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export type GlobalLabelStrings = Record<
  string,
  {
    name: string
    description: string
  }
>

export function useGlobalLabelStrings(): GlobalLabelStrings {
  const {_} = useLingui()
  return useMemo(
    () => ({
      '!hide': {
        name: _(msg`Content Blocked`),
        description: _(
          msg`This content has been labeled with the !hide global label value defined by the AT Protocol. You can bypass this warning with Redsky.`,
        ),
      },
      '!warn': {
        name: _(msg`Content Warning`),
        description: _(
          msg`This content has been labeled with the !warn global label value defined by the AT Protocol. You will recieve a content warning before opening this content.`,
        ),
      },
      '!no-unauthenticated': {
        name: _(msg`Sign-in Required`),
        description: _(
          msg`This user has labeled themselves or their content with the !no-unauthenticated global label value defined by the AT Protocol. You must log in.`,
        ),
      },
      porn: {
        name: _(msg`Porn`),
        description: _(msg`Pornography, explicit sexual content.`),
      },
      sexual: {
        name: _(msg`Sexually Suggestive`),
        description: _(msg`Does not include nudity.`),
      },
      nudity: {
        name: _(msg`Nudity`),
        description: _(msg`E.g. artistic nudes.`),
      },
      'graphic-media': {
        name: _(msg`Graphic Media`),
        description: _(msg`Explicit or potentially disturbing media.`),
      },
      gore: {
        name: _(msg`Gore`),
        description: _(msg`Explicit or potentially disturbing media.`),
      },
    }),
    [_],
  )
}
