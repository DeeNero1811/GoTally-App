"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Brain,
  Sparkles,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

import {
  generateDailySummary,
} from "@/lib/dailySummary"

export default function DailySummary() {

  const [
    summary,
    setSummary,
  ] = useState("")

  const [
    productivity,
    setProductivity,
  ] = useState(0)

  useEffect(() => {

    loadSummary()

  }, [])

  async function loadSummary() {

    const {
      data: {
        user,
      },
    } = await supabase
      .auth
      .getUser()

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
      data: focus,
    } = await supabase
      .from("focus_sessions")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    const completedTasks =
      tasks?.filter(
        (
          task
        ) =>
          task.status ===
          "completed"
      ).length || 0

    const pendingTasks =
      tasks?.filter(
        (
          task
        ) =>

          task.status ===
            "todo" ||

          task.status ===
            "progress"
      ).length || 0

    const focusSessions =
      focus?.length || 0

    const productivityScore =
      Math.min(
        100,
        Math.round(
          (
            completedTasks /
            (
              completedTasks +
              pendingTasks +
              1
            )
          ) * 100
        )
      )

    setProductivity(
      productivityScore
    )

    const generated =
      generateDailySummary({

        completedTasks,

        pendingTasks,

        focusSessions,

        productivity:
          productivityScore,
      })

    setSummary(
      generated
    )
  }

  return (

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
        rounded-[36px]

        border

        bg-gradient-to-br
        from-[#4f46e5]
        to-[#7c3aed]

        p-8

        text-white
      "
    >

      <div
        className="
          flex
          items-center
          gap-3

          mb-6
        "
      >

        <Brain size={30} />

        <h2
          className="
            text-3xl
            font-black
          "
        >

          Today’s Intelligence

        </h2>

      </div>

      <div
        className="
          rounded-[28px]

          bg-white/10

          p-6
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <Sparkles
            className="
              mt-1
            "
          />

          <div>

            <p
              className="
                text-lg
                leading-relaxed
              "
            >

              {summary}

            </p>

            <div
              className="
                mt-6

                inline-flex
                items-center
                gap-3

                rounded-2xl

                bg-white/10

                px-5
                py-3
              "
            >

              <span
                className="
                  text-sm
                  font-semibold
                "
              >

                Productivity Score

              </span>

              <span
                className="
                  text-2xl
                  font-black
                "
              >

                {productivity}%

              </span>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  )
}