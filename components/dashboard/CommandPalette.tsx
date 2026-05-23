"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import Link from "next/link"

import {
  AnimatePresence,
  motion,
} from "framer-motion"

import {
  Search,
  LayoutDashboard,
  CheckSquare,
  Flame,
  CalendarDays,
  Settings,
  Timer,
  BarChart3,
  Sparkles,
  Brain,
  ArrowRight,
} from "lucide-react"

const pages = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    category: "Navigation",
  },
  {
    title: "Tasks",
    href: "/dashboard/tasks",
    icon: CheckSquare,
    category: "Navigation",
  },
  {
    title: "Habits",
    href: "/dashboard/habits",
    icon: Flame,
    category: "Navigation",
  },
  {
    title: "Planner",
    href: "/dashboard/planner",
    icon: CalendarDays,
    category: "Navigation",
  },
  {
    title: "Focus",
    href: "/dashboard/focus",
    icon: Timer,
    category: "Navigation",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    category: "Navigation",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    category: "Navigation",
  },
  {
    title: "AI Insights",
    href: "/dashboard",
    icon: Brain,
    category: "AI",
  },
  {
    title: "Quick Productivity Review",
    href: "/dashboard/analytics",
    icon: Sparkles,
    category: "AI",
  },
]

export default function CommandPalette() {

  const [open, setOpen] =
    useState(false)

  const [query, setQuery] =
    useState("")

  const [selected, setSelected] =
    useState(0)

  /* OPEN / CLOSE */

  useEffect(() => {

    function down(
      e: KeyboardEvent
    ) {

      /* CTRL + K */

      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k"
      ) {

        e.preventDefault()

        setOpen(
          (prev) => !prev
        )
      }

      /* ESC */

      if (
        e.key === "Escape"
      ) {

        setOpen(false)
      }

      /* NAVIGATION */

      if (!open) return

      if (
        e.key ===
        "ArrowDown"
      ) {

        e.preventDefault()

        setSelected(
          (prev) =>
            prev + 1 <
            filtered.length
              ? prev + 1
              : prev
        )
      }

      if (
        e.key ===
        "ArrowUp"
      ) {

        e.preventDefault()

        setSelected(
          (prev) =>
            prev - 1 >= 0
              ? prev - 1
              : 0
        )
      }

      /* ENTER */

      if (
        e.key === "Enter"
      ) {

        const item =
          filtered[selected]

        if (item) {

          window.location.href =
            item.href

          setOpen(false)
        }
      }
    }

    window.addEventListener(
      "keydown",
      down
    )

    return () =>
      window.removeEventListener(
        "keydown",
        down
      )

  }, [
    open,
    selected,
    query,
  ])

  /* FILTER */

  const filtered =
    useMemo(() => {

      return pages.filter(
        (page) =>
          page.title
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )
      )

    }, [query])

  /* RESET SELECT */

  useEffect(() => {

    setSelected(0)

  }, [query])

  return (

    <AnimatePresence>

      {
        open && (

          <>

            {/* OVERLAY */}

            <motion.div

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              exit={{
                opacity: 0,
              }}

              onClick={() =>
                setOpen(false)
              }

              className="
                fixed inset-0
                bg-black/50
                backdrop-blur-md
                z-[200]
              "
            />

            {/* MODAL */}

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.94,
                y: 30,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.94,
                y: 30,
              }}

              transition={{
                type: "spring",
                stiffness: 240,
                damping: 22,
              }}

              className="
                fixed
                top-[10%]
                left-1/2
                -translate-x-1/2

                w-[95%]
                max-w-3xl

                rounded-[36px]

                border
                border-white/20

                bg-white/70
                dark:bg-[#111827]/80

                backdrop-blur-2xl

                shadow-[0_20px_80px_rgba(0,0,0,0.35)]

                overflow-hidden

                z-[300]
              "
            >

              {/* HEADER */}

              <div
                className="
                  px-6 py-5
                  border-b
                  border-white/10
                "
              >

                <div
                  className="
                    flex items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      w-12 h-12
                      rounded-2xl

                      bg-gradient-to-br
                      from-indigo-500
                      to-purple-500

                      text-white

                      flex items-center
                      justify-center

                      shadow-lg
                    "
                  >

                    <Search size={20} />

                  </div>

                  <div className="flex-1">

                    <input
                      autoFocus
                      type="text"
                      value={query}
                      onChange={(e) =>
                        setQuery(
                          e.target.value
                        )
                      }
                      placeholder="Search pages, actions, AI tools..."
                      className="
                        w-full
                        bg-transparent
                        outline-none
                        text-xl
                        font-medium
                      "
                    />

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-1
                      "
                    >
                      Navigate your workspace instantly
                    </p>

                  </div>

                  <div
                    className="
                      hidden md:flex
                      items-center
                      gap-2
                    "
                  >

                    <kbd
                      className="
                        px-3 py-1.5
                        rounded-xl
                        bg-[#f1f5f9]
                        dark:bg-[#1e293b]
                        text-xs
                      "
                    >
                      ↑ ↓
                    </kbd>

                    <kbd
                      className="
                        px-3 py-1.5
                        rounded-xl
                        bg-[#f1f5f9]
                        dark:bg-[#1e293b]
                        text-xs
                      "
                    >
                      ENTER
                    </kbd>

                    <kbd
                      className="
                        px-3 py-1.5
                        rounded-xl
                        bg-[#f1f5f9]
                        dark:bg-[#1e293b]
                        text-xs
                      "
                    >
                      ESC
                    </kbd>

                  </div>

                </div>

              </div>

              {/* RESULTS */}

              <div
                className="
                  p-4
                  max-h-[500px]
                  overflow-y-auto
                "
              >

                {
                  filtered.length === 0 ? (

                    <div
                      className="
                        py-20
                        text-center
                      "
                    >

                      <div
                        className="
                          w-20 h-20
                          rounded-full
                          bg-[#f1f5f9]
                          dark:bg-[#1e293b]
                          mx-auto
                          mb-6
                          flex items-center
                          justify-center
                        "
                      >

                        <Search
                          size={28}
                          className="
                            text-gray-400
                          "
                        />

                      </div>

                      <h3
                        className="
                          text-xl
                          font-semibold
                        "
                      >
                        No results found
                      </h3>

                      <p
                        className="
                          text-gray-500
                          mt-2
                        "
                      >
                        Try another search term
                      </p>

                    </div>

                  ) : (

                    filtered.map(
                      (
                        item,
                        index
                      ) => {

                        const Icon =
                          item.icon

                        const active =
                          selected ===
                          index

                        return (

                          <Link
                            key={index}
                            href={item.href}
                            onClick={() =>
                              setOpen(false)
                            }
                            className={`
                              group

                              flex items-center
                              justify-between

                              px-5 py-4

                              rounded-3xl

                              transition-all
                              duration-300

                              mb-2

                              ${
                                active
                                  ? `
                                    bg-gradient-to-r
                                    from-indigo-500
                                    to-purple-500
                                    text-white
                                    shadow-lg
                                  `
                                  : `
                                    hover:bg-white/60
                                    dark:hover:bg-[#1e293b]
                                  `
                              }
                            `}
                          >

                            <div
                              className="
                                flex items-center
                                gap-4
                              "
                            >

                              <div
                                className={`
                                  w-12 h-12
                                  rounded-2xl

                                  flex items-center
                                  justify-center

                                  ${
                                    active
                                      ? `
                                        bg-white/20
                                      `
                                      : `
                                        bg-[#eef2ff]
                                        dark:bg-[#1e293b]
                                      `
                                  }
                                `}
                              >

                                <Icon
                                  size={20}
                                />

                              </div>

                              <div>

                                <div
                                  className="
                                    flex items-center
                                    gap-2
                                  "
                                >

                                  <h3
                                    className="
                                      font-semibold
                                    "
                                  >
                                    {
                                      item.title
                                    }
                                  </h3>

                                  <span
                                    className={`
                                      text-xs
                                      px-2 py-1
                                      rounded-full

                                      ${
                                        active
                                          ? `
                                            bg-white/20
                                          `
                                          : `
                                            bg-[#f1f5f9]
                                            dark:bg-[#1e293b]
                                          `
                                      }
                                    `}
                                  >

                                    {
                                      item.category
                                    }

                                  </span>

                                </div>

                                <p
                                  className={`
                                    text-sm
                                    mt-1

                                    ${
                                      active
                                        ? `
                                          text-indigo-100
                                        `
                                        : `
                                          text-gray-500
                                        `
                                    }
                                  `}
                                >
                                  {
                                    item.href
                                  }
                                </p>

                              </div>

                            </div>

                            <ArrowRight
                              size={18}
                              className={`
                                transition-all

                                ${
                                  active
                                    ? `
                                      translate-x-1
                                    `
                                    : `
                                      opacity-0
                                      group-hover:opacity-100
                                    `
                                }
                              `}
                            />

                          </Link>

                        )
                      }
                    )

                  )
                }

              </div>

            </motion.div>

          </>

        )
      }

    </AnimatePresence>

  )
}