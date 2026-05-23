"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { createClient } from "../../../lib/supabase-client"
export default function UpdatePasswordPage() {

  const supabase = createClient()

  const router = useRouter()

  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleUpdatePassword() {

    setLoading(true)

    const { error } =
      await supabase.auth.updateUser({
        password,
      })

    if (error) {
      setMessage(error.message)
      setLoading(false)
      return
    }

    setMessage(
      "Password updated successfully"
    )

    setLoading(false)

    setTimeout(() => {
      router.push("/login")
    }, 2000)
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
          ">
            Create New Password
          </h1>

          <p className="
            text-sm
            text-[var(--muted)]
            mt-2
          ">
            Enter a new secure password
          </p>

        </div>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
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
          onClick={handleUpdatePassword}
          disabled={loading}
          className="
            button-primary
            w-full
            rounded-2xl
            py-3
          "
        >
          {loading
            ? "Updating..."
            : "Update Password"}
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