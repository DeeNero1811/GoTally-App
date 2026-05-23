"use client"

import {
  useEffect,
  useState,
} from "react"

export default function PWAInstallButton() {

  const [deferredPrompt,
    setDeferredPrompt] =
      useState<any>(null)

  const [visible,
    setVisible] =
      useState(false)

  useEffect(() => {

    const handler = (
      e: any
    ) => {

      e.preventDefault()

      setDeferredPrompt(e)

      setVisible(true)
    }

    window.addEventListener(
      "beforeinstallprompt",
      handler
    )

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      )
    }

  }, [])

  const install =
    async () => {

      if (!deferredPrompt)
        return

      deferredPrompt.prompt()

      await deferredPrompt.userChoice

      setDeferredPrompt(null)

      setVisible(false)
    }

  if (!visible)
    return null

  return (

    <button

      onClick={install}

      className="
        fixed
        bottom-6
        right-6
        z-50

        rounded-2xl

        bg-gradient-to-r
        from-[#4f46e5]
        to-[#7c3aed]

        px-6
        py-4

        text-white
        font-semibold

        shadow-2xl
      "
    >

      Install GoTaskly

    </button>
  )
}