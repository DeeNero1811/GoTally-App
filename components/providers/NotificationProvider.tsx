"use client"

import {
  Toaster,
} from "react-hot-toast"

export default function
NotificationProvider() {

  return (

    <Toaster

      position="top-right"

      toastOptions={{

        duration: 4000,

        style: {

          background:
            "#111827",

          color:
            "#fff",

          borderRadius:
            "16px",

          padding:
            "16px",
        },

        success: {

          iconTheme: {

            primary:
              "#22c55e",

            secondary:
              "#fff",
          },
        },
      }}
    />
  )
}