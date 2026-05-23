import {
  supabase,
} from "@/lib/supabase/client"

const notifiedItems =
  new Set<string>()

export async function
startReminderEngine() {

  if (
    typeof window ===
    "undefined"
  ) {
    return
  }

  if (
    "Notification" in
    window
  ) {

    if (
      Notification.permission !==
      "granted"
    ) {

      await Notification.requestPermission()
    }
  }

  setInterval(
    async () => {

      try {

        const {
          data: {
            user,
          },
        } = await supabase
          .auth
          .getUser()

        if (!user)
          return

        const now =
          new Date()

        /* PLANNER EVENTS */

        const {
          data: plannerEvents,
        } = await supabase
          .from(
            "planner_events"
          )
          .select("*")
          .eq(
            "user_id",
            user.id
          )
          .eq(
            "status",
            "upcoming"
          )

        for (
          const event of
          plannerEvents || []
        ) {

          const key =
            `planner-${event.id}`

          if (
            notifiedItems.has(
              key
            )
          ) {
            continue
          }

          if (
            event.reminder === 0
          ) {
            continue
          }

          const eventTime =
            new Date(
              event.date
            )

          const reminderTime =
            new Date(
              eventTime.getTime() -
              event.reminder *
                60 *
                1000
            )

          const diff =
            Math.abs(
              now.getTime() -
              reminderTime.getTime()
            )

          if (
            diff <
            30000
          ) {

            if (
              Notification.permission ===
              "granted"
            ) {

              new Notification(
                "📅 Upcoming Event",
                {
                  body:
                    `${event.title} starts in ${event.reminder} mins.`,
                }
              )
            }

            notifiedItems.add(
              key
            )
          }
        }

        /* TASK REMINDERS */

        const {
          data: tasks,
        } = await supabase
          .from("tasks")
          .select("*")
          .eq(
            "user_id",
            user.id
          )
          .neq(
            "status",
            "completed"
          )

        for (
          const task of
          tasks || []
        ) {

          const key =
            `task-${task.id}`

          if (
            notifiedItems.has(
              key
            )
          ) {
            continue
          }

          if (
            !task.due_date ||
            task.reminder === 0
          ) {
            continue
          }

          const dueTime =
            new Date(
              task.due_date
            )

          const reminderTime =
            new Date(
              dueTime.getTime() -
              task.reminder *
                60 *
                1000
            )

          const diff =
            Math.abs(
              now.getTime() -
              reminderTime.getTime()
            )

          /* UPCOMING DEADLINE */

          if (
            diff <
            30000
          ) {

            if (
              Notification.permission ===
              "granted"
            ) {

              new Notification(
                "⏰ Task Deadline",
                {
                  body:
                    `${task.title} is due in ${task.reminder} mins.`,
                }
              )
            }

            notifiedItems.add(
              key
            )
          }

          /* OVERDUE WARNING */

          if (
            now >
            dueTime
          ) {

            const overdueKey =
              `overdue-${task.id}`

            if (
              notifiedItems.has(
                overdueKey
              )
            ) {
              continue
            }

            if (
              Notification.permission ===
              "granted"
            ) {

              new Notification(
                "🚨 Overdue Task",
                {
                  body:
                    `${task.title} is overdue.`,
                }
              )
            }

            notifiedItems.add(
              overdueKey
            )
          }
        }

      } catch (error) {

        console.error(
          "Reminder engine error:",
          error
        )
      }

    },

    30000
  )
}