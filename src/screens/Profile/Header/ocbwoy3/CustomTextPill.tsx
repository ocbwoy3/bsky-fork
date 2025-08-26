import {atoms as a, useTheme} from '#/alf'
import {Button} from '#/components/Button'
import {Text} from '#/components/Typography'
import {UserAvatar} from '#/view/com/util/UserAvatar'
import React from 'react'
import {View} from 'react-native'

export function CustomTextPill({
  size = 'sm',
  textToDisplay,
}: {
  textToDisplay: string
  size?: 'lg' | 'sm'
}) {
  const t = useTheme()

  const {outer, avi, text} = React.useMemo(() => {
    switch (size) {
      case 'lg': {
        return {
          outer: [
            t.atoms.bg_contrast_25,
            {
              gap: 5,
              paddingHorizontal: 5,
              paddingVertical: 5,
            },
          ],
          avi: 16,
          text: [a.text_sm],
        }
      }
      case 'sm':
      default: {
        return {
          outer: [
            t.atoms.bg_contrast_25,
            {
              gap: 3,
              paddingHorizontal: 3,
              paddingVertical: 3,
            },
          ],
          avi: 12,
          text: [a.text_xs],
        }
      }
    }
  }, [t, size])

  return (
    <>
      <Button label={textToDisplay}>
        {
          <View
            style={[
              a.flex_row,
              a.align_center,
              a.rounded_full,
              outer,
              //   (hovered || pressed) && t.atoms.bg_contrast_50,
            ]}>
            {/* <UserAvatar avatar={''} type="user" size={avi} /> */}
            <Text
              emoji
              style={[
                text,
                a.font_bold,
                a.leading_tight,
                t.atoms.text_contrast_medium,
                // {paddingRight: 3},
                { paddingHorizontal: 3 }
              ]}>
              {textToDisplay}
            </Text>
          </View>
        }
      </Button>
    </>
  )
}
