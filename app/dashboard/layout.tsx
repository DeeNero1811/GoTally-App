"use client"

import {
  useState,
  useEffect,
} from "react"

import Link from "next/link"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import Image
  from "next/image"

import {
  LayoutDashboard,
  CheckSquare,
  Flame,
  Settings,
  CalendarDays,
  Timer,
  BarChart3,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
  Search,
  LogOut,
  Trophy,
  Sparkles,
} from "lucide-react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import ThemeToggle from "../../components/ThemeToggle"

import QuickActions from "../../components/dashboard/QuickActions"

import CommandPalette from "../../components/dashboard/CommandPalette"

import {
  getNotifications,
  clearNotifications,
} from "@/lib/notifications"

type UserProfile = {
  name: string
  role: string
}

type SearchItem = {
  title: string
  type: string
  href: string
}

const navigation = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/tasks",
    label: "Tasks",
    icon: CheckSquare,
  },
  {
    href: "/dashboard/habits",
    label: "Habits",
    icon: Flame,
  },
  {
    href: "/dashboard/planner",
    label: "Planner",
    icon: CalendarDays,
  },
  {
    href: "/dashboard/focus",
    label: "Focus",
    icon: Timer,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    href: "/dashboard/achievements",
    label: "Achievements",
    icon: Trophy,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [sidebarOpen, setSidebarOpen] =
    useState(false)

  const [collapsed, setCollapsed] =
    useState(false)

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false)

  const [
    notifications,
    setNotifications,
  ] = useState<any[]>([])

  const [query, setQuery] =
    useState("")

  const [
    searchResults,
    setSearchResults,
  ] = useState<SearchItem[]>([])

  const [profile, setProfile] =
    useState<UserProfile>({
      name: "Alex Johnson",
      role: "AI Pro Member",
    })

  /* PROFILE */

  useEffect(() => {

    const loadProfile =
      () => {

        const saved =
          localStorage.getItem(
            "dashboard_profile"
          )

        if (saved) {

          setProfile(
            JSON.parse(saved)
          )
        }
      }

    loadProfile()

    window.addEventListener(
      "dashboard_profile_updated",
      loadProfile
    )

    return () => {

      window.removeEventListener(
        "dashboard_profile_updated",
        loadProfile
      )
    }

  }, [])

  /* NOTIFICATIONS */

  useEffect(() => {

    const loadNotifications =
      () => {

        const items =
          getNotifications()

        setNotifications(
          items
        )
      }

    loadNotifications()

    window.addEventListener(
      "dashboard_activity",
      loadNotifications
    )

    window.addEventListener(
      "planner_activity",
      loadNotifications
    )

    return () => {

      window.removeEventListener(
        "dashboard_activity",
        loadNotifications
      )

      window.removeEventListener(
        "planner_activity",
        loadNotifications
      )
    }

  }, [])

  /* SEARCH */

  useEffect(() => {

    if (!query.trim()) {

      setSearchResults([])

      return
    }

    const results: SearchItem[] = []

    const searchText =
      query.toLowerCase()

    const tasks =
      JSON.parse(
        localStorage.getItem(
          "dashboard_tasks"
        ) || "[]"
      )

    tasks.forEach(
      (task: any) => {

        const title =
          task.title ||
          task.name ||
          ""

        if (
          title
            .toLowerCase()
            .includes(
              searchText
            )
        ) {

          results.push({
            title,
            type: "Task",
            href: "/dashboard/tasks",
          })
        }
      }
    )

    const habits =
      JSON.parse(
        localStorage.getItem(
          "habits"
        ) || "[]"
      )

    habits.forEach(
      (habit: any) => {

        const habitTitle =
          habit.title ||
          habit.name ||
          habit.habit ||
          ""

        if (
          habitTitle
            .toLowerCase()
            .includes(
              searchText
            )
        ) {

          results.push({
            title:
              habitTitle,
            type:
              "Habit",
            href:
              "/dashboard/habits",
          })
        }
      }
    )

    const planner =
      JSON.parse(
        localStorage.getItem(
          "planner_tasks"
        ) || "[]"
      )

    planner.forEach(
      (item: any) => {

        const plannerTitle =
          item.title ||
          item.name ||
          ""

        if (
          plannerTitle
            .toLowerCase()
            .includes(
              searchText
            )
        ) {

          results.push({
            title:
              plannerTitle,
            type:
              "Planner",
            href:
              "/dashboard/planner",
          })
        }
      }
    )

    const achievements = [
      "7 Day Streak",
      "Task Crusher",
      "Deep Focus",
      "Consistency Master",
      "Productivity Beast",
    ]

    achievements.forEach(
      (
        achievement
      ) => {

        if (
          achievement
            .toLowerCase()
            .includes(
              searchText
            )
        ) {

          results.push({
            title:
              achievement,
            type:
              "Achievement",
            href:
              "/dashboard/achievements",
          })
        }
      }
    )

    setSearchResults(
      results.slice(0, 8)
    )

  }, [query])

  /* SIDEBAR */

  useEffect(() => {

    const saved =
      localStorage.getItem(
        "sidebar_collapsed"
      )

    if (saved) {

      setCollapsed(
        JSON.parse(saved)
      )
    }

  }, [])

  useEffect(() => {

    localStorage.setItem(
      "sidebar_collapsed",
      JSON.stringify(
        collapsed
      )
    )

  }, [collapsed])

  const initials =
    profile.name
      .split(" ")
      .map(
        (
          word
        ) => word[0]
      )
      .join("")
      .slice(0, 2)
      .toUpperCase()

  /* LOGOUT */

  const handleLogout =
    () => {

      localStorage.clear()

      sessionStorage.clear()

      router.push("/login")
    }

  return (

    <div
      className="
        min-h-screen
        bg-[#f8fafc]
        dark:bg-[#020617]
        flex
        overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          fixed
          top-[-200px]
          right-[-200px]
          w-[500px]
          h-[500px]
          rounded-full
          bg-indigo-500/10
          blur-3xl
          pointer-events-none
        "
      />

      {/* MOBILE OVERLAY */}

      <AnimatePresence>

        {
          sidebarOpen && (

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
                setSidebarOpen(false)
              }
              className="
                fixed
                inset-0
                bg-black/40
                backdrop-blur-sm
                z-40
                lg:hidden
              "
            />

          )
        }

      </AnimatePresence>

      {/* SIDEBAR */}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          z-50
          transition-all
          duration-300

          ${
            collapsed
              ? "lg:w-[120px]"
              : "lg:w-[300px]"
          }

          w-[300px]

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

          p-4
        `}
      >

        <div
          className="
            h-full
            rounded-[40px]
            bg-white/70
            dark:bg-[#0f172a]/70
            backdrop-blur-2xl
            border
            border-white/20
            shadow-2xl
            overflow-hidden
            flex
            flex-col
          "
        >

          <div
            className="
              flex flex-col
              h-full
              p-5
              overflow-y-auto
            "
          >

            {/* LOGO */}

            <div
              className={`
                flex items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "justify-between"
                }
                mb-8
              `}
            >

              {
                !collapsed && (

                  <div>

                    <div
                      className="
                        flex items-center
                        gap-3
                      "
                    >

                     

                      <div>

                        <h1
                          className="
                            text-2xl
                            font-black
                            tracking-tight
                          "
                        >

                          <Image
  src="/icons/icon-192.png"
  alt="GoTasklly"
  width={48}
  height={48}
  className="
    rounded-2xl
  "
/>

                          GoTasklly

                        </h1>

                        <p
                          className="
                            text-xs
                            text-gray-500
                            mt-1
                          "
                        >

                          AI Productivity OS

                        </p>

                      </div>

                    </div>

                  </div>

                )
              }

              <button
                onClick={() =>
                  setCollapsed(!collapsed)
                }
                className="
                  hidden lg:flex
                  w-11 h-11
                  rounded-2xl
                  bg-white/70
                  dark:bg-[#1e293b]
                  border
                  items-center
                  justify-center
                  hover:scale-105
                  transition-all
                "
              >

                {
                  collapsed
                    ? <PanelLeftOpen />
                    : <PanelLeftClose />
                }

              </button>

            </div>

            {/* PROFILE */}

            {
              !collapsed && (

                <Link
                  href="/dashboard/profile"
                  className="
                    relative
                    overflow-hidden
                    flex items-center
                    gap-4
                    mb-8
                    rounded-[32px]
                    bg-gradient-to-br
                    from-indigo-600
                    via-violet-600
                    to-fuchsia-600
                    p-6
                    text-white
                    shadow-xl
                  "
                >

                  <div
                    className="
                      absolute
                      top-[-30px]
                      right-[-30px]
                      w-32 h-32
                      rounded-full
                      bg-white/10
                    "
                  />

                  <div
                    className="
                      relative
                      w-16 h-16
                      rounded-full
                      bg-white/20
                      backdrop-blur-xl
                      flex items-center
                      justify-center
                      text-xl
                      font-bold
                    "
                  >

                    {initials}

                  </div>

                  <div className="relative">

                    <h2 className="font-semibold text-lg">

                      {profile.name}

                    </h2>

                    <p className="text-sm text-indigo-100 mt-1">

                      {profile.role}

                    </p>

                  </div>

                </Link>

              )
            }

            {/* NAVIGATION */}

            <nav className="space-y-3">

              {
                navigation.map(
                  (item) => {

                    const Icon =
                      item.icon

                    const active =
                      pathname ===
                      item.href

                    return (

                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          group
                          relative
                          flex items-center
                          ${
                            collapsed
                              ? "justify-center"
                              : "gap-4"
                          }
                          h-[60px]
                          rounded-2xl
                          transition-all
                          duration-300

                          ${
                            active
                              ? "bg-indigo-600 text-white shadow-lg"
                              : "hover:bg-white/60 dark:hover:bg-[#1e293b]"
                          }

                          ${
                            collapsed
                              ? "px-0"
                              : "px-5"
                          }
                        `}
                      >

                        {
                          active && (

                            <motion.div
                              layoutId="active-pill"
                              className="
                                absolute
                                inset-0
                                rounded-2xl
                                bg-indigo-600
                                -z-10
                              "
                            />

                          )
                        }

                        <Icon
                          size={22}
                          className="
                            transition-transform
                            group-hover:scale-110
                          "
                        />

                        {
                          !collapsed && (

                            <span
                              className="
                                font-medium
                                tracking-tight
                              "
                            >

                              {item.label}

                            </span>

                          )
                        }

                      </Link>

                    )
                  }
                )
              }

            </nav>

            {/* FOOTER */}

            <div
              className="
                pt-6
                mt-6
                space-y-3
                border-t
                border-white/10
              "
            >

              <Link
                href="/dashboard/settings"
                className={`
                  flex items-center
                  ${
                    collapsed
                      ? "justify-center"
                      : "gap-4"
                  }
                  h-[60px]
                  rounded-2xl
                  transition-all
                  duration-300

                  ${
                    pathname === "/dashboard/settings"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-white/60 dark:hover:bg-[#1e293b]"
                  }

                  ${
                    collapsed
                      ? "px-0"
                      : "px-5"
                  }
                `}
              >

                <Settings size={22} />

                {
                  !collapsed && (
                    <span>
                      Settings
                    </span>
                  )
                }

              </Link>

              <button
                onClick={handleLogout}
                className={`
                  w-full
                  flex items-center
                  ${
                    collapsed
                      ? "justify-center"
                      : "gap-4"
                  }
                  h-[60px]
                  rounded-2xl
                  hover:bg-red-50
                  dark:hover:bg-red-500/10
                  text-red-500
                  transition-all
                  duration-300

                  ${
                    collapsed
                      ? "px-0"
                      : "px-5"
                  }
                `}
              >

                <LogOut size={22} />

                {
                  !collapsed && (
                    <span>
                      Logout
                    </span>
                  )
                }

              </button>

            </div>

          </div>

        </div>

      </aside>

      {/* MAIN */}

      <main
        className="
          flex-1
          overflow-y-auto
          p-4
          md:p-6
        "
      >

        {/* NAVBAR */}

        <div
          className="
            sticky
            top-0
            z-30
            mb-8
          "
        >

          <div
            className="
              rounded-[32px]
              bg-white/70
              dark:bg-[#0f172a]/70
              backdrop-blur-2xl
              border
              border-white/20
              shadow-xl
              px-5
              py-4
            "
          >

            <div
              className="
                flex items-center
                justify-between
                gap-4
              "
            >

              {/* LEFT */}

              <div
                className="
                  flex items-center
                  gap-4
                  flex-1
                "
              >

                <button
                  onClick={() =>
                    setSidebarOpen(true)
                  }
                  className="
                    lg:hidden
                    w-11 h-11
                    rounded-2xl
                    bg-white
                    dark:bg-[#111827]
                    border
                    flex items-center justify-center
                  "
                >

                  <Menu size={20} />

                </button>

                {/* SEARCH */}

                <div className="relative flex-1">

                  <div
                    className="
                      flex items-center
                      gap-3
                      px-5 py-4
                      rounded-2xl
                      bg-[#f8fafc]
                      dark:bg-[#111827]
                      border
                    "
                  >

                    <Search
                      size={18}
                      className="
                        text-gray-400
                      "
                    />

                    <input
                      type="text"
                      value={query}
                      onChange={(e) =>
                        setQuery(
                          e.target.value
                        )
                      }
                      placeholder="Search tasks, habits, planner..."
                      className="
                        bg-transparent
                        outline-none
                        w-full
                        text-sm
                      "
                    />

                  </div>

                  {
                    searchResults.length > 0 && (

                      <div
                        className="
                          absolute
                          top-full
                          mt-3
                          w-full
                          rounded-[28px]
                          border
                          bg-white/90
                          dark:bg-[#111827]/90
                          backdrop-blur-2xl
                          shadow-2xl
                          overflow-hidden
                          z-50
                        "
                      >

                        {
                          searchResults.map(
                            (
                              item,
                              index
                            ) => (

                              <button
                                key={index}
                                onClick={() => {

                                  router.push(
                                    item.href
                                  )

                                  setQuery("")
                                }}
                                className="
                                  w-full
                                  text-left
                                  p-5
                                  border-b
                                  dark:border-white/10
                                  hover:bg-[#f8fafc]
                                  dark:hover:bg-[#1e293b]
                                  transition-all
                                "
                              >

                                <p className="font-medium">

                                  {item.title}

                                </p>

                                <p
                                  className="
                                    text-xs
                                    text-gray-500
                                    mt-1
                                  "
                                >

                                  {item.type}

                                </p>

                              </button>

                            )
                          )
                        }

                      </div>

                    )
                  }

                </div>

              </div>

              {/* RIGHT */}

              <div
                className="
                  flex items-center
                  gap-3
                "
              >

                {/* NOTIFICATIONS */}

                <div className="relative">

                  <button
                    onClick={() =>
                      setNotificationsOpen(
                        !notificationsOpen
                      )
                    }
                    className="
                      relative
                      w-12 h-12
                      rounded-2xl
                      bg-white
                      dark:bg-[#111827]
                      border
                      flex items-center
                      justify-center
                    "
                  >

                    <Bell size={20} />

                    {
                      notifications.length > 0 && (

                        <div
                          className="
                            absolute
                            top-2
                            right-2
                            w-2.5 h-2.5
                            rounded-full
                            bg-red-500
                          "
                        />

                      )
                    }

                  </button>

                  <AnimatePresence>

                    {
                      notificationsOpen && (

                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: 10,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                          className="
                            absolute
                            right-0
                            mt-4
                            w-[380px]
                            rounded-[32px]
                            border
                            bg-white/90
                            dark:bg-[#111827]/90
                            backdrop-blur-2xl
                            shadow-2xl
                            overflow-hidden
                            z-50
                          "
                        >

                          <div
                            className="
                              flex items-center
                              justify-between
                              p-6
                              border-b
                              dark:border-white/10
                            "
                          >

                            <h3
                              className="
                                font-semibold
                                text-lg
                              "
                            >

                              Notifications

                            </h3>

                            <button
                              onClick={() => {

                                clearNotifications()

                                setNotifications([])
                              }}
                              className="
                                text-sm
                                text-indigo-500
                              "
                            >

                              Clear

                            </button>

                          </div>

                          <div
                            className="
                              max-h-[420px]
                              overflow-y-auto
                            "
                          >

                            {
                              notifications.length === 0 ? (

                                <div
                                  className="
                                    p-10
                                    text-center
                                    text-gray-500
                                  "
                                >

                                  No notifications yet.

                                </div>

                              ) : (

                                notifications.map(
                                  (
                                    item,
                                    index
                                  ) => (

                                    <motion.div
                                      key={index}
                                      initial={{
                                        opacity: 0,
                                        y: 5,
                                      }}
                                      animate={{
                                        opacity: 1,
                                        y: 0,
                                      }}
                                      transition={{
                                        delay:
                                          index * 0.05,
                                      }}
                                      className="
                                        p-5
                                        border-b
                                        dark:border-white/10
                                        hover:bg-[#f8fafc]
                                        dark:hover:bg-[#1e293b]
                                        transition-all
                                      "
                                    >

                                      <p
                                        className="
                                          text-sm
                                          leading-relaxed
                                        "
                                      >

                                        {item.message}

                                      </p>

                                      {
                                        item.time && (

                                          <p
                                            className="
                                              text-xs
                                              text-gray-400
                                              mt-2
                                            "
                                          >

                                            {item.time}

                                          </p>

                                        )
                                      }

                                    </motion.div>

                                  )
                                )

                              )
                            }

                          </div>

                        </motion.div>

                      )
                    }

                  </AnimatePresence>

                </div>

                <ThemeToggle />

              </div>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="pb-32">

          {children}

        </div>

        <QuickActions />

        <CommandPalette />

      </main>

    </div>
  )
}