import { useState, useEffect, Dispatch } from 'react'
import { setOnStorage, getFromStorage } from '../utils/localStorage'

const useStateWithLocal = <T>(
    storageKey: string,
    intialState: T,
): [T, Dispatch<T>] => {
    const initialState = getFromStorage(storageKey)

    const [value, setValue] = useState<T>(
        !initialState?.value ? intialState : initialState?.value,
    )

    useEffect(() => {
        setOnStorage(storageKey, value)
    }, [value, storageKey])

    return [value, setValue]
}

export default useStateWithLocal
