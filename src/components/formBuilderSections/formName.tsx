import React, { FC, ChangeEvent } from 'react'
import Input from '../common/input'

export type FormNameProps = {
    formName: string
    handleFormNameChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormName: FC<FormNameProps> = (props: FormNameProps) => {
    const { formName, handleFormNameChange } = props

    return (
        <div className="mb-4">
            <label
                htmlFor="name-input"
                className="block text-white text-sm font-bold mb-2"
            >
                <strong>Form Name</strong>
            </label>
            <Input
                type="text"
                id="name-input"
                value={formName}
                name="form-name-input"
                onChange={handleFormNameChange}
                placeholder="Enter the form name"
            />
        </div>
    )
}

export default FormName
