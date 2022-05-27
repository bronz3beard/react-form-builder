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
        <div className="relative flex flex-col justify-between min-w-0 max-h-[80vh] break-words bg-white rounded p-4 overflow-y-scroll">
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
                            >
                                <div
                                    draggable
                                    key={item.order}
                                    id={`${item.id}`}
                                    onDragStart={handleSectionDragStart}
                                    className="lg:w-1/3 w-full lg:my-0 my-2"
                                >
                                    <div className="w-full text-black text-xl p-6">
                                        {item.title}
                                    </div>

                                    <div className="flex justify-center items-center space-x-2">
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
                                            .map(key => {
                                                return (
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
                                                            key={itm.order}
                                                            id={`${itm.id}#${item.id}`}
                                                            onDrop={
                                                                handleFieldDrop
                                                            }
                                                            onDragOver={
                                                                handleFieldDragOver
                                                            }
                                                        >
                                                            <div
                                                                draggable
                                                                key={itm.id}
                                                                id={`${itm.id}#${item.id}`}
                                                                onDragStart={
                                                                    handleFieldDragStart
                                                                }
                                                            >
                                                                <div>
                                                                    {itm.type}
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
