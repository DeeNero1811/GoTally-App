"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type Theme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeProviderContext =
  createContext<ThemeProviderState | undefined>(
    undefined
  )

export function ThemeProvider({
  children,
}: ThemeProviderProps) {

  const [theme, setTheme] =
    useState<Theme>("light")

  useEffect(() => {

    const storedTheme =
      localStorage.getItem("theme") as Theme | null

    if (storedTheme) {

      setTheme(storedTheme)

      document.documentElement.classList.toggle(
        "dark",
        storedTheme === "dark"
      )
    }

  }, [])

  const toggleTheme = () => {

    const newTheme =
      theme === "light"
        ? "dark"
        : "light"

    setTheme(newTheme)

    localStorage.setItem(
      "theme",
      newTheme
    )

    document.documentElement.classList.toggle(
      "dark",
      newTheme === "dark"
    )
  }

  return (

    <ThemeProviderContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >

      {children}

    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {

  const context =
    useContext(ThemeProviderContext)

  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    )
  }

  return context
}