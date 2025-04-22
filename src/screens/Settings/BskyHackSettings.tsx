import { Fragment } from 'react'
import { View } from 'react-native'

import { CommonNavigatorParams, NativeStackScreenProps } from '#/lib/routes/types'
import * as persisted from '#/state/persisted'
import { useDevModeEnabled } from '#/state/preferences/dev-mode'
import { atoms as a, useBreakpoints, useTheme } from '#/alf/index'
import { Divider } from '#/components/Divider'
import * as Layout from '#/components/Layout'
import { InlineLinkText } from '#/components/Link'
import { Text } from '#/components/Typography'
import { device, DummyOCbwoy3SettingsSchema } from '#/storage/index'
import { OCbwoy3BskyHackSettingToggle } from './BskyHackSettings/SettingToggle'

enum SettingType {
  ON_OFF = 1,
  STRING = 2,
}

type Setting = {
  name: string
  type: SettingType
  settingId: string
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

type BskyPersistedStateContext = persisted.Schema

function createToggleOptionBluesky(
  name: string,
  value: keyof BskyPersistedStateContext,
): Setting {
  return {
    name,
    type: SettingType.ON_OFF,
    settingId: value,
    getState: () => {
      return (persisted.get(value) as boolean) || false
    },
    onUpdate: (v: string | boolean) => {
      persisted.write(value, v as boolean)
    },
  }
}

function createToggleOption(
  name: string,
  value: keyof typeof DummyOCbwoy3SettingsSchema,
): Setting {
  return {
    name,
    type: SettingType.ON_OFF,
    settingId: value,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createTextOption(
  name: string,
  value: keyof typeof DummyOCbwoy3SettingsSchema,
): Setting {
  return {
    name,
    type: SettingType.STRING,
    settingId: value,
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
        'Disable Region-specific labelers',
        'disableAppLabelers',
      ),
      createToggleOption(
        'Disable Bluesky Moderation',
        'disableBlueskyLabelerAtproto',
      ),
      createToggleOption('Increase labeler limit', 'increaseLabelerLimit'),
    ],
  },
  {
    title: 'Bluesky',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption('Add "Bluesky for Web" to posts', 'blueskyForWeb'),
      createToggleOption('Use createdAt timestamp', 'restoreBackdatedPosts'),
      createToggleOption('Bypass age check', 'skipModSettingAgeCheck'),
      createToggleOption('Bypass !warn, !hide', 'bypassHideWarning'),
      createToggleOption('Unverify the New York Times', 'unverifyNyt'),
    ],
  },
  // TODO: AI Features
  /*
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
  */
]

type Props = NativeStackScreenProps<CommonNavigatorParams, 'BskyHackSettings'>
export function BskyHackSettingsScreen({}: Props) {
  const t = useTheme()
  const [devModeEnabled, setDevModeEnabled] = useDevModeEnabled()

  const otherSettings: SettingCategory[] = [
    {
      title: 'Bluesky Settings',
      type: SettingCategoryType.GROUP,
      settings: [
        createToggleOptionBluesky('Disable Trending', 'trendingDisabled'),
        createToggleOptionBluesky('Kawaii', 'kawaii'),
        {
          name: 'Developer Mode',
          type: SettingType.ON_OFF,
          settingId: 'devModeEnabled',
          getState: () => {
            return devModeEnabled
          },
          onUpdate: v => {
            setDevModeEnabled(v as boolean)
          },
        },
      ],
    },
  ]

  // console.log(AllSettings);

  const {gtMobile} = useBreakpoints()
  return (
    <Layout.Screen>
      <Layout.Header.Outer>
        <Layout.Header.BackButton />
        <Layout.Header.Content>
          <Layout.Header.TitleText>
            Redsky Settings
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
            to="/profile/did:plc:s7cesz7cr6ybltaryy4meb6y">
            @ocbwoy3.dev
          </InlineLinkText>
        </Text>
        <Text style={[a.text_lg, a.pt_xl, a.text_center]}>
          Changing some settings will require an app restart.
        </Text>
        <View style={[a.pt_2xl, a.px_lg, gtMobile && a.px_2xl]}>
          {[...AllSettings, ...otherSettings].map((item, idx) => (
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
                        settingId={s.settingId}
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
        This is a modification of{' '}
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
