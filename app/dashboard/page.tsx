"use client"

export const dynamic =
  "force-dynamic"

import {
  useEffect,
  useState,
} from "react"

import Image from "next/image"

import {
  Sparkles,
} from "lucide-react"

import {
  motion,
} from "framer-motion"

import StatsCards from "../../components/dashboard/StatsCards"

import ProductivityChart from "../../components/dashboard/ProductivityChart"

import AIInsightsPanel from "../../components/dashboard/AIInsightsPanel"

import AIAssistant from "../../components/dashboard/AIAssistant"

import DailyAIReport from "../../components/dashboard/DailyAIReport"

import DashboardSkeleton from "../../components/dashboard/DashboardSkeleton"

import WelcomeModal from "../../components/onboarding/WelcomeModal"

import ExportReportButton from "../../components/dashboard/ExportReportButton"

import PWAInstallButton from "../../components/pwa/PWAInstallButton"

import useOnboarding from "../../hooks/useOnboarding"

import ProductivityHeatmap
  from "../../components/dashboard/ProductivityHeatmap"

import AIRecommendations
  from "../../components/dashboard/AIRecommendations"

import {
  supabase,
} from "../../lib/supabase/client"

import {
  calculateProductivity,
} from "../../lib/productivity/calculateProductivity"

import ActivityFeed
  from "@/components/dashboard/ActivityFeed"

import DailySummary
  from "@/components/dashboard/DailySummary"

import SmartPriorities
  from "@/components/dashboard/SmartPriorities"

import ProductivityCalendar
  from "@/components/dashboard/ProductivityCalendar"

import GlobalSearch
  from "@/components/dashboard/GlobalSearch"

type Task = {
  completed: boolean
}

type Habit = {
  completed: boolean
  streak: number
}

type FocusSession = {
  completed: boolean
}

export default function DashboardPage() {

  const [mounted, setMounted] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [
    analytics,
    setAnalytics,
  ] = useState({

    productivityScore: 0,

    completedTasks: 0,

    pendingTasks: 0,

    completedHabits: 0,

    completedFocusSessions: 0,

    bestStreak: 0,

    xp: 0,

    level: 1,

    weeklyGrowth: 0,
  })

  const {
    open,
    close,
  } = useOnboarding()

  useEffect(() => {

    setMounted(true)

    loadDashboardData()

    const channel =
      supabase
        .channel(
          "dashboard-realtime"
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            loadDashboardData()
          }
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "habits",
          },
          () => {
            loadDashboardData()
          }
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "planner_events",
          },
          () => {
            loadDashboardData()
          }
        )

        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "focus_sessions",
          },
          () => {
            loadDashboardData()
          }
        )

        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadDashboardData() {

    try {

      setLoading(true)

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser()

      if (!user) {

        setLoading(false)

        return
      }

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

      const calculated =
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

      setAnalytics(
        calculated
      )

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  if (!mounted) {

    return null
  }

  if (loading) {

    return <DashboardSkeleton />
  }

  return (

    <>

      <WelcomeModal
        open={open}
        onClose={close}
      />

      <PWAInstallButton />

      <div className="space-y-8">

        {/* HERO */}

        <section id="dashboard">

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
              relative

              rounded-[40px]

              bg-gradient-to-br
              from-[#dbeafe]
              via-[#e0f2fe]
              to-[#f8fafc]

              dark:from-[#172554]
              dark:via-[#1e293b]
              dark:to-[#0f172a]

              border
              border-white/40
              dark:border-white/10

              p-5
              md:p-8

              overflow-hidden
            "
          >

            <div
              className="
                absolute
                top-4
                left-4
                right-4

                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  w-10
                  h-10

                  rounded-2xl

                  bg-white/60
                  dark:bg-white/10

                  backdrop-blur-xl

                  flex
                  items-center
                  justify-center
                "
              >

                <Sparkles size={18} />

              </div>

              <div
                className="
                  px-4
                  py-2

                  rounded-full

                  bg-white/60
                  dark:bg-white/10

                  backdrop-blur-xl

                  text-xs
                  md:text-sm

                  font-medium
                "
              >

                GoTasklly Workspace

              </div>

            </div>

            {/* HERO GRID */}

            <div
              className="
                grid
                grid-cols-1
                xl:grid-cols-12

                gap-8

                items-center

                mt-12
              "
            >

              {/* LEFT HERO */}

              <div
                className="
                  xl:col-span-6
                "
              >

                <div
                  className="
                    max-w-2xl
                  "
                >

                  <h2
                    className="
                      text-3xl
                      md:text-5xl

                      font-bold

                      tracking-tight

                      text-[#0f172a]
                      dark:text-white

                      mb-6
                    "
                  >

                    AI-powered productivity platform for tasks, habits, focus, and planning

                  </h2>

                  <p
                    className="
                      text-sm
                      md:text-lg

                      leading-relaxed

                      text-[#475569]
                      dark:text-gray-300

                      mb-8
                    "
                  >

                    Analyze habits, optimize workflow, monitor productivity trends, and receive intelligent AI recommendations.

                  </p>

                  <div
                    className="
                      flex
                      flex-wrap

                      gap-4
                    "
                  >

                    <div
                      className="
                        px-5
                        py-3

                        rounded-2xl

                        bg-white/70
                        dark:bg-white/10

                        backdrop-blur-xl

                        text-sm
                        font-medium
                      "
                    >

                      Productivity AI

                    </div>

                    <div
                      className="
                        px-5
                        py-3

                        rounded-2xl

                        bg-white/70
                        dark:bg-white/10

                        backdrop-blur-xl

                        text-sm
                        font-medium
                      "
                    >

                      Smart Analytics

                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT HERO */}

              <div
                className="
                  xl:col-span-6
                "
              >

                <div
                  className="
                    relative

                    w-full

                    h-[260px]
                    md:h-[360px]

                    rounded-[32px]

                    overflow-hidden

                    shadow-2xl
                  "
                >

                  <Image
                    src="/images/gotaskly-hero.png"
                    alt="Hero"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="
                      object-cover
                    "
                  />

                </div>

              </div>

            </div>

          </motion.div>

        </section>

        {/* MAIN DASHBOARD GRID */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-12

            gap-6
          "
        >

          {/* LEFT CONTENT */}

          <div
            className="
              xl:col-span-8

              space-y-6
            "
          >

            <DailyAIReport

              productivity={
                analytics.productivityScore
              }

              completedTasks={
                analytics.completedTasks
              }

              streak={
                analytics.bestStreak
              }

              focusSessions={
                analytics.completedFocusSessions
              }
            />

            <StatsCards />

            <div
              className="
                flex
                justify-end
              "
            >

              <ExportReportButton

                productivity={
                  analytics.productivityScore
                }

                completedTasks={
                  analytics.completedTasks
                }

                streak={
                  analytics.bestStreak
                }

                focusSessions={
                  analytics.completedFocusSessions
                }
              />

            </div>

            <ProductivityChart />

            <ProductivityHeatmap />

            <ProductivityCalendar />

            <AIRecommendations />

            <GlobalSearch />

          </div>

          {/* RIGHT SIDEBAR */}

          <div
            className="
              xl:col-span-4

              space-y-6
            "
          >

            <AIInsightsPanel />

            <DailySummary />

            <ActivityFeed />

            <SmartPriorities />

            {/* QUICK ANALYTICS */}

            <div
              className="
                rounded-[32px]

                border

                bg-white
                dark:bg-[#111827]

                p-6
              "
            >

              <h3
                className="
                  text-2xl
                  font-bold

                  mb-6
                "
              >

                Workspace Analytics

              </h3>

              <div
                className="
                  space-y-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span>
                    Productivity
                  </span>

                  <span
                    className="
                      font-bold
                      text-xl
                    "
                  >

                    {
                      analytics.productivityScore
                    }%

                  </span>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span>
                    Best Streak
                  </span>

                  <span
                    className="
                      font-bold
                      text-xl
                    "
                  >

                    {
                      analytics.bestStreak
                    }

                  </span>

                </div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span>
                    Focus Sessions
                  </span>

                  <span
                    className="
                      font-bold
                      text-xl
                    "
                  >

                    {
                      analytics.completedFocusSessions
                    }

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* AI ASSISTANT */}

        <div id="ai-assistant">

          <AIAssistant />

        </div>

      </div>

    </>

  )
}