"use client"

import {
  useEffect,
  useState,
} from "react"

type Props = {
  completedTasks: number
  streak: number
  focusSessions: number
}

export default function useXP({
  completedTasks,
  streak,
  focusSessions,
}: Props) {

  const [xp, setXP] =
    useState(0)

  const [level, setLevel] =
    useState(1)

  useEffect(() => {

    const calculatedXP =

      (
        completedTasks * 25
      ) +

      (
        streak * 15
      ) +

      (
        focusSessions * 20
      )

    setXP(
      calculatedXP
    )

    const calculatedLevel =
      Math.max(
        1,
        Math.floor(
          calculatedXP / 250
        ) + 1
      )

    setLevel(
      calculatedLevel
    )

  }, [
    completedTasks,
    streak,
    focusSessions,
  ])

  return {
    xp,
    level,
    nextLevelXP:
      level * 250,
  }
}