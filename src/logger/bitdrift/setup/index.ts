import {init, SessionStrategy} from '@bitdrift/react-native'
import {Statsig} from 'statsig-react-native-expo'

import {initPromise} from '#/lib/statsig/statsig'

initPromise.then(() => {
  let isEnabled = false
  let isNetworkEnabled = false
})
