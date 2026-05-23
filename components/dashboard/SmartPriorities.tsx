"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  AlertTriangle,
  Sparkles,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

import {
  generatePrioritySuggestions,
} from "@/lib/priorityEngine"

export default function SmartPriorities() {

  const [
    suggestions,
    setSuggestions,
  ] = useState<string[]>([])

  useEffect(() => {

    loadSuggestions()

    const channel =
      supabase
        .channel(
          "smart-priority-updates"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            loadSuggestions()
          }
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadSuggestions() {

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
      data,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    const generated =
      generatePrioritySuggestions(
        data || []
      )

    setSuggestions(
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

        bg-white
        dark:bg-[#111827]

        p-8
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

        <Sparkles
          className="
            text-indigo-500
          "
        />

        <h2
          className="
            text-3xl
            font-black
          "
        >

          Smart Priorities

        </h2>

      </div>

      <div
        className="
          space-y-4
        "
      >

        {suggestions.length === 0 && (

          <div
            className="
              rounded-[24px]

              bg-[#f8fafc]
              dark:bg-[#1e293b]

              p-6

              text-gray-500
            "
          >

            Everything looks under control.

          </div>

        )}

        {suggestions.map(
          (
            suggestion,
            index
          ) => (

            <motion.div

              key={index}

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
                  index * 0.05,
              }}

              className="
                rounded-[24px]

                border

                bg-[#f8fafc]
                dark:bg-[#1e293b]

                p-5

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

                  flex-shrink-0
                "
              >

                <AlertTriangle
                  className="
                    text-indigo-500
                  "
                />

              </div>

              <p
                className="
                  leading-relaxed
                "
              >

                {suggestion}

              </p>

            </motion.div>

          )
        )}

      </div>

    </motion.div>
  )
}