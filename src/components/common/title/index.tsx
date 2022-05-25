import React, { FC, ElementType } from 'react'

type TitleProps = {
    wordBreak?: string
    headerType?: string
    title?: string
    containerClassName?: string
    boldFont?: string
    textColour?: string
    children?: React.ReactNode | JSX.Element
}

type HeaderType = {
    [index: string]: {
        className: string
        tag: ElementType
    }
}

const headerTypeList: HeaderType = {
    h1Title: {
        className: 'text-2xl leading-normal mt-0 mb-2 break-words select-none',
        tag: 'h1',
    },
    h2Title: {
        className: 'text-xl leading-normal mt-0 mb-2 break-words select-none',
        tag: 'h2',
    },
    h3Title: {
        className: 'text-lg leading-normal mt-0 mb-2 break-words select-none',
        tag: 'h3',
    },
    h4Title: {
        className: 'text-md leading-normal mt-0 mb-2 break-words select-none',
        tag: 'h4',
    },
    h5Title: {
        className: 'text-sm leading-normal mt-0 mb-2 break-words select-none',
        tag: 'h5',
    },
    h6Title: {
        className: 'text-xs leading-normal mt-0 mb-2 break-words select-none',
        tag: 'h6',
    },
}

const Title: FC<TitleProps> = (props: TitleProps) => {
    const {
        headerType,
        title,
        wordBreak,
        containerClassName,
        boldFont,
        textColour,
        children,
    } = props

    const { tag: Component, className } = !headerType
        ? { tag: 'span', className: '' }
        : headerTypeList[headerType]

    return (
        <div className={containerClassName}>
            <Component
                className={`${className} ${boldFont} ${textColour} ${wordBreak}`}
            >
                {children || title}
            </Component>
        </div>
    )
}

Title.defaultProps = {
    title: '',
    children: null,
    wordBreak: 'break-normal',
    headerType: 'h1Title',
    boldFont: 'font-normal',
    containerClassName: '',
    textColour: 'text-black',
}

export default Title
