"use client"

import {
  motion,
} from "framer-motion"

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
}: Props) {

  return (

    <motion.button

      whileHover={{
        scale: 1.03,
        y: -2,
      }}

      whileTap={{
        scale: 0.98,
      }}

      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}

      onClick={onClick}

      className={`
        relative
        overflow-hidden

        rounded-2xl

        font-semibold

        transition-all
        duration-300

        shadow-lg

        before:absolute
        before:inset-0

        before:bg-white/10
        before:opacity-0

        hover:before:opacity-100

        before:transition-opacity
        before:duration-300

        hover:shadow-2xl

        ${className}
      `}
    >

      <span
        className="
          relative
          z-10
        "
      >

        {children}

      </span>

    </motion.button>
  )
}