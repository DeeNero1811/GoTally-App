type Task = {
  completed: boolean
}

type Habit = {
  completed: boolean
  streak: number
}

type FocusSession = {
  completed: boolean
}

type PlannerEvent = any

type Params = {
  tasks: Task[]
  habits: Habit[]
  focusSessions: FocusSession[]
  plannerEvents: PlannerEvent[]
}

export function calculateProductivity({
  tasks,
  habits,
  focusSessions,
  plannerEvents,
}: Params) {

  /* TASKS */

  const completedTasks =
    tasks.filter(
      (task) =>
        task.completed
    ).length

  const pendingTasks =
    tasks.filter(
      (task) =>
        !task.completed
    ).length

  /* HABITS */

  const completedHabits =
    habits.filter(
      (habit) =>
        habit.completed
    ).length

  const bestStreak =
    habits.length > 0
      ? Math.max(
          ...habits.map(
            (habit) =>
              habit.streak
          )
        )
      : 0

  /* FOCUS */

  const completedFocusSessions =
    focusSessions.filter(
      (session) =>
        session.completed
    ).length

  /* PRODUCTIVITY */

  const totalCompleted =
    completedTasks +
    completedHabits +
    completedFocusSessions

  const totalPossible =
    tasks.length +
    habits.length +
    focusSessions.length +
    plannerEvents.length +
    1

  const productivityScore =
    Math.min(
      100,
      Math.round(
        (
          totalCompleted /
          totalPossible
        ) * 100
      )
    )

  /* XP */

  const xp =
    (
      completedTasks * 25
    ) +
    (
      completedHabits * 15
    ) +
    (
      completedFocusSessions * 20
    ) +
    (
      bestStreak * 10
    )

  /* LEVEL */

  const level =
    Math.max(
      1,
      Math.floor(
        xp / 200
      )
    )

  /* WEEKLY GROWTH */

  const weeklyGrowth =
    Math.min(
      100,
      Math.round(
        productivityScore * 0.2
      )
    )

  return {

    productivityScore,

    completedTasks,

    pendingTasks,

    completedHabits,

    completedFocusSessions,

    bestStreak,

    xp,

    level,

    weeklyGrowth,
  }
}