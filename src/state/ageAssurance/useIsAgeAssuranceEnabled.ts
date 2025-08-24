import {useMemo} from 'react'

import {useGeolocation} from '#/state/geolocation'
import { getOCbwoy3Settings } from '#/lib/constants'

export function useIsAgeAssuranceEnabled() {
  const {geolocation} = useGeolocation()

  return useMemo(() => {
    return getOCbwoy3Settings().forceAgeVerification ? true : !!geolocation?.isAgeRestrictedGeo
  }, [geolocation])
}
