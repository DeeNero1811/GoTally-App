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
        md:flex

        w-72

        h-screen

        sticky
        top-0

        p-6
      "
    >

      <div
        className="
          w-full

          rounded-[32px]

          border

          bg-white
          dark:bg-[#0f172a]

          p-6

          flex
          flex-col

          overflow-y-auto
        "
      >

        {/* LOGO */}

        <div
          className="
            mb-8
          "
        >

          <h1
            className="
              text-2xl
              font-bold
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
              text-sm
              text-gray-500
              mt-2
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

                      px-4
                      py-4

                      text-sm
                      font-medium

                      transition-all

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
                      size={20}
                    />

                    <span>
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
            mt-6

            rounded-[28px]

            bg-gradient-to-br
            from-indigo-600
            via-violet-600
            to-purple-600

            p-5

            text-white

            block
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
            "
          >

            <div
              className="
                w-14
                h-14

                rounded-full

                bg-white/20

                flex
                items-center
                justify-center

                text-lg
                font-bold
              "
            >

              A

            </div>

            <div>

              <h3
                className="
                  font-semibold
                "
              >
                Alex Johnson
              </h3>

              <p
                className="
                  text-sm
                  text-indigo-100
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