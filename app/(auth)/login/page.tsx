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
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react"

import {
  supabase,
} from "@/lib/supabase"

export default function LoginPage() {

  const router =
    useRouter()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleLogin =
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
          await supabase.auth.signInWithPassword({
            email,
            password,
          })

        if (error) {

          setError(
            error.message
          )

          return
        }

        const user =
          data.user

        const fullName =
          user.user_metadata
            ?.full_name || "User"

        /* SAVE PROFILE */

        localStorage.setItem(
          "dashboard_profile",
          JSON.stringify({
            name:
              fullName,
            role:
              "Pro User",
            email:
              user.email,
          })
        )

        /* UPDATE PROFILE */

        window.dispatchEvent(
          new Event(
            "dashboard_profile_updated"
          )
        )

        router.push(
          "/dashboard"
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

          Welcome Back

        </h1>

        <p className="text-gray-500 text-lg">

          Login to continue your productivity journey

        </p>

      </div>

      {/* FORM */}

      <form
        onSubmit={
          handleLogin
        }
        className="space-y-6"
      >

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
              ? "Signing in..."
              : "Login"
          }

          <ArrowRight size={20} />

        </button>

      </form>

      {/* SIGNUP */}

      <div className="mt-8 text-center text-gray-500">

        Don’t have an account?

        <Link
          href="/signup"
          className="text-indigo-600 font-semibold ml-2"
        >

          Create Account

        </Link>

      </div>

    </motion.div>
  )
}