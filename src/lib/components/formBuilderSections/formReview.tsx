import React, { ChangeEvent, FC, ReactNode, useCallback, useState } from 'react'
import { FormFieldType, FormSection } from '../../formTypes'
import Input from '../common/input'

type FormReviewProps = {
    formSections: FormSection[]
}

type InputState = {
    [index: string]: {
        value: string
    }
}

const FormReview: FC<FormReviewProps> = (props: FormReviewProps) => {
    const { formSections } = props

    const [inputValue, setInputValue] = useState<InputState>({})

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.currentTarget

        setInputValue({
            ...inputValue,
            [id]: {
                value,
            },
        })
    }

    const getInputValue = (
        type: string,
        order: string,
        value: string,
    ): string => {
        let inputValueActual = value
        if (type === 'button') {
            inputValueActual = 'Click Here!'
        } else if (type === 'checkbox') {
            inputValueActual = 'true'
        }

        return inputValueActual
    }

    const buildFormFields = useCallback((fields: FormFieldType[]) => {
        return fields.map((item: FormFieldType) => {
            const valueActual = getInputValue(
                item.type,
                `${item.order}`,
                inputValue[item.order]?.value,
            )

            return (
                <p key={item.id} className="mb-4 text-left">
                    <label
                        htmlFor={item.id}
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        {item.type}
                    </label>
                    <Input
                        type={item.type}
                        value={valueActual}
                        checked={!!valueActual}
                        onChange={handleChange}
                        id={`${item.type}${item.order}`}
                        name={`${item.type}-${item.order}`}
                        placeholder={`${item.type} input type`}
                        className="text-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                    />
                </p>
            )
        })
    }, [])

    const buildFormSection = useCallback((): ReactNode => {
        return formSections.map((item: FormSection) => {
            return (
                <fieldset key={item.id} className="mb-4">
                    <div className="px-5 pb-5">
                        <legend className="inline text-2xl font-semibold leading-none">
                            {item.title}
                        </legend>
                        {buildFormFields(item.inputTypes)}
                    </div>
                    {item.hasLineBreak && <hr className="mt-4" />}
                </fieldset>
            )
        })
    }, [formSections])

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {buildFormSection()}
        </form>
    )
}

export default FormReview
