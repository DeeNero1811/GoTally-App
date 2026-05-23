"use client"

import {
  motion,
} from "framer-motion"

type Props = {
  onSelect: (
    prompt: string
  ) => void
}

const prompts = [

  "Analyze my productivity",

  "Create a focus schedule",

  "How can I improve consistency?",

  "Summarize my weekly performance",

  "Recommend better habits",

  "Optimize my workflow",
]

export default function AIPromptSuggestions({
  onSelect,
}: Props) {

  return (

    <div
      className="
        flex
        flex-wrap
        gap-3
      "
    >

      {
        prompts.map(
          (
            prompt,
            index
          ) => (

            <motion.button

              key={prompt}

              initial={{
                opacity: 0,
                y: 10,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay:
                  index * 0.05,
              }}

              whileHover={{
                y: -2,
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              onClick={() =>
                onSelect(prompt)
              }

              className="
                px-5
                py-3

                rounded-2xl

                bg-white/70
                dark:bg-[#111827]/70

                border
                border-white/20

                backdrop-blur-xl

                text-sm
                font-medium

                shadow-lg
              "
            >

              {prompt}

            </motion.button>

          )
        )
      }

    </div>
  )
}