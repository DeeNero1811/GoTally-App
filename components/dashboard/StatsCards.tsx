"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  CheckCircle2,
  Flame,
  TrendingUp,
  Brain,
  Clock3,
  CalendarDays,
  Target,
} from "lucide-react"

import {
  supabase,
} from "../../lib/supabase/client"

import AchievementUnlock from "./AchievementUnlock"

import XPCard from "./XPCard"

import useAchievements from "../../hooks/useAchievements"

import useXP from "../../hooks/useXP"

import {
  calculateProductivity,
} from "../../lib/productivity/calculateProductivity"

type Task = {
  completed: boolean
}

type Habit = {
  streak: number
  completed: boolean
}

type FocusSession = {
  completed: boolean
}

export default function StatsCards() {

  const [mounted, setMounted] =
    useState(false)

  const [
    completedTasks,
    setCompletedTasks,
  ] = useState(0)

  const [
    pendingTasks,
    setPendingTasks,
  ] = useState(0)

  const [
    completedHabits,
    setCompletedHabits,
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
    productivity,
    setProductivity,
  ] = useState(0)

  const [
    weeklyGrowth,
    setWeeklyGrowth,
  ] = useState(0)

  const [
    focusSessions,
    setFocusSessions,
  ] = useState(0)

  useEffect(() => {

    setMounted(true)

  }, [])

  useEffect(() => {

    if (!mounted)
      return

    loadStats()

    const channel =
      supabase
        .channel(
          "stats-live"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => loadStats()
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "habits",
          },
          () => loadStats()
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "planner_events",
          },
          () => loadStats()
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "focus_sessions",
          },
          () => loadStats()
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [mounted])

  async function loadStats() {

    try {

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser()

      if (!user)
        return

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
        data: habits,
      } = await supabase
        .from("habits")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const {
        data: focus,
      } = await supabase
        .from("focus_sessions")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const {
        data: planner,
      } = await supabase
        .from("planner_events")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const analytics =
        calculateProductivity({

          tasks:
            (tasks ||
              []) as Task[],

          habits:
            (habits ||
              []) as Habit[],

          focusSessions:
            (focus ||
              []) as FocusSession[],

          plannerEvents:
            planner || [],
        })

      setCompletedTasks(
        analytics.completedTasks
      )

      setPendingTasks(
        analytics.pendingTasks
      )

      setCompletedHabits(
        analytics.completedHabits
      )

      setBestStreak(
        analytics.bestStreak
      )

      setProductivity(
        analytics.productivityScore
      )

      setWeeklyGrowth(
        analytics.weeklyGrowth
      )

      setFocusSessions(
        analytics.completedFocusSessions
      )

      setPlannerEvents(
        planner?.length || 0
      )

    } catch (error) {

      console.error(
        "Stats Error:",
        error
      )
    }
  }

  const {
    achievement,
    clearAchievement,
  } = useAchievements({

    completedTasks,

    streak:
      bestStreak,

    focusSessions,

    productivityScore:
      productivity,
  })

  const {
    xp,
    level,
    nextLevelXP,
  } = useXP({

    completedTasks,

    streak:
      bestStreak,

    focusSessions,
  })

  if (!mounted) {

    return null
  }

  return (

    <>

      <AchievementUnlock

        open={
          !!achievement
        }

        title={
          achievement?.title || ""
        }

        description={
          achievement?.description || ""
        }

        onClose={
          clearAchievement
        }
      />

      <div className="space-y-6">

        <XPCard

          xp={xp}

          level={level}

          nextLevelXP={
            nextLevelXP
          }
        />

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          <motion.div

            whileHover={{
              y: -4,
            }}

            className="
              xl:col-span-2
              rounded-[32px]
              overflow-hidden
              bg-gradient-to-br
              from-[#4f46e5]
              to-[#6366f1]
              p-8
              text-white
              relative
            "
          >

            <div
              className="
                flex items-center
                gap-4
                mb-8
              "
            >

              <div
                className="
                  w-16 h-16
                  rounded-3xl
                  bg-white/20
                  flex items-center
                  justify-center
                "
              >

                <TrendingUp size={32} />

              </div>

              <div>

                <p className="text-indigo-100">

                  Overall Performance

                </p>

                <h2
                  className="
                    text-5xl
                    font-bold
                  "
                >

                  {productivity}%

                </h2>

              </div>

            </div>

            <div
              className="
                h-4
                rounded-full
                bg-white/20
                overflow-hidden
              "
            >

              <div
                style={{
                  width:
                    `${productivity}%`,
                }}
                className="
                  h-full
                  bg-white
                  rounded-full
                "
              />

            </div>

            <p
              className="
                mt-4
                text-indigo-100
              "
            >

              Your productivity is improving consistently.

            </p>

          </motion.div>

          <Card
            icon={
              <CheckCircle2
                className="text-green-500"
              />
            }
            value={completedTasks}
            label="Completed Tasks"
          />

          <Card
            icon={
              <Flame
                className="text-orange-500"
              />
            }
            value={bestStreak}
            label="Day Streak"
          />

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          <Card
            icon={
              <Target
                className="text-emerald-500"
              />
            }
            value={completedHabits}
            label="Completed Habits"
          />

          <Card
            icon={
              <Clock3
                className="text-indigo-500"
              />
            }
            value={pendingTasks}
            label="Pending Tasks"
          />

          <Card
            icon={
              <CalendarDays
                className="text-orange-500"
              />
            }
            value={plannerEvents}
            label="Planner Events"
          />

          <motion.div

            whileHover={{
              y: -4,
            }}

            className="
              rounded-[32px]
              overflow-hidden
              bg-gradient-to-br
              from-[#4f46e5]
              to-[#7c3aed]
              p-6
              text-white
            "
          >

            <Brain
              className="mb-6"
              size={34}
            />

            <h2
              className="
                text-5xl
                font-bold
              "
            >

              +{weeklyGrowth}%

            </h2>

            <p
              className="
                mt-3
                text-indigo-100
              "
            >

              Weekly Growth

            </p>

          </motion.div>

        </div>

      </div>

    </>

  )
}

function Card({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: number
  label: string
}) {

  return (

    <motion.div

      whileHover={{
        y: -4,
      }}

      className="
        rounded-[32px]
        border
        bg-white
        dark:bg-[#111827]
        p-6
      "
    >

      <div className="mb-6">

        {icon}

      </div>

      <h2
        className="
          text-4xl
          font-bold
        "
      >

        {value}

      </h2>

      <p
        className="
          mt-2
          text-gray-500
        "
      >

        {label}

      </p>

    </motion.div>

  )
}