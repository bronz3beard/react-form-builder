import React, { FC, MouseEvent, ChangeEvent } from 'react'
import { PrimaryButton } from '../button'
import Input from '.'

type ToggleInputProps = {
    inputName: string
    labelText?: string
    toggleValue: boolean
    disabled?: boolean
    handleButtonToggle: (event: MouseEvent<HTMLButtonElement>) => void
    handleCheckboxToggle: (event: ChangeEvent<HTMLInputElement>) => void
}

const ToggleCheckbox: FC<ToggleInputProps> = (props: ToggleInputProps) => {
    const {
        inputName,
        labelText,
        toggleValue,
        disabled,
        handleButtonToggle,
        handleCheckboxToggle,
    } = props

    return (
        <div className="flex items-center justify-center w-full lg:mt-0 mt-2">
            {labelText && (
                <label htmlFor={inputName} className="mr-4">
                    {labelText}
                </label>
            )}
            <div className="relative">
                <Input
                    role="switch"
                    type="checkbox"
                    name={inputName}
                    id="toggle-input"
                    disabled={disabled}
                    onChange={handleCheckboxToggle}
                    className={`${
                        toggleValue ? 'bg-blue-500' : 'bg-red-500'
                    } appearance-none block  w-7 h-4 rounded-full cursor-pointer`}
                />
                <PrimaryButton
                    text=""
                    width="w-3"
                    height="h-3"
                    type="button"
                    name={inputName}
                    id="toggle-button"
                    disabled={disabled}
                    onClick={handleButtonToggle}
                    buttonClass={`${
                        toggleValue ? 'translate-x-full' : 'translate-x-0'
                    } absolute top-0.5 left-0.5 right-0.5 bg-white rounded-full transition cursor-pointer`}
                />
            </div>
        </div>
    )
}

ToggleCheckbox.defaultProps = {
    labelText: '',
    disabled: false,
}

export default ToggleCheckbox
