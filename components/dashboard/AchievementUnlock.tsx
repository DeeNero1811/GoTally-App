"use client"

import {
  useEffect,
  useState,
} from "react"

import Confetti from "react-confetti"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  Trophy,
  Sparkles,
} from "lucide-react"

type Props = {
  title: string
  description: string
  open: boolean
  onClose: () => void
}

export default function AchievementUnlock({
  title,
  description,
  open,
  onClose,
}: Props) {

  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])

  useEffect(() => {

    if (open) {

      const timer =
        setTimeout(() => {

          onClose()

        }, 5000)

      return () =>
        clearTimeout(timer)
    }

  }, [
    open,
    onClose,
  ])

  if (!mounted)
    return null

  return (

    <AnimatePresence>

      {
        open && (

          <>

            <Confetti
              recycle={false}
              numberOfPieces={300}
            />

            <motion.div

              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.9,
              }}

              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}

              className="
                fixed
                bottom-8
                right-8

                z-[9999]

                w-[420px]

                rounded-[36px]

                border
                border-yellow-200

                bg-white/90
                dark:bg-[#111827]/90

                backdrop-blur-3xl

                p-8

                shadow-2xl
              "
            >

              {/* GLOW */}

              <div
                className="
                  absolute
                  inset-0

                  rounded-[36px]

                  bg-gradient-to-br
                  from-yellow-400/10
                  via-orange-500/10
                  to-yellow-500/10

                  blur-2xl
                "
              />

              <div className="relative z-10">

                {/* ICON */}

                <div
                  className="
                    w-24
                    h-24

                    rounded-[32px]

                    bg-gradient-to-br
                    from-yellow-400
                    to-orange-500

                    flex
                    items-center
                    justify-center

                    text-white

                    shadow-2xl

                    mb-8
                  "
                >

                  <Trophy size={42} />

                </div>

                {/* BADGE */}

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2

                    px-4
                    py-2

                    rounded-full

                    bg-yellow-100
                    dark:bg-yellow-500/10

                    text-yellow-600

                    mb-6
                  "
                >

                  <Sparkles size={16} />

                  Achievement Unlocked

                </div>

                {/* TITLE */}

                <h2
                  className="
                    text-4xl
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
                    leading-relaxed
                    text-lg
                  "
                >

                  {description}

                </p>

              </div>

            </motion.div>

          </>

        )
      }

    </AnimatePresence>
  )
}