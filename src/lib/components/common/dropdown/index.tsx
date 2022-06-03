import React, { FC, ChangeEvent } from 'react'

type Option = {
    [key: string]: string
}

type DropDownProps = {
    id: string
    name: string
    value: string
    className?: string
    optionValue: string
    optionsArray: Option[]
    disabled?: boolean
    required?: boolean
    optionId: string
    optionSlot?: string
    optionTitle?: string
    defaultValue: string
    optionClassName?: string
    concatOptionParam?: string
    selectStyles?: Record<string, string>
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown: FC<DropDownProps> = (props: DropDownProps) => {
    const {
        id,
        name,
        value,
        optionsArray,
        selectStyles,
        optionId,
        required,
        className,
        optionSlot,
        disabled,
        optionTitle,
        optionValue,
        defaultValue,
        optionClassName,
        concatOptionParam,
        onChange,
    } = props

    return (
        <>
            {optionsArray?.length > 0 ? (
                <select
                    id={id}
                    name={name}
                    required={!!required}
                    style={selectStyles}
                    className={className}
                    disabled={disabled}
                    onChange={onChange}
                    defaultValue={defaultValue}
                >
                    <option
                        hidden
                        disabled
                        value={defaultValue}
                        className={optionClassName}
                    >
                        {defaultValue}
                    </option>
                    {optionsArray.map((option, key) => (
                        <option
                            value={option[value]}
                            slot={!optionSlot ? '' : option[optionSlot]}
                            className={optionClassName}
                            title={!optionTitle ? '' : option[optionTitle]}
                            key={`${key}_${option[optionId]}`}
                            id={option[optionId]}
                        >
                            {!concatOptionParam
                                ? option[optionValue]
                                : `${option[optionValue]}-${option[concatOptionParam]}`}
                        </option>
                    ))}
                </select>
            ) : (
                <select
                    disabled={true}
                    id="no-options"
                    name="no-options"
                    onClick={() => {
                        return
                    }}
                    onChange={() => {
                        return
                    }}
                    style={selectStyles}
                    className={className}
                    defaultValue="No Options"
                >
                    <option
                        hidden
                        disabled
                        value="No Options"
                        className={optionClassName}
                    >
                        No Options
                    </option>
                </select>
            )}
        </>
    )
}

Dropdown.defaultProps = {
    optionSlot: '',
    optionTitle: '',
    optionValue: '',
    selectStyles: {},
    disabled: false,
    className: '',
    optionClassName: '',
    concatOptionParam: undefined,
    required: false,
}

export default Dropdown
