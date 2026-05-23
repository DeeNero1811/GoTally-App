"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Settings,
  Moon,
  Bell,
  Brain,
  Target,
  Save,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

export default function SettingsPage() {

  const [
    username,
    setUsername,
  ] = useState("")

  const [
    bio,
    setBio,
  ] = useState("")

  const [
    focusDuration,
    setFocusDuration,
  ] = useState(25)

  const [
    dailyGoal,
    setDailyGoal,
  ] = useState(5)

  const [
    notifications,
    setNotifications,
  ] = useState(true)

  const [
    aiInsights,
    setAiInsights,
  ] = useState(true)

  const [
    loading,
    setLoading,
  ] = useState(false)

  useEffect(() => {

    loadSettings()

  }, [])

  async function loadSettings() {

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
      .from("profiles")
      .select("*")
      .eq(
        "id",
        user.id
      )
      .single()

    if (!data)
      return

    setUsername(
      data.username || ""
    )

    setBio(
      data.bio || ""
    )

    setFocusDuration(
      data.focus_duration || 25
    )

    setDailyGoal(
      data.daily_goal || 5
    )

    setNotifications(
      data.notifications ?? true
    )

    setAiInsights(
      data.ai_insights ?? true
    )
  }

  async function saveSettings() {

    setLoading(true)

    const {
      data: {
        user,
      },
    } = await supabase
      .auth
      .getUser()

    if (!user)
      return

    await supabase
      .from("profiles")
      .upsert({

        id:
          user.id,

        username,

        bio,

        focus_duration:
          focusDuration,

        daily_goal:
          dailyGoal,

        notifications,

        ai_insights:
          aiInsights,
      })

    setLoading(false)

    alert(
      "Settings saved successfully."
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
        max-w-5xl
        mx-auto
        space-y-8
      "
    >

      {/* HEADER */}

      <div
        className="
          rounded-[40px]

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
            gap-4
          "
        >

          <Settings size={40} />

          <div>

            <h1
              className="
                text-5xl
                font-black
              "
            >

              Settings

            </h1>

            <p
              className="
                text-indigo-100
                mt-2
              "
            >

              Personalize your productivity workspace.

            </p>

          </div>

        </div>

      </div>

      {/* PROFILE */}

      <div
        className="
          rounded-[32px]
          border

          bg-white
          dark:bg-[#111827]

          p-8
          space-y-6
        "
      >

        <h2
          className="
            text-3xl
            font-bold
          "
        >

          Profile

        </h2>

        <input
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          placeholder="Username"
          className="
            w-full
            rounded-2xl
            border
            p-4
            bg-transparent
          "
        />

        <textarea
          value={bio}
          onChange={(e) =>
            setBio(
              e.target.value
            )
          }
          placeholder="Bio"
          rows={4}
          className="
            w-full
            rounded-2xl
            border
            p-4
            bg-transparent
          "
        />

      </div>

      {/* PRODUCTIVITY */}

      <div
        className="
          rounded-[32px]
          border

          bg-white
          dark:bg-[#111827]

          p-8
          space-y-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Target
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

            Productivity

          </h2>

        </div>

        <div className="space-y-4">

          <label
            className="
              block
              font-semibold
            "
          >

            Focus Duration (minutes)

          </label>

          <input
            type="number"
            value={focusDuration}
            onChange={(e) =>
              setFocusDuration(
                Number(
                  e.target.value
                )
              )
            }
            className="
              w-full
              rounded-2xl
              border
              p-4
              bg-transparent
            "
          />

        </div>

        <div className="space-y-4">

          <label
            className="
              block
              font-semibold
            "
          >

            Daily Task Goal

          </label>

          <input
            type="number"
            value={dailyGoal}
            onChange={(e) =>
              setDailyGoal(
                Number(
                  e.target.value
                )
              )
            }
            className="
              w-full
              rounded-2xl
              border
              p-4
              bg-transparent
            "
          />

        </div>

      </div>

      {/* PREFERENCES */}

      <div
        className="
          rounded-[32px]
          border

          bg-white
          dark:bg-[#111827]

          p-8
          space-y-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Bell
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

            Preferences

          </h2>

        </div>

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
                font-semibold
              "
            >

              Notifications

            </p>

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              Enable productivity notifications

            </p>

          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(
                !notifications
              )
            }
          />

        </div>

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
                font-semibold
              "
            >

              AI Insights

            </p>

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              Enable AI productivity recommendations

            </p>

          </div>

          <input
            type="checkbox"
            checked={aiInsights}
            onChange={() =>
              setAiInsights(
                !aiInsights
              )
            }
          />

        </div>

      </div>

      {/* SAVE */}

      <button

        onClick={
          saveSettings
        }

        disabled={loading}

        className="
          w-full

          rounded-[28px]

          bg-gradient-to-r
          from-[#4f46e5]
          to-[#7c3aed]

          p-5

          text-white
          font-bold

          flex
          items-center
          justify-center
          gap-3
        "
      >

        <Save size={22} />

        {
          loading
            ? "Saving..."
            : "Save Settings"
        }

      </button>

    </motion.div>
  )
}