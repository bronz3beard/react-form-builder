import React, { FC } from 'react'
import { ButtonProps, ButtonEventProps } from './index'

const PrimaryButton: FC<ButtonProps & ButtonEventProps> = (
    props: ButtonProps & ButtonEventProps,
) => {
    const {
        id,
        text,
        type,
        label,
        name,
        disabled,
        url,
        height,
        width,
        buttonClass,
        containerClassName,
        childContainerClass,
        children,
        target,
        buttonIconClass,
        dataAttribute,
        pciID,
        piiID,
        hasPCIPII,
        textColour,
        arrowUp,
        onClick,
        onMouseUp,
        onMouseDown,
    } = props
    // personal credit information means absolutely no data.
    // personally identifiable information, this one is contextual/grey area.
    const privacyId = !pciID ? piiID : pciID

    return (
        <div className={containerClassName}>
            {type === 'link' && url ? (
                <a id={id} href={url} target={target} className={buttonClass}>
                    {text || children}
                </a>
            ) : (
                <>
                    <button
                        id={id}
                        name={name}
                        onClick={onClick}
                        disabled={disabled}
                        onMouseUp={onMouseUp}
                        onMouseDown={onMouseDown}
                        type={!type ? 'button' : 'submit'}
                        className={`${buttonClass} ${height} ${width} ${textColour} ${
                            disabled ? 'bg-opacity-70 pointer-events-none' : ''
                        }`}
                        data-attribute={`${dataAttribute}${
                            hasPCIPII ? ` ${privacyId}` : ''
                        }`}
                    >
                        <span className={`${childContainerClass}`}>
                            {text || children}
                        </span>
                    </button>
                    {label && (
                        <label htmlFor={name} className="">
                            {label}
                        </label>
                    )}
                </>
            )}
        </div>
    )
}

PrimaryButton.defaultProps = {
    id: '',
    url: '',
    type: 'button', // 'button', 'submit', 'reset', 'link'
    containerClassName: '',
    label: '',
    disabled: false,
    target: '_self', // '_blank', '_self'
    name: 'button',
    pciID: 'suppress_flag_pci',
    piiID: 'suppress_flag_pii',
    hasPCIPII: false,
    dataAttribute: '',
    textColour: 'text-black',
    arrowUp: false,
    height: 'h-10',
    width: 'lg:w-56 w-40',
    buttonIconClass:
        'block w-6 left-52 top-0 flex-none order-1 flex-grow-0 ml-2 p-2',
    childContainerClass:
        'w-full items-center static text-left not-italic tracking-tight font-base text-xs lg:text-base px-2',
    buttonClass:
        'flex flex-row items-center bg-white hover:bg-primary-colour active:bg-tertiary-colour font-medium rounded-lg p-2',
    onClick: () => {
        return
    },
    onMouseUp: () => {
        return
    },
    onMouseDown: () => {
        return
    },
}

export default PrimaryButton
