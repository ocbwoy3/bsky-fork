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
          msg`This user has given themselves the !no-unauthenticated label, therefore you must log in to see the user's posts.`,
        ),
      },
      porn: {
        name: _(msg`Adult Content`),
        description: _(msg`Explicit sexual images.`),
      },
      sexual: {
        name: _(msg`Sexually Suggestive`),
        description: _(msg`Does not include nudity.`),
      },
      nudity: {
        name: _(msg`Non-sexual Nudity`),
        description: _(msg`E.g. artistic nudes.`),
      },
      'graphic-media': {
        name: _(msg`Graphic Media`),
        description: _(msg`Explicit or potentially disturbing media.`),
      },
      gore: {
        name: _(msg`Graphic Media`),
        description: _(msg`Explicit or potentially disturbing media.`),
      },
    }),
    [_],
  )
}
