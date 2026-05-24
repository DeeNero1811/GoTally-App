"use client"

import { useEffect, useRef, useState } from "react"

import {
  Bell,
  Moon,
  Search,
  Menu,
} from "lucide-react"

export default function Navbar() {

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false)

  const notificationRef =
    useRef<HTMLDivElement | null>(
      null
    )

  // CLOSE WHEN CLICKING OUTSIDE

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {

        setShowNotifications(false)

      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )

    }

  }, [])

  return (

    <header
      className="
        relative

        w-full
        min-w-0

        rounded-[24px]

        border

        bg-white
        dark:bg-[#111827]

        p-2
        sm:p-3
        md:p-4

        overflow-visible
      "
    >

      <div
        className="
          flex
          items-center

          gap-2

          w-full
          min-w-0
        "
      >

        {/* MENU */}

        <button
          className="
            shrink-0

            w-10
            h-10

            rounded-2xl

            border

            bg-[#f8fafc]
            dark:bg-[#0f172a]

            flex
            items-center
            justify-center
          "
        >

          <Menu size={18} />

        </button>

        {/* SEARCH */}

        <div
          className="
            flex
            items-center

            gap-2

            flex-1
            min-w-0

            rounded-2xl

            border

            bg-[#f8fafc]
            dark:bg-[#0f172a]

            px-3
            py-2.5
          "
        >

          <Search
            size={16}
            className="
              shrink-0
            "
          />

          <input
            placeholder="Search tasks..."
            className="
              w-full
              min-w-0

              bg-transparent
              outline-none

              text-xs
              sm:text-sm
            "
          />

        </div>

        {/* NOTIFICATIONS */}

        <div
          className="
            relative
            shrink-0
          "
          ref={notificationRef}
        >

          <button
            onClick={() =>
              setShowNotifications(
                !showNotifications
              )
            }
            className="
              relative

              w-10
              h-10

              rounded-2xl

              border

              bg-[#f8fafc]
              dark:bg-[#0f172a]

              flex
              items-center
              justify-center
            "
          >

            <Bell size={18} />

            <span
              className="
                absolute

                top-2
                right-2

                w-2
                h-2

                rounded-full

                bg-red-500
              "
            />

          </button>
{/* NOTIFICATION PANEL */}

{
  showNotifications && (

    <div
      className="
        fixed

        top-[72px]

        inset-x-2
        sm:inset-x-auto

        sm:right-4

        sm:w-[340px]

        rounded-[20px]

        border

        bg-white
        dark:bg-[#111827]

        p-2
        sm:p-4

        shadow-2xl

        z-[9999]

        overflow-hidden
      "
    >

      <div
        className="
          flex
          items-center
          justify-between

          gap-2

          mb-3
        "
      >

        <h2
          className="
            text-sm
            font-bold

            truncate
          "
        >
          Notifications
        </h2>

        <button
          className="
            shrink-0

            text-xs
            text-indigo-600
          "
        >
          Clear
        </button>

      </div>

      <div
        className="
          space-y-2
        "
      >

        <div
          className="
            rounded-2xl

            bg-[#f8fafc]
            dark:bg-[#0f172a]

            p-2.5
            sm:p-3

            text-sm

            break-words
          "
        >

          🚀 Task moved to progress

        </div>

        <div
          className="
            rounded-2xl

            bg-[#f8fafc]
            dark:bg-[#0f172a]

            p-2.5
            sm:p-3

            text-sm

            break-words
          "
        >

          ✅ Productivity streak updated

        </div>

      </div>

    </div>

  )
}

        </div>

        {/* THEME */}

        <button
          className="
            shrink-0

            w-10
            h-10

            rounded-2xl

            border

            bg-[#f8fafc]
            dark:bg-[#0f172a]

            flex
            items-center
            justify-center
          "
        >

          <Moon size={18} />

        </button>

      </div>

    </header>
  )
}