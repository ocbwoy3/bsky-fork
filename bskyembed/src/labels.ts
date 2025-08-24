import {AppBskyFeedDefs} from '@atproto/api'

export const CONTENT_LABELS = ['porn', 'sexual', 'nudity', 'graphic-media']

export function labelsToInfo(
  labels?: AppBskyFeedDefs.PostView['labels'],
): string | undefined {
  const label = labels?.find(label => CONTENT_LABELS.includes(label.val))

  switch (label?.val) {
    case 'porn':
      return 'Porn'
    case 'sexual':
      return 'Sexually Suggestive'
    case 'nudity':
      return 'Nudity'
    case 'gore':
      return 'Gore'
    case 'graphic-media':
      return 'Gore/Violence'
    default:
      return undefined
  }
}
