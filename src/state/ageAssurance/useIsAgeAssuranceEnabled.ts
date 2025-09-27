import {useMemo} from 'react'

import {useGeolocationStatus} from '#/state/geolocation'
import {getOCbwoy3Settings} from '#/lib/constants'

export function useIsAgeAssuranceEnabled() {
  const {status: geolocation} = useGeolocationStatus()

  return useMemo(() => {
    return getOCbwoy3Settings().forceAgeVerification ? true : !!geolocation?.isAgeRestrictedGeo
  }, [geolocation])
}
