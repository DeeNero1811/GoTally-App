"use client"

export const dynamic =
  "force-dynamic"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Flame,
  Plus,
  CheckCircle2,
  Circle,
} from "lucide-react"

import {
  supabase,
} from "../../../lib/supabase/client"

import {
  checkAchievements,
} from "@/lib/achievementEngine"

import PremiumEmptyState from "../../../components/ui/PremiumEmptyState"

import {
  addNotification,
} from "@/lib/notifications"

type Habit = {
  id: string
  title: string
  completed: boolean
  streak: number
  last_completed: string | null
}

export default function HabitsPage() {

  const [habits, setHabits] =
    useState<Habit[]>([])

  const [loading, setLoading] =
    useState(true)

  const [newHabit, setNewHabit] =
    useState("")

  useEffect(() => {

    loadHabits()

    const channel =
      supabase
        .channel(
          "habits-live"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "habits",
          },
          () => {
            loadHabits()
          }
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadHabits() {

    try {

      setLoading(true)

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser()

      if (!user) {

        setLoading(false)

        return
      }

      const {
        data,
      } = await supabase
        .from("habits")
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

      setHabits(
        (data ||
          []) as Habit[]
      )

    } catch (error) {

      console.error(
        "Habits Error:",
        error
      )

    } finally {

      setLoading(false)
    }
  }

  async function addHabit() {

    if (!newHabit.trim())
      return

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    const tempHabit = {

      id: crypto.randomUUID(),

      title: newHabit,

      completed: false,

      streak: 0,

      last_completed: null,
    }

    setHabits((prev) => [
      tempHabit,
      ...prev,
    ])

    addNotification({

      type:
        "default" as any,

      title:
        "Habit Created",

      message:
        "🔥 New habit added successfully.",
    })

    const currentHabit =
      newHabit

    setNewHabit("")

    const {
      data,
      error,
    } = await supabase
      .from("habits")
      .insert({

        title:
          currentHabit,

        completed:
          false,

        streak: 0,

        last_completed:
          null,

        user_id:
          user.id,
      })
      .select()
      .single()

    if (error) {

      console.error(error)

      return
    }

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === tempHabit.id
          ? data
          : habit
      )
    )
  }

  async function toggleHabit(
    habit: Habit
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]

    if (
      habit.last_completed ===
        today &&
      !habit.completed
    ) {

      addNotification({

        type:
          "default" as any,

        title:
          "Already Completed",

        message:
          "✅ This habit already counted for today.",
      })

      return
    }

    let updatedHabit = {
      ...habit,
    }

    if (!habit.completed) {

      updatedHabit = {

        ...habit,

        completed: true,

        streak:
          habit.last_completed ===
          today
            ? habit.streak
            : habit.streak + 1,

        last_completed:
          today,
      }

      addNotification({

        type:
          "default" as any,

        title:
          "Habit Completed",

        message:
          `🔥 ${updatedHabit.streak} day streak.`,
      })

    } else {

      updatedHabit = {

        ...habit,

        completed: false,
      }

      addNotification({

        type:
          "default" as any,

        title:
          "Habit Unchecked",

        message:
          "📌 Habit marked incomplete for today.",
      })
    }

    setHabits((prev) =>
      prev.map((h) =>
        h.id === habit.id
          ? updatedHabit
          : h
      )
    )

    const {
      error,
    } = await supabase
      .from("habits")
      .update({

        completed:
          updatedHabit.completed,

        streak:
          updatedHabit.streak,

        last_completed:
          updatedHabit.last_completed,
      })
      .eq(
        "id",
        habit.id
      )

    if (error) {

      console.error(error)

      return
    }

    await checkAchievements()
  }

  if (loading) {

    return (

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {[1,2,3].map(
          (item) => (

            <div

              key={item}

              className="
                h-40
                rounded-[32px]
                bg-gray-200
                dark:bg-[#1e293b]
                animate-pulse
              "
            />

          )
        )}

      </div>

    )
  }

  return (

    <div
      className="
        grid
        grid-cols-1
        xl:grid-cols-12
        gap-6
      "
    >

      {/* LEFT SIDE */}

      <div
        className="
          xl:col-span-8
          space-y-8
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            md:flex-row

            gap-4

            justify-between
            items-start
            md:items-center
          "
        >

          <div>

            <h1
              className="
                text-4xl
                font-black
                tracking-tight
              "
            >

              Habit Intelligence

            </h1>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              Build consistency and track behavioral momentum.

            </p>

          </div>

          {/* ADD HABIT */}

          <div
            className="
              flex
              gap-3

              w-full
              md:w-auto
            "
          >

            <input

              value={newHabit}

              onChange={(e) =>
                setNewHabit(
                  e.target.value
                )
              }

              placeholder="Create new habit..."

              className="
                flex-1
                md:w-[280px]

                rounded-2xl

                border

                bg-white
                dark:bg-[#111827]

                px-5
                py-4

                outline-none
              "
            />

            <button

              onClick={addHabit}

              className="
                rounded-2xl

                bg-gradient-to-r
                from-[#4f46e5]
                to-[#7c3aed]

                px-5
                py-4

                text-white

                shadow-xl

                hover:scale-105

                transition-all
              "
            >

              <Plus size={22} />

            </button>

          </div>

        </div>

        {/* EMPTY */}

        {habits.length === 0 ? (

          <PremiumEmptyState

            title="No habits tracked yet"

            description="
              Build powerful routines and let AI monitor your consistency patterns automatically.
            "

            buttonText="Create First Habit"

            onClick={() => {

              const input =
                document.querySelector(
                  "input"
                ) as HTMLInputElement

              input?.focus()
            }}
          />

        ) : (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2

              gap-6
            "
          >

            {habits.map(
              (
                habit,
                index
              ) => (

                <motion.div

                  key={habit.id}

                  initial={{
                    opacity: 0,
                    y: 20,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    delay:
                      index * 0.05,
                  }}

                  whileHover={{
                    y: -4,
                  }}

                  className="
                    rounded-[32px]

                    border

                    bg-white
                    dark:bg-[#111827]

                    p-6

                    transition-all
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      mb-6
                    "
                  >

                    <button

                      onClick={() =>
                        toggleHabit(
                          habit
                        )
                      }

                    >

                      {habit.completed ? (

                        <CheckCircle2
                          className="
                            text-green-500
                          "
                          size={32}
                        />

                      ) : (

                        <Circle
                          className="
                            text-gray-400
                          "
                          size={32}
                        />

                      )}

                    </button>

                    <div
                      className="
                        flex
                        items-center
                        gap-2

                        rounded-full

                        bg-orange-100
                        dark:bg-orange-500/20

                        px-4
                        py-2
                      "
                    >

                      <Flame
                        className="
                          text-orange-500
                        "
                        size={18}
                      />

                      <span
                        className="
                          text-sm
                          font-semibold
                        "
                      >

                        {habit.streak} day streak

                      </span>

                    </div>

                  </div>

                  <h2
                    className={`
                      text-2xl
                      font-bold
                      leading-tight

                      ${
                        habit.completed
                          ? "line-through text-gray-400"
                          : ""
                      }
                    `}
                  >

                    {habit.title}

                  </h2>

                </motion.div>

              )
            )}

          </div>

        )}

      </div>

      {/* RIGHT SIDEBAR */}

      <div
        className="
          xl:col-span-4
          space-y-6
        "
      >

        {/* ANALYTICS */}

        <div
          className="
            rounded-[32px]

            border

            bg-white
            dark:bg-[#111827]

            p-6
          "
        >

          <h3
            className="
              text-2xl
              font-bold

              mb-6
            "
          >

            Habit Analytics

          </h3>

          <div
            className="
              space-y-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span>
                Total Habits
              </span>

              <span
                className="
                  font-bold
                  text-xl
                "
              >
                {habits.length}
              </span>

            </div>

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span>
                Completed Today
              </span>

              <span
                className="
                  font-bold
                  text-xl
                "
              >
                {
                  habits.filter(
                    (
                      h
                    ) => h.completed
                  ).length
                }
              </span>

            </div>

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <span>
                Best Streak
              </span>

              <span
                className="
                  font-bold
                  text-xl
                "
              >
                {
                  Math.max(
                    ...habits.map(
                      (
                        h
                      ) => h.streak
                    ),
                    0
                  )
                }{" "}
                days
              </span>

            </div>

          </div>

        </div>

        {/* AI INSIGHT */}

        <div
          className="
            rounded-[32px]

            border

            bg-gradient-to-br
            from-indigo-600
            via-violet-600
            to-purple-600

            p-6

            text-white
          "
        >

          <h3
            className="
              text-2xl
              font-bold

              mb-4
            "
          >

            AI Insight

          </h3>

          <p
            className="
              text-sm
              leading-relaxed

              text-indigo-100
            "
          >

            {
              habits.filter(
                (
                  h
                ) => h.completed
              ).length >=
              habits.length / 2

                ? "Your consistency is improving steadily. Keep maintaining your current streak momentum."

                : "Try focusing on completing fewer habits consistently to build stronger routines."
            }

          </p>

        </div>

      </div>

    </div>

  )
}