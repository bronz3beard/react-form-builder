import React, { ChangeEvent, useState, MouseEvent } from 'react'
import { PrimaryButton } from './components/common/button'
import Input from './components/common/input'
import Title from './components/common/title'
import { FormSection, FormType } from './formTypes'

enum FormBuilderSections {
    NAME,
    SECTIONS,
    INPUT_TYPES,
    INPUT_SECTION_ORDER,
    SAVE_EDIT,
}

const App = () => {
    const [formBuildSection, setFormBuildSection] =
        useState<FormBuilderSections>(FormBuilderSections.NAME)
    const [formName, setFormName] = useState<string>('')
    const [formSections, setFormSection] = useState<FormSection[]>([])
    const [formInputTypeList, setFormInputTypeList] = useState<FormType[]>([])

    const handleFormNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget
        setFormName(value)
    }

    const handleFormBuilderNavigation = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()

        setFormBuildSection(FormBuilderSections.SECTIONS)
    }

    return (
        <div className="flex justify-center w-full h-full my-20">
            <div className="container w-full h-80 rounded-md bg-gray-100 text-center shadow-lg">
                <Title
                    title="Form Builder"
                    textColour="text-black"
                    boldFont="font-bold"
                />
                <div className="flex justify-center">
                    <div className="w-min overflow-hidden p-6 rounded-lg shadow-xl bg-gray-400 lg:space-y-5 space-y-7">
                        <div className="mb-4">
                            <label
                                htmlFor="name-input"
                                className="block text-white text-sm font-bold mb-2"
                            >
                                <strong>Form Name</strong>
                            </label>
                            <Input
                                type="text"
                                id="name-input"
                                value={formName}
                                name="form-name-input"
                                onChange={handleFormNameChange}
                                placeholder="Enter the form name"
                            />
                        </div>
                    </div>
                </div>
                <div className="float-right mx-6 mt-20">
                    <PrimaryButton
                        text="Next"
                        type="button"
                        name="form-navigation"
                        onClick={handleFormBuilderNavigation}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
