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
  Brain,
  Flame,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Activity,
  Crown,
  Timer,
  Pencil,
  Save,
} from "lucide-react"

import {
  supabase,
} from "../../../lib/supabase/client"

type UserProfile = {
  name: string
  role: string
}

type Task = {
  completed: boolean
}

type Habit = {
  streak: number
  completed: boolean
}

export default function ProfilePage() {

  const [profile, setProfile] =
    useState<UserProfile>({
      name: "David Rocky",
      role: "Pro User",
    })

  const [editing, setEditing] =
    useState(false)

  const [
    completedTasks,
    setCompletedTasks,
  ] = useState(0)

  const [
    streak,
    setStreak,
  ] = useState(0)

  const [
    focusHours,
    setFocusHours,
  ] = useState(0)

  const [
    productivityScore,
    setProductivityScore,
  ] = useState(0)

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {

    setMounted(true)

    loadRealtimeProfile()

    const channel =
      supabase
        .channel(
          "profile-realtime"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            loadRealtimeProfile()
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "habits",
          },
          () => {
            loadRealtimeProfile()
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "focus_sessions",
          },
          () => {
            loadRealtimeProfile()
          }
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadRealtimeProfile() {

    try {

      const {
        data: authData,
      } = await supabase.auth.getUser()

      const user =
        authData.user

      if (!user)
        return

      /* PROFILE */

      const savedProfile =
        localStorage.getItem(
          "dashboard_profile"
        )

      if (savedProfile) {

        setProfile(
          JSON.parse(
            savedProfile
          )
        )
      }

      /* TASKS */

      const {
        data: taskData,
      } = await supabase
        .from("tasks")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      /* HABITS */

      const {
        data: habitData,
      } = await supabase
        .from("habits")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      /* FOCUS */

      const {
        data: focusData,
      } = await supabase
        .from("focus_sessions")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const tasks =
        taskData || []

      const habits =
        habitData || []

      const focusSessions =
        focusData?.filter(
          (
            session: any
          ) =>
            session.completed
        ).length || 0

      /* COMPLETED TASKS */

      const completed =
        tasks.filter(
          (
            task: Task
          ) =>
            task.completed
        ).length

      setCompletedTasks(
        completed
      )

      /* STREAK */

      const bestStreak =
        habits.length > 0
          ? Math.max(
              ...habits.map(
                (
                  habit: Habit
                ) =>
                  habit.streak
              )
            )
          : 0

      setStreak(
        bestStreak
      )

      /* FOCUS */

      setFocusHours(
        focusSessions
      )

      /* PRODUCTIVITY */

      const productivity =
        Math.min(
          100,
          Math.round(
            (
              (
                completed +
                bestStreak +
                focusSessions
              ) /
              (
                tasks.length +
                habits.length +
                1
              )
            ) * 100
          )
        )

      setProductivityScore(
        productivity
      )

    } catch (error) {

      console.error(
        "Profile sync error:",
        error
      )
    }
  }

  /* SAVE PROFILE */

  function saveProfile() {

    localStorage.setItem(
      "dashboard_profile",
      JSON.stringify(
        profile
      )
    )

    window.dispatchEvent(
      new Event(
        "dashboard_profile_updated"
      )
    )

    setEditing(false)
  }

  if (!mounted) {

    return null
  }

  const initials =
    profile.name
      .split(" ")
      .map(
        (
          word
        ) =>
          word[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase()

  const level =
    Math.max(
      1,
      Math.floor(
        productivityScore / 10
      )
    )

  const xp =
    productivityScore * 12

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
        space-y-8
      "
    >

      {/* HERO */}

      <div
        className="
          relative
          overflow-hidden

          rounded-[40px]

          bg-gradient-to-br
          from-[#4f46e5]
          via-[#6366f1]
          to-[#8b5cf6]

          p-6
          md:p-10

          text-white
        "
      >

        <div
          className="
            flex
            flex-col
            xl:flex-row

            justify-between

            gap-8
          "
        >

          {/* LEFT */}

          <div
            className="
              flex
              flex-col
              md:flex-row

              gap-6
            "
          >

            {/* AVATAR */}

            <div
              className="
                w-28
                h-28

                rounded-full

                bg-white/20

                flex
                items-center
                justify-center

                text-4xl
                font-bold
              "
            >

              {initials}

            </div>

            {/* PROFILE */}

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

                  text-sm

                  mb-4
                "
              >

                <ShieldCheck
                  size={16}
                />

                {profile.role}

              </div>

              {
                editing ? (

                  <div
                    className="
                      space-y-4
                    "
                  >

                    <input
                      value={
                        profile.name
                      }
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name:
                            e.target.value,
                        })
                      }
                      className="
                        w-full

                        px-5
                        py-4

                        rounded-2xl

                        bg-white/10

                        border
                        border-white/20

                        outline-none
                      "
                    />

                    <input
                      value={
                        profile.role
                      }
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          role:
                            e.target.value,
                        })
                      }
                      className="
                        w-full

                        px-5
                        py-4

                        rounded-2xl

                        bg-white/10

                        border
                        border-white/20

                        outline-none
                      "
                    />

                    <button
                      onClick={
                        saveProfile
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2

                        px-6
                        py-3

                        rounded-2xl

                        bg-white

                        text-indigo-600

                        font-semibold
                      "
                    >

                      <Save
                        size={18}
                      />

                      Save Profile

                    </button>

                  </div>

                ) : (

                  <>

                    <h1
                      className="
                        text-4xl
                        md:text-5xl

                        font-bold

                        mb-3
                      "
                    >

                      {
                        profile.name
                      }

                    </h1>

                    <p
                      className="
                        text-indigo-100
                        mb-6
                      "
                    >

                      {
                        profile.role
                      }

                    </p>

                    <button
                      onClick={() =>
                        setEditing(true)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2

                        px-5
                        py-3

                        rounded-2xl

                        bg-white/10

                        border
                        border-white/10
                      "
                    >

                      <Pencil
                        size={18}
                      />

                      Edit Profile

                    </button>

                  </>

                )
              }

            </div>

          </div>

          {/* LEVEL */}

          <div
            className="
              rounded-[32px]

              bg-white/10

              border
              border-white/10

              p-6

              min-w-full
              xl:min-w-[280px]
            "
          >

            <div
              className="
                flex
                items-center
                justify-between

                mb-4
              "
            >

              <div>

                <p
                  className="
                    text-indigo-100
                    text-sm
                  "
                >

                  Productivity Level

                </p>

                <h2
                  className="
                    text-4xl
                    font-bold
                  "
                >

                  Lv {level}

                </h2>

              </div>

              <Crown
                size={42}
              />

            </div>

            <div
              className="
                w-full
                h-3

                rounded-full

                bg-white/10

                overflow-hidden
              "
            >

              <div
                className="
                  h-full

                  bg-white

                  rounded-full
                "
                style={{
                  width:
                    `${productivityScore}%`,
                }}
              />

            </div>

            <p
              className="
                text-sm
                text-indigo-100
                mt-3
              "
            >

              {xp} XP earned

            </p>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4

          gap-6
        "
      >

        {[
          {
            title:
              "Tasks Completed",
            value:
              completedTasks,
            icon:
              CheckCircle2,
            color:
              "text-indigo-500",
          },

          {
            title:
              "Habit Streak",
            value:
              streak,
            icon:
              Flame,
            color:
              "text-orange-500",
          },

          {
            title:
              "Focus Hours",
            value:
              focusHours,
            icon:
              Timer,
            color:
              "text-green-500",
          },

          {
            title:
              "Productivity",
            value:
              `${productivityScore}%`,
            icon:
              Activity,
            color:
              "text-purple-500",
          },

        ].map(
          (
            item,
            index
          ) => {

            const Icon =
              item.icon

            return (

              <motion.div

                key={index}

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
                    index * 0.08,
                }}

                className="
                  rounded-[32px]
                  border

                  bg-white
                  dark:bg-[#111827]

                  p-6
                "
              >

                <Icon
                  size={34}
                  className={`
                    mb-4
                    ${item.color}
                  `}
                />

                <h2
                  className="
                    text-4xl
                    font-bold
                  "
                >

                  {item.value}

                </h2>

                <p
                  className="
                    text-gray-500
                    mt-2
                  "
                >

                  {item.title}

                </p>

              </motion.div>

            )

          }
        )}

      </div>

      {/* AI INSIGHTS */}

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

          <Sparkles
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

            AI Productivity Insights

          </h2>

        </div>

        <div
          className="
            space-y-5
          "
        >

          {[
            `Your productivity score is currently ${productivityScore}%.`,
            `You completed ${completedTasks} tasks successfully.`,
            `Your best habit streak reached ${streak} days.`,
            `${focusHours} focus sessions improved workflow efficiency.`,
          ].map(
            (
              insight,
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
                    index * 0.08,
                }}

                className="
                  rounded-[28px]
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

                  <Brain
                    className="
                      text-indigo-500
                    "
                  />

                </div>

                <p
                  className="
                    text-sm
                    leading-relaxed
                  "
                >

                  {insight}

                </p>

              </motion.div>

            )
          )}

        </div>

      </div>

    </motion.div>
  )
}