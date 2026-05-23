"use client"

import {
  Moon,
  Sun,
} from "lucide-react"

import { useTheme } from "./providers/ThemeProvider"

export default function ThemeToggle() {

  const {
    theme,
    toggleTheme,
  } = useTheme()

  return (

    <button
      onClick={toggleTheme}
      className="
        w-11 h-11
        rounded-2xl
        bg-white
        dark:bg-[#111827]
        border border-gray-200
        dark:border-gray-800
        flex items-center justify-center
        transition-all
        hover:scale-105
        shadow-sm
      "
    >

      {theme === "light" ? (

        <Moon
          size={20}
          className="
            text-[#0f172a]
          "
        />

      ) : (

        <Sun
          size={20}
          className="
            text-yellow-400
          "
        />

      )}

    </button>
  )
}