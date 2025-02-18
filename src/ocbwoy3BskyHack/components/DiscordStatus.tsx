import {Image, StyleSheet, Text, View} from 'react-native'

import {atoms as a, useTheme} from '#/alf'
import {Activity, useStatus} from '../hooks/use-discord-presence'

interface StatusProps {
  allowedApplicationIds?: string[]
  disallowNullApps?: boolean
}

export function OCbwoy3DiscordStatus({
  allowedApplicationIds = [],
  disallowNullApps = true,
}: StatusProps) {
  const status = useStatus()
  const t = useTheme()

  let predicate = (at: Activity) => {
    if (allowedApplicationIds.length === 0) return true
    if (disallowNullApps === true && !at.applicationId) return false
    return allowedApplicationIds.includes(`${at.applicationId}`) ? true : false
  }

  return (
    <View>
      <Text style={[a.text_left, a.align_start]}>
        {(status || {activities: []}).activities.length === 0 ? (
          <></>
        ) : (
          <View
            style={[
              t.atoms.bg_contrast_25,
              {
                paddingVertical: 13,
                paddingHorizontal: 20,
                borderRadius: 8,
                gap: 8,
              },
            ]}>
            {(() => {
              if (!status) return <></>
              const s = status.activities.filter(ac => predicate(ac))[0]
              if (!s) return <></>
              return (
                <View style={styles.statusContainer}>
                  <Image
                    accessibilityIgnoresInvertColors
                    source={{
                      uri: s.assets?.largeImage?.replace(
                        'mp:external',
                        'https://media.discordapp.net/external',
                      ),
                    }}
                    style={[{width: 64, height: 64}, a.rounded_sm]}
                    alt={s.assets?.largeText}
                  />
                  <View style={[a.flex, a.pl_md]}>
                    <Text style={[t.atoms.text_contrast_medium, a.text_xs]}>
                      {s.name}
                    </Text>
                    <Text style={[t.atoms.text, a.font_bold, a.text_lg]}>
                      {s.details}
                    </Text>
                    <Text style={[t.atoms.text_contrast_high, a.text_sm]}>
                      {s.state}
                    </Text>
                  </View>
                </View>
              )
            })()}
          </View>
        )}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: '#base',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  name: {
    color: '#blue',
    fontSize: 12,
  },
  details: {
    fontSize: 12,
  },
  state: {
    fontSize: 12,
  },
  progressBarContainer: {
    backgroundColor: '#mantle',
    borderRadius: 4,
    height: 4,
    marginTop: 4,
  },
  progressBar: {
    backgroundColor: '#blue',
    height: 4,
    borderRadius: 4,
  },
})
