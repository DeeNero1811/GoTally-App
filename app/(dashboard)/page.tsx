"use client"

import Link from "next/link"

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"

export default function DashboardPage() {

  const stats = [
    {
      title: "Tasks Completed",
      value: "24",
      icon: CheckCircle2,
    },

    {
      title: "Focus Hours",
      value: "18h",
      icon: Clock3,
    },

    {
      title: "AI Productivity Score",
      value: "92%",
      icon: Brain,
    },

    {
      title: "Daily Goals",
      value: "7/10",
      icon: Target,
    },
  ]

  const recentTasks = [
    {
      title: "Finish dashboard UI",
      status: "Completed",
    },

    {
      title: "Plan weekly goals",
      status: "In Progress",
    },

    {
      title: "Review analytics",
      status: "Pending",
    },
  ]

  return (

    <main
      className="
        w-full

        space-y-6

        overflow-x-hidden
      "
    >

      {/* HERO */}

      <section
        className="
          relative

          overflow-hidden

          rounded-[28px]

          border

          bg-gradient-to-br
          from-indigo-600
          via-violet-600
          to-purple-700

          p-5
          sm:p-6
          md:p-8

          text-white
        "
      >

        <div
          className="
            relative
            z-10

            max-w-3xl

            space-y-4
          "
        >

          <div
            className="
              inline-flex
              items-center

              gap-2

              rounded-full

              bg-white/10

              px-3
              py-1.5

              text-xs
              sm:text-sm
            "
          >

            <Sparkles size={14} />

            AI Powered Productivity

          </div>

          <h1
            className="
              text-2xl
              sm:text-3xl
              md:text-5xl

              font-bold

              leading-tight
            "
          >

            Welcome back to your productivity dashboard

          </h1>

          <p
            className="
              text-sm
              sm:text-base
              md:text-lg

              text-indigo-100

              max-w-2xl
            "
          >

            Organize tasks, track habits, manage focus,
            and let AI optimize your workflow daily.

          </p>

          <div
            className="
              flex
              flex-wrap

              gap-3

              pt-2
            "
          >

            <Link
              href="/dashboard/tasks"
              className="
                inline-flex
                items-center

                gap-2

                rounded-2xl

                bg-white

                px-5
                py-3

                text-sm
                sm:text-base

                font-semibold

                text-indigo-700

                transition-all

                hover:scale-[1.02]
              "
            >

              Open Tasks

              <ArrowRight size={18} />

            </Link>

            <Link
              href="/dashboard/analytics"
              className="
                inline-flex
                items-center

                gap-2

                rounded-2xl

                border
                border-white/20

                bg-white/10

                px-5
                py-3

                text-sm
                sm:text-base

                font-medium

                backdrop-blur-md
              "
            >

              View Analytics

            </Link>

          </div>

        </div>

        {/* BACKGROUND GLOW */}

        <div
          className="
            absolute

            -right-20
            -top-20

            h-64
            w-64

            rounded-full

            bg-white/10

            blur-3xl
          "
        />

      </section>

      {/* STATS */}

      <section
        className="
          grid

          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4

          gap-4
        "
      >

        {
          stats.map((item) => {

            const Icon =
              item.icon

            return (

              <div
                key={item.title}
                className="
                  rounded-[24px]

                  border

                  bg-white
                  dark:bg-[#111827]

                  p-5

                  min-w-0
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
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        mt-2

                        text-3xl

                        font-bold
                      "
                    >
                      {item.value}
                    </h2>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-center

                      h-12
                      w-12

                      rounded-2xl

                      bg-indigo-100
                      dark:bg-indigo-500/20

                      text-indigo-600
                    "
                  >

                    <Icon size={22} />

                  </div>

                </div>

              </div>

            )
          })
        }

      </section>

      {/* CONTENT GRID */}

      <section
        className="
          grid

          grid-cols-1
          xl:grid-cols-3

          gap-4
        "
      >

        {/* RECENT TASKS */}

        <div
          className="
            xl:col-span-2

            rounded-[24px]

            border

            bg-white
            dark:bg-[#111827]

            p-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between

              mb-5
            "
          >

            <h2
              className="
                text-lg
                font-semibold
              "
            >
              Recent Tasks
            </h2>

            <Link
              href="/dashboard/tasks"
              className="
                text-sm
                text-indigo-600
              "
            >
              View all
            </Link>

          </div>

          <div
            className="
              space-y-3
            "
          >

            {
              recentTasks.map((task) => (

                <div
                  key={task.title}
                  className="
                    flex
                    items-center
                    justify-between

                    rounded-2xl

                    border

                    bg-[#f8fafc]
                    dark:bg-[#0f172a]

                    p-4

                    gap-4
                  "
                >

                  <div
                    className="
                      min-w-0
                    "
                  >

                    <p
                      className="
                        truncate

                        font-medium
                      "
                    >
                      {task.title}
                    </p>

                  </div>

                  <span
                    className="
                      shrink-0

                      rounded-full

                      bg-indigo-100
                      dark:bg-indigo-500/20

                      px-3
                      py-1

                      text-xs
                      font-medium

                      text-indigo-700
                      dark:text-indigo-300
                    "
                  >
                    {task.status}
                  </span>

                </div>

              ))
            }

          </div>

        </div>

        {/* AI INSIGHTS */}

        <div
          className="
            rounded-[24px]

            border

            bg-white
            dark:bg-[#111827]

            p-5
          "
        >

          <div
            className="
              flex
              items-center

              gap-3

              mb-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-center

                h-12
                w-12

                rounded-2xl

                bg-indigo-100
                dark:bg-indigo-500/20

                text-indigo-600
              "
            >

              <Zap size={22} />

            </div>

            <div>

              <h2
                className="
                  font-semibold
                "
              >
                AI Insights
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Productivity recommendations
              </p>

            </div>

          </div>

          <div
            className="
              space-y-4
            "
          >

            <div
              className="
                rounded-2xl

                bg-[#f8fafc]
                dark:bg-[#0f172a]

                p-4

                text-sm
              "
            >

              🚀 Your productivity increased by 12% this week.

            </div>

            <div
              className="
                rounded-2xl

                bg-[#f8fafc]
                dark:bg-[#0f172a]

                p-4

                text-sm
              "
            >

              🧠 Best focus time detected between 9AM - 12PM.

            </div>

            <div
              className="
                rounded-2xl

                bg-[#f8fafc]
                dark:bg-[#0f172a]

                p-4

                text-sm
              "
            >

              🔥 Habit streak is currently 14 days.

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}