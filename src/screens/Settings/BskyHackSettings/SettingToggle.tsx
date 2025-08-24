import React from 'react'
import {Text, View} from 'react-native'
import {Trans} from '@lingui/macro'

import {atoms as a} from '#/alf'
import {useTheme} from '#/alf/index'
import * as Toggle from '#/components/forms/Toggle'

interface SettingToggleProps {
  name: string
  settingId: string
  desc: string
  onUpdate: (value: boolean) => void
  getState: () => string | boolean
}

export const OCbwoy3BskyHackSettingToggle: React.FC<SettingToggleProps> = ({
  name,
  settingId,
  desc,
  onUpdate,
  getState,
}) => {
  const t = useTheme()
  const [toggleValue, setToggleValue] = React.useState(getState())

  const handleToggleChange = (newValue: boolean) => {
    setToggleValue(newValue)
    onUpdate(newValue)
  }
  return (
    <View
      style={[a.py_lg, a.px_lg, a.flex_row, a.align_center, a.justify_between]}>
      <View style={[a.flex]}>
        <Text style={[a.font_bold, t.atoms.text_contrast_high]}>{name}</Text>
        <Text
          style={
            settingId === desc
              ? [
                  a.text_xs,
                  t.atoms.text_contrast_medium,
                  {fontFamily: 'SF Mono, monospace'},
                ]
              : [
                a.text_sm,
                t.atoms.text_contrast_high,
                {fontFamily: "SF Pro Display, sans-serif"}
              ]
          }>
          {desc}
        </Text>
      </View>
      <Toggle.Item
        label={settingId}
        name={name}
        value={toggleValue as boolean}
        onChange={handleToggleChange}>
        <View style={[a.flex_row, a.align_center, a.gap_sm]}>
          <Text style={[t.atoms.text_contrast_medium]}>
            {toggleValue ? <Trans>Enabled</Trans> : <Trans>Disabled</Trans>}
          </Text>
          <Toggle.Switch />
        </View>
      </Toggle.Item>
    </View>
  )
}
