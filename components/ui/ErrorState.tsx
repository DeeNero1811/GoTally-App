"use client"

import {
  motion,
} from "framer-motion"

import {
  AlertTriangle,
  RefreshCcw,
} from "lucide-react"

type Props = {
  title?: string
  description?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred while loading your workspace.",
  onRetry,
}: Props) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        scale: 0.95,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      className="
        rounded-[40px]

        border
        border-red-200

        dark:border-red-500/20

        bg-white/70
        dark:bg-[#111827]/70

        backdrop-blur-2xl

        p-14

        text-center

        shadow-xl
      "
    >

      <div
        className="
          w-24
          h-24

          rounded-[32px]

          bg-red-100
          dark:bg-red-500/10

          flex
          items-center
          justify-center

          mx-auto

          mb-8
        "
      >

        <AlertTriangle
          size={42}
          className="
            text-red-500
          "
        />

      </div>

      <h2
        className="
          text-3xl
          font-black
          tracking-tight
          mb-4
        "
      >

        {title}

      </h2>

      <p
        className="
          text-gray-500
          text-lg
          max-w-xl
          mx-auto
          leading-relaxed
          mb-10
        "
      >

        {description}

      </p>

      {
        onRetry && (

          <button
            onClick={onRetry}
            className="
              inline-flex
              items-center
              gap-3

              px-8
              py-4

              rounded-2xl

              bg-gradient-to-r
              from-red-500
              to-rose-600

              text-white

              font-semibold

              shadow-xl

              hover:scale-105

              transition-all
              duration-300
            "
          >

            <RefreshCcw size={18} />

            Retry

          </button>

        )
      }

    </motion.div>
  )
}