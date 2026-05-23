"use client"

import { useEffect, useState } from "react"

import { Sun, Moon } from "lucide-react"

import { useTheme } from "next-themes"

export default function ThemeToggle() {

  const {
    theme,
    setTheme,
  } = useTheme()

  const [
    mounted,
    setMounted,
  ] = useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])

  if (!mounted)
    return null

  return (

    <button
      onClick={() =>
        setTheme(
          theme === "dark"
            ? "light"
            : "dark"
        )
      }
      className="
        w-12 h-12
        rounded-2xl
        bg-white
        dark:bg-[#111827]
        border
        flex items-center
        justify-center
        transition-all
        hover:scale-105
      "
    >

      {
        theme === "dark"
          ? <Sun size={20} />
          : <Moon size={20} />
      }

    </button>
  )
}