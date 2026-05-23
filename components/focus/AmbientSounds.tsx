"use client"

import {
  useRef,
  useState,
} from "react"

import {
  CloudRain,
  Trees,
  Waves,
  Bird,
  Pause,
  Play,
} from "lucide-react"

const sounds = [

  {
    title: "Relaxing Rain",
    icon: CloudRain,
    file:
      "/sounds/universfield-relaxing-rain-387677.mp3",
  },

  {
    title: "Spring Forest",
    icon: Trees,
    file:
      "/sounds/soundreality-ambient-spring-forest-323801.mp3",
  },

  {
    title: "River Birds",
    icon: Bird,
    file:
      "/sounds/baranova_n-river-birds-spring-320702.mp3",
  },

  {
    title: "Nature Stream",
    icon: Waves,
    file:
      "/sounds/shrek_30-spring-339281.mp3",
  },
]

export default function AmbientSounds() {

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null
    )

  const [current,
    setCurrent] =
      useState<string | null>(
        null
      )

  const [playing,
    setPlaying] =
      useState(false)

  function toggleSound(
    file: string
  ) {

    /* SAME SOUND */

    if (
      current === file &&
      audioRef.current
    ) {

      if (playing) {

        audioRef.current.pause()

        setPlaying(false)

      } else {

        audioRef.current.play()

        setPlaying(true)
      }

      return
    }

    /* NEW SOUND */

    if (audioRef.current) {

      audioRef.current.pause()
    }

    const audio =
      new Audio(file)

    audio.loop = true

    audio.volume = 0.4

    audio.play()

    audioRef.current = audio

    setCurrent(file)

    setPlaying(true)
  }

  return (

    <div
      className="
        rounded-[32px]

        border

        bg-[#f8fafc]
        dark:bg-[#1e293b]

        p-6
      "
    >

      <h2
        className="
          text-2xl
          font-bold

          mb-6
        "
      >

        Ambient Focus Sounds

      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2

          gap-4
        "
      >

        {sounds.map(
          (sound) => {

            const Icon =
              sound.icon

            const active =
              current ===
                sound.file &&
              playing

            return (

              <button

                key={sound.title}

                onClick={() =>
                  toggleSound(
                    sound.file
                  )
                }

                className={`
                  rounded-3xl

                  border

                  p-5

                  flex
                  items-center
                  justify-between

                  transition-all

                  ${
                    active
                      ? `
                        bg-indigo-500
                        text-white
                        border-indigo-500
                      `
                      : `
                        bg-white
                        dark:bg-[#111827]
                      `
                  }
                `}
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <Icon size={28} />

                  <span
                    className="
                      font-semibold
                    "
                  >

                    {sound.title}

                  </span>

                </div>

                {active ? (

                  <Pause size={22} />

                ) : (

                  <Play size={22} />

                )}

              </button>
            )
          }
        )}

      </div>

    </div>
  )
}