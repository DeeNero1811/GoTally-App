"use client"

import {
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  Wand2,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

export default function
AITaskGenerator() {

  const [
    prompt,
    setPrompt,
  ] = useState("")

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function generateTasks() {

    if (!prompt.trim())
      return

    setLoading(true)

    try {

      const response =
  await fetch(
    "/api/chat/generate-tasks",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              prompt,
            }),
          }
        )

      const data =
        await response.json()

      const tasks =
        JSON.parse(
          data.response
        )

      const {
        data: {
          user,
        },
      } = await supabase
        .auth
        .getUser()

      if (!user)
        return

      for (
        const task
        of tasks
      ) {

        await supabase
          .from("tasks")
          .insert({

            user_id:
              user.id,

            title:
              task.title,

            priority:
              task.priority ||

              "medium",

            status:
              "todo",

            completed:
              false,
          })
      }

      setPrompt("")

      alert(
        "AI tasks generated successfully."
      )

    } catch (error) {

      console.error(error)

      alert(
        "Failed to generate tasks."
      )
    }

    setLoading(false)
  }

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
        rounded-[32px]

        border

        bg-white
        dark:bg-[#111827]

        p-8

        mb-8
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
            text-3xl
            font-black
          "
        >

          Generate Tasks with AI

        </h2>

      </div>

      <textarea

        value={prompt}

        onChange={(e) =>
          setPrompt(
            e.target.value
          )
        }

        rows={4}

        placeholder="
Example:
Plan my frontend portfolio launch
        "

        className="
          w-full

          rounded-[24px]

          border

          bg-transparent

          p-5

          outline-none
        "
      />

      <button

        onClick={
          generateTasks
        }

        disabled={loading}

        className="
          mt-6

          rounded-[24px]

          bg-gradient-to-r
          from-[#4f46e5]
          to-[#7c3aed]

          px-8
          py-4

          text-white
          font-bold

          flex
          items-center
          gap-3
        "
      >

        <Wand2 size={20} />

        {
          loading
            ? "Generating..."
            : "Generate Tasks"
        }

      </button>

    </motion.div>
  )
}