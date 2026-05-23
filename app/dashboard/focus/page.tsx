"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import {
  motion,
} from "framer-motion"

import {
  Play,
  Pause,
  RotateCcw,
  Timer,
  ArrowLeft,
  Coffee,
  Brain,
  Zap,
  History,
} from "lucide-react"

import AmbientSounds from "@/components/focus/AmbientSounds"

import {
  supabase,
} from "@/lib/supabase/client"

import {
  addNotification,
} from "@/lib/notifications"

import {
  checkAchievements,
} from "@/lib/achievementEngine"

type FocusSession = {
  id: string
  mode: string
  duration: number
  completed_at: string
}

export default function FocusPage() {

  const [mounted, setMounted] =
    useState(false)

  const [minutes, setMinutes] =
    useState(25)

  const [seconds, setSeconds] =
    useState(0)

  const [isRunning, setIsRunning] =
    useState(false)

  const [sessions, setSessions] =
    useState(0)

  const [mode, setMode] =
    useState("Focus")

  const [
    history,
    setHistory,
  ] = useState<FocusSession[]>([])

  useEffect(() => {

    setMounted(true)

    loadHistory()

  }, [])

  async function loadHistory() {

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    const {
      data,
    } = await supabase
      .from("focus_sessions")
      .select("*")
      .eq(
        "user_id",
        user.id
      )
      .order(
        "completed_at",
        {
          ascending: false,
        }
      )
      .limit(10)

    setHistory(
      (data ||
        []) as FocusSession[]
    )

    setSessions(
      data?.length || 0
    )
  }

  async function saveSession() {

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    let duration = 25

    if (mode === "Break") {

      duration = 5

    } else if (
      mode === "Deep Work"
    ) {

      duration = 50
    }

    const {
      error,
    } = await supabase
      .from("focus_sessions")
      .insert({

        mode,

        duration,

        completed: true,

        user_id:
          user.id,
      })

    if (error) {

      console.error(error)

      return
    }

    /* ACHIEVEMENTS */

    await checkAchievements()

    loadHistory()
  }

  /* AUTO TRANSITIONS */

  function startBreakMode() {

    setMode("Break")

    setMinutes(5)

    setSeconds(0)

    setIsRunning(true)

    addNotification({

      type:
        "default" as any,

      title:
        "Break Started",

      message:
        "☕ Time to recharge for 5 minutes.",
    })
  }

  function startFocusMode() {

    setMode("Focus")

    setMinutes(25)

    setSeconds(0)

    setIsRunning(true)

    addNotification({

      type:
        "default" as any,

      title:
        "Focus Session Started",

      message:
        "⚡ Back to productivity mode.",
    })
  }

  /* TIMER */

  useEffect(() => {

    let interval: any

    if (isRunning) {

      interval =
        setInterval(() => {

          if (seconds > 0) {

            setSeconds(
              (prev) =>
                prev - 1
            )

          } else {

            if (minutes === 0) {

              setIsRunning(false)

              saveSession()

              /* AUTO FLOW */

              if (
                mode === "Focus"
              ) {

                addNotification({

                  type:
                    "default" as any,

                  title:
                    "Focus Complete",

                  message:
                    "🎉 Great work. Break starting automatically.",
                })

                setTimeout(() => {

                  startBreakMode()

                }, 1500)

              } else if (
                mode === "Break"
              ) {

                addNotification({

                  type:
                    "default" as any,

                  title:
                    "Break Complete",

                  message:
                    "🚀 Returning to Focus Mode.",
                })

                setTimeout(() => {

                  startFocusMode()

                }, 1500)

              } else {

                addNotification({

                  type:
                    "default" as any,

                  title:
                    "Deep Work Complete",

                  message:
                    "🔥 Incredible focus session completed.",
                })
              }

              return
            }

            setMinutes(
              (prev) =>
                prev - 1
            )

            setSeconds(59)
          }

        }, 1000)
    }

    return () =>
      clearInterval(interval)

  }, [
    isRunning,
    seconds,
    minutes,
    mode,
  ])

  /* RESET */

  const resetTimer = () => {

    if (mode === "Focus") {

      setMinutes(25)

    } else if (
      mode === "Break"
    ) {

      setMinutes(5)

    } else {

      setMinutes(50)
    }

    setSeconds(0)

    setIsRunning(false)
  }

  /* MANUAL MODES */

  const setFocusMode = () => {

    setMode("Focus")

    setMinutes(25)

    setSeconds(0)

    setIsRunning(false)
  }

  const setBreakMode = () => {

    setMode("Break")

    setMinutes(5)

    setSeconds(0)

    setIsRunning(false)
  }

  const setDeepWorkMode = () => {

    setMode("Deep Work")

    setMinutes(50)

    setSeconds(0)

    setIsRunning(false)
  }

  if (!mounted) {

    return null
  }

  return (

    <motion.div

      initial={{
        opacity: 0,
      }}

      animate={{
        opacity: 1,
      }}

      className="
        min-h-[85vh]
        flex
        items-center
        justify-center
      "
    >

      <div
        className="
          w-full
          max-w-6xl
          rounded-[40px]
          border
          bg-white
          dark:bg-[#111827]
          p-6 md:p-10
          shadow-2xl
        "
      >

        {/* TOP */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
            mb-10
          "
        >

          <Link
            href="/dashboard"
            className="
              flex items-center
              gap-2
              px-5 py-3
              rounded-2xl
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              w-fit
            "
          >

            <ArrowLeft size={18} />

            Dashboard

          </Link>

          <div
            className="
              px-5 py-3
              rounded-2xl
              bg-indigo-100
              dark:bg-[#1e293b]
              text-indigo-600
              dark:text-indigo-300
              font-medium
              w-fit
            "
          >

            {mode} Mode

          </div>

        </div>

        {/* HEADER */}

        <div
          className="
            text-center
            mb-12
          "
        >

          <div
            className="
              w-28 h-28
              rounded-full
              bg-[#eef2ff]
              dark:bg-[#1e293b]
              flex items-center
              justify-center
              mx-auto
              mb-8
            "
          >

            <Timer
              size={48}
              className="
                text-indigo-500
              "
            />

          </div>

          <h1
            className="
              text-4xl
              md:text-6xl
              font-bold
              mb-4
            "
          >

            Focus Mode

          </h1>

          <p
            className="
              text-gray-500
              text-base
              md:text-lg
            "
          >

            Stay productive with timed focus sessions

          </p>

        </div>

        {/* MODES */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            mb-12
          "
        >

          <button
            onClick={setFocusMode}
            className={`
              rounded-3xl
              border
              p-5
              text-left
              transition-all

              ${
                mode === "Focus"
                  ? `
                    bg-indigo-500
                    text-white
                    border-indigo-500
                  `
                  : `
                    bg-[#f8fafc]
                    dark:bg-[#1e293b]
                  `
              }
            `}
          >

            <Brain
              size={32}
              className="mb-4"
            />

            <h2
              className="
                text-xl
                font-semibold
                mb-2
              "
            >

              Focus

            </h2>

            <p
              className="
                text-sm
                opacity-80
              "
            >

              25 minute productivity sprint

            </p>

          </button>

          <button
            onClick={setBreakMode}
            className={`
              rounded-3xl
              border
              p-5
              text-left
              transition-all

              ${
                mode === "Break"
                  ? `
                    bg-green-500
                    text-white
                    border-green-500
                  `
                  : `
                    bg-[#f8fafc]
                    dark:bg-[#1e293b]
                  `
              }
            `}
          >

            <Coffee
              size={32}
              className="mb-4"
            />

            <h2
              className="
                text-xl
                font-semibold
                mb-2
              "
            >

              Break

            </h2>

            <p
              className="
                text-sm
                opacity-80
              "
            >

              5 minute recharge break

            </p>

          </button>

          <button
            onClick={setDeepWorkMode}
            className={`
              rounded-3xl
              border
              p-5
              text-left
              transition-all

              ${
                mode === "Deep Work"
                  ? `
                    bg-orange-500
                    text-white
                    border-orange-500
                  `
                  : `
                    bg-[#f8fafc]
                    dark:bg-[#1e293b]
                  `
              }
            `}
          >

            <Zap
              size={32}
              className="mb-4"
            />

            <h2
              className="
                text-xl
                font-semibold
                mb-2
              "
            >

              Deep Work

            </h2>

            <p
              className="
                text-sm
                opacity-80
              "
            >

              50 minute intense session

            </p>

          </button>

        </div>

        {/* TIMER */}

        <motion.div

          key={`${minutes}:${seconds}`}

          initial={{
            scale: 0.95,
          }}

          animate={{
            scale: 1,
          }}

          className="
            text-center
            mb-14
          "
        >

          <div
            className="
              text-[80px]
              md:text-[140px]
              font-bold
              leading-none
              tracking-tight
            "
          >

            {String(minutes).padStart(2, "0")}
            :
            {String(seconds).padStart(2, "0")}

          </div>

        </motion.div>

        {/* CONTROLS */}

        <div
          className="
            flex items-center
            justify-center
            gap-5
            mb-14
          "
        >

          <button
            onClick={() =>
              setIsRunning(
                !isRunning
              )
            }
            className="
              w-20 h-20
              rounded-full
              bg-gradient-to-r
              from-[#4f46e5]
              to-[#6366f1]
              text-white
              flex items-center
              justify-center
              shadow-xl
              hover:scale-105
              transition-all
            "
          >

            {
              isRunning
                ? (
                  <Pause size={34} />
                )
                : (
                  <Play size={34} />
                )
            }

          </button>

          <button
            onClick={resetTimer}
            className="
              w-20 h-20
              rounded-full
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              flex items-center
              justify-center
              border
              hover:scale-105
              transition-all
            "
          >

            <RotateCcw size={30} />

          </button>

        </div>

        {/* AMBIENT */}

        <div className="mb-10">

          <AmbientSounds />

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          "
        >

          {/* HISTORY */}

          <div
            className="
              rounded-[32px]
              border
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              p-6
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

              <History
                className="
                  text-indigo-500
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >

                Session History

              </h2>

            </div>

            <div className="space-y-4">

              {history.length === 0 ? (

                <p
                  className="
                    text-gray-500
                  "
                >

                  No sessions completed yet.

                </p>

              ) : (

                history.map(
                  (session) => (

                    <div

                      key={session.id}

                      className="
                        flex
                        items-center
                        justify-between

                        rounded-2xl

                        bg-white
                        dark:bg-[#111827]

                        px-4
                        py-3
                      "
                    >

                      <div>

                        <p
                          className="
                            font-semibold
                          "
                        >

                          {session.mode}

                        </p>

                        <p
                          className="
                            text-sm
                            text-gray-500
                          "
                        >

                          {session.duration}
                          min session

                        </p>

                      </div>

                      <div
                        className="
                          text-sm
                          text-gray-400
                        "
                      >

                        {
                          new Date(
                            session.completed_at
                          ).toLocaleDateString()
                        }

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </div>

          {/* SUMMARY */}

          <div
            className="
              rounded-[32px]
              border
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              p-6
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >

              Productivity Summary

            </h2>

            <div className="space-y-4">

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>Total Sessions</span>

                <span
                  className="
                    font-bold
                  "
                >

                  {sessions}

                </span>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>Total Focus Time</span>

                <span
                  className="
                    font-bold
                  "
                >

                  {history.reduce(
                    (
                      total,
                      item
                    ) =>
                      total +
                      item.duration,
                    0
                  )}m

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  )
}