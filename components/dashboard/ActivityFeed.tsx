"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  CheckCircle2,
  Rocket,
  Trophy,
  Calendar,
  Timer,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

type Activity = {
  id: number
  title: string
  description: string
  type: string
  created_at: string
}

export default function ActivityFeed() {

  const [
    activities,
    setActivities,
  ] = useState<Activity[]>([])

  useEffect(() => {

    loadActivities()

    const channel =
      supabase
        .channel(
          "activity-feed"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "activity_logs",
          },
          () => {
            loadActivities()
          }
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadActivities() {

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
      .from("activity_logs")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      )
      .limit(15)

    setActivities(
      data || []
    )
  }

  function getIcon(
    type: string
  ) {

    switch (type) {

      case "task":
        return (
          <CheckCircle2
            className="
              text-green-500
            "
          />
        )

      case "focus":
        return (
          <Timer
            className="
              text-indigo-500
            "
          />
        )

      case "achievement":
        return (
          <Trophy
            className="
              text-yellow-500
            "
          />
        )

      default:
        return (
          <Rocket
            className="
              text-indigo-500
            "
          />
        )
    }
  }

  return (

    <div
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

        <Calendar
          className="
            text-indigo-500
          "
        />

        <h2
          className="
            text-3xl
            font-bold
          "
        >

          Recent Activity

        </h2>

      </div>

      <div
        className="
          space-y-5
        "
      >

        {activities.map(
          (
            activity,
            index
          ) => (

            <motion.div

              key={activity.id}

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay:
                  index * 0.03,
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

                  bg-white
                  dark:bg-[#0f172a]

                  flex
                  items-center
                  justify-center

                  flex-shrink-0
                "
              >

                {
                  getIcon(
                    activity.type
                  )
                }

              </div>

              <div
                className="
                  flex-1
                "
              >

                <h3
                  className="
                    font-bold
                    text-lg
                  "
                >

                  {
                    activity.title
                  }

                </h3>

                <p
                  className="
                    text-gray-500
                    mt-1
                  "
                >

                  {
                    activity.description
                  }

                </p>

                <p
                  className="
                    text-xs
                    text-gray-400
                    mt-3
                  "
                >

                  {
                    new Date(
                      activity.created_at
                    ).toLocaleString()
                  }

                </p>

              </div>

            </motion.div>

          )
        )}

      </div>

    </div>
  )
}