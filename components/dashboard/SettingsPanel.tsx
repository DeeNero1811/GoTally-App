"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  User,
  Mail,
  Bell,
  Moon,
  Shield,
  LogOut,
  Sparkles,
  Palette,
  Lock,
  ChevronRight,
} from "lucide-react"

import { supabase } from "../../lib/supabase"

import ThemeToggle from "../ThemeToggle"

export default function SettingsPanel() {

  const [email, setEmail] =
    useState("")

  const [name, setName] =
    useState("Olalude")

  const [
    remindersEnabled,
    setRemindersEnabled,
  ] = useState(true)

  const [
    aiSuggestionsEnabled,
    setAiSuggestionsEnabled,
  ] = useState(true)

  useEffect(() => {

    async function getUser() {

      const {
        data: authData,
      } = await supabase.auth.getUser()

      if (
        authData.user?.email
      ) {

        setEmail(
          authData.user.email
        )
      }
    }

    getUser()

  }, [])

  async function handleLogout() {

    await supabase.auth.signOut()

    window.location.href =
      "/login"
  }

  return (

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
        relative
        overflow-hidden
        rounded-[40px]

        bg-white/70
        dark:bg-[#111827]/70

        backdrop-blur-2xl

        border
        border-white/20

        shadow-[0_20px_80px_rgba(0,0,0,0.15)]

        p-6
        md:p-8
      "
    >

      {/* AMBIENT BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          pointer-events-none
        "
      >

        <div
          className="
            absolute
            top-[-120px]
            right-[-120px]

            w-[300px]
            h-[300px]

            rounded-full

            bg-indigo-500/20

            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-[-100px]
            left-[-100px]

            w-[260px]
            h-[260px]

            rounded-full

            bg-purple-500/20

            blur-[120px]
          "
        />

      </div>

      <div className="relative z-10">

        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between
            mb-10
            flex-wrap
            gap-4
          "
        >

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4 py-2

                rounded-full

                bg-white/60
                dark:bg-white/10

                backdrop-blur-xl

                text-sm
                font-medium

                mb-4
              "
            >

              <Sparkles
                size={16}
              />

              Premium Workspace Settings

            </div>

            <h2
              className="
                text-3xl
                md:text-4xl
                font-bold
                tracking-tight

                text-[#0f172a]
                dark:text-white

                mb-3
              "
            >
              Customize Your Workspace
            </h2>

            <p
              className="
                text-[#64748b]
                dark:text-gray-400
                max-w-2xl
              "
            >
              Personalize your productivity dashboard,
              notifications, AI experience,
              and security preferences.
            </p>

          </div>

        </div>

        {/* GRID */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >

          {/* PROFILE */}

          <motion.div

            whileHover={{
              y: -4,
            }}

            className="
              rounded-[32px]

              bg-white/60
              dark:bg-[#1e293b]/70

              backdrop-blur-xl

              border
              border-white/20

              p-6
            "
          >

            <div
              className="
                flex items-center
                gap-4
                mb-6
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-3xl

                  bg-gradient-to-br
                  from-indigo-500
                  to-violet-500

                  text-white

                  flex items-center
                  justify-center

                  shadow-lg
                "
              >

                <User size={24} />

              </div>

              <div>

                <h3
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  Profile Information
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  Manage your public account details
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    mb-2
                    block
                  "
                >
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="
                    w-full

                    rounded-2xl

                    bg-white/80
                    dark:bg-[#0f172a]

                    border
                    border-white/20

                    px-5 py-4

                    outline-none

                    dark:text-white
                  "
                />

              </div>

              <div>

                <label
                  className="
                    text-sm
                    font-medium
                    mb-2
                    block
                  "
                >
                  Email Address
                </label>

                <div
                  className="
                    flex items-center
                    gap-3

                    rounded-2xl

                    bg-white/80
                    dark:bg-[#0f172a]

                    border
                    border-white/20

                    px-5 py-4
                  "
                >

                  <Mail
                    size={18}
                    className="
                      text-gray-400
                    "
                  />

                  <span>
                    {email}
                  </span>

                </div>

              </div>

            </div>

          </motion.div>

          {/* APPEARANCE */}

          <motion.div

            whileHover={{
              y: -4,
            }}

            className="
              rounded-[32px]

              bg-white/60
              dark:bg-[#1e293b]/70

              backdrop-blur-xl

              border
              border-white/20

              p-6
            "
          >

            <div
              className="
                flex items-center
                gap-4
                mb-6
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-3xl

                  bg-gradient-to-br
                  from-violet-500
                  to-fuchsia-500

                  text-white

                  flex items-center
                  justify-center
                "
              >

                <Palette size={24} />

              </div>

              <div>

                <h3
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  Appearance
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  Customize dashboard visuals
                </p>

              </div>

            </div>

            <div
              className="
                flex items-center
                justify-between

                rounded-3xl

                bg-white/70
                dark:bg-[#0f172a]

                border
                border-white/20

                px-5 py-5
              "
            >

              <div>

                <h4
                  className="
                    font-semibold
                  "
                >
                  Dark Mode
                </h4>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  Switch between light and dark themes
                </p>

              </div>

              <ThemeToggle />

            </div>

          </motion.div>

          {/* NOTIFICATIONS */}

          <motion.div

            whileHover={{
              y: -4,
            }}

            className="
              rounded-[32px]

              bg-white/60
              dark:bg-[#1e293b]/70

              backdrop-blur-xl

              border
              border-white/20

              p-6
            "
          >

            <div
              className="
                flex items-center
                gap-4
                mb-6
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-3xl

                  bg-gradient-to-br
                  from-emerald-500
                  to-green-500

                  text-white

                  flex items-center
                  justify-center
                "
              >

                <Bell size={24} />

              </div>

              <div>

                <h3
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  Notifications
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  Productivity alerts and reminders
                </p>

              </div>

            </div>

            <div className="space-y-4">

              {/* REMINDERS */}

              <button
                onClick={() =>
                  setRemindersEnabled(
                    !remindersEnabled
                  )
                }
                className="
                  w-full

                  flex items-center
                  justify-between

                  rounded-3xl

                  bg-white/70
                  dark:bg-[#0f172a]

                  border
                  border-white/20

                  px-5 py-5

                  transition-all
                "
              >

                <div className="text-left">

                  <h4
                    className="
                      font-semibold
                    "
                  >
                    Daily Reminders
                  </h4>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Receive productivity reminders
                  </p>

                </div>

                <motion.div
                  animate={{
                    backgroundColor:
                      remindersEnabled
                        ? "#10b981"
                        : "#64748b",
                  }}
                  className="
                    w-14 h-8
                    rounded-full
                    relative
                  "
                >

                  <motion.div
                    animate={{
                      x:
                        remindersEnabled
                          ? 24
                          : 4,
                    }}
                    className="
                      absolute
                      top-1

                      w-6 h-6
                      rounded-full
                      bg-white
                    "
                  />

                </motion.div>

              </button>

              {/* AI SUGGESTIONS */}

              <button
                onClick={() =>
                  setAiSuggestionsEnabled(
                    !aiSuggestionsEnabled
                  )
                }
                className="
                  w-full

                  flex items-center
                  justify-between

                  rounded-3xl

                  bg-white/70
                  dark:bg-[#0f172a]

                  border
                  border-white/20

                  px-5 py-5

                  transition-all
                "
              >

                <div className="text-left">

                  <h4
                    className="
                      font-semibold
                    "
                  >
                    AI Suggestions
                  </h4>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Smart productivity recommendations
                  </p>

                </div>

                <motion.div
                  animate={{
                    backgroundColor:
                      aiSuggestionsEnabled
                        ? "#8b5cf6"
                        : "#64748b",
                  }}
                  className="
                    w-14 h-8
                    rounded-full
                    relative
                  "
                >

                  <motion.div
                    animate={{
                      x:
                        aiSuggestionsEnabled
                          ? 24
                          : 4,
                    }}
                    className="
                      absolute
                      top-1

                      w-6 h-6
                      rounded-full
                      bg-white
                    "
                  />

                </motion.div>

              </button>

            </div>

          </motion.div>

          {/* SECURITY */}

          <motion.div

            whileHover={{
              y: -4,
            }}

            className="
              rounded-[32px]

              bg-white/60
              dark:bg-[#1e293b]/70

              backdrop-blur-xl

              border
              border-white/20

              p-6
            "
          >

            <div
              className="
                flex items-center
                gap-4
                mb-6
              "
            >

              <div
                className="
                  w-14 h-14
                  rounded-3xl

                  bg-gradient-to-br
                  from-orange-500
                  to-red-500

                  text-white

                  flex items-center
                  justify-center
                "
              >

                <Lock size={24} />

              </div>

              <div>

                <h3
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  Security
                </h3>

                <p
                  className="
                    text-sm
                    text-gray-500
                    mt-1
                  "
                >
                  Manage account protection
                </p>

              </div>

            </div>

            <div className="space-y-4">

              <button
                className="
                  w-full

                  flex items-center
                  justify-between

                  rounded-3xl

                  bg-white/70
                  dark:bg-[#0f172a]

                  border
                  border-white/20

                  px-5 py-5
                "
              >

                <div className="text-left">

                  <h4
                    className="
                      font-semibold
                    "
                  >
                    Password & Security
                  </h4>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      mt-1
                    "
                  >
                    Update your account credentials
                  </p>

                </div>

                <ChevronRight
                  size={20}
                  className="
                    text-gray-400
                  "
                />

              </button>

              <button
                onClick={handleLogout}
                className="
                  w-full

                  rounded-3xl

                  bg-gradient-to-r
                  from-red-500
                  to-rose-500

                  hover:scale-[1.01]

                  text-white

                  px-5 py-5

                  transition-all

                  flex items-center
                  justify-center
                  gap-3

                  font-semibold
                "
              >

                <LogOut size={18} />

                Logout Account

              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </motion.div>
  )
}