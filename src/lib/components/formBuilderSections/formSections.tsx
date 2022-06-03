import React, {
    FC,
    Fragment,
    MouseEvent,
    ChangeEvent,
    useCallback,
} from 'react'
import { FormSection } from '../../formTypes'
import { PrimaryButton } from '../common/button'
import Input from '../common/input'
import ToggleCheckbox from '../common/input/toggleCheckbox'

export type FormNameProps = {
    formSections: FormSection[]
    handleFormSectionsAdd: (event: MouseEvent<HTMLButtonElement>) => void
    handleFormSectionsRemove: (event: MouseEvent<HTMLButtonElement>) => void
    handleFormSectionTitle: (event: ChangeEvent<HTMLInputElement>) => void
    handleAddFormSectionLineBreak: (
        event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>,
    ) => void
}

const FormSections: FC<FormNameProps> = (props: FormNameProps) => {
    const {
        formSections,
        handleFormSectionsAdd,
        handleFormSectionsRemove,
        handleFormSectionTitle,
        handleAddFormSectionLineBreak,
    } = props

    const buildFormSections = useCallback(
        (item: FormSection) => {
            const { id, title, hasLineBreak, inputTypes } = { ...item }

            return (
                <Fragment key={id}>
                    <fieldset className="w-full flex lg:flex-row flex-col items-start justify-center my-2 p-2 border border-1 border-gray-200 rounded-md">
                        <div className="lg:w-1/2 w-full">
                            <Input
                                type="text"
                                id={`${id}`}
                                value={title}
                                name="section-title"
                                onChange={handleFormSectionTitle}
                                placeholder="Enter section name"
                                className="w-full p-1 px-2 border border-black rounded-md text-black font-bold lg:text-lg text-xs"
                            />
                            <legend className="text-left lg:text-lg text-sm break-all">
                                <b>Section Title:</b> {title}
                            </legend>
                        </div>
                        <div className="lg:w-1/3 w-full lg:my-0 my-2">
                            <ToggleCheckbox
                                id={`${id}`}
                                inputName="has-line-break"
                                toggleValue={hasLineBreak}
                                labelText="Add section line break"
                                handleButtonToggle={
                                    handleAddFormSectionLineBreak
                                }
                                handleCheckboxToggle={
                                    handleAddFormSectionLineBreak
                                }
                            />
                        </div>
                        <div className="lg:w-1/4 w-full">
                            <PrimaryButton
                                width="w-full"
                                type="button"
                                id={`${id}`}
                                textColour="text-white"
                                name="remove-form-section"
                                text="Remove form section"
                                onClick={handleFormSectionsRemove}
                            />
                        </div>
                    </fieldset>
                </Fragment>
            )
        },
        [formSections],
    )

    return (
        <div className="w-full bg-transparent lg:overflow-hidden">
            <label
                htmlFor="name-input"
                className="block text-white text-sm font-bold mb-2"
            >
                <strong>Form Sections</strong>
            </label>
            <div className="relative">
                <div className="flex flex-wrap items-center justify-center lg:space-x-2 space-x-0 w-full text-center mb-5 py-2">
                    <div className="relative w-full flex justify-end min-w-0 bg-transparent">
                        <PrimaryButton
                            type="button"
                            id="form-section"
                            name="add-form-section"
                            text="Add form section"
                            onClick={handleFormSectionsAdd}
                        />
                    </div>
                </div>
            </div>
            {formSections?.length > 0 && (
                <div className="relative flex flex-col justify-between min-w-0 break-words bg-white rounded p-4">
                    {formSections.map((item: FormSection) =>
                        buildFormSections(item),
                    )}
                </div>
            )}
        </div>
    )
}

export default FormSections
