import { productivityData } from "./productivityData"

export function getDashboardStats() {
  const totalFocus = productivityData.reduce(
    (sum, item) => sum + item.value,
    0
  )

  const highest = productivityData.reduce((prev, current) =>
    prev.value > current.value ? prev : current
  )

  return {
    tasksCompleted: 24,
    streak: "12 Days",
    focusHours: `${totalFocus}h`,
    topCategory: highest.name,
  }
}