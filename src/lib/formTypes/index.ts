export enum InputType {
    text,
    number,
    email,
    password,
    date,
    url,
    // textarea,
    // select,
    // radio,
    // checkbox,
    button,
    submit,
    file,
    tel,
    time,
    week,
    search,
    month,
    image,
}

export type FormFieldType = {
    id: string
    type: string
    order: number
    sectionId: string
}

export type FormSection = {
    id: string
    order: number
    title: string
    hasLineBreak: boolean
    inputTypes: FormFieldType[]
}
