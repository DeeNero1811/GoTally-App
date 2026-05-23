export type NotificationType =
  | "task"
  | "habit"
  | "focus"
  | "planner"
  | "ai"
  | "achievement"

export type NotificationItem = {
  id: number
  type: NotificationType
  title: string
  message: string
  time: string
  date: string
}

const STORAGE_KEY =
  "dashboard_notifications"

/* GET NOTIFICATIONS */

export function getNotifications():
  NotificationItem[] {

  if (
    typeof window === "undefined"
  ) {

    return []
  }

  const saved =
    localStorage.getItem(
      STORAGE_KEY
    )

  return saved
    ? JSON.parse(saved)
    : []
}

/* SAVE */

export function saveNotifications(
  notifications:
    NotificationItem[]
) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(
      notifications
    )
  )
}

/* FORMAT TIME */

function getFormattedTime() {

  return new Date()
    .toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )
}

/* FORMAT DATE */

function getFormattedDate() {

  return new Date()
    .toLocaleDateString(
      [],
      {
        weekday: "short",
        month: "short",
        day: "numeric",
      }
    )
}

/* ADD ACTIVITY */

export function addNotification({
  type,
  title,
  message,
}: {
  type: NotificationType
  title: string
  message: string
}) {

  const notifications =
    getNotifications()

  const newNotification:
    NotificationItem = {

    id: Date.now(),

    type,

    title,

    message,

    time:
      getFormattedTime(),

    date:
      getFormattedDate(),
  }

  const updated = [
    newNotification,
    ...notifications,
  ]

  /* LIMIT */

  const limited =
    updated.slice(0, 50)

  saveNotifications(
    limited
  )

  /* LIVE EVENT */

  window.dispatchEvent(
    new CustomEvent(
      "dashboard_activity"
    )
  )
}

/* TASK EVENTS */

export function notifyTaskCreated(
  title: string
) {

  addNotification({
    type: "task",
    title:
      "New Task Added",
    message:
      `Task "${title}" was created.`,
  })
}

export function notifyTaskCompleted(
  title: string
) {

  addNotification({
    type: "task",
    title:
      "Task Completed",
    message:
      `You completed "${title}".`,
  })
}

/* HABIT EVENTS */

export function notifyHabitCreated(
  title: string
) {

  addNotification({
    type: "habit",
    title:
      "New Habit Started",
    message:
      `Habit "${title}" was added.`,
  })
}

export function notifyHabitCompleted(
  title: string
) {

  addNotification({
    type: "habit",
    title:
      "Habit Completed",
    message:
      `You completed "${title}".`,
  })
}

/* FOCUS EVENTS */

export function notifyFocusCompleted(
  minutes: number
) {

  addNotification({
    type: "focus",
    title:
      "Focus Session Complete",
    message:
      `You completed a ${minutes}-minute deep work session.`,
  })
}

/* PLANNER EVENTS */

export function notifyPlannerCreated(
  title: string
) {

  addNotification({
    type: "planner",
    title:
      "Planner Updated",
    message:
      `Event "${title}" was added to your planner.`,
  })
}

/* AI EVENTS */

export function notifyAIInsight(
  message: string
) {

  addNotification({
    type: "ai",
    title:
      "AI Insight",
    message,
  })
}

/* ACHIEVEMENTS */

export function notifyAchievement(
  message: string
) {

  addNotification({
    type:
      "achievement",
    title:
      "Achievement Unlocked",
    message,
  })
}

/* DELETE ONE */

export function deleteNotification(
  id: number
) {

  const notifications =
    getNotifications()

  const updated =
    notifications.filter(
      (
        notification
      ) =>
        notification.id !== id
    )

  saveNotifications(
    updated
  )

  window.dispatchEvent(
    new CustomEvent(
      "dashboard_activity"
    )
  )
}

/* CLEAR ALL */

export function clearNotifications() {

  localStorage.removeItem(
    STORAGE_KEY
  )

  window.dispatchEvent(
    new CustomEvent(
      "dashboard_activity"
    )
  )
}