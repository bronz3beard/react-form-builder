import React, { FC } from 'react'
import { ButtonProps, ButtonEventProps } from './index'

const SecondaryButton: FC<ButtonProps & ButtonEventProps> = (
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
        dataAttribute,
        pciID,
        piiID,
        hasPCIPII,
        textColour,
        onClick,
        onMouseUp,
        onMouseDown,
        onMouseEnter,
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
                        onMouseEnter={onMouseEnter}
                        type={!type ? 'button' : 'submit'}
                        className={`${buttonClass} ${height} ${width} ${
                            disabled ? 'bg-opacity-10 pointer-events-none' : ''
                        }`}
                        data-attribute={`${dataAttribute}${
                            hasPCIPII ? ` ${privacyId}` : ''
                        }`}
                    >
                        <span
                            className={`${childContainerClass} ${textColour}`}
                        >
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

SecondaryButton.defaultProps = {
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
    height: ' h-8',
    width: 'lg:w-56 w-40',
    childContainerClass:
        'w-full items-center static text-left not-italic tracking-tight font-base text-xs lg:text-base p-2',
    buttonClass:
        'flex flex-row items-center text-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 border border-1 border-border-grey border-opacity-10 text-black font-medium rounded-lg p-2',
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

export default SecondaryButton
