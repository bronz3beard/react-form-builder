import { isClientSide } from './functions'

const myOwnStorage = {} as Record<string, unknown>

const isSessionStorageSupported = (storage: Storage) => {
  if (typeof storage !== 'undefined') {
    try {
      const key = '__some_random_key__'
      storage.setItem(key, key)
      storage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  } else {
    return false
  }
}

export const setOnSessionStorage = (key: string, value: any) => {
  if (isClientSide() && isSessionStorageSupported(sessionStorage)) {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        createdAt: Date.now(),
        value,
      }),
    )
  } else {
    myOwnStorage[key] = value
  }
}

export const getFromSessionStorage = (key: string) => {
  try {
    if (isSessionStorageSupported(sessionStorage)) {
      if (isClientSide() && isSessionStorageSupported(sessionStorage)) {
        const storageItem: string = sessionStorage.getItem(key) as string

        const item = JSON.parse(storageItem)

        return item
      }
      return myOwnStorage[key]
    }
  } catch (e) {
    return null
  }
}

export const getFromSessionStorageAsync = async (key: string) => {
  let item
  try {
    if (isSessionStorageSupported(sessionStorage)) {
      if (isClientSide() && isSessionStorageSupported(sessionStorage)) {
        const storageItem: string = sessionStorage.getItem(key) as string

        item = await JSON.parse(storageItem)
      }
      return myOwnStorage[key]
    }
  } catch (e) {
    return null
  }
  return item
}

export const removeFromSessionStorage = (key: string) => {
  if (isSessionStorageSupported(sessionStorage)) {
    if (isClientSide() && isSessionStorageSupported(sessionStorage)) {
      sessionStorage.removeItem(key)
    } else {
      delete myOwnStorage.key
    }
  }
}

export const clearAllSessionStorage = () => {
  if (isClientSide() && isSessionStorageSupported(sessionStorage)) {
    sessionStorage.clear()
  } else {
    // using forEach because i dont want to return anything.
    Object.keys(myOwnStorage).forEach((key: string) => {
      delete myOwnStorage[key]
    })
  }
}
