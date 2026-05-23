"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  Brain,
  Sparkles,
  TrendingUp,
  Flame,
  Clock3,
} from "lucide-react"

import {
  motion,
} from "framer-motion"

import {
  supabase,
} from "@/lib/supabase/client"

type Insight = {
  icon: any
  title: string
  message: string
}

export default function AIRecommendations() {

  const [
    insights,
    setInsights,
  ] = useState<Insight[]>([])

  const [loading,
    setLoading] =
      useState(true)

  useEffect(() => {

    generateInsights()

  }, [])

  async function generateInsights() {

    try {

      setLoading(true)

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser()

      if (!user)
        return

      const {
        data: sessions,
      } = await supabase
        .from("focus_sessions")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const total =
        sessions?.length || 0

      const deepWork =
        sessions?.filter(
          (
            session
          ) =>
            session.mode ===
            "Deep Work"
        ).length || 0

      const breaks =
        sessions?.filter(
          (
            session
          ) =>
            session.mode ===
            "Break"
        ).length || 0

      const focus =
        sessions?.filter(
          (
            session
          ) =>
            session.mode ===
            "Focus"
        ).length || 0

      const generated:
        Insight[] = []

      /* PRODUCTIVITY */

      if (total >= 5) {

        generated.push({

          icon:
            TrendingUp,

          title:
            "Productivity Momentum",

          message:
            `You completed ${total} focus sessions. Your productivity consistency is improving steadily.`,
        })
      }

      /* DEEP WORK */

      if (deepWork >= 3) {

        generated.push({

          icon:
            Brain,

          title:
            "Deep Work Strength",

          message:
            "You perform strongly in Deep Work mode. Long-form concentration appears to boost your efficiency.",
        })
      }

      /* BALANCE */

      if (
        breaks > 0 &&
        focus > 0
      ) {

        generated.push({

          icon:
            Clock3,

          title:
            "Healthy Work Rhythm",

          message:
            "Your focus-to-break balance is healthy. Recovery periods are improving sustained productivity.",
        })
      }

      /* HIGH PERFORMANCE */

      if (total >= 10) {

        generated.push({

          icon:
            Flame,

          title:
            "High Performance Week",

          message:
            "Your recent productivity trend indicates strong focus consistency and growing work discipline.",
        })
      }

      /* FALLBACK */

      if (
        generated.length === 0
      ) {

        generated.push({

          icon:
            Sparkles,

          title:
            "AI Awaiting More Data",

          message:
            "Complete more focus sessions to unlock advanced productivity intelligence and behavioral insights.",
        })
      }

      setInsights(
        generated
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  if (loading) {

    return (

      <div
        className="
          rounded-[32px]

          border

          bg-white
          dark:bg-[#111827]

          p-6
        "
      >

        <div
          className="
            h-40

            rounded-3xl

            animate-pulse

            bg-gray-200
            dark:bg-[#1e293b]
          "
        />

      </div>

    )
  }

  return (

    <div
      className="
        rounded-[32px]

        border

        bg-white
        dark:bg-[#111827]

        p-6
      "
    >

      <div
        className="
          flex
          items-center
          gap-3

          mb-8
        "
      >

        <div
          className="
            w-14
            h-14

            rounded-2xl

            bg-gradient-to-br
            from-indigo-500
            to-violet-600

            flex
            items-center
            justify-center

            text-white
          "
        >

          <Brain size={28} />

        </div>

        <div>

          <h2
            className="
              text-3xl
              font-bold
            "
          >

            AI Focus Intelligence

          </h2>

          <p
            className="
              text-gray-500
            "
          >

            Behavioral productivity analysis powered by your focus patterns

          </p>

        </div>

      </div>

      <div className="space-y-5">

        {insights.map(
          (
            insight,
            index
          ) => {

            const Icon =
              insight.icon

            return (

              <motion.div

                key={insight.title}

                initial={{
                  opacity: 0,
                  y: 15,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay:
                    index * 0.1,
                }}

                className="
                  rounded-3xl

                  border

                  bg-[#f8fafc]
                  dark:bg-[#1e293b]

                  p-5
                "
              >

                <div
                  className="
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
                    "
                  >

                    <Icon
                      className="
                        text-indigo-500
                      "
                    />

                  </div>

                  <div>

                    <h3
                      className="
                        text-xl
                        font-bold
                        mb-2
                      "
                    >

                      {insight.title}

                    </h3>

                    <p
                      className="
                        text-gray-500
                        leading-relaxed
                      "
                    >

                      {insight.message}

                    </p>

                  </div>

                </div>

              </motion.div>

            )
          }
        )}

      </div>

    </div>
  )
}