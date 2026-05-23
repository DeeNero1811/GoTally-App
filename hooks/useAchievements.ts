"use client"

import {
  useEffect,
  useState,
} from "react"

type Props = {
  completedTasks: number
  streak: number
  focusSessions: number
  productivityScore: number
}

export default function useAchievements({
  completedTasks,
  streak,
  focusSessions,
  productivityScore,
}: Props) {

  const [achievement, setAchievement] =
    useState<{
      title: string
      description: string
    } | null>(null)

  useEffect(() => {

    /* TASK ACHIEVEMENTS */

    if (
      completedTasks === 1
    ) {

      setAchievement({
        title:
          "First Task Complete",
        description:
          "You completed your very first task in GoTaskly.",
      })
    }

    if (
      completedTasks === 10
    ) {

      setAchievement({
        title:
          "Task Machine",
        description:
          "Completed 10 tasks successfully.",
      })
    }

    /* STREAK */

    if (
      streak === 7
    ) {

      setAchievement({
        title:
          "7 Day Streak",
        description:
          "Consistency is building momentum.",
      })
    }

    if (
      streak === 30
    ) {

      setAchievement({
        title:
          "Discipline Master",
        description:
          "30-day productivity streak achieved.",
      })
    }

    /* FOCUS */

    if (
      focusSessions === 5
    ) {

      setAchievement({
        title:
          "Deep Work Initiated",
        description:
          "Completed 5 focus sessions.",
      })
    }

    if (
      focusSessions === 20
    ) {

      setAchievement({
        title:
          "Focus Elite",
        description:
          "20 deep focus sessions completed.",
      })
    }

    /* PRODUCTIVITY */

    if (
      productivityScore >= 90
    ) {

      setAchievement({
        title:
          "Peak Productivity",
        description:
          "Your productivity score exceeded 90%.",
      })
    }

  }, [
    completedTasks,
    streak,
    focusSessions,
    productivityScore,
  ])

  return {
    achievement,
    clearAchievement: () =>
      setAchievement(null),
  }
}