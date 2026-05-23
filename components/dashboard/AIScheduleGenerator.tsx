"use client"

import {
  motion,
} from "framer-motion"

import {
  Brain,
  Clock3,
  Sparkles,
} from "lucide-react"

const schedule = [

  {
    time:
      "09:00 AM",

    title:
      "Deep Focus Session",

    description:
      "High-priority cognitive work optimized for peak mental clarity.",
  },

  {
    time:
      "11:00 AM",

    title:
      "Task Execution",

    description:
      "Complete medium-priority tasks while maintaining workflow momentum.",
  },

  {
    time:
      "01:00 PM",

    title:
      "Recovery Break",

    description:
      "Short mental recovery session to improve sustained productivity.",
  },

  {
    time:
      "03:00 PM",

    title:
      "Creative Work",

    description:
      "AI recommends creative problem-solving during this energy window.",
  },
]

export default function AIScheduleGenerator() {

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

                bg-indigo-100
                dark:bg-indigo-500/10

                text-indigo-600

                mb-5
              "
            >

              <Brain size={16} />

              AI Schedule Generator

            </div>

            <h2
              className="
                text-4xl
                font-black
                tracking-tight
              "
            >

              Optimized Daily Flow

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

            <Sparkles size={34} />

          </div>

        </div>

        {/* TIMELINE */}

        <div className="space-y-6">

          {
            schedule.map(
              (
                item,
                index
              ) => (

                <motion.div

                  key={item.time}

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
                    flex
                    gap-5
                  "
                >

                  {/* TIME */}

                  <div
                    className="
                      w-[110px]

                      shrink-0

                      rounded-2xl

                      bg-indigo-100
                      dark:bg-indigo-500/10

                      text-indigo-600

                      flex
                      items-center
                      justify-center

                      font-semibold

                      px-4
                      py-4

                      h-fit
                    "
                  >

                    <Clock3
                      size={16}
                      className="mr-2"
                    />

                    {item.time}

                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                      flex-1

                      rounded-[28px]

                      border
                      border-white/10

                      bg-white/40
                      dark:bg-white/5

                      p-6
                    "
                  >

                    <h3
                      className="
                        text-xl
                        font-bold

                        mb-2
                      "
                    >

                      {item.title}

                    </h3>

                    <p
                      className="
                        text-gray-500
                        leading-relaxed
                      "
                    >

                      {item.description}

                    </p>

                  </div>

                </motion.div>

              )
            )
          }

        </div>

      </div>

    </motion.div>
  )
}