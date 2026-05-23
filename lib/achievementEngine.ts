import {
  supabase,
} from "@/lib/supabase/client"

import {
  addNotification,
} from "@/lib/notifications"

export async function checkAchievements() {

  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser()

  if (!user)
    return

  /* LOAD DATA */

  const {
    data: habits,
  } = await supabase
    .from("habits")
    .select("*")
    .eq(
      "user_id",
      user.id
    )

  const {
    data: tasks,
  } = await supabase
    .from("tasks")
    .select("*")
    .eq(
      "user_id",
      user.id
    )

  const {
    data: sessions,
  } = await supabase
    .from("focus_sessions")
    .select("*")
    .eq(
      "user_id",
      user.id
    )

  const {
    data: achievements,
  } = await supabase
    .from("achievements")
    .select("*")
    .eq(
      "user_id",
      user.id
    )

  const unlockedTitles =
    achievements?.map(
      (a) => a.title
    ) || []

  async function unlockAchievement(
    title: string,
    description: string,
    xp: number,
    badge: string
  ) {

    if (
      unlockedTitles.includes(
        title
      )
    ) {
      return
    }
const {
  data: {
    user,
  },
} = await supabase
  .auth
  .getUser()

if (!user)
  return

await supabase
      .from("achievements")
      .insert({

        title,

        description,

        xp,

        badge,

        unlocked: true,

        user_id:
          user.id,

        unlocked_at:
          new Date()
            .toISOString(),
      })

    addNotification({

      type:
        "default" as any,

      title:
        "Achievement Unlocked",

      message:
        `🏆 ${title} • +${xp} XP`,
    })
  }

  /* HABITS */

  const activeHabits =
    habits?.length || 0

  const highestStreak =
    Math.max(
      ...(habits?.map(
        (h) => h.streak
      ) || [0])
    )

  if (activeHabits >= 5) {

    unlockAchievement(

      "Consistency Master",

      "Track 5 active habits.",

      150,

      "🔥"
    )
  }

  if (highestStreak >= 7) {

    unlockAchievement(

      "7 Day Streak",

      "Maintain a productivity streak for 7 days.",

      200,

      "⚡"
    )
  }

  if (highestStreak >= 30) {

    unlockAchievement(

      "Productivity Beast",

      "Reach a 30-day streak.",

      500,

      "👑"
    )
  }

  /* TASKS */

  const completedTasks =
    tasks?.filter(
      (task) =>
        task.completed
    ).length || 0

  if (
    completedTasks >= 25
  ) {

    unlockAchievement(

      "Task Crusher",

      "Complete 25 tasks.",

      250,

      "✅"
    )
  }

  /* FOCUS */

  const focusSessions =
    sessions?.filter(
      (
        session
      ) =>
        session.mode !==
        "Break"
    ).length || 0

  if (
    focusSessions >= 10
  ) {

    unlockAchievement(

      "Deep Focus",

      "Complete 10 focus sessions.",

      300,

      "🧠"
    )
  }
}