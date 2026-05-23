"use client"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  Trophy,
  TrendingUp,
} from "lucide-react"

type Props = {
  xp: number
  level: number
  nextLevelXP: number
}

export default function XPCard({
  xp,
  level,
  nextLevelXP,
}: Props) {

  const progress =
    Math.min(
      100,
      (
        xp /
        nextLevelXP
      ) * 100
    )

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

        p-8

        text-white

        shadow-2xl
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-48
          h-48

          rounded-full

          bg-indigo-500/20

          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* TOP */}

        <div
          className="
            flex
            items-start
            justify-between

            mb-10
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

              <Sparkles size={16} />

              Productivity Level

            </div>

            <h2
              className="
                text-6xl
                font-black
                tracking-tight
              "
            >

              Lv {level}

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

              shadow-2xl
            "
          >

            <Trophy size={36} />

          </div>

        </div>

        {/* XP */}

        <div className="mb-8">

          <div
            className="
              flex
              items-center
              justify-between

              mb-3
            "
          >

            <span
              className="
                text-gray-300
                text-sm
              "
            >

              Experience Progress

            </span>

            <span
              className="
                text-sm
                font-semibold
              "
            >

              {xp} XP

            </span>

          </div>

          <div
            className="
              h-4

              rounded-full

              bg-white/10

              overflow-hidden
            "
          >

            <motion.div

              initial={{
                width: 0,
              }}

              animate={{
                width:
                  `${progress}%`,
              }}

              transition={{
                duration: 1,
              }}

              className="
                h-full

                rounded-full

                bg-gradient-to-r
                from-indigo-500
                to-violet-500
              "
            />

          </div>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
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

              Progress

            </div>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {Math.round(progress)}%

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

              Next Level

            </div>

            <h3
              className="
                text-3xl
                font-bold
              "
            >

              {nextLevelXP}

            </h3>

          </div>

        </div>

      </div>

    </motion.div>
  )
}