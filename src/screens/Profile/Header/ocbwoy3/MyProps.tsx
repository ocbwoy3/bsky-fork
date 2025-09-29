import {
  CustomProfileMetadata
} from '#/lib/hooks/ocbwoy3/useCustomProfileMetadataFromAtprotoRecord'
import * as Pills from '#/components/Pills'
import { CustomTextPill } from './CustomTextPill'


// Written by OCbwoy3 (@ocbwoy3.dev) - Bluesky Mod

export default function MyProps({
  md,
}: {
  md: CustomProfileMetadata | undefined | null
}) {
  if (!md || !md['dev.ocbwoy3.bsky.myProps']) return null

  const myProps = md['dev.ocbwoy3.bsky.myProps']

  if (typeof myProps !== 'object' && !Array.isArray(myProps)) return null

  return (
    <Pills.Row size="lg">
        { Object.entries(myProps).map(([k, v])=>{
            if (typeof k !== "string") return null
            if (typeof v !== "string") return null
            return <CustomTextPill key={k} textToDisplay={`${k.startsWith("_") ? "" : `${k}: `}${v}`} size="lg"/>
        }) }
    </Pills.Row>
  )
}
