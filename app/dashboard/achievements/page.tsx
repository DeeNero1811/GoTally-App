"use client"

export const dynamic =
  "force-dynamic"

import {
  useEffect,
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import confetti from "canvas-confetti"

import {
  Trophy,
  Lock,
  Sparkles,
  Flame,
  Brain,
  CheckCircle2,
  Crown,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase/client"

type Achievement = {
  id?: string
  title: string
  description: string
  unlocked: boolean
  xp: number
  badge: string
  unlocked_at?: string
}

const ALL_ACHIEVEMENTS: Achievement[] = [

  {
    title:
      "7 Day Streak",

    description:
      "Maintain a productivity streak for 7 days.",

    unlocked: false,

    xp: 200,

    badge: "⚡",
  },

  {
    title:
      "Task Crusher",

    description:
      "Complete 25 tasks.",

    unlocked: false,

    xp: 250,

    badge: "✅",
  },

  {
    title:
      "Deep Focus",

    description:
      "Complete 10 focus sessions.",

    unlocked: false,

    xp: 300,

    badge: "🧠",
  },

  {
    title:
      "Consistency Master",

    description:
      "Track 5 active habits.",

    unlocked: false,

    xp: 150,

    badge: "🔥",
  },

  {
    title:
      "Productivity Beast",

    description:
      "Reach a 30-day streak.",

    unlocked: false,

    xp: 500,

    badge: "👑",
  },
]

export default function AchievementsPage() {

  const [
    achievements,
    setAchievements,
  ] = useState<
    Achievement[]
  >([])

  const [loading,
    setLoading] =
      useState(true)

  useEffect(() => {

    loadAchievements()

  }, [])

  async function loadAchievements() {

    try {

      setLoading(true)

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser()

      if (!user)
        return

      const {
        data,
      } = await supabase
        .from("achievements")
        .select("*")
        .eq(
          "user_id",
          user.id
        )

      const unlockedMap =
        new Map(
          data?.map(
            (achievement) => [
              achievement.title,
              achievement,
            ]
          )
        )

      const merged =
        ALL_ACHIEVEMENTS.map(
          (
            achievement
          ) => {

            const unlocked =
              unlockedMap.get(
                achievement.title
              )

            return unlocked
              ? {
                  ...achievement,
                  ...unlocked,
                  unlocked:
                    true,
                }
              : achievement
          }
        )

      setAchievements(
        merged
      )

      /* CELEBRATION */

      if (
        data &&
        data.length > 0
      ) {

        confetti({

          particleCount: 120,

          spread: 70,

          origin: {
            y: 0.6,
          },
        })
      }

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  function getIcon(
    title: string
  ) {

    if (
      title.includes(
        "Streak"
      )
    ) {

      return Flame
    }

    if (
      title.includes(
        "Focus"
      )
    ) {

      return Brain
    }

    if (
      title.includes(
        "Task"
      )
    ) {

      return CheckCircle2
    }

    if (
      title.includes(
        "Beast"
      )
    ) {

      return Crown
    }

    return Sparkles
  }

  const totalXP =
    achievements
      .filter(
        (
          achievement
        ) =>
          achievement.unlocked
      )
      .reduce(
        (
          total,
          achievement
        ) =>
          total +
          achievement.xp,
        0
      )

  const unlockedCount =
    achievements.filter(
      (
        achievement
      ) =>
        achievement.unlocked
    ).length

  if (loading) {

    return (

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {[1,2,3,4].map(
          (item) => (

            <div

              key={item}

              className="
                h-52

                rounded-[32px]

                bg-gray-200
                dark:bg-[#1e293b]

                animate-pulse
              "
            />

          )
        )}

      </div>

    )
  }

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div
        className="
          rounded-[40px]

          border

          bg-gradient-to-br
          from-[#4f46e5]
          to-[#7c3aed]

          text-white

          p-8
          md:p-10
        "
      >

        <div
          className="
            flex
            flex-col
            md:flex-row

            justify-between

            gap-8
          "
        >

          <div>

            <div
              className="
                flex
                items-center
                gap-4

                mb-5
              "
            >

              <div
                className="
                  w-16
                  h-16

                  rounded-3xl

                  bg-white/20

                  flex
                  items-center
                  justify-center
                "
              >

                <Trophy size={34} />

              </div>

              <div>

                <h1
                  className="
                    text-4xl
                    md:text-5xl
                    font-black
                  "
                >

                  Achievements

                </h1>

                <p
                  className="
                    text-white/80
                    mt-2
                  "
                >

                  Gamified productivity progression powered by AI intelligence

                </p>

              </div>

            </div>

          </div>

          <div
            className="
              flex
              gap-4
              flex-wrap
            "
          >

            <div
              className="
                rounded-3xl

                bg-white/10

                px-6
                py-5

                min-w-[160px]
              "
            >

              <p
                className="
                  text-white/70
                  text-sm
                "
              >

                Total XP

              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  mt-2
                "
              >

                {totalXP}

              </h2>

            </div>

            <div
              className="
                rounded-3xl

                bg-white/10

                px-6
                py-5

                min-w-[160px]
              "
            >

              <p
                className="
                  text-white/70
                  text-sm
                "
              >

                Unlocked

              </p>

              <h2
                className="
                  text-4xl
                  font-black
                  mt-2
                "
              >

                {unlockedCount}
                /
                {
                  achievements.length
                }

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3

          gap-6
        "
      >

        {achievements.map(
          (
            achievement,
            index
          ) => {

            const Icon =
              getIcon(
                achievement.title
              )

            return (

              <motion.div

                key={
                  achievement.title
                }

                initial={{
                  opacity: 0,
                  y: 20,
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
                  y: -6,
                }}

                className={`
                  rounded-[32px]

                  border

                  p-6

                  transition-all

                  ${
                    achievement.unlocked
                      ? `
                        bg-gradient-to-br
                        from-[#4f46e5]
                        to-[#7c3aed]

                        text-white

                        border-transparent

                        shadow-2xl
                      `
                      : `
                        bg-white
                        dark:bg-[#111827]
                      `
                  }
                `}
              >

                <div
                  className="
                    flex
                    items-start
                    justify-between

                    mb-8
                  "
                >

                  <div
                    className={`
                      w-16
                      h-16

                      rounded-3xl

                      flex
                      items-center
                      justify-center

                      ${
                        achievement.unlocked
                          ? `
                            bg-white/20
                          `
                          : `
                            bg-gray-100
                            dark:bg-[#1e293b]
                          `
                      }
                    `}
                  >

                    {achievement.unlocked ? (

                      <span className="text-3xl">

                        {
                          achievement.badge
                        }

                      </span>

                    ) : (

                      <Lock
                        className="
                          text-gray-400
                        "
                        size={28}
                      />

                    )}

                  </div>

                  <div
                    className={`
                      rounded-full

                      px-4
                      py-2

                      text-sm
                      font-bold

                      ${
                        achievement.unlocked
                          ? `
                            bg-white/20
                          `
                          : `
                            bg-indigo-100
                            dark:bg-indigo-500/20

                            text-indigo-600
                            dark:text-indigo-300
                          `
                      }
                    `}
                  >

                    +{achievement.xp} XP

                  </div>

                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-3

                    mb-4
                  "
                >

                  <Icon size={26} />

                  <h2
                    className="
                      text-2xl
                      font-black
                    "
                  >

                    {achievement.title}

                  </h2>

                </div>

                <p
                  className={`
                    leading-relaxed

                    ${
                      achievement.unlocked
                        ? `
                          text-white/80
                        `
                        : `
                          text-gray-500
                        `
                    }
                  `}
                >

                  {
                    achievement.description
                  }

                </p>

                {achievement.unlocked && (

                  <div
                    className="
                      mt-6

                      pt-5

                      border-t
                      border-white/20
                    "
                  >

                    <p
                      className="
                        text-sm
                        text-white/70
                      "
                    >

                      Unlocked on

                    </p>

                    <p
                      className="
                        font-semibold
                        mt-1
                      "
                    >

                      {
                        achievement.unlocked_at
                          ? new Date(
                              achievement.unlocked_at
                            ).toLocaleDateString()
                          : "Recently"
                      }

                    </p>

                  </div>

                )}

              </motion.div>

            )
          }
        )}

      </div>

    </div>
  )
}