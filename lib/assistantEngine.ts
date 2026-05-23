type AssistantInput = {

  completedTasks: number

  pendingTasks: number

  overdueTasks: number

  productivity: number
}

export function
generateAssistantResponse(
  question: string,
  data: AssistantInput
) {

  const q =
    question.toLowerCase()

  /* FOCUS */

  if (
    q.includes("focus") ||

    q.includes("priority")
  ) {

    if (
      data.overdueTasks > 0
    ) {

      return `
        You currently have overdue tasks.
        Prioritize overdue and high-impact work first.
      `
    }

    return `
      Focus on completing pending tasks
      with the highest urgency and impact.
    `
  }

  /* PRODUCTIVITY */

  if (
    q.includes("productive") ||

    q.includes("performance")
  ) {

    return `
      Your current productivity score is
      ${data.productivity}%.
      You completed ${data.completedTasks} tasks.
    `
  }

  /* OVERDUE */

  if (
    q.includes("urgent") ||

    q.includes("overdue")
  ) {

    return `
      You currently have
      ${data.overdueTasks}
      overdue tasks requiring attention.
    `
  }

  return `
    You have ${data.pendingTasks}
    pending tasks and
    ${data.completedTasks}
    completed tasks.
    Continue building momentum.
  `
}