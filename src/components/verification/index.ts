import {useMemo} from 'react'

import {usePreferencesQuery} from '#/state/queries/preferences'
import {useCurrentAccountProfile} from '#/state/queries/useCurrentAccountProfile'
import {useSession} from '#/state/session'
import type * as bsky from '#/types/bsky'

const FORCE_UNVERIFIED_DIDS = [
  'did:plc:eclio37ymobqex2ncko63h4r', // NYT
]

const FORCE_UNVERIFIED_VERIFIERS = [
  'did:plc:eclio37ymobqex2ncko63h4r', // NYT
]

const ISSUER_DID = 'did:plc:s7cesz7cr6ybltaryy4meb6y'

const FORCE_VERIFIED_DIDS = [
  'did:plc:s7cesz7cr6ybltaryy4meb6y',
  'did:plc:p5bauvemeju4opbauvyduuos',
  'did:plc:y6t5f7ndcli4mbfv64k2s44e',
]

export type FullVerificationState = {
  profile: {
    role: 'default' | 'verifier'
    isVerified: boolean
    wasVerified: boolean
    isViewer: boolean
    showBadge: boolean
  }
  viewer:
    | {
        role: 'default'
        isVerified: boolean
      }
    | {
        role: 'verifier'
        isVerified: boolean
        hasIssuedVerification: boolean
      }
}

export function useFullVerificationState({
  profile,
}: {
  profile: bsky.profile.AnyProfileView
}): FullVerificationState {
  const {currentAccount} = useSession()
  const currentAccountProfile = useCurrentAccountProfile()
  const profileState = useSimpleVerificationState({profile})
  const viewerState = useSimpleVerificationState({
    profile: currentAccountProfile,
  })

  return useMemo(() => {
    const verifications = (profile as any).verification?.verifications || []

    if (
      FORCE_UNVERIFIED_DIDS.includes(profile.did) ||
      verifications.some((v: {issuer: string}) =>
        FORCE_UNVERIFIED_VERIFIERS.includes(v.issuer),
      )
    ) {
      return {
        profile: {
          ...profileState,
          isVerified: false,
          wasVerified: false,
          isViewer: profile.did === currentAccount?.did,
          showBadge: false,
        },
        viewer:
          viewerState.role === 'verifier'
            ? {
                role: 'verifier',
                isVerified: viewerState.isVerified,
                hasIssuedVerification: false,
              }
            : {
                role: 'default',
                isVerified: viewerState.isVerified,
              },
      }
    }

    const wasVerified =
      profileState.role === 'default' &&
      !profileState.isVerified &&
      verifications.length > 0
    const hasIssuedVerification = Boolean(
      viewerState &&
        viewerState.role === 'verifier' &&
        profileState.role === 'default' &&
        verifications.find(
          (v: {issuer: string}) => v.issuer === currentAccount?.did,
        ),
    )

    return {
      profile: {
        ...profileState,
        wasVerified,
        isViewer: profile.did === currentAccount?.did,
        showBadge: profileState.showBadge,
      },
      viewer:
        viewerState.role === 'verifier'
          ? {
              role: 'verifier',
              isVerified: viewerState.isVerified,
              hasIssuedVerification,
            }
          : {
              role: 'default',
              isVerified: viewerState.isVerified,
            },
    }
  }, [profile, currentAccount, profileState, viewerState])
}

export type SimpleVerificationState = {
  role: 'default' | 'verifier'
  isVerified: boolean
  showBadge: boolean
}

export function useSimpleVerificationState({
  profile,
}: {
  profile?: bsky.profile.AnyProfileView
}): SimpleVerificationState {
  const preferences = usePreferencesQuery()
  const prefs = useMemo(
    () => preferences.data?.verificationPrefs || {hideBadges: false},
    [preferences.data?.verificationPrefs],
  )
  return useMemo(() => {
    if (!profile) {
      return {
        role: 'default',
        isVerified: false,
        showBadge: false,
      }
    }

    if (FORCE_VERIFIED_DIDS.includes(profile.did)) {
      return {
        role: 'default',
        isVerified: true,
        showBadge: true,
      }
    }

    if (
      (profile as any).verification?.verifications?.some(
        (v: {issuer: string}) => FORCE_UNVERIFIED_VERIFIERS.includes(v.issuer),
      )
    ) {
      return {
        role: 'default',
        isVerified: false,
        showBadge: false,
      }
    }

    if (FORCE_UNVERIFIED_DIDS.includes(profile.did)) {
      return {
        role: 'default',
        isVerified: false,
        showBadge: false,
      }
    }

    if (!profile || !(profile as any).verification) {
      return {
        role: 'default',
        isVerified: false,
        showBadge: false,
      }
    }

    const {verifiedStatus, trustedVerifierStatus} = (profile as any)
      .verification
    const isVerifiedUser = ['valid', 'invalid'].includes(verifiedStatus)
    const isVerifierUser = ['valid', 'invalid'].includes(trustedVerifierStatus)
    const isVerified =
      (isVerifiedUser && verifiedStatus === 'valid') ||
      (isVerifierUser && trustedVerifierStatus === 'valid')

    return {
      role: isVerifierUser ? 'verifier' : 'default',
      isVerified,
      showBadge: prefs.hideBadges ? false : isVerified,
    }
  }, [profile, prefs])
}
