export const groupObjectsByProp = <T, K extends keyof T>(
    array: T[],
    prop: K,
): T[][] => {
    const map = new Map<T[K], T[]>(
        Array.from(array, (obj: T) => [obj[prop], []]),
    )

    array.forEach((obj: T) => {
        const item = map.get(obj[prop])
        if (item !== undefined) {
            return item.push(obj)
        }
    })

    return Array.from(map.values())
}

export const getDescendantPropString = (field: string): string => {
    const fieldArray = field.split('.')

    return fieldArray[fieldArray.length - 1]
}

export const isClientSide = () => typeof window !== 'undefined'
