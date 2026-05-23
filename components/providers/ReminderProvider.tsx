"use client"

import {
  useEffect,
} from "react"

import {
  startReminderEngine,
} from "@/lib/reminderEngine"

export default function
ReminderProvider() {

  useEffect(() => {

    startReminderEngine()

  }, [])

  return null
}