import React, { MouseEvent, FC, DragEvent } from 'react'
import {
    FormFieldSections,
    FormFieldType,
    FormSection,
    InputType,
} from '../../formTypes'
import { PrimaryButton } from '../common/button'
// import Dropdown from '../common/dropdown'

type FormFieldProps = {
    formSections: FormSection[]
    formFieldTypeList: FormFieldSections
    handleFieldSectionAdd: (event: MouseEvent<HTMLButtonElement>) => void
    handleSectionDrop: (event: DragEvent<HTMLDivElement>) => void
    handleSectionDragStart: (event: DragEvent<HTMLDivElement>) => void
    handleSectionDragOver: (event: DragEvent<HTMLDivElement>) => void
    handleFieldDrop: (event: DragEvent<HTMLDivElement>) => void
    handleFieldDragOver: (event: DragEvent<HTMLDivElement>) => void
    handleFieldDragStart: (event: DragEvent<HTMLDivElement>) => void
}

const FormFields: FC<FormFieldProps> = (props: FormFieldProps) => {
    const {
        formSections,
        handleSectionDrop,
        handleFieldSectionAdd,
        handleSectionDragStart,
        handleSectionDragOver,
        handleFieldDrop,
        handleFieldDragOver,
        handleFieldDragStart,
    } = props

    return (
        <div className="relative flex flex-col justify-between min-w-0 max-h-[80vh] break-words bg-white rounded p-4 space-y-6 overflow-y-scroll">
            {formSections?.length &&
                formSections
                    .sort((a, b) => a.order - b.order)
                    .map((item: FormSection, key) => {
                        return (
                            <div
                                key={key}
                                id={`${item.id}`}
                                onDrop={handleSectionDrop}
                                onDragOver={handleSectionDragOver}
                                className="w-full"
                            >
                                <div
                                    draggable
                                    key={item.order}
                                    id={`${item.id}`}
                                    onDragStart={handleSectionDragStart}
                                    className="w-full lg:my-0 my-2 border-2 hover:cursor-grab active:cursor-grabbing rounded-lg text-base uppercase"
                                >
                                    <div className="w-full text-xl p-6 bg-gray-300 text-white">
                                        {item.title}
                                    </div>
                                    <div className="flex flex-wrap justify-center items-center w-full">
                                        {(
                                            Object.keys(InputType) as Array<
                                                keyof typeof InputType
                                            >
                                        )
                                            .filter(
                                                key =>
                                                    !parseInt(
                                                        `${InputType[key]}`,
                                                    ) && InputType[key] !== 0,
                                            )
                                            .map((key, index) => {
                                                return (
                                                    <div
                                                        className="m-2"
                                                        key={`${index}-${InputType[key]}`}
                                                    >
                                                        <PrimaryButton
                                                            type="button"
                                                            name={key}
                                                            width="w-min"
                                                            id={`${item.id}`}
                                                            text={`${InputType[key]}`}
                                                            key={`${InputType[key]}`}
                                                            onClick={
                                                                handleFieldSectionAdd
                                                            }
                                                            textColour="text-white"
                                                        />
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <div>
                                        {item.inputTypes?.length > 0 &&
                                            item.inputTypes
                                                .sort(
                                                    (a, b) => a.order - b.order,
                                                )
                                                .map((itm: FormFieldType) => {
                                                    return (
                                                        <div
                                                            key={`${item.id}-${itm.order}`}
                                                            id={`${itm.id}#${item.id}`}
                                                            onDrop={
                                                                handleFieldDrop
                                                            }
                                                            onDragOver={
                                                                handleFieldDragOver
                                                            }
                                                            className="w-full p-2 my-2 border-2 hover:cursor-grab active:cursor-grabbing bg-gray-300 text-white rounded-lg text-base uppercase"
                                                        >
                                                            <div
                                                                draggable
                                                                key={itm.id}
                                                                id={`${itm.id}#${item.id}`}
                                                                onDragStart={
                                                                    handleFieldDragStart
                                                                }
                                                                className=""
                                                            >
                                                                <div>
                                                                    {itm.type} (
                                                                    {itm.order +
                                                                        1}
                                                                    )
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
        </div>
    )
}

export default FormFields
