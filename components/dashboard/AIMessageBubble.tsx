"use client"

import {
  motion,
} from "framer-motion"

type Props = {
  role: "user" | "assistant"
  content: string
}

export default function AIMessageBubble({
  role,
  content,
}: Props) {

  const isUser =
    role === "user"

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

      className={`
        flex
        ${isUser
          ? "justify-end"
          : "justify-start"
        }
      `}
    >

      <div
        className={`
          max-w-[80%]

          px-6
          py-5

          rounded-[28px]

          shadow-lg

          backdrop-blur-2xl

          border

          leading-relaxed

          ${isUser
            ? `
              bg-gradient-to-br
              from-indigo-600
              to-violet-600

              text-white

              border-indigo-500
            `
            : `
              bg-white/80
              dark:bg-[#111827]/80

              text-black
              dark:text-white

              border-white/20
            `
          }
        `}
      >

        {content}

      </div>

    </motion.div>
  )
}