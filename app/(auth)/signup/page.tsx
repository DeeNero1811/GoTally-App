"use client"

import {
  useState,
} from "react"

import Link from "next/link"

import {
  useRouter,
} from "next/navigation"

import {
  motion,
} from "framer-motion"

import {
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase"

export default function SignupPage() {

  const router =
    useRouter()

  const [name, setName] =
    useState("")

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleSignup =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault()

      setLoading(true)

      setError("")

      try {

        const {
          data,
          error,
        } =
          await supabase.auth.signUp({
            email,
            password,

            options: {
              data: {
                full_name:
                  name,
              },
            },
          })

        if (error) {

          setError(
            error.message
          )

          return
        }

        /* SAVE PROFILE */

        localStorage.setItem(
          "dashboard_profile",
          JSON.stringify({
            name,
            role:
              "Pro User",
            email,
          })
        )

        /* UPDATE PROFILE */

        window.dispatchEvent(
          new Event(
            "dashboard_profile_updated"
          )
        )

        /* REDIRECT TO LOGIN */

        router.push(
          "/login"
        )

      } catch (err) {

        setError(
          "Something went wrong"
        )

      } finally {

        setLoading(false)
      }
    }

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
        w-full
        max-w-xl
        rounded-[40px]
        bg-white/70
        dark:bg-[#111827]/70
        backdrop-blur-2xl
        border
        border-white/20
        p-10
        shadow-2xl
      "
    >

      {/* HEADER */}

      <div className="text-center mb-10">

        <h1 className="text-5xl font-black mb-4">

          Create Account

        </h1>

        <p className="text-gray-500 text-lg">

          Start your AI productivity journey

        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={
          handleSignup
        }
        className="space-y-6"
      >

        {/* FULL NAME */}

        <div>

          <label className="text-sm font-medium mb-3 block">

            Full Name

          </label>

          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#f8fafc] dark:bg-[#0f172a] border">

            <User size={20} />

            <input
              type="text"
              required
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="John Doe"
              className="bg-transparent outline-none w-full"
            />

          </div>

        </div>

        {/* EMAIL */}

        <div>

          <label className="text-sm font-medium mb-3 block">

            Email

          </label>

          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#f8fafc] dark:bg-[#0f172a] border">

            <Mail size={20} />

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="you@example.com"
              className="bg-transparent outline-none w-full"
            />

          </div>

        </div>

        {/* PASSWORD */}

        <div>

          <label className="text-sm font-medium mb-3 block">

            Password

          </label>

          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#f8fafc] dark:bg-[#0f172a] border">

            <Lock size={20} />

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              className="bg-transparent outline-none w-full"
            />

          </div>

        </div>

        {/* ERROR */}

        {
          error && (

            <div className="text-red-500 text-sm">

              {error}

            </div>

          )
        }

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            flex items-center justify-center gap-3
            py-4
            rounded-2xl
            bg-indigo-600
            hover:bg-indigo-700
            disabled:opacity-70
            text-white
            text-lg
            font-semibold
            transition-all
          "
        >

          {
            loading
              ? "Creating account..."
              : "Create Account"
          }

          <ArrowRight size={20} />

        </button>

      </form>

      {/* LOGIN */}

      <div className="mt-8 text-center text-gray-500">

        Already have an account?

        <Link
          href="/login"
          className="text-indigo-600 font-semibold ml-2"
        >

          Login

        </Link>

      </div>

    </motion.div>
  )
}