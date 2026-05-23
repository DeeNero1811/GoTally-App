"use client"

import Link from "next/link"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  Brain,
  BarChart3,
  Flame,
  CalendarDays,
  Timer,
  ArrowRight,
  Star,
  Activity,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {

  const features = [
    {
      title:
        "AI Productivity Engine",
      description:
        "Advanced AI insights powered by real-time productivity analytics.",
      icon: Brain,
    },

    {
      title:
        "Realtime Analytics",
      description:
        "Track focus, workflow performance, and productivity trends live.",
      icon: BarChart3,
    },

    {
      title:
        "Habit Intelligence",
      description:
        "Build consistent routines with streak systems and AI recommendations.",
      icon: Flame,
    },

    {
      title:
        "Smart Planning",
      description:
        "Organize schedules intelligently with workflow optimization.",
      icon: CalendarDays,
    },

    {
      title:
        "Deep Focus Mode",
      description:
        "Boost concentration and eliminate distractions using focus systems.",
      icon: Timer,
    },

    {
      title:
        "Realtime Workspace",
      description:
        "Monitor productivity activities and AI-generated insights instantly.",
      icon: Activity,
    },
  ]

  return (

    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#f8fafc]
        dark:bg-[#020617]
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          fixed
          inset-0
          overflow-hidden
          pointer-events-none
        "
      >

        <div
          className="
            absolute
            top-[-250px]
            left-[-150px]

            w-[700px]
            h-[700px]

            rounded-full

            bg-indigo-500/10

            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-300px]
            right-[-150px]

            w-[700px]
            h-[700px]

            rounded-full

            bg-violet-500/10

            blur-3xl
          "
        />

      </div>

      {/* HERO */}

      <section
        className="
          relative
          z-10

          px-6
          md:px-10

          pt-10
          pb-32
        "
      >

        {/* NAVBAR */}

        <div
          className="
            max-w-7xl
            mx-auto

            mb-24
          "
        >

          <div
            className="
              rounded-[32px]

              border
              border-white/20

              bg-white/70
              dark:bg-[#0f172a]/70

              backdrop-blur-2xl

              px-6
              py-5

              flex
              items-center
              justify-between

              shadow-xl
            "
          >

            {/* LOGO */}

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-14
                  h-14

                  rounded-3xl

                  bg-gradient-to-br
                  from-indigo-600
                  to-violet-600

                  flex
                  items-center
                  justify-center

                  text-white

                  shadow-lg
                "
              >

                <Sparkles size={24} />

              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    font-black
                    tracking-tight
                  "
                >

                  GoTasklly

                </h1>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >

                  AI Productivity OS

                </p>

              </div>

            </div>

            {/* NAV LINKS */}

            <div
              className="
                hidden
                md:flex
                items-center
                gap-10
                text-sm
                font-medium
              "
            >

              <a href="#features">
                Features
              </a>

              <a href="#analytics">
                Analytics
              </a>

              <a href="#focus">
                Focus
              </a>

              <a href="#pricing">
                Pricing
              </a>

            </div>

            {/* BUTTON */}

            <Link
              href="/dashboard"
              className="
                px-7
                py-4

                rounded-2xl

                bg-gradient-to-r
                from-indigo-600
                to-violet-600

                text-white

                font-semibold

                shadow-lg

                hover:scale-105

                transition-all
                duration-300
              "
            >

              Launch App

            </Link>

          </div>

        </div>

        {/* HERO CONTENT */}

        <div
          className="
            max-w-7xl
            mx-auto

            grid
            grid-cols-1
            lg:grid-cols-2

            gap-20

            items-center
          "
        >

          {/* LEFT */}

          <div>

            {/* BADGE */}

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
                inline-flex
                items-center
                gap-2

                px-5
                py-2

                rounded-full

                bg-indigo-100
                dark:bg-indigo-500/20

                text-indigo-600

                mb-10
              "
            >

              <Zap size={16} />

              Next-generation AI productivity platform

            </motion.div>

            {/* HEADING */}

            <motion.h1

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.1,
              }}

              className="
                text-6xl
                md:text-8xl

                font-black

                tracking-tight

                leading-[0.95]

                mb-10
              "
            >

              Organize
              <br />

              your workflow
              <br />

              with AI

            </motion.h1>

            {/* TEXT */}

            <motion.p

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.2,
              }}

              className="
                text-xl

                leading-relaxed

                text-gray-500

                max-w-2xl

                mb-12
              "
            >

              Manage tasks, habits, focus sessions,
              productivity analytics, and intelligent workflow systems
              inside one premium AI-powered workspace.

            </motion.p>

            {/* BUTTONS */}

            <motion.div

              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.3,
              }}

              className="
                flex
                flex-wrap
                gap-5
              "
            >

              <Link
                href="/dashboard"
                className="
                  px-9
                  py-5

                  rounded-2xl

                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600

                  text-white

                  font-semibold

                  shadow-2xl

                  flex
                  items-center
                  gap-3

                  hover:scale-105

                  transition-all
                  duration-300
                "
              >

                Launch Dashboard

                <ArrowRight size={18} />

              </Link>

              <button
                className="
                  px-9
                  py-5

                  rounded-2xl

                  border
                  border-white/20

                  bg-white/70
                  dark:bg-[#111827]/70

                  backdrop-blur-xl

                  font-semibold

                  hover:scale-105

                  transition-all
                  duration-300
                "
              >

                Watch Demo

              </button>

            </motion.div>

            {/* STATS */}

            <div
              className="
                grid
                grid-cols-3

                gap-8

                mt-16
              "
            >

              {
                [
                  {
                    value: "50K+",
                    label: "Tasks Optimized",
                  },

                  {
                    value: "98%",
                    label: "Focus Efficiency",
                  },

                  {
                    value: "10K+",
                    label: "Deep Work Sessions",
                  },
                ].map(
                  (
                    item,
                    index
                  ) => (

                    <div key={index}>

                      <h2
                        className="
                          text-4xl
                          font-black
                        "
                      >

                        {item.value}

                      </h2>

                      <p
                        className="
                          text-sm
                          text-gray-500
                          mt-3
                        "
                      >

                        {item.label}

                      </p>

                    </div>

                  )
                )
              }

            </div>

          </div>

          {/* RIGHT */}

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.95,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            transition={{
              delay: 0.4,
            }}

            className="
              relative
            "
          >

            {/* FLOATING CARD */}

            <motion.div

              animate={{
                y: [0, -10, 0],
              }}

              transition={{
                duration: 6,
                repeat: Infinity,
              }}

              className="
                absolute
                -top-8
                -left-10

                hidden lg:block

                rounded-[28px]

                bg-white/80
                dark:bg-[#111827]/80

                backdrop-blur-2xl

                border

                p-5

                shadow-2xl

                z-20
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    w-14
                    h-14

                    rounded-2xl

                    bg-indigo-100
                    dark:bg-indigo-500/20

                    flex
                    items-center
                    justify-center
                  "
                >

                  <TrendingUp
                    className="
                      text-indigo-500
                    "
                  />

                </div>

                <div>

                  <p
                    className="
                      text-sm
                      text-gray-500
                    "
                  >

                    Productivity Score

                  </p>

                  <h2
                    className="
                      text-3xl
                      font-black
                    "
                  >

                    94%

                  </h2>

                </div>

              </div>

            </motion.div>

            {/* MAIN PREVIEW */}

            <div
              className="
                relative

                rounded-[48px]

                border
                border-white/20

                bg-white/70
                dark:bg-[#111827]/70

                backdrop-blur-3xl

                p-8

                shadow-2xl
              "
            >

              {/* TOP */}

              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-10
                "
              >

                <div>

                  <h3
                    className="
                      text-3xl
                      font-black
                    "
                  >

                    AI Analytics

                  </h3>

                  <p
                    className="
                      text-gray-500
                      mt-2
                    "
                  >

                    Realtime productivity intelligence

                  </p>

                </div>

                <div
                  className="
                    w-16
                    h-16

                    rounded-3xl

                    bg-indigo-100
                    dark:bg-indigo-500/20

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Brain
                    className="
                      text-indigo-500
                    "
                  />

                </div>

              </div>

              {/* GRID */}

              <div
                className="
                  grid
                  grid-cols-2

                  gap-5

                  mb-6
                "
              >

                {
                  [
                    "Tasks",
                    "Habits",
                    "Focus",
                    "Analytics",
                  ].map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                          rounded-[28px]

                          bg-[#f8fafc]
                          dark:bg-[#1e293b]

                          p-6

                          border
                          border-white/10
                        "
                      >

                        <div
                          className="
                            w-14
                            h-14

                            rounded-2xl

                            bg-indigo-100
                            dark:bg-indigo-500/20

                            mb-5
                          "
                        />

                        <h4
                          className="
                            font-semibold
                            text-lg
                          "
                        >

                          {item}

                        </h4>

                      </div>

                    )
                  )
                }

              </div>

              {/* SCORE */}

              <div
                className="
                  rounded-[36px]

                  bg-gradient-to-r
                  from-indigo-600
                  via-violet-600
                  to-purple-600

                  p-8

                  text-white
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-indigo-100
                        text-sm
                      "
                    >

                      AI Productivity Score

                    </p>

                    <h2
                      className="
                        text-6xl
                        font-black
                        mt-3
                      "
                    >

                      94%

                    </h2>

                  </div>

                  <Shield size={60} />

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="
          relative
          z-10

          px-6
          md:px-10

          py-32
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              text-center

              max-w-3xl
              mx-auto

              mb-24
            "
          >

            <h2
              className="
                text-5xl
                md:text-6xl

                font-black

                tracking-tight

                mb-8
              "
            >

              Built for modern productivity

            </h2>

            <p
              className="
                text-xl
                text-gray-500
                leading-relaxed
              "
            >

              Powerful AI systems designed for deep work,
              intelligent workflows, and productivity optimization.

            </p>

          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3

              gap-8
            "
          >

            {
              features.map(
                (
                  feature,
                  index
                ) => {

                  const Icon =
                    feature.icon

                  return (

                    <motion.div

                      key={index}

                      initial={{
                        opacity: 0,
                        y: 20,
                      }}

                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        delay:
                          index * 0.08,
                      }}

                      className="
                        rounded-[40px]

                        border
                        border-white/20

                        bg-white/70
                        dark:bg-[#111827]/70

                        backdrop-blur-2xl

                        p-10

                        hover:-translate-y-2

                        transition-all
                        duration-300

                        shadow-xl
                      "
                    >

                      <div
                        className="
                          w-18
                          h-18

                          rounded-3xl

                          bg-indigo-100
                          dark:bg-indigo-500/20

                          flex
                          items-center
                          justify-center

                          mb-8
                        "
                      >

                        <Icon
                          size={28}
                          className="
                            text-indigo-500
                          "
                        />

                      </div>

                      <h3
                        className="
                          text-3xl
                          font-black
                          tracking-tight
                          mb-5
                        "
                      >

                        {feature.title}

                      </h3>

                      <p
                        className="
                          text-gray-500
                          leading-relaxed
                          text-lg
                        "
                      >

                        {feature.description}

                      </p>

                    </motion.div>

                  )
                }
              )
            }

          </div>

        </div>

      </section>

    </main>
  )
}