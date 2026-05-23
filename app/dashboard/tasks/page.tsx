"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd"

import {
  motion,
} from "framer-motion"

import {
  Plus,
  Calendar,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Repeat,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

import {
  addNotification,
} from "@/lib/notifications"

import {
  checkAchievements,
} from "@/lib/achievementEngine"

import {
  logActivity,
} from "@/lib/activityLogger"

import AITaskGenerator
  from "@/components/tasks/AITaskGenerator"

type Subtask = {
  id: number
  task_id: number
  title: string
  completed: boolean
}

type Task = {
  id: number
  title: string
  completed: boolean
  priority: string
  due_date: string | null
  recurring: string | null
  reminder: number
  status: string
  subtasks?: Subtask[]
}

const columns = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "progress",
    title: "In Progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
]

export default function TasksPage() {

  const [tasks,
    setTasks] =
      useState<Task[]>([])

  const [loading,
    setLoading] =
      useState(true)

  const [expanded,
    setExpanded] =
      useState<number[]>([])

  const [showCompleted,
    setShowCompleted] =
      useState(false)

  const [newTask,
    setNewTask] =
      useState("")

  const [priority,
    setPriority] =
      useState("medium")

  const [dueDate,
    setDueDate] =
      useState("")

  const [recurring,
    setRecurring] =
      useState("none")

  const [reminder,
    setReminder] =
      useState(0)

  const [subtaskInputs,
    setSubtaskInputs] =
      useState<Record<number,string>>({})

  useEffect(() => {

    loadTasks()

    const channel =
      supabase
        .channel(
          "kanban-live"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            loadTasks()
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "subtasks",
          },
          () => {
            loadTasks()
          }
        )
        .subscribe()

    return () => {

      supabase.removeChannel(
        channel
      )
    }

  }, [])

  async function loadTasks() {

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
        data: tasksData,
      } = await supabase
        .from("tasks")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const {
        data: subtasksData,
      } = await supabase
        .from("subtasks")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const merged =
        (tasksData || []).map(
          (task) => ({
            ...task,
            subtasks:
              (subtasksData || []).filter(
                (
                  subtask
                ) =>
                  subtask.task_id ===
                  task.id
              ),
          })
        )

      setTasks(
        merged as Task[]
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  async function addTask() {

    if (!newTask.trim())
      return

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    await supabase
      .from("tasks")
      .insert({

        title:
          newTask,

        completed:
          false,

        priority,

        recurring,

        reminder,

        due_date:
          dueDate || null,

        status:
          "todo",

        user_id:
          user.id,
      })

    addNotification({

      type:
        "default" as any,

      title:
        "Task Created",

      message:
        "🚀 Workflow task created.",
    })

    await logActivity({

  title:
    "Task Created",

  description:
    `${newTask} was created.`,

  type:
    "task",
})

    setNewTask("")
    setPriority("medium")
    setRecurring("none")
    setReminder(0)
    setDueDate("")

    loadTasks()
  }

  async function updateTaskStatus(
  taskId: number,
  status: string
) {

  const task =
    tasks.find(
      (
        task
      ) =>
        task.id === taskId
    )

  if (!task)
    return

  const isCompleted =

    status === "completed" ||

    status === "complete" ||

    status === "done"

  await supabase
    .from("tasks")
    .update({

      status,

      completed:
        isCompleted,

      updated_at:
        new Date()
          .toISOString(),
    })
    .eq(
      "id",
      taskId
    )

  if (
    status ===
    "progress"
  ) {

    addNotification({

      type:
        "default" as any,

      title:
        "Task In Progress",

      message:
        `🚀 ${task.title} moved into progress.`,
    })
  }

await logActivity({

  title:
    "Task In Progress",

  description:
    `${task.title} moved into progress.`,

  type:
    "task",
})

  if (isCompleted) {

    addNotification({

      type:
        "success" as any,

      title:
        "Task Completed",

      message:
        `✅ ${task.title} completed successfully.`,
    })
  }

await logActivity({

  title:
    "Task Completed",

  description:
    `${task.title} was completed.`,

  type:
    "task",
})

  await checkAchievements()

  loadTasks()
}

  async function onDragEnd(
    result: any
  ) {

    if (
      !result.destination
    ) {
      return
    }

    const taskId =
      Number(
        result.draggableId
      )

    const newStatus =
      result.destination
        .droppableId

    updateTaskStatus(
      taskId,
      newStatus
    )
  }

  async function addSubtask(
    taskId: number
  ) {

    const value =
      subtaskInputs[
        taskId
      ]

    if (!value?.trim())
      return

    const {
      data: {
        user,
      },
    } = await supabase.auth.getUser()

    if (!user)
      return

    await supabase
      .from("subtasks")
      .insert({

        title:
          value,

        completed:
          false,

        task_id:
          taskId,

        user_id:
          user.id,
      })

    setSubtaskInputs(
      (prev) => ({
        ...prev,
        [taskId]: "",
      })
    )

    loadTasks()
  }

  async function toggleSubtask(
    subtask: Subtask
  ) {

    await supabase
      .from("subtasks")
      .update({
        completed:
          !subtask.completed,
      })
      .eq(
        "id",
        subtask.id
      )

    loadTasks()
  }

  function getProgress(
    task: Task
  ) {

    if (
      task.status ===
      "completed"
    ) {
      return 100
    }

    if (
      task.status ===
      "progress" &&
      (
        !task.subtasks ||
        task.subtasks.length === 0
      )
    ) {
      return 50
    }

    if (
      !task.subtasks ||
      task.subtasks.length === 0
    ) {
      return 0
    }

    const completed =
      task.subtasks.filter(
        (
          subtask
        ) =>
          subtask.completed
      ).length

    return Math.round(
      (
        completed /
        task.subtasks.length
      ) * 100
    )
  }

  function getPriorityColor(
    priority: string
  ) {

    if (
      priority === "high"
    ) {

      return `
        bg-red-100
        text-red-600
        dark:bg-red-500/20
        dark:text-red-300
      `
    }

    if (
      priority === "medium"
    ) {

      return `
        bg-yellow-100
        text-yellow-600
        dark:bg-yellow-500/20
        dark:text-yellow-300
      `
    }

    return `
      bg-green-100
      text-green-600
      dark:bg-green-500/20
      dark:text-green-300
    `
  }

  function isOverdue(
    dueDate: string | null
  ) {

    if (!dueDate)
      return false

    return (
      new Date(dueDate) <
      new Date()
    )
  }

  const groupedTasks =
    useMemo(() => {

      return {

        todo:
          tasks.filter(
            (
              task
            ) =>
              task.status ===
              "todo"
          ),

        progress:
          tasks.filter(
            (
              task
            ) =>
              task.status ===
              "progress"
          ),

        completed:
          showCompleted
            ? tasks.filter(
                (
                  task
                ) =>
                  task.status ===
                  "completed"
              )
            : [],
      }

    }, [
      tasks,
      showCompleted,
    ])

  if (loading) {

    return (

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        {[1,2,3].map(
          (item) => (

            <div

              key={item}

              className="
                h-[600px]
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

      <div
        className="
          flex
          flex-col
          xl:flex-row
          gap-4
          justify-between
          items-start
          xl:items-center
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-black
            "
          >

            Kanban Workflow

          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            AI-powered productivity pipeline management.

          </p>

        </div>

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-3
            w-full
            xl:w-auto
          "
        >

          <input
            value={newTask}
            onChange={(e) =>
              setNewTask(
                e.target.value
              )
            }
            placeholder="Create task..."
            className="
              rounded-2xl
              border
              bg-white
              dark:bg-[#111827]
              px-5
              py-4
              outline-none
            "
          />

          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              bg-white
              dark:bg-[#111827]
              px-5
              py-4
            "
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className="
              rounded-2xl
              border
              bg-white
              dark:bg-[#111827]
              px-4
              py-4
            "
          >

            <option value="low">
              Low
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="high">
              High
            </option>

          </select>

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
              bg-white
              dark:bg-[#111827]
              px-4
              py-4
            "
          >

            <option value={0}>
              No Reminder
            </option>

            <option value={5}>
              5 mins before
            </option>

            <option value={15}>
              15 mins before
            </option>

            <option value={30}>
              30 mins before
            </option>

            <option value={60}>
              1 hour before
            </option>

          </select>

          <button
            onClick={addTask}
            className="
              rounded-2xl
              bg-gradient-to-r
              from-[#4f46e5]
              to-[#7c3aed]
              px-5
              py-4
              text-white
            "
          >

            <Plus size={22} />

          </button>

        </div>

      </div>

      <div
        className="
          flex
          justify-end
        "
      >

        <button
          onClick={() =>
            setShowCompleted(
              !showCompleted
            )
          }
          className="
            rounded-2xl
            border
            bg-white
            dark:bg-[#111827]
            px-5
            py-3
            font-semibold
          "
        >

          {
            showCompleted
              ? "Hide Completed"
              : "Show Completed"
          }

        </button>

      </div>
      <AITaskGenerator />

      <DragDropContext
        onDragEnd={
          onDragEnd
        }
      >

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          "
        >

          {columns.map(
            (
              column
            ) => (

              <Droppable
                droppableId={
                  column.id
                }
                key={column.id}
              >

                {(provided) => (

                  <div
                    ref={
                      provided.innerRef
                    }
                    {...provided.droppableProps}
                    className="
                      rounded-[32px]
                      bg-[#f8fafc]
                      dark:bg-[#111827]
                      border
                      p-5
                      min-h-[700px]
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        mb-6
                      "
                    >

                      <h2
                        className="
                          text-2xl
                          font-bold
                        "
                      >

                        {
                          column.title
                        }

                      </h2>

                    </div>

                    <div className="space-y-5">

                      {groupedTasks[
                        column.id as keyof typeof groupedTasks
                      ].map(
                        (
                          task,
                          index
                        ) => {

                          const progress =
                            getProgress(
                              task
                            )

                          return (

                            <Draggable
                              draggableId={String(
                                task.id
                              )}
                              index={index}
                              key={task.id}
                            >

                              {(provided) => (

                                <div
                                  ref={
                                    provided.innerRef
                                  }
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="
                                    rounded-[28px]
                                    border
                                    bg-white
                                    dark:bg-[#0f172a]
                                    p-5
                                  "
                                >

                                  <h3
                                    className="
                                      text-2xl
                                      font-bold
                                      mb-4
                                    "
                                  >

                                    {
                                      task.title
                                    }

                                  </h3>

                                  {
                                    task.due_date &&
                                    isOverdue(
                                      task.due_date
                                    ) &&
                                    task.status !==
                                      "completed" && (

                                      <div
                                        className="
                                          mb-4
                                          rounded-2xl
                                          bg-red-100
                                          dark:bg-red-500/20
                                          text-red-600
                                          dark:text-red-300
                                          px-4
                                          py-3
                                          text-sm
                                          font-semibold
                                          flex
                                          items-center
                                          gap-2
                                        "
                                      >

                                        <AlertTriangle
                                          size={18}
                                        />

                                        Task Overdue

                                      </div>

                                    )
                                  }

                                  <div
                                    className="
                                      flex
                                      justify-between
                                      text-sm
                                      mb-2
                                    "
                                  >

                                    <span>
                                      Progress
                                    </span>

                                    <span>
                                      {progress}%
                                    </span>

                                  </div>

                                  <div
                                    className="
                                      h-3
                                      rounded-full
                                      bg-gray-200
                                      overflow-hidden
                                    "
                                  >

                                    <motion.div
  animate={{
    width: `${progress}%`,
  }}
                                      className="
                                        h-full
                                        bg-gradient-to-r
                                        from-[#4f46e5]
                                        to-[#7c3aed]
                                      "
                                    />

                                  </div>

                                </div>

                              )}

                            </Draggable>

                          )
                        }
                      )}

                      {
                        provided.placeholder
                      }

                    </div>

                  </div>

                )}

              </Droppable>

            )
          )}

        </div>

      </DragDropContext>

    </div>

  )
}