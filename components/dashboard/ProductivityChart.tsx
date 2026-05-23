"use client"

import {
  motion,
} from "framer-motion"

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts"

const productivityData = [

  {
    day: "Mon",
    productivity: 45,
  },

  {
    day: "Tue",
    productivity: 52,
  },

  {
    day: "Wed",
    productivity: 61,
  },

  {
    day: "Thu",
    productivity: 58,
  },

  {
    day: "Fri",
    productivity: 75,
  },

  {
    day: "Sat",
    productivity: 84,
  },

  {
    day: "Sun",
    productivity: 86,
  },
]

const focusData = [

  {
    day: "Mon",
    hours: 2,
  },

  {
    day: "Tue",
    hours: 3,
  },

  {
    day: "Wed",
    hours: 4,
  },

  {
    day: "Thu",
    hours: 3,
  },

  {
    day: "Fri",
    hours: 6,
  },

  {
    day: "Sat",
    hours: 7,
  },

  {
    day: "Sun",
    hours: 8,
  },
]

export default function ProductivityChart() {

  return (

    <div className="space-y-6">

      {/* WEEKLY PRODUCTIVITY */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="
          rounded-[36px]
          border

          bg-white
          dark:bg-[#111827]

          p-8
        "
      >

        <div
          className="
            flex
            items-center
            justify-between

            mb-8
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >

              Weekly Productivity

            </h2>

            <p
              className="
                text-gray-500
                mt-2
              "
            >

              AI productivity performance analysis

            </p>

          </div>

        </div>

        <div className="h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={
                productivityData
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.08}
              />

              <XAxis
                dataKey="day"
              />

              <Tooltip />

              <Bar
                dataKey="productivity"
                radius={[
                  14,
                  14,
                  0,
                  0,
                ]}
                fill="#6366f1"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </motion.div>

      {/* FOCUS EFFICIENCY */}

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          delay: 0.1,
        }}

        className="
          rounded-[36px]
          border

          bg-white
          dark:bg-[#111827]

          p-8
        "
      >

        <div
          className="
            mb-8
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              tracking-tight
            "
          >

            Focus Efficiency

          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Deep work performance tracking

          </p>

        </div>

        <div className="h-[340px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={focusData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.08}
              />

              <XAxis
                dataKey="day"
              />

              <Tooltip />

              <Bar
                dataKey="hours"
                radius={[
                  14,
                  14,
                  0,
                  0,
                ]}
                fill="#8b5cf6"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </motion.div>

    </div>
  )
}