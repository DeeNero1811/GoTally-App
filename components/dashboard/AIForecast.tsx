"use client"

import {
  motion,
} from "framer-motion"

import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react"

type Props = {
  productivity: number
  focusSessions: number
  streak: number
}

export default function AIForecast({
  productivity,
  focusSessions,
  streak,
}: Props) {

  function generateForecast() {

    if (
      productivity >= 80 &&
      focusSessions >= 5
    ) {

      return {
        title:
          "Productivity Growth Forecast",

        description:
          `AI predicts a 14% productivity increase next week based on your current deep focus consistency and workflow optimization.`,

        type:
          "positive",
      }
    }

    if (
      productivity < 50
    ) {

      return {
        title:
          "Burnout Risk Detected",

        description:
          `AI detected reduced consistency and productivity decline. Consider lighter workloads and scheduled recovery sessions.`,

        type:
          "warning",
      }
    }

    return {
      title:
        "Stable Productivity Trend",

      description:
        `Your productivity performance is stable. AI recommends increasing focus sessions to unlock higher efficiency gains.`,

      type:
        "neutral",
    }
  }

  const forecast =
    generateForecast()

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      whileHover={{
        y: -4,
      }}

      className="
        relative
        overflow-hidden

        rounded-[40px]

        border
        border-white/20

        bg-white/70
        dark:bg-[#111827]/70

        backdrop-blur-3xl

        p-8

        shadow-xl
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-72
          h-72

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between

            mb-8
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-indigo-100
                dark:bg-indigo-500/10

                text-indigo-600

                mb-5
              "
            >

              <Brain size={16} />

              AI Forecasting

            </div>

            <h2
              className="
                text-4xl
                font-black
                tracking-tight
              "
            >

              {forecast.title}

            </h2>

          </div>

          <div
            className="
              w-20
              h-20

              rounded-[28px]

              bg-gradient-to-br
              from-indigo-500
              to-violet-600

              text-white

              flex
              items-center
              justify-center

              shadow-2xl
            "
          >

            {
              forecast.type ===
              "warning"
                ? (
                  <AlertTriangle
                    size={34}
                  />
                )
                : (
                  <TrendingUp
                    size={34}
                  />
                )
            }

          </div>

        </div>

        {/* DESCRIPTION */}

        <div
          className="
            rounded-[32px]

            border
            border-white/10

            bg-white/40
            dark:bg-white/5

            p-8

            leading-relaxed
          "
        >

          <p
            className="
              text-lg
              text-gray-600
              dark:text-gray-300
            "
          >

            {
              forecast.description
            }

          </p>

        </div>

        {/* FOOTER */}

        <div
          className="
            flex
            items-center
            justify-between

            mt-8

            flex-wrap
            gap-4
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2

              px-4
              py-3

              rounded-full

              bg-indigo-100
              dark:bg-indigo-500/10

              text-indigo-600

              font-semibold
            "
          >

            <Sparkles size={16} />

            AI Behavioral Intelligence

          </div>

          <div
            className="
              text-sm
              text-gray-500
            "
          >

            Based on realtime productivity metrics

          </div>

        </div>

      </div>

    </motion.div>
  )
}