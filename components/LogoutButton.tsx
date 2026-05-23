"use client"

import { LogOut } from "lucide-react"

import { useRouter } from "next/navigation"

import { supabase } from "../lib/supabase"

export default function LogoutButton() {

  const router = useRouter()

  async function handleLogout() {

    await supabase.auth.signOut()

    router.push("/login")

    router.refresh()
  }

  return (

    <button
      onClick={handleLogout}
      className="
        flex items-center gap-3
        w-full
        bg-red-500
        hover:bg-red-600
        text-white
        px-4 py-3
        rounded-2xl
        font-semibold
        transition
      "
    >

      <LogOut size={18} />

      Logout

    </button>
  )
}