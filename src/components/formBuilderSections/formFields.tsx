import React, { ChangeEvent, FC, DragEvent } from 'react'
import {
    FormFieldSections,
    FormFieldType,
    FormSection,
    InputType,
} from '../../formTypes'
import Dropdown from '../common/dropdown'

type FormFieldProps = {
    formSections: FormSection[]
    formFieldTypeList: FormFieldSections
    handleFieldSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void
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
        handleFieldSelectChange,
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
                        console.log(
                            '🚀 ~ file: formFields.tsx ~ line 41 ~ .map ~ item.inputTypes',
                            item.inputTypes?.length > 0 && item.inputTypes,
                        )
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

                                    <div>
                                        <Dropdown
                                            name="field"
                                            value="value"
                                            id={`${item.id}`}
                                            optionValue="label"
                                            optionId="value"
                                            defaultValue=""
                                            optionsArray={(
                                                Object.keys(InputType) as Array<
                                                    keyof typeof InputType
                                                >
                                            )
                                                .filter(
                                                    key =>
                                                        !parseInt(
                                                            `${InputType[key]}`,
                                                        ) &&
                                                        InputType[key] !== 0,
                                                )
                                                .map(key => ({
                                                    value: key,
                                                    label: `${InputType[key]}`,
                                                }))}
                                            onChange={handleFieldSelectChange}
                                        />
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
                                                            id={`${itm.id}#${itm.sectionId}`}
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
                                                                id={`${itm.id}#${itm.sectionId}`}
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
