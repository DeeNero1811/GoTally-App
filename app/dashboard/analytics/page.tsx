"use client"
export const dynamic =
  "force-dynamic"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  TrendingUp,
  CheckCircle2,
  Brain,
  Timer,
  Sparkles,
  Clock3,
  Calendar,
  AlertTriangle,
} from "lucide-react"

import {
  supabase,
} from "../../../lib/supabase/client"

import {
  generateAIInsights,
} from "@/lib/aiInsights"

type Task = {
  completed: boolean
  status: string
  due_date: string | null
}

type Habit = {
  streak: number
  completed: boolean
}

type FocusSession = {
  completed: boolean
}

type PlannerEvent = {
  status: string
}

export default function AnalyticsPage() {

  const [
    productivity,
    setProductivity,
  ] = useState(0)

  const [
    completedTasks,
    setCompletedTasks,
  ] = useState(0)

  const [
    pendingTasks,
    setPendingTasks,
  ] = useState(0)

  const [
    overdueTasks,
    setOverdueTasks,
  ] = useState(0)

  const [
    plannerEvents,
    setPlannerEvents,
  ] = useState(0)

  const [
    bestStreak,
    setBestStreak,
  ] = useState(0)

  const [
    focusSessions,
    setFocusSessions,
  ] = useState(0)

  const [
    insights,
    setInsights,
  ] = useState<string[]>([])

  const [
    mounted,
    setMounted,
  ] = useState(false)

  useEffect(() => {

    setMounted(true)

    loadAnalytics()

    const channel =
      supabase
        .channel(
          "analytics-realtime"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          loadAnalytics
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "habits",
          },
          loadAnalytics
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "focus_sessions",
          },
          loadAnalytics
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "planner_events",
          },
          loadAnalytics
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadAnalytics() {

    const {
      data: authData,
    } = await supabase
      .auth
      .getUser()

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
      .neq(
        "status",
        "archived"
      )

    const tasks =
      taskData || []

    const habits =
      habitData || []

    const planner =
      plannerData || []

    const focus =
      focusData?.filter(
        (
          session: FocusSession
        ) =>
          session.completed
      ) || []

    /* COMPLETED */

    const completed =
      tasks.filter(
        (
          task: Task
        ) =>
          task.status ===
          "completed"
      ).length

    /* PENDING */

    const pending =
      tasks.filter(
        (
          task: Task
        ) =>

          task.status ===
            "todo" ||

          task.status ===
            "progress"
      ).length

    /* OVERDUE */

    const overdue =
      tasks.filter(
        (
          task: Task
        ) =>

          task.status !==
            "completed" &&

          task.due_date &&

          new Date(
            task.due_date
          ) < new Date()
      ).length

    /* STREAK */

    const streak =
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

    setCompletedTasks(
      completed
    )

    setPendingTasks(
      pending
    )

    setOverdueTasks(
      overdue
    )

    setPlannerEvents(
      planner.length
    )

    setBestStreak(
      streak
    )

    setFocusSessions(
      focus.length
    )

    const score =
      Math.min(
        100,
        Math.round(
          (
            (
              completed +
              streak +
              focus.length
            ) /
            (
              tasks.length +
              habits.length +
              1
            )
          ) * 100
        )
      )

    setProductivity(
      score
    )

    /* AI INSIGHTS */

    const aiInsights =
      generateAIInsights({

        completedTasks:
          completed,

        pendingTasks:
          pending,

        overdueTasks:
          overdue,

        focusSessions:
          focus.length,

        plannerEvents:
          planner.length,

        bestStreak:
          streak,

        productivity:
          score,
      })

    setInsights(
      aiInsights
    )
  }

  if (!mounted) {

    return null
  }

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        space-y-8
      "
    >

      {/* HERO */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[40px]

          bg-gradient-to-br
          from-[#4f46e5]
          via-[#6366f1]
          to-[#8b5cf6]

          p-8

          text-white
        "
      >

        <div
          className="
            flex
            items-center
            gap-3

            mb-6
          "
        >

          <Sparkles size={24} />

          <div>

            <h1
              className="
                text-4xl
                md:text-5xl

                font-black
              "
            >

              Analytics Overview

            </h1>

            <p
              className="
                text-indigo-100
                mt-2
              "
            >

              AI-powered productivity intelligence

            </p>

          </div>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-6

            gap-5
          "
        >

          {[
            {
              icon:
                TrendingUp,
              value:
                `${productivity}%`,
              label:
                "Performance",
            },
            {
              icon:
                CheckCircle2,
              value:
                completedTasks,
              label:
                "Completed",
            },
            {
              icon:
                Clock3,
              value:
                pendingTasks,
              label:
                "Pending",
            },
            {
              icon:
                AlertTriangle,
              value:
                overdueTasks,
              label:
                "Overdue",
            },
            {
              icon:
                Calendar,
              value:
                plannerEvents,
              label:
                "Planner",
            },
            {
              icon:
                Timer,
              value:
                focusSessions,
              label:
                "Focus",
            },
          ].map(
            (
              item,
              index
            ) => {

              const Icon =
                item.icon

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
                      index * 0.05,
                  }}

                  className="
                    rounded-[28px]

                    bg-white/10

                    border
                    border-white/10

                    p-6
                  "
                >

                  <Icon
                    size={34}
                    className="
                      mb-4
                    "
                  />

                  <h2
                    className="
                      text-4xl
                      font-bold
                    "
                  >

                    {item.value}

                  </h2>

                  <p
                    className="
                      text-indigo-100
                      mt-2
                    "
                  >

                    {item.label}

                  </p>

                </motion.div>

              )
            }
          )}

        </div>

      </div>

      {/* AI INSIGHTS */}

      <div
        className="
          rounded-[36px]
          border

          bg-white
          dark:bg-[#111827]

          p-8
        "
      >

        <div
          className="
            flex
            items-center
            gap-3

            mb-6
          "
        >

          <Brain
            className="
              text-indigo-500
            "
          />

          <h2
            className="
              text-3xl
              font-bold
            "
          >

            AI Productivity Intelligence

          </h2>

        </div>

        <div
          className="
            space-y-5
          "
        >

          {insights.map(
            (
              insight,
              index
            ) => (

              <motion.div

                key={index}

                initial={{
                  opacity: 0,
                  x: -10,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                }}

                transition={{
                  delay:
                    index * 0.08,
                }}

                className="
                  rounded-[28px]
                  border

                  bg-[#f8fafc]
                  dark:bg-[#1e293b]

                  p-5

                  flex
                  items-start
                  gap-4
                "
              >

                <div
                  className="
                    w-12
                    h-12

                    rounded-2xl

                    bg-indigo-100
                    dark:bg-indigo-500/20

                    flex
                    items-center
                    justify-center

                    flex-shrink-0
                  "
                >

                  <Brain
                    className="
                      text-indigo-500
                    "
                  />

                </div>

                <p
                  className="
                    text-sm
                    leading-relaxed
                  "
                >

                  {insight}

                </p>

              </motion.div>

            )
          )}

        </div>

      </div>

    </motion.div>
  )
}