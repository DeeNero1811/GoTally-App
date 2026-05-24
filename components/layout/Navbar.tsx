"use client"

import { Bell, Search } from "lucide-react"

import { useState } from "react"

export default function Navbar() {

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false)

  return (

    <header
      className="
        flex
        items-center
        justify-between

        gap-4

        flex-wrap

        rounded-[32px]

        border

        bg-white
        dark:bg-[#111827]

        p-4
        md:p-6
      "
    >

      {/* SEARCH */}

      <div
        className="
          flex
          items-center
          gap-3

          rounded-2xl

          border

          bg-[#f8fafc]
          dark:bg-[#0f172a]

          px-4
          py-3

          w-full
          md:max-w-md
        "
      >

        <Search size={18} />

        <input
          placeholder="Search..."
          className="
            bg-transparent
            outline-none
            w-full
          "
        />

      </div>

      {/* ACTIONS */}

      <div
        className="
          flex
          items-center
          gap-3

          ml-auto

          relative
        "
      >

        {/* NOTIFICATIONS */}

        <button
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
          className="
            relative

            w-12
            h-12

            rounded-2xl

            border

            bg-[#f8fafc]
            dark:bg-[#0f172a]

            flex
            items-center
            justify-center
          "
        >

          <Bell size={20} />

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
                absolute

                top-16
                right-0

                w-[92vw]
                max-w-[380px]

                rounded-[28px]

                border

                bg-white
                dark:bg-[#111827]

                shadow-2xl

                p-5

                z-50
              "
            >

              <h2
                className="
                  text-lg
                  font-bold
                  mb-4
                "
              >
                Notifications
              </h2>

              <div
                className="
                  space-y-3
                "
              >

                <div
                  className="
                    rounded-2xl
                    bg-[#f8fafc]
                    dark:bg-[#0f172a]
                    p-4
                  "
                >

                  🚀 Task moved to
                  progress

                </div>

                <div
                  className="
                    rounded-2xl
                    bg-[#f8fafc]
                    dark:bg-[#0f172a]
                    p-4
                  "
                >

                  ✅ Productivity
                  streak updated

                </div>

              </div>

            </div>

          )
        }

      </div>

    </header>
  )
}