import {useMemo} from 'react'

import {useAgeAssuranceContext} from '#/state/ageAssurance'
import {logger} from '#/state/ageAssurance/util'
import {usePreferencesQuery} from '#/state/queries/preferences'
import { getOCbwoy3Settings } from '#/lib/constants'

type AgeAssurance = ReturnType<typeof useAgeAssuranceContext> & {
  /**
   * The age the user has declared in their preferences, if any.
   */
  declaredAge: number | undefined
  /**
   * Indicates whether the user has declared an age under 18.
   */
  isDeclaredUnderage: boolean
}

/**
 * Computed age information based on age assurance status and the user's
 * declared age. Use this instead of {@link useAgeAssuranceContext} to get a
 * more user-friendly interface.
 */
export function useAgeAssurance(): AgeAssurance {
  const aa = useAgeAssuranceContext()
  const {isFetched: preferencesLoaded, data: preferences} =
    usePreferencesQuery()
  const declaredAge = preferences?.userAge

  if (getOCbwoy3Settings().skipModSettingAgeCheck === true) {
    return useMemo(() => {
      return {
        declaredAge: 18,
        isDeclaredUnderage: false,
        isAgeRestricted: false,
        isReady: true,
        status: "assured",
        lastInitiatedAt: new Date().toISOString()
      }
    },[aa, preferencesLoaded, declaredAge])
  }

  if (getOCbwoy3Settings().forceAgeVerification === true) {
    return useMemo(() => {
      return {
        declaredAge: 18,
        isDeclaredUnderage: false,
        isAgeRestricted: true,
        isReady: true,
        status: "pending",
        lastInitiatedAt: new Date().toISOString()
      }
    },[aa, preferencesLoaded, declaredAge])
  }

  return useMemo(() => {
    const isReady = aa.isReady && preferencesLoaded
    const isDeclaredUnderage =
      declaredAge !== undefined ? declaredAge < 18 : false
    const state: AgeAssurance = {
      isReady,
      status: aa.status,
      lastInitiatedAt: aa.lastInitiatedAt,
      isAgeRestricted: aa.isAgeRestricted,
      declaredAge,
      isDeclaredUnderage,
    }
    logger.debug(`state`, state)
    return state
  }, [aa, preferencesLoaded, declaredAge])
}
