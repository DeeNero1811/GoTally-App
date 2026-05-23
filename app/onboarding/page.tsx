"use client"

import {
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

import {
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Timer,
} from "lucide-react"

import {
  useRouter,
} from "next/navigation"

import {
  supabase,
} from "@/lib/supabase/client"

export default function OnboardingPage() {

  const router =
    useRouter()

  const [
    step,
    setStep,
  ] = useState(1)

  const [
    username,
    setUsername,
  ] = useState("")

  const [
    dailyGoal,
    setDailyGoal,
  ] = useState(5)

  const [
    focusDuration,
    setFocusDuration,
  ] = useState(25)

  const [
    aiInsights,
    setAiInsights,
  ] = useState(true)

  const [
    loading,
    setLoading,
  ] = useState(false)

  async function finishSetup() {

    setLoading(true)

    const {
      data: {
        user,
      },
    } = await supabase
      .auth
      .getUser()

    if (!user)
      return

    await supabase
      .from("profiles")
      .upsert({

        id:
          user.id,

        username,

        daily_goal:
          dailyGoal,

        focus_duration:
          focusDuration,

        ai_insights:
          aiInsights,
      })

    setLoading(false)

    router.push(
      "/dashboard"
    )
  }

  return (

    <div
      className="
        min-h-screen

        flex
        items-center
        justify-center

        p-6

        bg-gradient-to-br
        from-[#eef2ff]
        via-white
        to-[#f5f3ff]

        dark:from-[#020617]
        dark:via-[#0f172a]
        dark:to-[#111827]
      "
    >

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
          w-full
          max-w-2xl

          rounded-[40px]

          border

          bg-white
          dark:bg-[#111827]

          p-10
          space-y-10
        "
      >

        {/* STEP INDICATOR */}

        <div
          className="
            flex
            gap-3
          "
        >

          {[1,2,3,4].map(
            (
              item
            ) => (

              <div

                key={item}

                className={`
                  h-3
                  flex-1
                  rounded-full

                  ${
                    step >= item
                      ? "bg-indigo-500"
                      : "bg-gray-200 dark:bg-[#1e293b]"
                  }
                `}
              />

            )
          )}

        </div>

        {/* STEP 1 */}

        {step === 1 && (

          <div className="space-y-8">

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <Sparkles
                size={40}
                className="
                  text-indigo-500
                "
              />

              <div>

                <h1
                  className="
                    text-5xl
                    font-black
                  "
                >

                  Welcome to GoTasklly

                </h1>

                <p
                  className="
                    text-gray-500
                    mt-2
                  "
                >

                  Your intelligent productivity workspace.

                </p>

              </div>

            </div>

            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Choose a username"
              className="
                w-full
                rounded-2xl
                border
                p-5
                bg-transparent
              "
            />

          </div>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <div className="space-y-8">

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <Target
                size={40}
                className="
                  text-indigo-500
                "
              />

              <div>

                <h1
                  className="
                    text-4xl
                    font-black
                  "
                >

                  Daily Goal

                </h1>

                <p
                  className="
                    text-gray-500
                    mt-2
                  "
                >

                  How many tasks do you want to complete daily?

                </p>

              </div>

            </div>

            <input
              type="number"
              value={dailyGoal}
              onChange={(e) =>
                setDailyGoal(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                w-full
                rounded-2xl
                border
                p-5
                bg-transparent
              "
            />

          </div>

        )}

        {/* STEP 3 */}

        {step === 3 && (

          <div className="space-y-8">

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <Timer
                size={40}
                className="
                  text-indigo-500
                "
              />

              <div>

                <h1
                  className="
                    text-4xl
                    font-black
                  "
                >

                  Focus Duration

                </h1>

                <p
                  className="
                    text-gray-500
                    mt-2
                  "
                >

                  Preferred focus session duration.

                </p>

              </div>

            </div>

            <input
              type="number"
              value={focusDuration}
              onChange={(e) =>
                setFocusDuration(
                  Number(
                    e.target.value
                  )
                )
              }
              className="
                w-full
                rounded-2xl
                border
                p-5
                bg-transparent
              "
            />

          </div>

        )}

        {/* STEP 4 */}

        {step === 4 && (

          <div className="space-y-8">

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <Brain
                size={40}
                className="
                  text-indigo-500
                "
              />

              <div>

                <h1
                  className="
                    text-4xl
                    font-black
                  "
                >

                  AI Insights

                </h1>

                <p
                  className="
                    text-gray-500
                    mt-2
                  "
                >

                  Enable intelligent productivity recommendations.

                </p>

              </div>

            </div>

            <button

              onClick={() =>
                setAiInsights(
                  !aiInsights
                )
              }

              className={`
                w-full

                rounded-2xl

                p-5

                font-bold

                ${
                  aiInsights
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 dark:bg-[#1e293b]"
                }
              `}
            >

              {
                aiInsights
                  ? "AI Insights Enabled"
                  : "AI Insights Disabled"
              }

            </button>

          </div>

        )}

        {/* ACTIONS */}

        <div
          className="
            flex
            justify-end
          "
        >

          {step < 4 ? (

            <button

              onClick={() =>
                setStep(
                  step + 1
                )
              }

              className="
                rounded-2xl

                bg-gradient-to-r
                from-[#4f46e5]
                to-[#7c3aed]

                px-8
                py-4

                text-white
                font-bold

                flex
                items-center
                gap-3
              "
            >

              Continue

              <ArrowRight size={20} />

            </button>

          ) : (

            <button

              onClick={
                finishSetup
              }

              disabled={loading}

              className="
                rounded-2xl

                bg-gradient-to-r
                from-[#4f46e5]
                to-[#7c3aed]

                px-8
                py-4

                text-white
                font-bold
              "
            >

              {
                loading
                  ? "Setting up..."
                  : "Launch Workspace"
              }

            </button>

          )}

        </div>

      </motion.div>

    </div>
  )
}