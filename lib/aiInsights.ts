type InsightData = {

  completedTasks: number

  pendingTasks: number

  overdueTasks: number

  focusSessions: number

  plannerEvents: number

  bestStreak: number

  productivity: number
}

export function
generateAIInsights(
  data: InsightData
) {

  const insights: string[] = []

  /* PRODUCTIVITY */

  if (
    data.productivity >= 80
  ) {

    insights.push(
      "Your productivity performance is exceptional. Current systems are working efficiently."
    )

  } else if (
    data.productivity >= 50
  ) {

    insights.push(
      "Your productivity remains stable, but improving task consistency could increase efficiency."
    )

  } else {

    insights.push(
      "Your productivity score is below optimal levels. Focus sessions and task prioritization may help."
    )
  }

  /* TASK ANALYSIS */

  if (
    data.pendingTasks >
    data.completedTasks
  ) {

    insights.push(
      "Pending tasks currently exceed completed tasks. Consider reducing active workload."
    )
  }

  if (
    data.completedTasks >= 10
  ) {

    insights.push(
      "Task completion momentum is strong. Workflow consistency is improving."
    )
  }

  /* OVERDUE */

  if (
    data.overdueTasks > 0
  ) {

    insights.push(
      `${data.overdueTasks} overdue tasks are affecting productivity stability.`
    )
  }

  /* FOCUS */

  if (
    data.focusSessions >= 5
  ) {

    insights.push(
      "Focus sessions are positively impacting productivity efficiency."
    )
  }

  if (
    data.focusSessions === 0
  ) {

    insights.push(
      "No focus sessions detected. Deep work sessions could significantly improve output."
    )
  }

  /* PLANNER */

  if (
    data.plannerEvents >= 5
  ) {

    insights.push(
      "Planner usage is improving scheduling consistency and productivity structure."
    )
  }

  /* HABITS */

  if (
    data.bestStreak >= 7
  ) {

    insights.push(
      "Habit consistency is becoming a strong productivity driver."
    )
  }

  /* FALLBACK */

  if (
    insights.length === 0
  ) {

    insights.push(
      "Your productivity systems are active and stable."
    )
  }

  return insights
}