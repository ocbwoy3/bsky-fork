import { Fragment, JSX } from 'react'
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
import { useDevMode } from '#/storage/hooks/dev-mode'
import { WTF } from './ocbwoy3/wtf'

enum SettingType {
  ON_OFF = 1,
  STRING = 2,
}

type Setting = {
  name: string
  type: SettingType
  settingId: string
  desc: string
  disabled?: boolean
  onUpdate: (v: string | boolean) => any
  getState: () => string | boolean
}

enum SettingCategoryType {
  GROUP = 1,
  COMPONENT = 2
}

type SettingCategory = {
  title: string
  type: SettingCategoryType,
  com?: JSX.Element,
  settings: Setting[]
}

type BskyPersistedStateContext = persisted.Schema

function createToggleOptionBluesky(
  name: string,
  value: keyof BskyPersistedStateContext,
  desc?: string,
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
  value: keyof typeof DummyOCbwoy3SettingsSchema | 'dummyOpt',
  desc?: string,
  disable?: boolean,
  forcedState?: boolean,
): Setting {
  return {
    name,
    type: SettingType.ON_OFF,
    desc: desc || value,
    settingId: value,
    disabled: !!disable,
    getState: () => {
      return (
        forcedState ?? ((device.get(['ocbwoy3']) as any) || {})[value] ?? false
      )
    },
    onUpdate: (v: string | boolean) => {
      if (!!disable) return
      let b: any = device.get(['ocbwoy3']) || {}
      b[value] = v as boolean
      device.set(['ocbwoy3'], b)
    },
  }
}

const AllSettings: SettingCategory[] = [
  {
    title: 'AT Protocol fuckery',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Disable Region-specific labelers',
        'disableAppLabelers',
        'e.g. labelers required in your country/region',
      ),
      createToggleOption(
        "Disable Bluesky's Labeler",
        'disableBlueskyLabelerAtproto',
        // 'Disables the default Bluesky labeler'
      ),
      createToggleOption(
        'Infinite labelers',
        'increaseLabelerLimit',
        'Uncap the labeler limit. Will break Bluesky or ATProto.',
      )
    ],
  },
  {
    title: 'wip',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'enableGoodAppLabelers',
        'enableGoodAppLabelers'
      ),
      createToggleOption(
        'profileShowcaseButtons',
        'profileShowcaseButtons',
        'Experimental support for dev.ocbwoy3.bsky.showcaseButtons',
      ),
    ],
  },
  {
    title: 'QOL',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Restore Backdated posts',
        'restoreBackdatedPosts',
        "Show a post's self-identified timestamp",
      ),
      createToggleOption(
        'Bypass !hide label',
        'bypassHideWarning',
        'Bypasses content hidden by labelers. Might not work.',
      ),
      createToggleOption(
        'Bluesky for iPhone',
        'blueskyForWeb',
        'Let users see what device you post from',
      ),
    ],
  },
  {
    title: 'Fun',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Fix Trending',
        'fixTrending',
        "Lock in, don't get distracted",
      )
      // createToggleOption('Skeets', 'skeets', 'Rename posts to skeets'), // too lazy rn
    ],
  },
  {
    title: 'Verifications',
    type: SettingCategoryType.GROUP,
    settings: [
      createToggleOption(
        'Cancel NYT & The Guardian',
        'unverifyNyt',
        'They don\'t deserve the blue check',
      ),
    ],
  },
]

type Props = NativeStackScreenProps<CommonNavigatorParams, 'BskyHackSettings'>
export function BskyHackSettingsScreen({ }: Props) {
  const t = useTheme()
  const [devModeEnabled, setDevModeEnabled] = useDevMode()

  const otherSettings: SettingCategory[] = [
    {
      title: 'Bluesky Settings',
      type: SettingCategoryType.GROUP,
      settings: [
        createToggleOptionBluesky(
          'Disable Trending',
          'trendingDisabled',
          'Disables the trending topics list',
        ),
        createToggleOptionBluesky(
          'Kawaii',
          'kawaii',
          'Changes the Bluesky logo to be kawaii',
        ),
        createToggleOption(
          'Bypass age verification',
          'skipModSettingAgeCheck',
          'Lets you enable NSFW, bypasses UK mode',
        ),
        {
          name: 'Developer Mode',
          settingId: 'devMode',
          desc: 'Shows some developer options (e.g. Copy DID)',
          onUpdate: n => {
            setDevModeEnabled(n as boolean)
          },
          type: SettingType.ON_OFF,
          getState: () => {
            return devModeEnabled.valueOf()
          },
        },
        // createToggleOption('Force Age Verification', 'forceAgeVerification', 'Foces you to verify your ID'),
      ],
    },
    {
      title: 'OCbwoy3 Stuff',
      type: SettingCategoryType.COMPONENT,
      com: <WTF />,
      settings: [],
    }
  ]

  // console.log(AllSettings);

  const { gtMobile } = useBreakpoints()
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
        <Text style={[a.text_2xl, a.pt_xl, a.text_center]}>Bluesky Mod</Text>
        <Text style={[a.text_lg, a.pt_xl, a.text_center]}>
          Made by{' '}
          <InlineLinkText
            style={[a.text_lg]}
            label="@ocbwoy3.dev"
            to="/profile/did:plc:s7cesz7cr6ybltaryy4meb6y">
            @ocbwoy3.dev
          </InlineLinkText>
          , some settings require app restart
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
              {
                item.type === SettingCategoryType.COMPONENT && item.com
                  ? <View style={[a.pt_md]}>{item.com}</View>
                  : <View
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
                            disabled={!!s.disabled}
                            settingId={s.settingId}
                            getState={s.getState}
                            onUpdate={s.onUpdate}
                          />
                        </View>
                      ))}
                    </View>
                  </View>
              }
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
          .<br />
          We claim no association with Bluesky Social PBC. Use at your own risk.
        </Text>
      </Layout.Content>
    </Layout.Screen>
  )
}
