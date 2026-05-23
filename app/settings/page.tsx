"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Bell,
  Brain,
  Moon,
  CheckCircle2,
} from "lucide-react"

import {
  useTheme,
} from "next-themes"

export default function SettingsPage() {

  const {
    theme,
    setTheme,
  } = useTheme()

  const [
    mounted,
    setMounted,
  ] = useState(false)

  const [
    notifications,
    setNotifications,
  ] = useState(true)

  const [
    aiInsights,
    setAiInsights,
  ] = useState(true)

  useEffect(() => {

    setMounted(true)

  }, [])

  /* LOAD SETTINGS */

  useEffect(() => {

    const savedNotifications =
      localStorage.getItem(
        "settings_notifications"
      )

    const savedInsights =
      localStorage.getItem(
        "settings_ai_insights"
      )

    if (savedNotifications) {

      setNotifications(
        JSON.parse(
          savedNotifications
        )
      )
    }

    if (savedInsights) {

      setAiInsights(
        JSON.parse(
          savedInsights
        )
      )
    }

  }, [])

  /* SAVE SETTINGS */

  useEffect(() => {

    localStorage.setItem(
      "settings_notifications",
      JSON.stringify(
        notifications
      )
    )

  }, [notifications])

  useEffect(() => {

    localStorage.setItem(
      "settings_ai_insights",
      JSON.stringify(
        aiInsights
      )
    )

  }, [aiInsights])

  const darkMode =
    theme === "dark"

  const settings = [
    {
      title:
        "Notifications",

      description:
        "Productivity activity alerts",

      icon:
        Bell,

      enabled:
        notifications,

      onToggle:
        () =>
          setNotifications(
            !notifications
          ),
    },

    {
      title:
        "AI Insights",

      description:
        "Smart productivity recommendations",

      icon:
        Brain,

      enabled:
        aiInsights,

      onToggle:
        () =>
          setAiInsights(
            !aiInsights
          ),
    },

    {
      title:
        "Dark Mode",

      description:
        "Toggle dark appearance",

      icon:
        Moon,

      enabled:
        darkMode,

      onToggle:
        () => {

          setTheme(
            darkMode
              ? "light"
              : "dark"
          )
        },
    },
  ]

  if (!mounted) {

    return null
  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          rounded-[36px]
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          p-10
          text-white
        "
      >

        <div className="flex items-center gap-4 mb-5">

          <div className="w-16 h-16 rounded-3xl bg-white/20 flex items-center justify-center">

            <CheckCircle2 size={34} />

          </div>

          <div>

            <h1 className="text-5xl font-black">
              Settings
            </h1>

            <p className="text-indigo-100 mt-2">
              Personalize your productivity experience
            </p>

          </div>

        </div>

      </motion.div>

      {/* SETTINGS */}

      <div className="grid gap-6">

        {
          settings.map(
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
                      index * 0.1,
                  }}
                  className="
                    rounded-[32px]
                    bg-white/70
                    dark:bg-[#111827]/70
                    backdrop-blur-xl
                    border
                    border-white/20
                    p-7
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div className="flex items-center gap-5">

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white">

                      <Icon size={26} />

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold mb-1">
                        {item.title}
                      </h2>

                      <p className="text-gray-500">
                        {item.description}
                      </p>

                    </div>

                  </div>

                  {/* TOGGLE */}

                  <button
                    onClick={
                      item.onToggle
                    }
                    className={`
                      relative
                      w-16
                      h-9
                      rounded-full
                      transition-all
                      ${
                        item.enabled
                          ? "bg-indigo-600"
                          : "bg-gray-300 dark:bg-[#1e293b]"
                      }
                    `}
                  >

                    <motion.div
                      layout
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className={`
                        absolute
                        top-1
                        w-7
                        h-7
                        rounded-full
                        bg-white
                        ${
                          item.enabled
                            ? "left-8"
                            : "left-1"
                        }
                      `}
                    />

                  </button>

                </motion.div>

              )
            }
          )
        }

      </div>

    </div>
  )
}