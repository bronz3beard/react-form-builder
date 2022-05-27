import { isClientSide } from './functions'

const myOwnStorage = {} as Record<string, unknown>

// inspired by this https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
const isSupported = (storage: Storage) => {
    if (storage) {
        try {
            const key = '__some_key_we_are_just_using_to_check__'
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

export const setOnStorage = (key: string, value: any) => {
    if (isSupported(localStorage)) {
        if (isClientSide() && isSupported(localStorage)) {
            localStorage.setItem(
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
}

export const getFromStorage = (key: string) => {
    try {
        if (isSupported(localStorage)) {
            if (isClientSide() && isSupported(localStorage)) {
                const storageItem: string = localStorage.getItem(key) as string

                const item = JSON.parse(storageItem)

                return item
            }
            return myOwnStorage[key]
        }
    } catch (e) {
        return null
    }
}

export const getFromStorageAsync = async (key: string) => {
    let item
    try {
        if (isSupported(localStorage)) {
            if (isClientSide() && isSupported(localStorage)) {
                const storageItem: string = localStorage.getItem(key) as string

                item = await JSON.parse(storageItem)
            }
            return myOwnStorage[key]
        }
    } catch (e) {
        return null
    }
    return item
}

export const removeFromStorage = (key: string) => {
    if (isSupported(localStorage)) {
        if (isClientSide() && isSupported(localStorage)) {
            localStorage.removeItem(key)
        } else {
            delete myOwnStorage.key
        }
    }
}

export const clearAllLocalStorage = () => {
    if (isClientSide() && isSupported(localStorage)) {
        localStorage.clear()
    } else {
        // using forEach because i dont want to return anything.
        Object.keys(myOwnStorage).forEach((key: string) => {
            delete myOwnStorage[key]
        })
    }
}
