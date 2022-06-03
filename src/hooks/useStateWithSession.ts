import { useState, useEffect, Dispatch } from 'react'
import {
  setOnSessionStorage,
  getFromSessionStorage,
} from '../utils/sessionStorage'

const useStateWithSession = <T>(
  storageKey: string,
  intialState: T,
): [T, Dispatch<T>] => {
  const initialState = getFromSessionStorage(storageKey)

  const [value, setValue] = useState<T>(
    !initialState?.value ? intialState : initialState?.value,
  )

  useEffect(() => {
    setOnSessionStorage(storageKey, value)
  }, [value, storageKey])

  return [value, setValue]
}

export default useStateWithSession
