"use client"

import {
  motion,
} from "framer-motion"

export default function SkeletonCard() {

  return (

    <motion.div

      initial={{
        opacity: 0.5,
      }}

      animate={{
        opacity: [0.5, 1, 0.5],
      }}

      transition={{
        repeat: Infinity,
        duration: 1.8,
      }}

      className="
        rounded-[36px]

        border
        border-white/20

        bg-white/70
        dark:bg-[#111827]/70

        backdrop-blur-2xl

        p-8

        shadow-xl
      "
    >

      <div
        className="
          w-16
          h-16

          rounded-3xl

          bg-gray-200
          dark:bg-[#1e293b]

          mb-8
        "
      />

      <div
        className="
          h-10
          w-32

          rounded-xl

          bg-gray-200
          dark:bg-[#1e293b]

          mb-5
        "
      />

      <div
        className="
          h-5
          w-48

          rounded-xl

          bg-gray-200
          dark:bg-[#1e293b]
        "
      />

    </motion.div>
  )
}