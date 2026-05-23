"use client"

import {
  useState,
} from "react"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  Sparkles,
  Brain,
  Target,
  Rocket,
  ArrowRight,
} from "lucide-react"

const steps = [

  {
    icon: Sparkles,

    title:
      "Welcome to GoTaskly",

    description:
      "Your AI-powered productivity operating system built for deep focus, smart planning, and elite performance.",
  },

  {
    icon: Brain,

    title:
      "AI Productivity Intelligence",

    description:
      "Analyze productivity patterns, optimize schedules, and receive GPT-powered workflow recommendations.",
  },

  {
    icon: Target,

    title:
      "Gamified Progression",

    description:
      "Unlock achievements, gain XP, build streaks, and track your productivity growth in real-time.",
  },

  {
    icon: Rocket,

    title:
      "Start Your Journey",

    description:
      "Build momentum, improve consistency, and transform your workflow into a high-performance system.",
  },
]

type Props = {
  open: boolean
  onClose: () => void
}

export default function WelcomeModal({
  open,
  onClose,
}: Props) {

  const [step, setStep] =
    useState(0)

  const current =
    steps[step]

  const Icon =
    current.icon

  function nextStep() {

    if (
      step ===
      steps.length - 1
    ) {

      localStorage.setItem(
        "gotaskly-onboarding",
        "completed"
      )

      onClose()

      return
    }

    setStep(
      (
        prev
      ) =>
        prev + 1
    )
  }

  return (

    <AnimatePresence>

      {
        open && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            className="
              fixed
              inset-0

              z-[99999]

              bg-black/50

              backdrop-blur-xl

              flex
              items-center
              justify-center

              p-6
            "
          >

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.92,
              }}

              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}

              className="
                relative
                overflow-hidden

                w-full
                max-w-2xl

                rounded-[42px]

                bg-white/90
                dark:bg-[#0f172a]/90

                backdrop-blur-3xl

                border
                border-white/20

                shadow-[0_25px_80px_rgba(0,0,0,0.35)]

                p-10
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

                {/* STEP */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    mb-10
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3

                      text-sm
                      text-gray-500
                    "
                  >

                    <div
                      className="
                        px-4
                        py-2

                        rounded-full

                        bg-indigo-100
                        dark:bg-indigo-500/10

                        text-indigo-600

                        font-semibold
                      "
                    >

                      Step {step + 1}

                    </div>

                    <span>

                      of {steps.length}

                    </span>

                  </div>

                  <div
                    className="
                      flex
                      gap-2
                    "
                  >

                    {
                      steps.map(
                        (
                          _,
                          index
                        ) => (

                          <div
                            key={index}
                            className={`
                              h-2
                              rounded-full

                              transition-all
                              duration-300

                              ${
                                index <= step
                                  ? `
                                    w-10
                                    bg-indigo-500
                                  `
                                  : `
                                    w-2
                                    bg-gray-300
                                    dark:bg-gray-700
                                  `
                              }
                            `}
                          />

                        )
                      )
                    }

                  </div>

                </div>

                {/* ICON */}

                <motion.div

                  key={step}

                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}

                  className="
                    w-28
                    h-28

                    rounded-[36px]

                    bg-gradient-to-br
                    from-indigo-600
                    via-violet-600
                    to-purple-600

                    text-white

                    flex
                    items-center
                    justify-center

                    shadow-2xl

                    mb-10
                  "
                >

                  <Icon size={52} />

                </motion.div>

                {/* CONTENT */}

                <motion.div

                  key={`content-${step}`}

                  initial={{
                    opacity: 0,
                    y: 10,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                >

                  <h1
                    className="
                      text-6xl
                      font-black
                      tracking-tight

                      leading-none

                      mb-8
                    "
                  >

                    {current.title}

                  </h1>

                  <p
                    className="
                      text-xl
                      leading-relaxed

                      text-gray-500

                      max-w-xl
                    "
                  >

                    {current.description}

                  </p>

                </motion.div>

                {/* ACTIONS */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    mt-16
                  "
                >

                  <button

                    onClick={onClose}

                    className="
                      text-gray-500
                      hover:text-black
                      dark:hover:text-white

                      transition-all
                    "
                  >

                    Skip

                  </button>

                  <motion.button

                    whileHover={{
                      scale: 1.03,
                      y: -2,
                    }}

                    whileTap={{
                      scale: 0.96,
                    }}

                    onClick={nextStep}

                    className="
                      inline-flex
                      items-center
                      gap-3

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

                    {
                      step ===
                      steps.length - 1
                        ? "Launch GoTaskly"
                        : "Continue"
                    }

                    <ArrowRight size={18} />

                  </motion.button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )
      }

    </AnimatePresence>
  )
}