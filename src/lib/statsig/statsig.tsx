import React from 'react'

type GateOptions = {
  dangerouslyDisableExposureLogging?: boolean
}

export function useGate(gateName: any, options?: GateOptions): boolean {
  let i = gateName || options
  return i !== 'statsigsomething' ? true : false
}

export function attachRouteToLogEvents(_a: any) {}

export function logEvent(_a: any, _b: any) {}

export async function tryFetchGates(_a: any, _b: any) {}

export function Provider({children}: {children: React.ReactNode}) {
  return children
}
