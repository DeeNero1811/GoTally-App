"use client"
export const dynamic =
  "force-dynamic"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Calendar,
  Clock3,
  Bell,
  Plus,
  Sparkles,
  Trash2,
  CheckCircle2,
  Archive,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

import {
  addNotification,
} from "@/lib/notifications"

type PlannerEvent = {
  id: number
  title: string
  description?: string
  date: string
  reminder: number
  status: string
}

export default function PlannerPage() {

  const [events,
    setEvents] =
      useState<
        PlannerEvent[]
      >([])

  const [loading,
    setLoading] =
      useState(true)

  const [activeTab,
    setActiveTab] =
      useState("upcoming")

  const [title,
    setTitle] =
      useState("")

  const [description,
    setDescription] =
      useState("")

  const [date,
    setDate] =
      useState("")

  const [reminder,
    setReminder] =
      useState(0)

  useEffect(() => {

    loadEvents()

    const channel =
      supabase
        .channel(
          "planner-v3-live"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table:
              "planner_events",
          },
          () => {
            loadEvents()
          }
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadEvents() {

    try {

      setLoading(true)

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
        .from(
          "planner_events"
        )
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .order(
          "date",
          {
            ascending: true,
          }
        )

      setEvents(
        (data ||
          []) as PlannerEvent[]
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  async function addEvent() {

    if (
      !title.trim() ||
      !date
    ) {
      return
    }

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    await supabase
      .from(
        "planner_events"
      )
      .insert({

        title,

        description,

        date,

        reminder,

        status:
          "upcoming",

        user_id:
          user.id,
      })

    addNotification({

      type:
        "default" as any,

      title:
        "Planner Event Added",

      message:
        "📅 Smart planner event created.",
    })

    setTitle("")

    setDescription("")

    setDate("")

    setReminder(0)

    loadEvents()
  }

  async function completeEvent(
    id: number
  ) {

    await supabase
      .from(
        "planner_events"
      )
      .update({
        status:
          "completed",
      })
      .eq(
        "id",
        id
      )

    addNotification({

      type:
        "default" as any,

      title:
        "Event Completed",

      message:
        "✅ Planner event completed.",
    })

    loadEvents()
  }

  async function archiveEvent(
    id: number
  ) {

    await supabase
      .from(
        "planner_events"
      )
      .update({
        status:
          "archived",
      })
      .eq(
        "id",
        id
      )

    addNotification({

      type:
        "default" as any,

      title:
        "Event Archived",

      message:
        "📦 Planner event archived.",
    })

    loadEvents()
  }

  async function deleteEvent(
    id: number
  ) {

    const confirmDelete =
      window.confirm(
        "Delete this event?"
      )

    if (!confirmDelete)
      return

    await supabase
      .from(
        "planner_events"
      )
      .delete()
      .eq(
        "id",
        id
      )

    addNotification({

      type:
        "default" as any,

      title:
        "Event Deleted",

      message:
        "🗑️ Planner event removed.",
    })

    loadEvents()
  }

  function getReminderText(
    reminder: number
  ) {

    if (
      reminder === 0
    ) {

      return "No Reminder"
    }

    if (
      reminder === 60
    ) {

      return "1 Hour Before"
    }

    return `${reminder} mins before`
  }

  const filteredEvents =
    useMemo(() => {

      return events.filter(
        (
          event
        ) =>
          event.status ===
          activeTab
      )

    }, [
      events,
      activeTab,
    ])

  const stats =
    useMemo(() => {

      return {

        upcoming:
          events.filter(
            (
              event
            ) =>
              event.status ===
              "upcoming"
          ).length,

        completed:
          events.filter(
            (
              event
            ) =>
              event.status ===
              "completed"
          ).length,

        archived:
          events.filter(
            (
              event
            ) =>
              event.status ===
              "archived"
          ).length,
      }

    }, [events])

  if (loading) {

    return (

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {[1,2,3].map(
          (item) => (

            <div

              key={item}

              className="
                h-52
                rounded-[32px]
                bg-gray-200
                dark:bg-[#1e293b]
                animate-pulse
              "
            />

          )
        )}

      </div>

    )
  }

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div
        className="
          rounded-[40px]

          bg-gradient-to-br
          from-[#4f46e5]
          to-[#7c3aed]

          text-white

          p-8
          md:p-10
        "
      >

        <div
          className="
            flex
            flex-wrap
            gap-5
            justify-between
          "
        >

          <div>

            <h1
              className="
                text-5xl
                font-black
              "
            >

              Smart Planner

            </h1>

            <p
              className="
                text-white/80
                mt-3
              "
            >

              Intelligent scheduling timeline system.

            </p>

          </div>

          <div
            className="
              flex
              gap-4
              flex-wrap
            "
          >

            {[
              {
                label:
                  "Upcoming",
                value:
                  stats.upcoming,
              },
              {
                label:
                  "Completed",
                value:
                  stats.completed,
              },
              {
                label:
                  "Archived",
                value:
                  stats.archived,
              },
            ].map(
              (
                item
              ) => (

                <div

                  key={
                    item.label
                  }

                  className="
                    rounded-3xl
                    bg-white/10
                    px-6
                    py-5
                  "
                >

                  <p>
                    {
                      item.label
                    }
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-black
                    "
                  >

                    {
                      item.value
                    }

                  </h2>

                </div>

              )
            )}

          </div>

        </div>

      </div>

      {/* FILTERS */}

      <div
        className="
          flex
          gap-4
          flex-wrap
        "
      >

        {[
          "upcoming",
          "completed",
          "archived",
        ].map(
          (
            tab
          ) => (

            <button

              key={tab}

              onClick={() =>
                setActiveTab(
                  tab
                )
              }

              className={`
                rounded-2xl

                px-6
                py-3

                capitalize

                font-semibold

                transition

                ${
                  activeTab ===
                  tab
                    ? `
                      bg-indigo-500
                      text-white
                    `
                    : `
                      bg-white
                      dark:bg-[#111827]
                      border
                    `
                }
              `}
            >

              {tab}

            </button>

          )
        )}

      </div>

      {/* CREATE */}

      <div
        className="
          rounded-[32px]
          border
          bg-white
          dark:bg-[#111827]
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

          <Sparkles
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

            Create Planner Event

          </h2>

        </div>

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-4
          "
        >

          <input
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Event title..."
            className="
              rounded-2xl
              border
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              px-5
              py-4
            "
          />

          <input
            type="datetime-local"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              px-5
              py-4
            "
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description..."
            className="
              rounded-2xl
              border
              bg-[#f8fafc]
              dark:bg-[#1e293b]
              px-5
              py-4
              min-h-[120px]
            "
          />

          <div
            className="
              flex
              flex-col
              gap-4
            "
          >

            <select
              value={reminder}
              onChange={(e) =>
                setReminder(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                rounded-2xl
                border
                bg-[#f8fafc]
                dark:bg-[#1e293b]
                px-5
                py-4
              "
            >

              <option value={0}>
                No Reminder
              </option>

              <option value={5}>
                5 Minutes Before
              </option>

              <option value={15}>
                15 Minutes Before
              </option>

              <option value={30}>
                30 Minutes Before
              </option>

              <option value={60}>
                1 Hour Before
              </option>

            </select>

            <button
              onClick={addEvent}
              className="
                rounded-2xl

                bg-gradient-to-r
                from-[#4f46e5]
                to-[#7c3aed]

                px-5
                py-4

                text-white

                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Plus size={20} />

              Create Event

            </button>

          </div>

        </div>

      </div>

      {/* EVENTS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {filteredEvents.map(
          (
            event,
            index
          ) => (

            <motion.div

              key={event.id}

              initial={{
                opacity: 0,
                y: 20,
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
                rounded-[32px]
                border
                bg-white
                dark:bg-[#111827]
                p-6
              "
            >

              <div
                className="
                  flex
                  justify-between
                  items-start
                  mb-6
                "
              >

                <div
                  className="
                    w-14
                    h-14

                    rounded-3xl

                    bg-indigo-100
                    dark:bg-indigo-500/20

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Calendar
                    className="
                      text-indigo-500
                    "
                  />

                </div>

                <div
                  className="
                    rounded-full

                    bg-indigo-100
                    dark:bg-indigo-500/20

                    text-indigo-600
                    dark:text-indigo-300

                    px-4
                    py-2

                    text-sm
                    font-semibold

                    flex
                    items-center
                    gap-2
                  "
                >

                  <Bell
                    size={16}
                  />

                  {
                    getReminderText(
                      event.reminder
                    )
                  }

                </div>

              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  mb-3
                "
              >

                {event.title}

              </h2>

              {event.description && (

                <p
                  className="
                    text-gray-500
                    mb-5
                  "
                >

                  {
                    event.description
                  }

                </p>

              )}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  rounded-2xl

                  bg-[#f8fafc]
                  dark:bg-[#1e293b]

                  px-4
                  py-3

                  mb-5
                "
              >

                <Clock3
                  size={18}
                />

                <span
                  className="
                    font-medium
                  "
                >

                  {
                    new Date(
                      event.date
                    ).toLocaleString()
                  }

                </span>

              </div>

              {/* ACTIONS */}

              <div
                className="
                  flex
                  gap-3
                "
              >

                {event.status !==
                  "completed" && (

                  <button
                    onClick={() =>
                      completeEvent(
                        event.id
                      )
                    }
                    className="
                      flex-1

                      rounded-2xl

                      bg-green-500
                      hover:bg-green-600

                      text-white

                      py-3

                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <CheckCircle2
                      size={18}
                    />

                    Complete

                  </button>

                )}

                {event.status !==
                  "archived" && (

                  <button
                    onClick={() =>
                      archiveEvent(
                        event.id
                      )
                    }
                    className="
                      flex-1

                      rounded-2xl

                      bg-gray-200
                      dark:bg-[#1e293b]

                      py-3

                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >

                    <Archive
                      size={18}
                    />

                    Archive

                  </button>

                )}

                <button
                  onClick={() =>
                    deleteEvent(
                      event.id
                    )
                  }
                  className="
                    rounded-2xl

                    bg-red-500
                    hover:bg-red-600

                    text-white

                    px-4
                  "
                >

                  <Trash2
                    size={18}
                  />

                </button>

              </div>

            </motion.div>

          )
        )}

      </div>

    </div>

  )
}