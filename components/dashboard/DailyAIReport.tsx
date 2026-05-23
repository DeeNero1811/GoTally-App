"use client"

import {
  motion,
} from "framer-motion"

import {
  Brain,
  Sparkles,
  TrendingUp,
  Flame,
} from "lucide-react"

type Props = {
  productivity: number
  completedTasks: number
  streak: number
  focusSessions: number
}

export default function DailyAIReport({
  productivity,
  completedTasks,
  streak,
  focusSessions,
}: Props) {

  function generateReport() {

    if (
      productivity >= 80
    ) {

      return `
Your productivity performance is exceptional today. You completed ${completedTasks} tasks, maintained a ${streak}-day streak, and completed ${focusSessions} focus sessions. AI recommends maintaining your current deep work structure for maximum efficiency.
`
    }

    if (
      productivity >= 50
    ) {

      return `
Your workflow consistency is improving steadily. AI suggests increasing focus sessions and reducing task switching to maximize productivity momentum.
`
    }

    return `
Your productivity performance has dropped slightly. AI recommends prioritizing fewer high-impact tasks and scheduling dedicated focus blocks.
`
  }

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

        bg-gradient-to-br
        from-[#111827]
        via-[#1e293b]
        to-[#0f172a]

        text-white

        p-8

        shadow-2xl
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

                bg-white/10

                mb-5
              "
            >

              <Brain size={16} />

              Daily AI Report

            </div>

            <h2
              className="
                text-5xl
                font-black
                tracking-tight
              "
            >

              AI Analysis

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

              flex
              items-center
              justify-center
            "
          >

            <Sparkles size={36} />

          </div>

        </div>

        {/* CONTENT */}

        <div
          className="
            rounded-[32px]

            bg-white/5

            border
            border-white/10

            p-8

            leading-relaxed

            text-gray-200
          "
        >

          {generateReport()}

        </div>

        {/* METRICS */}

        <div
          className="
            grid
            grid-cols-3

            gap-4

            mt-8
          "
        >

          <div
            className="
              rounded-3xl

              bg-white/5

              p-5
            "
          >

            <div
              className="
                flex items-center
                gap-2

                text-indigo-300

                mb-3
              "
            >

              <TrendingUp size={16} />

              Score

            </div>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {productivity}%

            </h3>

          </div>

          <div
            className="
              rounded-3xl

              bg-white/5

              p-5
            "
          >

            <div
              className="
                flex items-center
                gap-2

                text-indigo-300

                mb-3
              "
            >

              <Sparkles size={16} />

              Tasks

            </div>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {completedTasks}

            </h3>

          </div>

          <div
            className="
              rounded-3xl

              bg-white/5

              p-5
            "
          >

            <div
              className="
                flex items-center
                gap-2

                text-indigo-300

                mb-3
              "
            >

              <Flame size={16} />

              Streak

            </div>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {streak}

            </h3>

          </div>

        </div>

      </div>

    </motion.div>
  )
}