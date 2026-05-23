"use client"

import {
  motion,
} from "framer-motion"

export default function TypingIndicator() {

  return (

    <div
      className="
        flex
        items-center
        gap-2

        px-5
        py-4

        rounded-3xl

        bg-white
        dark:bg-[#111827]

        border

        shadow-lg

        w-fit
      "
    >

      {
        [0,1,2].map(
          (
            dot
          ) => (

            <motion.div

              key={dot}

              animate={{
                y: [0, -6, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay:
                  dot * 0.15,
              }}

              className="
                w-3
                h-3

                rounded-full

                bg-indigo-500
              "
            />

          )
        )
      }

    </div>
  )
}