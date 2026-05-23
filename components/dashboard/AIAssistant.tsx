"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  Bot,
  Send,
  X,
  Sparkles,
  Brain,
  Minimize2,
} from "lucide-react"

import TypingIndicator from "./TypingIndicator"

import {
  supabase,
} from "@/lib/supabase/client"

interface Message {
  role: "user" | "assistant"
  content: string
}

const quickPrompts = [
  "Plan my day",
  "Improve productivity",
  "Study routine",
  "Focus tips",
  "Analyze my habits",
  "Optimize workflow",
]

export default function AIAssistant() {

  const [open, setOpen] =
    useState(false)

  const [minimized, setMinimized] =
    useState(false)

  const [input, setInput] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        content:
          "Hi 👋 I'm your GPT-powered AI productivity assistant. I can analyze your workflow, optimize focus schedules, and generate productivity insights.",
      },
    ])

  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null
    )

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })

  }, [messages, loading])

  /* SEND MESSAGE */

  async function sendMessage(
    custom?: string
  ) {

    const message =
      custom || input

    if (!message.trim())
      return

    const userMessage: Message = {
      role: "user",
      content: message,
    }

    const updatedMessages = [
      ...messages,
      userMessage,
    ]

    setMessages(
      updatedMessages
    )

    setInput("")

    setLoading(true)
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
  data: tasks,
} = await supabase
  .from("tasks")
  .select("*")
  .eq(
    "user_id",
    user.id
  )

const totalTasks =
  tasks?.length || 0

const completedTasks =
  tasks?.filter(
    (
      task
    ) =>
      task.status ===
      "completed"
  ).length || 0

const activeTasks =
  tasks?.filter(
    (
      task
    ) =>

      task.status ===
        "todo" ||

      task.status ===
        "progress"
  ).length || 0

const productivity =
  Math.min(
    100,
    Math.round(
      (
        completedTasks /
        (
          totalTasks + 1
        )
      ) * 100
    )
  )

    try {

    const response =
  await fetch(
    "/api/chat",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({

        total:
          totalTasks,

        completed:
          completedTasks,

        active:
          activeTasks,

        productivity:
          productivity,

        messages:
          updatedMessages,

        overdue:
          tasks?.filter(
            (
              task
            ) =>

              task.due_date &&

              new Date(
                task.due_date
              ) < new Date() &&

              task.status !==
                "completed"
          ).length || 0,

        highPriority:
          tasks?.filter(
            (
              task
            ) =>

              task.priority ===
                "high" &&

              task.status !==
                "completed"
          ).length || 0,
      }),
    }
  )
      const data =
        await response.json()

      setMessages((prev) => [
        ...prev,
        {
          role:
            "assistant",
          content:
            data.response ||
            "AI failed to respond.",
        },
      ])

    } catch (error) {

      console.error(error)

      setMessages((prev) => [
        ...prev,
        {
          role:
            "assistant",
          content:
            "Something went wrong connecting to AI.",
        },
      ])
    }

    setLoading(false)
  }

  return (

    <>

      {/* FLOATING BUTTON */}

      <motion.button

        whileHover={{
          scale: 1.08,
          y: -3,
        }}

        whileTap={{
          scale: 0.94,
        }}

        animate={{
          y: [0, -4, 0],
        }}

        transition={{
          y: {
            repeat: Infinity,
            duration: 3,
          },
        }}

        onClick={() => {

          setOpen(true)

          setMinimized(false)
        }}

        className="
          fixed

          bottom-6
          right-6

          mb-20

          z-[9999]

          w-16 h-16

          rounded-full

          bg-gradient-to-br
          from-indigo-600
          via-violet-600
          to-purple-600

          text-white

          shadow-[0_20px_50px_rgba(99,102,241,0.45)]

          flex items-center justify-center
        "
      >

        <Bot size={26} />

      </motion.button>

      {/* AI PANEL */}

      <AnimatePresence>

        {
          open && !minimized && (

            <motion.div

              initial={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}

              transition={{
                duration: 0.25,
              }}

              className="
                fixed
                z-[9999]

                bottom-24
                right-6

                w-[92vw]
                max-w-[380px]

                h-[650px]

                rounded-[36px]

                overflow-hidden

                bg-white/92
                dark:bg-[#0f172a]/92

                backdrop-blur-3xl

                border
                border-white/20

                shadow-[0_25px_80px_rgba(0,0,0,0.45)]

                flex flex-col
              "
            >

              {/* GLOW */}

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-br
                  from-indigo-500/5
                  via-violet-500/5
                  to-purple-500/5

                  pointer-events-none
                "
              />

              {/* HEADER */}

              <div
                className="
                  relative

                  flex items-center
                  justify-between

                  px-5 py-5

                  border-b
                  border-white/10
                "
              >

                <div
                  className="
                    flex items-center gap-4
                  "
                >

                  <div
                    className="
                      w-14 h-14
                      rounded-3xl

                      bg-gradient-to-br
                      from-indigo-600
                      to-violet-600

                      text-white

                      flex items-center justify-center

                      shadow-xl
                    "
                  >

                    <Sparkles size={22} />

                  </div>

                  <div>

                    <h2
                      className="
                        font-black
                        text-lg
                        tracking-tight
                      "
                    >
                      GPT Assistant
                    </h2>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        mt-1
                      "
                    >
                      Powered by OpenAI Intelligence
                    </p>

                  </div>

                </div>

                <div
                  className="
                    flex items-center gap-2
                  "
                >

                  <button
                    onClick={() =>
                      setMinimized(
                        true
                      )
                    }
                    className="
                      w-10 h-10
                      rounded-2xl

                      bg-gray-100
                      dark:bg-[#1e293b]

                      flex items-center justify-center
                    "
                  >

                    <Minimize2
                      size={16}
                    />

                  </button>

                  <button
                    onClick={() =>
                      setOpen(false)
                    }
                    className="
                      w-10 h-10
                      rounded-2xl

                      bg-gray-100
                      dark:bg-[#1e293b]

                      flex items-center justify-center
                    "
                  >

                    <X size={16} />

                  </button>

                </div>

              </div>

              {/* QUICK PROMPTS */}

              <div
                className="
                  px-4 py-4

                  flex gap-2

                  overflow-x-auto

                  border-b
                  border-white/10
                "
              >

                {
                  quickPrompts.map(
                    (prompt) => (

                      <motion.button

                        key={prompt}

                        whileHover={{
                          y: -2,
                          scale: 1.02,
                        }}

                        whileTap={{
                          scale: 0.98,
                        }}

                        onClick={() =>
                          sendMessage(
                            prompt
                          )
                        }

                        className="
                          whitespace-nowrap

                          px-4 py-2.5

                          rounded-full

                          bg-indigo-100
                          dark:bg-indigo-500/20

                          text-indigo-600

                          text-xs
                          font-semibold

                          shadow-sm
                        "
                      >

                        {prompt}

                      </motion.button>

                    )
                  )
                }

              </div>

              {/* CHAT */}

              <div
                className="
                  flex-1
                  overflow-y-auto

                  px-4 py-5

                  space-y-5
                "
              >

                {
                  messages.map(
                    (
                      message,
                      index
                    ) => (

                      <motion.div

                        key={index}

                        initial={{
                          opacity: 0,
                          y: 8,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        transition={{
                          duration: 0.2,
                        }}

                        className={`
                          flex

                          ${
                            message.role ===
                            "user"
                              ? "justify-end"
                              : "justify-start"
                          }
                        `}
                      >

                        <div
                          className={`
                            max-w-[88%]

                            rounded-[28px]

                            px-5 py-4

                            whitespace-pre-line

                            text-sm
                            leading-relaxed

                            shadow-lg

                            backdrop-blur-xl

                            ${
                              message.role ===
                              "user"
                                ? `
                                  bg-gradient-to-br
                                  from-indigo-600
                                  to-violet-600

                                  text-white
                                `
                                : `
                                  bg-white/80
                                  dark:bg-[#1e293b]/80

                                  border
                                  border-white/10
                                `
                            }
                          `}
                        >

                          {
                            message.role ===
                            "assistant" && (

                              <div
                                className="
                                  flex items-center
                                  gap-2

                                  mb-3

                                  text-indigo-500
                                "
                              >

                                <Brain
                                  size={14}
                                />

                                <span
                                  className="
                                    text-[11px]
                                    font-semibold
                                  "
                                >
                                  GPT AI
                                </span>

                              </div>

                            )
                          }

                          {message.content}

                        </div>

                      </motion.div>

                    )
                  )
                }

                {
                  loading && (
                    <TypingIndicator />
                  )
                }

                <div
                  ref={messagesEndRef}
                />

              </div>

              {/* INPUT */}

              <div
                className="
                  p-4

                  border-t
                  border-white/10
                "
              >

                <div
                  className="
                    flex gap-3
                  "
                >

                  <input
                    type="text"
                    value={input}
                    placeholder="Ask GPT to optimize your workflow..."
                    onChange={(e) =>
                      setInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {
                        
                        sendMessage()
                      }
                    }}

                    className="
                      flex-1

                      rounded-[24px]

                      border

                      bg-white/70
                      dark:bg-[#1e293b]/70

                      px-5 py-4

                      outline-none

                      text-sm

                      backdrop-blur-xl
                    "
                  />

                  <motion.button

                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}

                    whileTap={{
                      scale: 0.94,
                    }}

                    onClick={() =>
                      sendMessage()
                    }

                    className="
                      w-14 h-14

                      rounded-[24px]

                      bg-gradient-to-br
                      from-indigo-600
                      to-violet-600

                      text-white

                      flex items-center justify-center

                      shadow-xl
                    "
                  >

                    <Send size={20} />

                  </motion.button>

                </div>

              </div>

            </motion.div>

          )
        }

      </AnimatePresence>

    </>
  )
}