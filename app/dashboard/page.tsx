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
import ProductivityHeatmap from "../../components/dashboard/ProductivityHeatmap"
import AIRecommendations from "../../components/dashboard/AIRecommendations"
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

  /* ONBOARDING */

  const {
    open,
    close,
  } = useOnboarding()

  useEffect(() => {

    setMounted(true)

    loadDashboardData()

    /* REALTIME */

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

      /* TASKS */

      const {
        data: tasks,
      } = await supabase
        .from("tasks")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      /* HABITS */

      const {
        data: habits,
      } = await supabase
        .from("habits")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      /* FOCUS */

      const {
        data: focus,
      } = await supabase
        .from("focus_sessions")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      /* PLANNER */

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

      {/* PWA INSTALL */}

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
              overflow-hidden

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

              px-6
              py-6
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
                  px-5
                  py-2

                  rounded-full

                  bg-white/60
                  dark:bg-white/10

                  backdrop-blur-xl

                  text-sm
                  font-medium
                "
              >

                GoTasklly Workspace

              </div>

            </div>

            {/* HERO IMAGE */}

            <div
              className="
                w-full
                flex
                justify-center

                mt-10
                mb-6
              "
            >

              <div
                className="
                  relative

                  w-full
                  max-w-4xl

                  h-[250px]
                  md:h-[320px]

                  rounded-[32px]

                  overflow-hidden

                  shadow-2xl
                "
              >

                <Image
                  src="/images/gotaskly-hero.png"
                  alt="Hero"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="
                    object-cover
                  "
                />

              </div>

            </div>

            {/* HERO CONTENT */}

            <div
              className="
                text-center

                max-w-3xl

                mx-auto
              "
            >

              <h2
                className="
                  text-2xl
                  md:text-5xl

                  font-bold

                  tracking-tight

                  text-[#0f172a]
                  dark:text-white

                  mb-4
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

                  max-w-2xl

                  mx-auto
                "
              >

                Analyze habits, optimize workflow, monitor productivity trends, and receive intelligent AI recommendations.

              </p>

            </div>

          </motion.div>

        </section>

        {/* DAILY REPORT */}

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

        {/* STATS */}

        <StatsCards />

        {/* EXPORT */}

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

        {/* CHARTS */}

        <ProductivityChart />
        <ProductivityHeatmap />
        <AIRecommendations />

        {/* AI INSIGHTS */}

        <AIInsightsPanel />

        {/* AI ASSISTANT */}

        <div id="ai-assistant">

          <AIAssistant />
          <GlobalSearch />
          <ProductivityCalendar />

          <ActivityFeed />

          <DailySummary />

<SmartPriorities />

        </div>

      </div>

    </>

  )
}