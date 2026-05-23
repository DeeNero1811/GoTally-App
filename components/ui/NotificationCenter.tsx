"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import {
  Sparkles,
  Brain,
  Trophy,
  Flame,
  X,
} from "lucide-react"

type Notification = {
  id: number
  title: string
  description: string
  type:
    | "achievement"
    | "ai"
    | "streak"
}

const demoNotifications: Notification[] = [

  {
    id: 1,
    title:
      "Level Up 🚀",
    description:
      "You reached Productivity Level 4.",
    type:
      "achievement",
  },

  {
    id: 2,
    title:
      "AI Recommendation",
    description:
      "AI suggests scheduling a deep focus session now.",
    type:
      "ai",
  },

  {
    id: 3,
    title:
      "7-Day Streak 🔥",
    description:
      "Consistency is improving rapidly.",
    type:
      "streak",
  },
]

export default function NotificationCenter() {

  const [
    notifications,
    setNotifications,
  ] = useState<
    Notification[]
  >([])

  useEffect(() => {

    let index = 0

    const interval =
      setInterval(() => {

        if (
          index >=
          demoNotifications.length
        ) {

          clearInterval(
            interval
          )

          return
        }

        const notification =
          demoNotifications[index]

        setNotifications(
          (
            prev
          ) => [
            ...prev,
            notification,
          ]
        )

        setTimeout(() => {

          removeNotification(
            notification.id
          )

        }, 5000)

        index++

      }, 3500)

    return () =>
      clearInterval(
        interval
      )

  }, [])

  function removeNotification(
    id: number
  ) {

    setNotifications(
      (
        prev
      ) =>
        prev.filter(
          (
            notification
          ) =>
            notification.id !==
            id
        )
    )
  }

  function getIcon(
    type: string
  ) {

    switch (type) {

      case "achievement":

        return (
          <Trophy size={22} />
        )

      case "streak":

        return (
          <Flame size={22} />
        )

      default:

        return (
          <Brain size={22} />
        )
    }
  }

  return (

    <div
      className="
        fixed

        top-6
        right-6

        z-[99999]

        flex
        flex-col

        gap-4
      "
    >

      <AnimatePresence>

        {
          notifications.map(
            (
              notification
            ) => (

              <motion.div

                key={
                  notification.id
                }

                initial={{
                  opacity: 0,
                  x: 100,
                  scale: 0.9,
                }}

                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  x: 100,
                  scale: 0.9,
                }}

                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}

                className="
                  relative
                  overflow-hidden

                  w-[360px]

                  rounded-[32px]

                  border
                  border-white/20

                  bg-white/80
                  dark:bg-[#111827]/80

                  backdrop-blur-3xl

                  p-5

                  shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                "
              >

                {/* GLOW */}

                <div
                  className="
                    absolute
                    top-0
                    right-0

                    w-40
                    h-40

                    rounded-full

                    bg-indigo-500/10

                    blur-3xl
                  "
                />

                <div
                  className="
                    relative
                    z-10

                    flex
                    items-start
                    gap-4
                  "
                >

                  {/* ICON */}

                  <div
                    className="
                      w-14
                      h-14

                      rounded-2xl

                      bg-gradient-to-br
                      from-indigo-500
                      to-violet-600

                      text-white

                      flex
                      items-center
                      justify-center

                      shadow-xl

                      shrink-0
                    "
                  >

                    {
                      getIcon(
                        notification.type
                      )
                    }

                  </div>

                  {/* CONTENT */}

                  <div className="flex-1">

                    <div
                      className="
                        flex
                        items-center
                        justify-between

                        mb-2
                      "
                    >

                      <h3
                        className="
                          font-bold
                          text-lg
                        "
                      >

                        {
                          notification.title
                        }

                      </h3>

                      <button

                        onClick={() =>
                          removeNotification(
                            notification.id
                          )
                        }

                        className="
                          w-8
                          h-8

                          rounded-xl

                          bg-gray-100
                          dark:bg-[#1e293b]

                          flex
                          items-center
                          justify-center
                        "
                      >

                        <X size={14} />

                      </button>

                    </div>

                    <p
                      className="
                        text-sm
                        leading-relaxed

                        text-gray-500
                      "
                    >

                      {
                        notification.description
                      }

                    </p>

                    {/* TAG */}

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2

                        mt-4

                        px-3
                        py-2

                        rounded-full

                        bg-indigo-100
                        dark:bg-indigo-500/10

                        text-indigo-600

                        text-xs
                        font-semibold
                      "
                    >

                      <Sparkles size={12} />

                      GoTaskly Intelligence

                    </div>

                  </div>

                </div>

              </motion.div>

            )
          )
        }

      </AnimatePresence>

    </div>
  )
}