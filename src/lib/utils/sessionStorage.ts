import { isClientSide } from './functions'

const thisStorage = {} as Record<string, unknown>

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
  const client = isClientSide()

  if (client && isSessionStorageSupported(sessionStorage)) {
    sessionStorage.setItem(
      key,
      JSON.stringify({
        createdAt: Date.now(),
        value,
      }),
    )
  } else {
    thisStorage[key] = value
  }
}

export const getFromSessionStorage = (key: string) => {
  const client = isClientSide()

  try {
    if (client && isSessionStorageSupported(sessionStorage)) {
      const storageItem: string = sessionStorage.getItem(key) as string

      const item = JSON.parse(storageItem)

      return item
    }

    return thisStorage[key]
  } catch (e) {
    return null
  }
}

export const getFromSessionStorageAsync = async (key: string) => {
  const client = isClientSide()

  try {
    if (client && isSessionStorageSupported(sessionStorage)) {
      const storageItem: string = sessionStorage.getItem(key) as string

      const item = await JSON.parse(storageItem)

      return item
    } else {
      return thisStorage[key]
    }
  } catch (e) {
    return null
  }
}

export const removeFromSessionStorage = (key: string) => {
  const client = isClientSide()

  if (client && isSessionStorageSupported(sessionStorage)) {
    sessionStorage.removeItem(key)
  } else {
    delete thisStorage.key
  }
}

export const clearAllSessionStorage = () => {
  const client = isClientSide()

  if (client && isSessionStorageSupported(sessionStorage)) {
    sessionStorage.clear()
  } else {
    // using forEach because i dont want to return anything.
    Object.keys(thisStorage).forEach((key: string) => {
      delete thisStorage[key]
    })
  }
}
