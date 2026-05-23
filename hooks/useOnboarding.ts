"use client"

import {
  useEffect,
  useState,
} from "react"

export default function useOnboarding() {

  const [open, setOpen] =
    useState(false)

  useEffect(() => {

    const completed =
      localStorage.getItem(
        "gotaskly-onboarding"
      )

    if (!completed) {

      setOpen(true)
    }

  }, [])

  function close() {

    localStorage.setItem(
      "gotaskly-onboarding",
      "completed"
    )

    setOpen(false)
  }

  return {
    open,
    close,
  }
}