"use client"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import {
  Trophy,
} from "lucide-react"

type Props = {
  open: boolean
  title: string
  description: string
}

export default function AchievementPopup({
  open,
  title,
  description,
}: Props) {

  return (

    <AnimatePresence>

      {
        open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 50,
              scale: 0.9,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              fixed
              bottom-6
              right-6
              z-[9999]
            "
          >

            <div
              className="
                w-[360px]
                rounded-[32px]
                bg-white/90
                dark:bg-[#111827]/95
                backdrop-blur-2xl
                border
                border-white/20
                shadow-2xl
                overflow-hidden
              "
            >

              {/* TOP */}

              <div
                className="
                  bg-gradient-to-r
                  from-yellow-500
                  via-amber-500
                  to-orange-500
                  p-5
                  text-white
                "
              >

                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-14 h-14
                      rounded-2xl
                      bg-white/20
                      flex items-center justify-center
                    "
                  >

                    <Trophy size={28} />

                  </div>

                  <div>

                    <p className="text-sm font-medium opacity-90">

                      Achievement Unlocked

                    </p>

                    <h2 className="text-2xl font-black mt-1">

                      {title}

                    </h2>

                  </div>

                </div>

              </div>

              {/* BODY */}

              <div className="p-6">

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">

                  {description}

                </p>

              </div>

            </div>

          </motion.div>

        )
      }

    </AnimatePresence>
  )
}