"use client"

import { useState } from "react"

import { createClient } from "../../../lib/supabase-client"
export default function ResetPasswordPage() {

  const supabase = createClient()

  const [email, setEmail] = useState("")

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleReset() {

    setLoading(true)

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            "http://localhost:3000/update-password",
        }
      )

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage(
      "Password reset email sent successfully"
    )

    setLoading(false)
  }

  return (
    <main className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[var(--background)]
      p-6
    ">

      <div className="
        glass-card
        w-full
        max-w-md
        p-8
        space-y-6
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            tracking-tight
          ">
            Reset Password
          </h1>

          <p className="
            text-sm
            text-[var(--muted)]
            mt-2
          ">
            Enter your email to receive a reset link
          </p>

        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
            w-full
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--card)]
            px-4
            py-3
          "
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="
            button-primary
            w-full
            rounded-2xl
            py-3
            font-medium
          "
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        {message && (
          <p className="
            text-sm
            text-center
            opacity-70
          ">
            {message}
          </p>
        )}

      </div>

    </main>
  )
}