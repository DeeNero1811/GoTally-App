import Sidebar from "../../components/layout/Sidebar"
import Navbar from "../../components/layout/Navbar"

const habits = [
  {
    name: "Morning Routine",
    streak: 12,
  },
  {
    name: "Deep Work Session",
    streak: 8,
  },
  {
    name: "Workout",
    streak: 5,
  },
]

export default function HabitsPage() {
  return (
    <main className="flex min-h-screen bg-[var(--background)]">

      <Sidebar />

      <div className="flex-1 p-8 lg:p-12 space-y-8">

        <Navbar />

        <div>
          <h1 className="text-4xl font-bold">Habits</h1>

          <p className="text-[var(--muted)] mt-2">
            Track your consistency and routines
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-3">

          {habits.map((habit) => (
            <div
              key={habit.name}
              className="rounded-2xl border bg-[var(--card)] p-6"
            >
              <h3 className="text-lg font-semibold">
                {habit.name}
              </h3>

              <p className="mt-3 text-3xl font-bold text-indigo-500">
                {habit.streak} days
              </p>
            </div>
          ))}

        </section>

      </div>
    </main>
  )
}