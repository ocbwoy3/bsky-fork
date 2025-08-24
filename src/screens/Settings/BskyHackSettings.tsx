import { Fragment } from 'react'
import { View } from 'react-native'

import { CommonNavigatorParams, NativeStackScreenProps } from '#/lib/routes/types'
import * as persisted from '#/state/persisted'
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
  settingId: string,
  desc: string
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
  desc?: string
): Setting {
  return {
    name,
    type: SettingType.ON_OFF,
    settingId: value,
    desc: desc || value,
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
  desc?: string
): Setting {
  return {
    name,
    type: SettingType.ON_OFF,
    desc: desc || value,
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
    title: 'Labeler / AT Protocol fuckery',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Disable Region-specific labelers',
        'disableAppLabelers',
        'Prevents Bluesky from applying additional labelers'
      ),
      createToggleOption(
        'Disable Bluesky Moderation',
        'disableBlueskyLabelerAtproto',
        'Disables the default Bluesky labeler'
      ),
      createToggleOption('Infinite labeler limit', 'increaseLabelerLimit', 'Lets you add unlimited labelers. Might break ATProto.'),
    ],
  },
  {
    title: 'QOL',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption('Restore Backdated posts', 'restoreBackdatedPosts', 'Show a post\'s self-identified timestamp'),
      createToggleOption('Bypass !warn, !hide', 'bypassHideWarning', 'Bypasses content hidden by labelers. Might not work.'),
      createToggleOption('Bluesky for iPhone', 'blueskyForWeb', 'Let users see what device you post from'),
    ],
  },
  {
    title: 'Fun',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption('Fix Trending', 'fixTrending', 'Show interesting topics'),
      // createToggleOption('Skeets', 'skeets', 'Rename posts to skeets'), // too lazy rn
    ],
  },
]

type Props = NativeStackScreenProps<CommonNavigatorParams, 'BskyHackSettings'>
export function BskyHackSettingsScreen({}: Props) {
  const t = useTheme()

  const otherSettings: SettingCategory[] = [
    {
      title: 'Bluesky Settings',
      type: SettingCategoryType.GROUP,
      settings: [
        createToggleOptionBluesky('Disable Trending', 'trendingDisabled', 'Disables the trending topics list'),
        createToggleOptionBluesky('Kawaii', 'kawaii', 'Changes the Bluesky logo to be kawaii'),
        createToggleOption('Unverify the New York Times', 'unverifyNyt', 'Why verify them in the first place?'),
        createToggleOption('Bypass age verification', 'skipModSettingAgeCheck', 'Lets you enable NSFW, bypasses UK mode'),
        createToggleOption('UK Mode', 'forceAgeVerification', 'Foces you into verifying your ID'),
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
            Super Secret Dev Menu
          </Layout.Header.TitleText>
        </Layout.Header.Content>
        <Layout.Header.Slot />
      </Layout.Header.Outer>
      <Layout.Content>
        <Text style={[a.text_2xl, a.pt_xl, a.text_center]}>
          Bluesky Mod
        </Text>
        <Text style={[a.text_lg, a.pt_xl, a.text_center]}>
          Made by <InlineLinkText
            style={[a.text_lg]}
            label="@ocbwoy3.dev"
            to="/profile/did:plc:s7cesz7cr6ybltaryy4meb6y">
            @ocbwoy3.dev
          </InlineLinkText>, some settings require app restart
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
                        desc={s.desc}
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
          </InlineLinkText>.<br/>We claim no association with Bluesky Social PBC. Use at your own risk.
        </Text>
      </Layout.Content>
    </Layout.Screen>
  )
}
