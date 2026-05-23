"use client"

import {
  useState,
} from "react"

import Link from "next/link"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  Plus,
  CheckSquare,
  Flame,
  CalendarDays,
  X,
} from "lucide-react"

export default function QuickActions() {

  const [open, setOpen] =
    useState(false)

  return (

    <div
      className="
        fixed
        bottom-6
        right-6
        z-[100]
      "
    >

      {/* ACTIONS */}

      <AnimatePresence>

        {
          open && (

            <motion.div

              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: 20,
                scale: 0.95,
              }}

              className="
                flex
                flex-col
                gap-3
                mb-4
              "
            >

              {/* TASK */}

              <Link
                href="/dashboard/tasks"
                className="
                  flex items-center gap-3
                  px-5 py-4
                  rounded-2xl
                  bg-white
                  dark:bg-[#111827]
                  border
                  shadow-xl
                  hover:scale-105
                  transition-all
                "
              >

                <CheckSquare
                  size={18}
                />

                <span className="text-sm font-medium">
                  Tasks
                </span>

              </Link>

              {/* HABITS */}

              <Link
                href="/dashboard/habits"
                className="
                  flex items-center gap-3
                  px-5 py-4
                  rounded-2xl
                  bg-white
                  dark:bg-[#111827]
                  border
                  shadow-xl
                  hover:scale-105
                  transition-all
                "
              >

                <Flame
                  size={18}
                />

                <span className="text-sm font-medium">
                  Habits
                </span>

              </Link>

              {/* PLANNER */}

              <Link
                href="/dashboard/planner"
                className="
                  flex items-center gap-3
                  px-5 py-4
                  rounded-2xl
                  bg-white
                  dark:bg-[#111827]
                  border
                  shadow-xl
                  hover:scale-105
                  transition-all
                "
              >

                <CalendarDays
                  size={18}
                />

                <span className="text-sm font-medium">
                  Planner
                </span>

              </Link>

            </motion.div>

          )
        }

      </AnimatePresence>

      {/* FAB BUTTON */}

      <motion.button

        whileTap={{
          scale: 0.9,
        }}

        onClick={() =>
          setOpen(!open)
        }

        className="
          w-16 h-16
          rounded-full
          bg-gradient-to-r
          from-[#4f46e5]
          to-[#6366f1]
          text-white
          shadow-2xl
          flex items-center
          justify-center
        "
      >

        {
          open
            ? (
              <X size={28} />
            )
            : (
              <Plus size={28} />
            )
        }

      </motion.button>

    </div>
  )
}