"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Search,
  CheckCircle2,
  Calendar,
  Activity,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

type SearchResult = {

  id: number

  title: string

  type: string

  description?: string
}

export default function
GlobalSearch() {

  const [
    query,
    setQuery,
  ] = useState("")

  const [
    results,
    setResults,
  ] = useState<
    SearchResult[]
  >([])

  useEffect(() => {

    if (
      query.trim().length < 2
    ) {

      setResults([])

      return
    }

    searchAll()

  }, [query])

  async function searchAll() {

    const {
      data: {
        user,
      },
    } = await supabase
      .auth
      .getUser()

    if (!user)
      return

    const [
      tasksResponse,
      plannerResponse,
      activityResponse,
    ] = await Promise.all([

      supabase
        .from("tasks")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .ilike(
          "title",
          `%${query}%`
        ),

      supabase
        .from("planner_events")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .ilike(
          "title",
          `%${query}%`
        ),

      supabase
        .from("activity_logs")
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .ilike(
          "title",
          `%${query}%`
        ),
    ])

    const combined = [

      ...(tasksResponse.data || [])
        .map(
          (
            item
          ) => ({

            id:
              item.id,

            title:
              item.title,

            type:
              "task",
          })
        ),

      ...(plannerResponse.data || [])
        .map(
          (
            item
          ) => ({

            id:
              item.id,

            title:
              item.title,

            type:
              "planner",
          })
        ),

      ...(activityResponse.data || [])
        .map(
          (
            item
          ) => ({

            id:
              item.id,

            title:
              item.title,

            description:
              item.description,

            type:
              "activity",
          })
        ),
    ]

    setResults(
      combined
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

      case "planner":
        return (
          <Calendar
            className="
              text-pink-500
            "
          />
        )

      default:
        return (
          <Activity
            className="
              text-indigo-500
            "
          />
        )
    }
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

          mb-6
        "
      >

        <Search
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

          Global Search

        </h2>

      </div>

      <input

        value={query}

        onChange={(e) =>
          setQuery(
            e.target.value
          )
        }

        placeholder="
Search tasks, planner events, activity...
        "

        className="
          w-full

          rounded-[24px]

          border

          bg-transparent

          p-5

          outline-none

          mb-6
        "
      />

      <div
        className="
          space-y-4
        "
      >

        {results.length === 0 &&

          query.length > 1 && (

            <div
              className="
                rounded-2xl

                bg-[#f8fafc]
                dark:bg-[#1e293b]

                p-5

                text-gray-500
              "
            >

              No results found.

            </div>

          )}

        {results.map(
          (
            result
          ) => (

            <div

              key={`${result.type}-${result.id}`}

              className="
                rounded-[24px]

                border

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

                  bg-[#f8fafc]
                  dark:bg-[#1e293b]

                  flex
                  items-center
                  justify-center
                "
              >

                {
                  getIcon(
                    result.type
                  )
                }

              </div>

              <div>

                <h3
                  className="
                    font-bold
                    text-lg
                  "
                >

                  {result.title}

                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >

                  {result.type}

                </p>

                {
                  result.description && (

                    <p
                      className="
                        text-sm
                        mt-2
                      "
                    >

                      {
                        result.description
                      }

                    </p>

                  )
                }

              </div>

            </div>

          )
        )}

      </div>

    </motion.div>
  )
}