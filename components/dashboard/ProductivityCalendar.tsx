"use client"

import {
  useEffect,
  useState,
} from "react"

import Calendar from "react-calendar"

import "react-calendar/dist/Calendar.css"

import {
  motion,
} from "framer-motion"

import {
  CalendarDays,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

type CalendarTask = {

  id: number

  title: string

  due_date: string | null

  status: string
}

type CalendarEvent = {

  id: number

  title: string

  start_time: string
}

export default function
ProductivityCalendar() {

  const [
    date,
    setDate,
  ] = useState<Date>(
    new Date()
  )

  const [
    tasks,
    setTasks,
  ] = useState<
    CalendarTask[]
  >([])

  const [
    events,
    setEvents,
  ] = useState<
    CalendarEvent[]
  >([])

  useEffect(() => {

    loadCalendarData()

  }, [])

  async function
  loadCalendarData() {

    const {
      data: {
        user,
      },
    } = await supabase
      .auth
      .getUser()

    if (!user)
      return

    const {
      data: taskData,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    const {
      data: plannerData,
    } = await supabase
      .from("planner_events")
      .select("*")
      .eq(
        "user_id",
        user.id
      )

    setTasks(
      taskData || []
    )

    setEvents(
      plannerData || []
    )
  }

  function hasTask(
    day: Date
  ) {

    return tasks.some(
      (
        task
      ) => {

        if (
          !task.due_date
        )
          return false

        const taskDate =
          new Date(
            task.due_date
          )

        return (
          taskDate
            .toDateString() ===
          day.toDateString()
        )
      }
    )
  }

  function hasEvent(
    day: Date
  ) {

    return events.some(
      (
        event
      ) => {

        const eventDate =
          new Date(
            event.start_time
          )

        return (
          eventDate
            .toDateString() ===
          day.toDateString()
        )
      }
    )
  }

  const selectedTasks =
    tasks.filter(
      (
        task
      ) => {

        if (
          !task.due_date
        )
          return false

        return (
          new Date(
            task.due_date
          ).toDateString() ===
          date.toDateString()
        )
      }
    )

  const selectedEvents =
    events.filter(
      (
        event
      ) =>

        new Date(
          event.start_time
        ).toDateString() ===
        date.toDateString()
    )

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        rounded-[36px]

        border

        bg-white
        dark:bg-[#111827]

        p-8
      "
    >

      <div
        className="
          flex
          items-center
          gap-3

          mb-8
        "
      >

        <CalendarDays
          className="
            text-indigo-500
          "
        />

        <h2
          className="
            text-3xl
            font-black
          "
        >

          Productivity Calendar

        </h2>

      </div>

      <div
        className="
          grid
          lg:grid-cols-2
          gap-8
        "
      >

        {/* CALENDAR */}

        <div>

          <Calendar

            onChange={(value) =>
              setDate(
                value as Date
              )
            }

            value={date}

            tileContent={({
              date,
              view,
            }) => {

              if (
                view !==
                "month"
              )
                return null

              return (

                <div
                  className="
                    flex
                    justify-center
                    gap-1
                    mt-1
                  "
                >

                  {hasTask(
                    date
                  ) && (

                    <div
                      className="
                        w-2
                        h-2

                        rounded-full

                        bg-indigo-500
                      "
                    />

                  )}

                  {hasEvent(
                    date
                  ) && (

                    <div
                      className="
                        w-2
                        h-2

                        rounded-full

                        bg-pink-500
                      "
                    />

                  )}

                </div>

              )
            }}
          />

        </div>

        {/* DAY DETAILS */}

        <div
          className="
            space-y-6
          "
        >

          <div>

            <h3
              className="
                text-2xl
                font-bold
                mb-4
              "
            >

              {
                date.toDateString()
              }

            </h3>

          </div>

          {/* TASKS */}

          <div
            className="
              space-y-4
            "
          >

            <h4
              className="
                text-lg
                font-bold
              "
            >

              Tasks

            </h4>

            {
              selectedTasks.length === 0 && (

                <div
                  className="
                    rounded-2xl

                    bg-[#f8fafc]
                    dark:bg-[#1e293b]

                    p-4

                    text-sm
                    text-gray-500
                  "
                >

                  No tasks for this day.

                </div>

              )
            }

            {
              selectedTasks.map(
                (
                  task
                ) => (

                  <div

                    key={task.id}

                    className="
                      rounded-2xl

                      border

                      p-4

                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span>
                      {task.title}
                    </span>

                    <span
                      className="
                        text-xs
                        font-semibold

                        text-indigo-500
                      "
                    >

                      {
                        task.status
                      }

                    </span>

                  </div>

                )
              )
            }

          </div>

          {/* EVENTS */}

          <div
            className="
              space-y-4
            "
          >

            <h4
              className="
                text-lg
                font-bold
              "
            >

              Planner Events

            </h4>

            {
              selectedEvents.length === 0 && (

                <div
                  className="
                    rounded-2xl

                    bg-[#f8fafc]
                    dark:bg-[#1e293b]

                    p-4

                    text-sm
                    text-gray-500
                  "
                >

                  No planner events.

                </div>

              )
            }

            {
              selectedEvents.map(
                (
                  event
                ) => (

                  <div

                    key={event.id}

                    className="
                      rounded-2xl

                      border

                      p-4
                    "
                  >

                    {event.title}

                  </div>

                )
              )
            }

          </div>

        </div>

      </div>

    </motion.div>
  )
}