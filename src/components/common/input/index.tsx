import React, { FC, ChangeEvent, MouseEvent, FocusEvent } from 'react'

// TODO:: maybe break this up into smaller more specific input types

type InputProps = Readonly<{
    id: string
    min?: number
    max?: number
    step?: number | string
    type?: string
    list?: string
    value?: string | number
    checked?: boolean
    disabled?: boolean
    orient?: string
    className?: string
    required?: boolean
    name: string
    placeholder?: string
    inputStyles?: object
    ariaLabel?: string
    autoComplete?: string
    role?: string
    hasPCIPII?: boolean
    dataAttribute?: number | string
    pciID?: string
    piiID?: string
    pattern?: string
    inputMode?: boolean
}>

type InputEventProps = {
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
    onClick?: (event: MouseEvent<HTMLInputElement>) => void
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void
    onMouseUp?: (event: MouseEvent<HTMLInputElement>) => void
    onMouseDown?: (event: MouseEvent<HTMLInputElement>) => void
    onMouseOut?: (event: MouseEvent<HTMLInputElement>) => void
    onMouseOver?: (event: MouseEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps & InputEventProps> = (
    props: InputProps & InputEventProps,
) => {
    const {
        id,
        min,
        max,
        step,
        type,
        list,
        value,
        name,
        // orient,
        placeholder,
        // inputStyles,
        checked,
        disabled,
        className,
        required,
        onChange,
        onClick,
        onInput,
        onFocus,
        onBlur,
        onMouseUp,
        onMouseDown,
        onMouseOut,
        onMouseOver,
        // ariaLabel,
        autoComplete,
        dataAttribute,
        pciID,
        piiID,
        hasPCIPII,
        pattern,
        inputMode,
    } = props
    // personal credit information means absolutely no data.
    // personally identifiable information, this one is contextual/grey area.
    const privacyId = !pciID ? piiID : pciID

    return (
        <input
            id={id}
            min={min}
            max={max}
            step={step}
            type={type}
            list={list}
            pattern={pattern}
            inputMode={!inputMode ? 'text' : 'numeric'}
            onInput={onInput}
            // style={inputStyles}
            onBlur={onBlur}
            required={required}
            name={name}
            value={value}
            //   orient={orient}
            className={className}
            checked={checked}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            onClick={onClick}
            autoComplete={autoComplete}
            onFocus={onFocus}
            role={type}
            onMouseUp={onMouseUp}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            data-attribute={`${dataAttribute}${
                hasPCIPII ? ` ${privacyId}` : ''
            }`}
        />
    )
}

Input.defaultProps = {
    id: '',
    min: 0,
    max: 100,
    step: 1,
    type: 'text',
    list: 'tickmarks',
    orient: 'horizontal',
    placeholder: '',
    inputStyles: {},
    checked: false,
    disabled: false,
    pattern: '',
    className:
        'p-1 px-2 border border-black rounded-md text-black font-bold lg:text-lg text-xs',
    required: false,
    onChange: () => {
        return
    },
    onClick: () => {
        return
    },
    onInput: () => {
        return
    },
    onFocus: () => {
        return
    },
    onBlur: () => {
        return
    },
    onMouseUp: () => {
        return
    },
    onMouseDown: () => {
        return
    },
    onMouseOut: () => {
        return
    },
    onMouseOver: () => {
        return
    },
    ariaLabel: '',
    autoComplete: 'off',
}

export default Input
