"use client"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  ArrowRight,
} from "lucide-react"

type Props = {
  title: string
  description: string
  buttonText?: string
  onClick?: () => void
}

export default function PremiumEmptyState({
  title,
  description,
  buttonText,
  onClick,
}: Props) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        relative
        overflow-hidden

        rounded-[36px]

        border

        bg-white
        dark:bg-[#111827]

        p-12

        text-center
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          left-1/2

          -translate-x-1/2

          w-72
          h-72

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
      />

      {/* ICON */}

      <div
        className="
          relative
          z-10

          w-24
          h-24

          rounded-[30px]

          bg-gradient-to-br
          from-[#6366f1]
          to-[#8b5cf6]

          flex
          items-center
          justify-center

          mx-auto

          mb-8

          shadow-2xl
        "
      >

        <Sparkles
          className="text-white"
          size={42}
        />

      </div>

      {/* CONTENT */}

      <div className="relative z-10">

        <h2
          className="
            text-3xl
            md:text-4xl

            font-black
            tracking-tight

            mb-4
          "
        >

          {title}

        </h2>

        <p
          className="
            max-w-2xl
            mx-auto

            text-lg
            leading-relaxed

            text-gray-500
          "
        >

          {description}

        </p>

        {buttonText && (

          <button

            onClick={onClick}

            className="
              mt-8

              inline-flex
              items-center
              gap-2

              rounded-2xl

              bg-gradient-to-r
              from-[#4f46e5]
              to-[#7c3aed]

              px-6
              py-4

              text-white
              font-semibold

              shadow-xl

              transition-all

              hover:scale-105
            "
          >

            {buttonText}

            <ArrowRight size={18} />

          </button>

        )}

      </div>

    </motion.div>
  )
}