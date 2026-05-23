"use client"

import { motion } from "framer-motion"

type Props = {
  title: string
  value: string | number
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.3,
      }}
      className="glass-card p-6"
    >
      <p className="text-sm text-[var(--muted)]">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-semibold tracking-tight">
        {value}
      </h2>
    </motion.div>
  )
}