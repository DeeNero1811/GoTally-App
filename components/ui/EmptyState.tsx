"use client"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  ArrowRight,
  Brain,
} from "lucide-react"

type Props = {
  title: string
  description: string
  buttonText?: string
  onClick?: () => void
  aiTip?: string
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onClick,
  aiTip,
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

      whileHover={{
        y: -3,
      }}

      className="
        relative
        overflow-hidden

        rounded-[40px]

        border
        border-dashed
        border-indigo-200

        dark:border-indigo-500/20

        bg-white/70
        dark:bg-[#111827]/70

        backdrop-blur-2xl

        p-14

        text-center

        shadow-xl
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          top-0
          right-0

          w-72
          h-72

          rounded-full

          bg-indigo-500/10

          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* ICON */}

        <motion.div

          animate={{
            y: [0, -6, 0],
          }}

          transition={{
            repeat: Infinity,
            duration: 3,
          }}

          className="
            w-24
            h-24

            rounded-[32px]

            bg-gradient-to-br
            from-indigo-500
            to-violet-600

            flex
            items-center
            justify-center

            mx-auto

            mb-8

            text-white

            shadow-2xl
          "
        >

          <Sparkles size={40} />

        </motion.div>

        {/* TITLE */}

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

        {/* DESCRIPTION */}

        <p
          className="
            text-gray-500

            text-lg

            max-w-2xl

            mx-auto

            leading-relaxed
          "
        >

          {description}

        </p>

        {/* AI TIP */}

        {
          aiTip && (

            <div
              className="
                mt-8

                max-w-2xl
                mx-auto

                rounded-[28px]

                border
                border-indigo-200

                dark:border-indigo-500/20

                bg-indigo-50
                dark:bg-indigo-500/10

                p-6

                text-left
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >

                <div
                  className="
                    w-12
                    h-12

                    rounded-2xl

                    bg-gradient-to-br
                    from-indigo-500
                    to-violet-600

                    text-white

                    flex
                    items-center
                    justify-center

                    shrink-0
                  "
                >

                  <Brain size={22} />

                </div>

                <div>

                  <h3
                    className="
                      font-bold

                      mb-2
                    "
                  >

                    AI Recommendation

                  </h3>

                  <p
                    className="
                      text-gray-600
                      dark:text-gray-300

                      leading-relaxed
                    "
                  >

                    {aiTip}

                  </p>

                </div>

              </div>

            </div>

          )
        }

        {/* ACTION */}

        {
          buttonText && (

            <motion.button

              whileHover={{
                scale: 1.03,
                y: -2,
              }}

              whileTap={{
                scale: 0.96,
              }}

              onClick={onClick}

              className="
                inline-flex
                items-center
                gap-3

                mt-10

                px-8
                py-5

                rounded-3xl

                bg-gradient-to-r
                from-indigo-600
                to-violet-600

                text-white

                font-semibold

                shadow-2xl
              "
            >

              {buttonText}

              <ArrowRight size={18} />

            </motion.button>

          )
        }

      </div>

    </motion.div>
  )
}