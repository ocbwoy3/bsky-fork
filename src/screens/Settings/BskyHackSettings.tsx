import {Fragment} from 'react'
import {View} from 'react-native'

import {CommonNavigatorParams, NativeStackScreenProps} from '#/lib/routes/types'
import {atoms as a, useBreakpoints, useTheme} from '#/alf/index'
import {Divider} from '#/components/Divider'
import * as Layout from '#/components/Layout'
import {Text} from '#/components/Typography'
import {device} from '#/storage/index'
import {OCbwoy3BskyHackSettingToggle} from './BskyHackSettings/SettingToggle'

enum SettingType {
  ON_OFF = 1,
}

type Setting = {
  name: string
  type: SettingType
  onUpdate: (v: string | boolean) => any
  getState: () => string | boolean
}

enum SettingCategoryType {
  GROUP = 1,
}

type SettingCategory = {
  title: string
  type: SettingCategoryType
  settings: Setting[]
}

const AllSettings: SettingCategory[] = [
  {
    title: 'Labelers',
    type: SettingCategoryType.GROUP,
    settings: [
      {
        name: 'Remove region requirement for labelers',
        type: SettingType.ON_OFF,
        getState: () => {
          return (device.get(['ocbwoy3']) || {}).disableForcedLabelers || false
        },
        onUpdate: (v: string | boolean) => {
          let b = device.get(['ocbwoy3']) || {}
          b.disableForcedLabelers = v as boolean
          device.set(['ocbwoy3'], b)
        },
      },
      {
        name: 'Remove Bluesky Moderation',
        type: SettingType.ON_OFF,
        getState: () => {
          return (device.get(['ocbwoy3']) || {}).disableBlueskyLabeler || false
        },
        onUpdate: (v: string | boolean) => {
          let b = device.get(['ocbwoy3']) || {}
          b.disableBlueskyLabeler = v as boolean
          device.set(['ocbwoy3'], b)
        },
      },
    ],
  },
  {
    title: 'AT Protocol',
    type: SettingCategoryType.GROUP,
    settings: [
      {
        name: 'Remove 20 labeler limit',
        type: SettingType.ON_OFF,
        getState: () => {
          return (device.get(['ocbwoy3']) || {}).remove20LabelerLimit || false
        },
        onUpdate: (v: string | boolean) => {
          let b = device.get(['ocbwoy3']) || {}
          b.remove20LabelerLimit = v as boolean
          device.set(['ocbwoy3'], b)
        },
      },
      {
        name: 'Client-Side Ignore Blocks (TBD)',
        type: SettingType.ON_OFF,
        getState: () => {
          return false
        },
        onUpdate: (v: string | boolean) => {
          return v
        },
      },
    ],
  },
  {
    title: 'Bluesky',
    type: SettingCategoryType.GROUP,
    settings: [
      {
        name: 'Post posting_client record attribute',
        type: SettingType.ON_OFF,
        getState: () => {
          return (device.get(['ocbwoy3']) || {}).postingClientInRecord || false
        },
        onUpdate: (v: string | boolean) => {
          let b = device.get(['ocbwoy3']) || {}
          b.postingClientInRecord = v as boolean
          device.set(['ocbwoy3'], b)
        },
      },
      {
        name: 'Use self-identified timestamps in place of indexedAt',
        type: SettingType.ON_OFF,
        getState: () => {
          return false
        },
        onUpdate: (v: string | boolean) => {
          return v
        },
      },
    ],
  },
]

type Props = NativeStackScreenProps<CommonNavigatorParams, 'BskyHackSettings'>
export function BskyHackSettingsScreen({}: Props) {
  const t = useTheme()

  console.log(AllSettings)

  const {gtMobile} = useBreakpoints()
  return (
    <Layout.Screen>
      <Layout.Header.Outer>
        <Layout.Header.BackButton />
        <Layout.Header.Content>
          <Layout.Header.TitleText>
            OCbwoy3's Super Dev Settings
          </Layout.Header.TitleText>
        </Layout.Header.Content>
        <Layout.Header.Slot />
      </Layout.Header.Outer>
      <Layout.Content>
        <View style={[a.pt_2xl, a.px_lg, gtMobile && a.px_2xl]}>
          {AllSettings.map((item, idx) => (
            <Fragment key={idx}>
              {idx !== 0 ? <View style={[a.py_xl]} /> : <></>}
              <Text
                style={[
                  a.text_md,
                  a.font_bold,
                  a.pb_md,
                  t.atoms.text_contrast_high,
                ]}>
                {item.title}
              </Text>
              <View
                style={[
                  a.w_full,
                  a.border,
                  a.rounded_sm,
                  t.atoms.bg_contrast_25,
                  t.atoms.border_contrast_high,
                ]}>
                <View style={[a.rounded_sm, t.atoms.bg_contrast_25]}>
                  {item.settings.map((s, idx2) => (
                    <View key={idx2}>
                      {idx2 !== 0 ? <Divider /> : <></>}
                      <OCbwoy3BskyHackSettingToggle
                        key={idx2}
                        name={s.name}
                        getState={s.getState}
                        onUpdate={s.onUpdate}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </Fragment>
          ))}
        </View>
      </Layout.Content>
    </Layout.Screen>
  )
}
