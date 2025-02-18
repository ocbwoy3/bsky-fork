import {useEffect, useState} from 'react'

import {logger} from '#/logger'

let currentStatus: any = null
let subscribers: ((status: any) => void)[] = []
let intervalId: NodeJS.Timeout | null = null

export type Activity = {
  name: string
  type: number
  url?: string
  details?: string
  state?: string
  applicationId?: string
  timestamps?: {
    start?: string
    end?: string
  }
  party?: any
  syncId?: any
  assets?: {
    largeText?: string
    smallText?: string
    largeImage?: string
    smallImage?: string
  }
  flags: number
  emoji: any
  buttons: any[]
  createdTimestamp: string
}

export type UserPresence = {
  userId: string
  guildId: string
  status: string
  activities: Activity[]
  clientStatus: any
}

const fetchStatus = async () => {
  try {
    const response = await fetch('https://api.ocbwoy3.dev/ocbwoy3dev/rpc.json')
    const data = await response.json()
    currentStatus = data
    subscribers.forEach(callback => callback(currentStatus))
  } catch (error) {
    currentStatus = null
    subscribers.forEach(callback => callback(null))
    logger.error(`Failed to fetch status: ${error}`)
  }
}

const startFetching = () => {
  if (!intervalId) {
    fetchStatus() // Initial fetch
    intervalId = setInterval(fetchStatus, 500) // Fetch every 0.5 seconds
  }
}

export function useStatus() {
  const [status, setStatus] = useState<UserPresence>(currentStatus)

  useEffect(() => {
    subscribers.push(setStatus)
    startFetching()

    return () => {
      subscribers = subscribers.filter(callback => callback !== setStatus)
      if (subscribers.length === 0 && intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }
  }, [])

  return status
}
