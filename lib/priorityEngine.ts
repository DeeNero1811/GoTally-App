type Task = {

  title: string

  priority: string

  status: string

  due_date?: string | null

  created_at?: string
}

export function
generatePrioritySuggestions(
  tasks: Task[]
) {

  const suggestions:
    string[] = []

  const now =
    new Date()

  tasks.forEach(
    (
      task
    ) => {

      /* OVERDUE */

      if (

        task.due_date &&

        new Date(
          task.due_date
        ) < now &&

        task.status !==
          "completed"

      ) {

        suggestions.push(

          `⚠️ ${task.title} is overdue and should be prioritized.`

        )
      }

      /* HIGH PRIORITY */

      if (

        task.priority ===
          "high" &&

        task.status !==
          "completed"

      ) {

        suggestions.push(

          `🔥 ${task.title} is high priority.`

        )
      }

      /* STALE TASK */

      if (
        task.created_at
      ) {

        const created =
          new Date(
            task.created_at
          )

        const diff =
          (
            now.getTime() -
            created.getTime()
          ) /
          (
            1000 *
            60 *
            60 *
            24
          )

        if (
          diff > 5 &&

          task.status !==
            "completed"
        ) {

          suggestions.push(

            `🚀 ${task.title} has been inactive for several days.`

          )
        }
      }
    }
  )

  return suggestions.slice(
    0,
    5
  )
}