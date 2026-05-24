"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  CheckSquare,
  Flame,
  Settings,
  Brain,
  CalendarDays,
  User,
} from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
  },

  {
    name: "Habits",
    href: "/dashboard/habits",
    icon: Flame,
  },

  {
    name: "Planner",
    href: "/dashboard/planner",
    icon: CalendarDays,
  },

  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: Brain,
  },

  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },

  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function Sidebar() {

  const pathname =
    usePathname()

  return (

    <aside
      className="
        hidden
        xl:flex

        xl:w-[280px]

        shrink-0

        min-h-screen

        sticky
        top-0

        p-2
        sm:p-3
        xl:p-4

        overflow-hidden
      "
    >

      <div
        className="
          w-full

          rounded-[28px]

          border

          bg-white
          dark:bg-[#0f172a]

          p-4
          sm:p-5
          xl:p-6

          flex
          flex-col

          min-w-0

          overflow-hidden
        "
      >

        {/* LOGO */}

        <div
          className="
            mb-6
            xl:mb-8

            min-w-0
          "
        >

          <h1
            className="
              text-xl
              xl:text-2xl

              font-bold

              break-words
            "
          >

            Productivity

            <span
              className="
                text-indigo-500
              "
            >
              {" "}
              OS
            </span>

          </h1>

          <p
            className="
              text-xs
              xl:text-sm

              text-gray-500

              mt-2

              break-words
            "
          >
            AI Workflow Platform
          </p>

        </div>

        {/* NAV */}

        <nav
          className="
            flex-1

            space-y-2

            min-w-0
          "
        >

          {
            navItems.map(
              (item) => {

                const Icon =
                  item.icon

                const active =
                  pathname ===
                  item.href

                return (

                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex
                      items-center

                      gap-3

                      rounded-2xl

                      px-3
                      xl:px-4

                      py-3
                      xl:py-4

                      text-sm

                      font-medium

                      transition-all

                      min-w-0

                      ${
                        active
                          ? `
                            bg-gradient-to-r
                            from-indigo-600
                            to-violet-600

                            text-white
                          `
                          : `
                            text-slate-600
                            dark:text-gray-300

                            hover:bg-[#f8fafc]
                            dark:hover:bg-[#1e293b]

                            hover:text-indigo-600
                          `
                      }
                    `}
                  >

                    <Icon
                      size={18}
                      className="
                        shrink-0
                      "
                    />

                    <span
                      className="
                        truncate
                      "
                    >
                      {item.name}
                    </span>

                  </Link>

                )
              }
            )
          }

        </nav>

        {/* PROFILE CARD */}

        <Link
          href="/dashboard/profile"
          className="
            mt-5
            xl:mt-6

            rounded-[24px]

            bg-gradient-to-br
            from-indigo-600
            via-violet-600
            to-purple-600

            p-4
            xl:p-5

            text-white

            block

            min-w-0
          "
        >

          <div
            className="
              flex
              items-center

              gap-3
              xl:gap-4

              min-w-0
            "
          >

            <div
              className="
                w-12
                h-12

                xl:w-14
                xl:h-14

                rounded-full

                bg-white/20

                flex
                items-center
                justify-center

                text-base
                xl:text-lg

                font-bold

                shrink-0
              "
            >

              A

            </div>

            <div
              className="
                min-w-0
              "
            >

              <h3
                className="
                  font-semibold

                  text-sm
                  xl:text-base

                  truncate
                "
              >
                Alex Johnson
              </h3>

              <p
                className="
                  text-xs
                  xl:text-sm

                  text-indigo-100

                  truncate
                "
              >
                Pro Productivity User
              </p>

            </div>

          </div>

        </Link>

      </div>

    </aside>
  )
}