"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  Brain,
  TrendingUp,
  AlertTriangle,
  Target,
  Flame,
  Timer,
  CalendarDays,
  Trophy,
  CheckCircle2,
  Activity,
  Clock3,
  BarChart3,
} from "lucide-react"

import {
  supabase,
} from "../../lib/supabase/client"

type Task = {
  completed: boolean
  priority: string
  title?: string
}

type Habit = {
  completed: boolean
  streak: number
  title?: string
}

type InsightCard = {
  title: string
  description: string
  icon: any
  color: string
  bg: string
}

type ActivityItem = {
  title: string
  description: string
  time: string
  icon: any
  color: string
  bg: string
}

export default function AIInsightsPanel() {

  const [mounted, setMounted] =
    useState(false)

  const [insights, setInsights] =
    useState<InsightCard[]>([])

  const [activities, setActivities] =
    useState<ActivityItem[]>([])

  useEffect(() => {

    setMounted(true)

    loadInsights()

    const channel =
      supabase
        .channel(
          "ai-insights-live"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          loadInsights
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "habits",
          },
          loadInsights
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "focus_sessions",
          },
          loadInsights
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "planner_events",
          },
          loadInsights
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadInsights() {

    const {
      data: authData,
    } = await supabase.auth.getUser()

    const user =
      authData.user

    if (!user)
      return

    /* TASKS */

    const {
      data: taskData,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    /* HABITS */

    const {
      data: habitData,
    } = await supabase
      .from("habits")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    /* FOCUS */

    const {
      data: focusData,
    } = await supabase
      .from("focus_sessions")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    /* PLANNER */

    const {
      data: plannerData,
    } = await supabase
      .from("planner_events")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    const tasks =
      taskData || []

    const habits =
      habitData || []

    const focusSessions =
      focusData?.filter(
        (
          session: any
        ) =>
          session.completed
      ).length || 0

    const plannerEvents =
      plannerData || []

    /* ANALYTICS */

    const completedTasks =
      tasks.filter(
        (
          task: Task
        ) =>
          task.completed
      ).length

    const completedHabits =
      habits.filter(
        (
          habit: Habit
        ) =>
          habit.completed
      ).length

    const highPriorityPending =
      tasks.filter(
        (
          task: Task
        ) =>
          task.priority ===
            "High" &&
          !task.completed
      ).length

    const bestStreak =
      habits.length > 0
        ? Math.max(
            ...habits.map(
              (
                habit: Habit
              ) =>
                habit.streak
            )
          )
        : 0

    /* PRODUCTIVITY */

    const totalCompleted =
      completedTasks +
      completedHabits +
      focusSessions

    const totalItems =
      tasks.length +
      habits.length +
      plannerEvents.length +
      1

    const productivity =
      Math.min(
        100,
        Math.round(
          (
            totalCompleted /
            totalItems
          ) * 100
        )
      )

    /* INSIGHTS */

    const generatedInsights: InsightCard[] =
      []

    if (
      productivity >= 75
    ) {

      generatedInsights.push({
        title:
          "Peak Productivity",
        description:
          `🚀 Your productivity score reached ${productivity}% this week.`,
        icon:
          Trophy,
        color:
          "text-yellow-500",
        bg:
          "bg-yellow-100 dark:bg-yellow-500/20",
      })

    } else if (
      productivity >= 45
    ) {

      generatedInsights.push({
        title:
          "Strong Momentum",
        description:
          "📈 Productivity consistency continues improving steadily.",
        icon:
          TrendingUp,
        color:
          "text-green-500",
        bg:
          "bg-green-100 dark:bg-green-500/20",
      })

    } else {

      generatedInsights.push({
        title:
          "Productivity Alert",
        description:
          "⚠️ AI recommends improving daily task consistency.",
        icon:
          AlertTriangle,
        color:
          "text-orange-500",
        bg:
          "bg-orange-100 dark:bg-orange-500/20",
      })
    }

    if (
      highPriorityPending > 0
    ) {

      generatedInsights.push({
        title:
          "Priority Focus",
        description:
          `🔥 ${highPriorityPending} high-priority tasks still require attention.`,
        icon:
          Target,
        color:
          "text-red-500",
        bg:
          "bg-red-100 dark:bg-red-500/20",
      })
    }

    if (
      bestStreak >= 1
    ) {

      generatedInsights.push({
        title:
          "Habit Momentum",
        description:
          `🏆 Best habit streak reached ${bestStreak} days.`,
        icon:
          Flame,
        color:
          "text-orange-500",
        bg:
          "bg-orange-100 dark:bg-orange-500/20",
      })
    }

    if (
      focusSessions >= 1
    ) {

      generatedInsights.push({
        title:
          "Deep Work Active",
        description:
          `🧠 ${focusSessions} focus sessions improved productivity efficiency.`,
        icon:
          Timer,
        color:
          "text-purple-500",
        bg:
          "bg-purple-100 dark:bg-purple-500/20",
      })
    }

    if (
      plannerEvents.length >= 1
    ) {

      generatedInsights.push({
        title:
          "Planning Discipline",
        description:
          "📅 Planner activity indicates strong organization consistency.",
        icon:
          CalendarDays,
        color:
          "text-blue-500",
        bg:
          "bg-blue-100 dark:bg-blue-500/20",
      })
    }

    setInsights(
      generatedInsights
    )

    /* ACTIVITY FEED */

    const generatedActivities: ActivityItem[] =
      []

    generatedActivities.push({
      title:
        "Dashboard Analytics Updated",
      description:
        "AI recalculated your productivity metrics.",
      time:
        "Just now",
      icon:
        BarChart3,
      color:
        "text-indigo-500",
      bg:
        "bg-indigo-100 dark:bg-indigo-500/20",
    })

    if (
      completedTasks > 0
    ) {

      generatedActivities.push({
        title:
          "Tasks Completed",
        description:
          `${completedTasks} tasks completed successfully.`,
        time:
          "2 mins ago",
        icon:
          CheckCircle2,
        color:
          "text-green-500",
        bg:
          "bg-green-100 dark:bg-green-500/20",
      })
    }

    if (
      completedHabits > 0
    ) {

      generatedActivities.push({
        title:
          "Habit Progress Increased",
        description:
          `${completedHabits} habits completed today.`,
        time:
          "12 mins ago",
        icon:
          Flame,
        color:
          "text-orange-500",
        bg:
          "bg-orange-100 dark:bg-orange-500/20",
      })
    }

    if (
      focusSessions > 0
    ) {

      generatedActivities.push({
        title:
          "Focus Session Finished",
        description:
          `${focusSessions} deep work sessions completed.`,
        time:
          "28 mins ago",
        icon:
          Timer,
        color:
          "text-purple-500",
        bg:
          "bg-purple-100 dark:bg-purple-500/20",
      })
    }

    setActivities(
      generatedActivities
    )
  }

  if (!mounted) {

    return null
  }

  return (

    <section className="space-y-8">

      {/* HEADER */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <Sparkles
          className="
            text-indigo-500
          "
          size={26}
        />

        <div>

          <h2
            className="
              text-3xl
              font-bold
            "
          >
            AI Intelligence Center
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Real-time productivity analysis and activity intelligence
          </p>

        </div>

      </div>

      {/* INSIGHTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >

        {
          insights.map(
            (
              insight,
              index
            ) => {

              const Icon =
                insight.icon

              return (

                <motion.div

                  key={index}

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.08,
                  }}

                  className="
                    relative
                    overflow-hidden

                    rounded-[32px]

                    border

                    bg-white
                    dark:bg-[#111827]

                    p-6

                    hover:shadow-2xl

                    transition-all
                    duration-300

                    hover:-translate-y-1
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0

                      w-24
                      h-24

                      rounded-full

                      bg-white/5

                      blur-2xl
                    "
                  />

                  <div
                    className={`
                      w-14
                      h-14

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      mb-5

                      ${insight.bg}
                    `}
                  >

                    <Icon
                      className={`
                        w-7
                        h-7

                        ${insight.color}
                      `}
                    />

                  </div>

                  <h3
                    className="
                      text-lg
                      font-semibold
                      mb-3
                    "
                  >
                    {insight.title}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      leading-relaxed
                    "
                  >
                    {
                      insight.description
                    }
                  </p>

                </motion.div>

              )
            }
          )
        }

      </div>

    </section>

  )
}