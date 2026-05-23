"use client"

export default function DashboardSkeleton() {

  return (

    <div className="space-y-8 animate-pulse">

      {/* HERO */}

      <div
        className="
          h-[340px]

          rounded-[40px]

          bg-gray-200
          dark:bg-[#1e293b]
        "
      />

      {/* METRICS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4

          gap-5
        "
      >

        {
          Array.from({
            length: 4,
          }).map(
            (
              _,
              index
            ) => (

              <div

                key={index}

                className="
                  h-[180px]

                  rounded-[32px]

                  bg-gray-200
                  dark:bg-[#1e293b]
                "
              />

            )
          )
        }

      </div>

      {/* AI SECTION */}

      <div
        className="
          h-[260px]

          rounded-[40px]

          bg-gray-200
          dark:bg-[#1e293b]
        "
      />

      {/* GRID */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2

          gap-6
        "
      >

        {
          Array.from({
            length: 2,
          }).map(
            (
              _,
              index
            ) => (

              <div

                key={index}

                className="
                  h-[220px]

                  rounded-[32px]

                  bg-gray-200
                  dark:bg-[#1e293b]
                "
              />

            )
          )
        }

      </div>

    </div>
  )
}