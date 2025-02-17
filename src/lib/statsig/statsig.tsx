import React from 'react'

import {LogEvents} from './events'
import {Gate} from './gates'

export const initPromise = initialize()

export type {LogEvents}

type FlatJSONRecord = Record<
  string,
  | string
  | number
  | boolean
  | null
  | undefined
  // Technically not scalar but Statsig will stringify it which works for us:
  | string[]
>

export function attachRouteToLogEvents(
  _getRouteName: () => string | null | undefined,
) {}

export function toClout(n: number | null | undefined): number | undefined {
  if (n == null) {
    return undefined
  } else {
    return Math.max(0, Math.round(Math.log(n)))
  }
}

export function logEvent<E extends keyof LogEvents>(
  _eventName: E & string,
  _rawMetadata: LogEvents[E] & FlatJSONRecord,
) {}

type GateOptions = {
  dangerouslyDisableExposureLogging?: boolean
}

export function useGate(): (
  _gateName: Gate,
  _options?: GateOptions,
) => boolean {
  const gate = React.useCallback(
    (gateName: Gate, _options: GateOptions = {}): boolean => {
      return false
    },
    [],
  )
  return gate
}

/**
 * Debugging tool to override a gate. USE ONLY IN E2E TESTS!
 */
export function useDangerousSetGate(): (
  gateName: Gate,
  value: boolean,
) => void {
  const dangerousSetGate = React.useCallback(
    (_gateName: Gate, _value: boolean) => {},
    [],
  )
  return dangerousSetGate
}

export async function tryFetchGates(
  _did: string | undefined,
  _strategy: 'prefer-low-latency' | 'prefer-fresh-gates',
) {}

export function initialize() {}

export function Provider({children}: {children: React.ReactNode}) {
  return children
}
