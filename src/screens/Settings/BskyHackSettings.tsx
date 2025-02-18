import {Fragment} from 'react'
import {View} from 'react-native'

import {CommonNavigatorParams, NativeStackScreenProps} from '#/lib/routes/types'
import {atoms as a, useBreakpoints, useTheme} from '#/alf/index'
import {Divider} from '#/components/Divider'
import * as Layout from '#/components/Layout'
import {InlineLinkText} from '#/components/Link'
import {Text} from '#/components/Typography'
import {device, DummyOCbwoy3SettingsSchema} from '#/storage/index'
import {OCbwoy3BskyHackSettingToggle} from './BskyHackSettings/SettingToggle'

enum SettingType {
  ON_OFF = 1,
  STRING = 2,
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

function createToggleOption(
  name: string,
  value: keyof typeof DummyOCbwoy3SettingsSchema,
) {
  return {
    name,
    type: SettingType.ON_OFF,
    getState: () => {
      return (device.get(['ocbwoy3']) || {})[value] || false
    },
    onUpdate: (v: string | boolean) => {
      let b: any = device.get(['ocbwoy3']) || {}
      b[value] = v as boolean
      device.set(['ocbwoy3'], b)
    },
  }
}

function createTextOption(
  name: string,
  value: keyof typeof DummyOCbwoy3SettingsSchema,
) {
  return {
    name,
    type: SettingType.STRING,
    getState: () => {
      return (device.get(['ocbwoy3']) || {})[value] || false
    },
    onUpdate: (v: string | boolean) => {
      let b: any = device.get(['ocbwoy3']) || {}
      b[value] = v as boolean
      device.set(['ocbwoy3'], b)
    },
  }
}

const AllSettings: SettingCategory[] = [
  {
    title: 'Labelers',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Unsubscribe from Bluesky Moderation (Germany/Brazil)',
        'disableForcedLabelers',
      ),
      createToggleOption(
        'Unsubscribe from Bluesky Moderation',
        'disableBlueskyLabeler',
      ),
      createToggleOption('Bypass 20 labeler limit', 'remove20LabelerLimit'),
    ],
  },
  {
    title: 'AT Protocol',
    type: SettingCategoryType.GROUP,
    settings: [createToggleOption('Ignore !hide label', 'defyAtprotoRules')],
  },
  {
    title: 'Bluesky',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Add posting_client ("Bluesky for X") attribute',
        'postingClientInRecord',
      ),
      createToggleOption(
        'Use self-identified timestamp in post view',
        'useSelfIdentifiedTimestamp',
      ),
      createToggleOption(
        'Bypass age check in moderation settings',
        'bypass18PlusAgeRestriction',
      ),
    ],
  },
  {
    title: 'AI',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Enable Generative AI Features',
        'enableGenaiFeatures',
      ),
      createTextOption('Gemini API Key', 'geminiApiKey'),
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
        <Text style={[a.text_2xl, a.pt_xl, a.text_center]}>
          Made by{' '}
          <InlineLinkText
            style={[a.text_2xl]}
            label="@ocbwoy3.dev"
            to="/profile/ocbwoy3.dev">
            @ocbwoy3.dev
          </InlineLinkText>
        </Text>
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
        <Text style={[a.pt_xl, a.text_center]}>
          This is a fork of{' '}
          <InlineLinkText
            label="Bluesky's Social App"
            to="https://github.com/bluesky-social/social-app">
            Bluesky's Social App
          </InlineLinkText>
        </Text>
      </Layout.Content>
    </Layout.Screen>
  )
}
