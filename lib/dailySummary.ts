type SummaryInput = {

  completedTasks: number

  pendingTasks: number

  focusSessions: number

  productivity: number
}

export function generateDailySummary({

  completedTasks,

  pendingTasks,

  focusSessions,

  productivity,
}: SummaryInput) {

  if (
    completedTasks === 0
  ) {

    return `
      You have not completed any tasks today yet.
      Start small and build momentum.
    `
  }

  if (
    productivity >= 80
  ) {

    return `
      Incredible performance today.
      You completed ${completedTasks} tasks
      and maintained strong productivity consistency.
    `
  }

  if (
    pendingTasks > completedTasks
  ) {

    return `
      You completed ${completedTasks} tasks,
      but ${pendingTasks} are still pending.
      Consider prioritizing high-impact work tomorrow.
    `
  }

  return `
    Great progress today.
    You completed ${completedTasks} tasks
    and finished ${focusSessions} focus sessions.
  `
}