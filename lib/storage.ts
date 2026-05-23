export function getStorage<T>(
  key: string,
  fallback: T
): T {

  if (
    typeof window === "undefined"
  ) {

    return fallback
  }

  try {

    const item =
      localStorage.getItem(key)

    return item
      ? JSON.parse(item)
      : fallback

  } catch {

    return fallback
  }
}

export function setStorage(
  key: string,
  value: any
) {

  if (
    typeof window === "undefined"
  ) {

    return
  }

  localStorage.setItem(
    key,
    JSON.stringify(value)
  )
}