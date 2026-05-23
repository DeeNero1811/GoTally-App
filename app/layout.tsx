import type {
  Metadata,
  Viewport,
} from "next"

import "./globals.css"

import {
  ThemeProvider,
} from "@/components/providers/ThemeProvider"

import ReminderProvider
  from "@/components/providers/ReminderProvider"
  import NotificationProvider
  from "@/components/providers/NotificationProvider"
  

export const metadata:
  Metadata = {

  title: "GoTasklly",

  description:
    "AI-powered productivity platform",

  manifest:
    "/manifest.json",

  icons: {

    icon:
      "/icons/icon-192.png",

    apple:
      "/icons/icon-192.png",
  },
}

export const viewport:
  Viewport = {

  themeColor:
    "#4f46e5",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
    >

      <body>

      <ThemeProvider>

  <NotificationProvider />

  <ReminderProvider />

  {children}

</ThemeProvider>

      </body>

    </html>
  )
}