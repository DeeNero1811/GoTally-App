"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  supabase,
} from "@/lib/supabase/client"

type HeatmapDay = {
  date: string
  count: number
}

export default function ProductivityHeatmap() {

  const [days, setDays] =
    useState<HeatmapDay[]>([])

  useEffect(() => {

    loadHeatmap()

  }, [])

  async function loadHeatmap() {

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    const {
      data,
      error,
    } = await supabase
      .from("focus_sessions")
      .select(
        "completed_at"
      )
      .eq(
        "user_id",
        user.id
      )

    if (error) {

      console.error(error)

      return
    }

    const map:
      Record<
        string,
        number
      > = {}

    data?.forEach(
      (session) => {

        const date =
          new Date(
            session.completed_at
          )
            .toISOString()
            .split("T")[0]

        map[date] =
          (map[date] || 0) + 1
      }
    )

    const transformed =
      Object.entries(map).map(
        ([
          date,
          count,
        ]) => ({
          date,
          count,
        })
      )

    setDays(transformed)
  }

  function getIntensity(
    count: number
  ) {

    if (count === 0)
      return "bg-gray-200 dark:bg-[#1e293b]"

    if (count < 2)
      return "bg-green-200"

    if (count < 4)
      return "bg-green-400"

    return "bg-green-600"
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

      <h2
        className="
          text-2xl
          font-bold
          mb-6
        "
      >

        Productivity Heatmap

      </h2>

      <div
        className="
          grid
          grid-cols-7
          gap-3
        "
      >

        {days.map(
          (day) => (

            <div

              key={day.date}

              title={`${day.date} • ${day.count} sessions`}

              className={`
                h-12
                rounded-xl

                ${getIntensity(
                  day.count
                )}
              `}
            />

          )
        )}

      </div>

    </div>
  )
}