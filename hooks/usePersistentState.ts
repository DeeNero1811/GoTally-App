"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  getStorage,
  setStorage,
} from "@/lib/storage"

export function usePersistentState<T>(
  key: string,
  initialValue: T
) {

  const [
    value,
    setValue,
  ] = useState<T>(
    initialValue
  )

  const [loaded, setLoaded] =
    useState(false)

  /* LOAD DATA */

  useEffect(() => {

    const stored =
      getStorage(
        key,
        initialValue
      )

    setValue(stored)

    setLoaded(true)

  }, [
    key,
    initialValue,
  ])

  /* SAVE DATA */

  useEffect(() => {

    if (!loaded)
      return

    setStorage(
      key,
      value
    )

  }, [
    key,
    value,
    loaded,
  ])

  return [
    value,
    setValue,
  ] as const
}