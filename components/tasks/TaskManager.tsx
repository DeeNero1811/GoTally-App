"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  Plus,
  Trash2,
  CheckCircle2,
  GripVertical,
} from "lucide-react"

import { toast } from "sonner"

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd"

import { supabase } from "../../lib/supabase"

interface Task {
  id: number
  title: string
  completed: boolean
  user_id: string
  position: number
}

export default function TaskManager() {

  const [tasks, setTasks] =
    useState<Task[]>([])

  const [title, setTitle] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [initialLoading, setInitialLoading] =
    useState(true)

  async function fetchTasks() {

    setInitialLoading(true)

    const {
      data: authData,
    } = await supabase.auth.getUser()

    const user =
      authData.user

    if (!user) {
      setInitialLoading(false)
      return
    }

    const {
      data,
      error,
    } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("position", {
        ascending: true,
      })

    if (error) {

      console.log(error)

      toast.error(
        "Failed to load tasks"
      )

      setInitialLoading(false)

      return
    }

    setTasks(data || [])

    setInitialLoading(false)
  }

  async function addTask() {

    if (!title.trim()) return

    setLoading(true)

    const {
      data: authData,
    } = await supabase.auth.getUser()

    const user =
      authData.user

    if (!user) {

      toast.error(
        "Please login"
      )

      setLoading(false)

      return
    }

    const {
      error,
    } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          completed: false,
          user_id: user.id,
          position: tasks.length,
        },
      ])

    if (error) {

      console.log(error)

      toast.error(
        error.message
      )

      setLoading(false)

      return
    }

    setTitle("")

    toast.success(
      "Task added"
    )

    await fetchTasks()

    setLoading(false)
  }

  async function toggleTask(
    id: number,
    completed: boolean
  ) {

    const {
      error,
    } = await supabase
      .from("tasks")
      .update({
        completed: !completed,
      })
      .eq("id", id)

    if (error) {

      console.log(error)

      toast.error(
        "Failed to update task"
      )

      return
    }

    fetchTasks()
  }

  async function deleteTask(
    id: number
  ) {

    const {
      error,
    } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)

    if (error) {

      console.log(error)

      toast.error(
        "Failed to delete task"
      )

      return
    }

    toast.success(
      "Task deleted"
    )

    fetchTasks()
  }

  async function handleDragEnd(
    result: any
  ) {

    if (!result.destination)
      return

    const items =
      Array.from(tasks)

    const [reordered] =
      items.splice(
        result.source.index,
        1
      )

    items.splice(
      result.destination.index,
      0,
      reordered
    )

    const updated =
      items.map(
        (
          task,
          index
        ) => ({
          ...task,
          position: index,
        })
      )

    setTasks(updated)

    for (const task of updated) {

      await supabase
        .from("tasks")
        .update({
          position:
            task.position,
        })
        .eq("id", task.id)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-white/70
        dark:bg-[#111827]/80
        backdrop-blur-xl
        border border-white/40
        dark:border-white/10
        p-6
        shadow-xl
        mb-8
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute
          inset-0
          opacity-10
          bg-gradient-to-br
          from-blue-500
          to-violet-500
        "
      />

      <div className="relative z-10">

        {/* HEADER */}

        <div className="mb-6">

          <h2
            className="
              text-2xl
              font-semibold
              tracking-tight
              text-[#0f172a]
              dark:text-white
              mb-1
            "
          >
            Task Manager
          </h2>

          <p
            className="
              text-sm
              text-[#64748b]
              dark:text-gray-400
            "
          >
            Drag, organize, and track productivity
          </p>

        </div>

        {/* INPUT */}

        <div
          className="
            flex flex-col md:flex-row
            gap-4
            mb-8
          "
        >

          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              flex-1
              bg-white/80
              dark:bg-[#1e293b]
              border border-gray-200
              dark:border-gray-700
              rounded-2xl
              px-5 py-4
              outline-none
              text-sm
              dark:text-white
            "
          />

          <button
            onClick={addTask}
            disabled={loading}
            className="
              bg-[#2563eb]
              hover:bg-[#1d4ed8]
              text-white
              px-6 py-4
              rounded-2xl
              text-sm
              font-medium
              transition
              flex items-center
              justify-center
              gap-2
              min-w-[140px]
            "
          >

            <Plus size={18} />

            {loading
              ? "Adding..."
              : "Add Task"}

          </button>

        </div>

        {/* LOADING */}

        {initialLoading ? (

          <div className="space-y-4">

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="
                  h-[88px]
                  rounded-3xl
                  bg-gray-200/60
                  dark:bg-[#1e293b]
                  animate-pulse
                "
              />

            ))}

          </div>

        ) : (

          <DragDropContext
            onDragEnd={
              handleDragEnd
            }
          >

            <Droppable
              droppableId="tasks"
            >

              {(provided) => (

                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="
                    space-y-4
                  "
                >

                  <AnimatePresence>

                    {tasks.map(
                      (
                        task,
                        index
                      ) => (

                        <Draggable
                          key={
                            task.id
                          }
                          draggableId={String(
                            task.id
                          )}
                          index={index}
                        >

                          {(
                            provided
                          ) => (

                            <motion.div

                              ref={
                                provided.innerRef
                              }

                              {...provided.draggableProps}

                              initial={{
                                opacity: 0,
                                y: 10,
                              }}

                              animate={{
                                opacity: 1,
                                y: 0,
                              }}

                              whileHover={{
                                y: -2,
                              }}

                              className="
                                flex items-center
                                justify-between
                                gap-4
                                rounded-3xl
                                bg-white/80
                                dark:bg-[#1e293b]
                                border border-gray-200
                                dark:border-gray-700
                                p-5
                                transition
                              "
                            >

                              <div
                                className="
                                  flex items-center
                                  gap-4
                                  flex-1
                                "
                              >

                                {/* DRAG */}

                                <div
                                  {...provided.dragHandleProps}
                                  className="
                                    cursor-grab
                                    text-gray-400
                                  "
                                >
                                  <GripVertical
                                    size={18}
                                  />
                                </div>

                                {/* CHECK */}

                                <button
                                  onClick={() =>
                                    toggleTask(
                                      task.id,
                                      task.completed
                                    )
                                  }
                                >

                                  <CheckCircle2
                                    size={24}
                                    className={
                                      task.completed
                                        ? "text-emerald-500 fill-emerald-500"
                                        : "text-gray-300"
                                    }
                                  />

                                </button>

                                {/* TITLE */}

                                <p
                                  className={`
                                    text-sm md:text-base
                                    ${
                                      task.completed
                                        ? "line-through text-gray-400"
                                        : "text-[#0f172a] dark:text-white"
                                    }
                                  `}
                                >
                                  {
                                    task.title
                                  }
                                </p>

                              </div>

                              {/* DELETE */}

                              <button
                                onClick={() =>
                                  deleteTask(
                                    task.id
                                  )
                                }
                                className="
                                  w-10 h-10
                                  rounded-2xl
                                  bg-red-500/10
                                  text-red-500
                                  flex items-center justify-center
                                  hover:scale-105
                                  transition
                                "
                              >
                                <Trash2
                                  size={18}
                                />
                              </button>

                            </motion.div>
                          )}

                        </Draggable>
                      )
                    )}

                  </AnimatePresence>

                  {
                    provided.placeholder
                  }

                  {/* EMPTY */}

                  {tasks.length ===
                    0 && (

                    <div
                      className="
                        rounded-3xl
                        border border-dashed
                        border-gray-300
                        dark:border-gray-700
                        p-10
                        text-center
                      "
                    >

                      <h3
                        className="
                          text-lg
                          font-medium
                          text-[#0f172a]
                          dark:text-white
                          mb-2
                        "
                      >
                        No tasks yet
                      </h3>

                      <p
                        className="
                          text-sm
                          text-[#64748b]
                          dark:text-gray-400
                        "
                      >
                        Add your first task
                        to begin tracking
                        productivity.
                      </p>

                    </div>
                  )}

                </div>
              )}

            </Droppable>

          </DragDropContext>

        )}

      </div>

    </div>
  )
}