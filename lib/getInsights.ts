import { productivityData } from "./productivityData"

export function getInsights() {
  const sorted = [...productivityData].sort((a, b) => b.value - a.value)

  const highest = sorted[0]
  const lowest = sorted[sorted.length - 1]

  const total = productivityData.reduce((sum, d) => sum + d.value, 0)
  const avg = total / productivityData.length

  return [
    `Highest activity: ${highest.name}`,
    `Lowest activity: ${lowest.name}`,
    `Average workload: ${avg.toFixed(1)}`,
  ]
}