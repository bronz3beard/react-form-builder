import React, {
    FC,
    useEffect,
    useState,
    ChangeEvent,
    MouseEvent,
    useCallback,
    DragEvent,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { PrimaryButton } from './components/common/button'
import Title from './components/common/title'
import FormFields from './components/formBuilderSections/formFields'
import FormName from './components/formBuilderSections/formName'
import FormSections from './components/formBuilderSections/formSections'
import {
    FormSection,
    FormFieldType,
    InputType,
    FormFieldSections,
} from './formTypes'
import { buildFormFieldSections } from './utils/formHelpers'

enum FormBuilderSections {
    NAME,
    SECTIONS,
    INPUT_TYPES,
    INPUT_SECTION_ORDER,
    SAVE_EDIT,
}

export interface AppProps {
    hostName?: string
}

const App: FC<AppProps> = (props: AppProps) => {
    const { hostName } = props
    const [formBuildSection, setFormBuildSection] =
        useState<FormBuilderSections>(FormBuilderSections.NAME)
    const [formName, setFormName] = useState<string>('')
    const [sectionCount, setSectionCount] = useState<number>(0)
    const [formSections, setFormSections] = useState<FormSection[]>([])
    const [formFieldTypeList, setFormFieldTypeList] =
        useState<FormFieldSections>({})
    const [sectionDragId, setSectionDragId] = useState<number>(0)
    const [fieldDragId, setFieldDragId] = useState<string>('')
    // useEffect(() => {
    //     setFormFieldTypeList()
    // }, [formSections])

    const handleFormNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget
        setFormName(value)
    }

    const handleFormSectionTitle = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.currentTarget

        const sectionUpdate = formSections.find(
            item => item.id === parseInt(id, 10),
        )

        if (sectionUpdate) {
            sectionUpdate.title = value

            setFormSections([...formSections])
        }
    }

    const handleAddFormSectionLineBreak = (
        event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>,
    ) => {
        const { id } = event.currentTarget

        const sectionUpdate = formSections.find(
            item => item.id === parseInt(id, 10),
        )

        if (sectionUpdate) {
            sectionUpdate.hasLineBreak = !sectionUpdate.hasLineBreak

            setFormSections([...formSections])
        }
    }

    const handleFormSectionsAdd = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setSectionCount(sectionCount + 1)

        const section: FormSection = {
            id: sectionCount,
            order: formSections.length ?? 0,
            title: '',
            hasLineBreak: false,
            inputTypes: [],
        }

        setFormSections([...formSections, section])
    }

    const handleFormSectionsRemove = (event: MouseEvent<HTMLButtonElement>) => {
        const { id } = event.currentTarget
        event.preventDefault()

        setSectionCount(count => count - 1)

        const newFormSections = formSections.filter(
            item => item.id !== parseInt(id, 10),
        )

        setFormSections(newFormSections)
    }

    const handleFormFieldsAdd = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const { id, name } = event.currentTarget

        const newFormField = formSections.find(
            item => item.id === parseInt(id, 10),
        )

        if (newFormField) {
            const field: FormFieldType = {
                id: uuidv4(),
                sectionId: newFormField.id,
                type: InputType[parseInt(name, 10)],
                order: formSections[newFormField.id].inputTypes.length ?? 0,
            }

            newFormField.inputTypes = [...newFormField.inputTypes, field]

            setFormFieldTypeList(buildFormFieldSections(formSections))
        }
    }

    const handleFormFieldsRemove = (event: MouseEvent<HTMLButtonElement>) => {
        const { id } = event.currentTarget
        event.preventDefault()
        setSectionCount(count => count - 1)
        const newFormSections = formSections.filter(
            item => item.id !== parseInt(id, 10),
        )

        // newFormSections.pop()

        setFormFieldTypeList(buildFormFieldSections(formSections))
    }

    const handleSectionDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleSectionDragStart = (event: DragEvent<HTMLDivElement>) => {
        const id = event.currentTarget.id

        setSectionDragId(parseInt(id, 10))
    }

    const handleSectionDrop = (event: DragEvent<HTMLDivElement>) => {
        const id = parseInt(event.currentTarget.id, 10)

        const oldSection = formSections.find(item => item.id === sectionDragId)
        const newSection = formSections.find(item => item.id === id)

        const dragSectionOrder = oldSection?.order ?? 0
        const dropSectionOrder = newSection?.order ?? 0

        const updateSectionOrder = formSections.map((item: FormSection) => {
            const oldSectionFields = item.inputTypes.find(
                type => type.sectionId === sectionDragId,
            )
            const newSectionFields = item.inputTypes.find(
                type => type.sectionId === id,
            )

            const dragFieldSectionId =
                oldSectionFields?.sectionId ?? sectionDragId
            console.log(
                '🚀 ~ file: App.tsx ~ line 180 ~ updateSectionOrder ~ dragFieldSectionId',
                dragFieldSectionId,
            )
            const dropFieldSectionId = newSectionFields?.sectionId ?? id
            console.log(
                '🚀 ~ file: App.tsx ~ line 183 ~ updateSectionOrder ~ dropFieldSectionId',
                dropFieldSectionId,
            )

            if (item.id === sectionDragId) {
                item.order = dropSectionOrder
                if (newSectionFields) {
                    newSectionFields.sectionId = dropFieldSectionId
                }
            }
            if (item.id === id) {
                item.order = dragSectionOrder
                if (oldSectionFields) {
                    oldSectionFields.sectionId = dragFieldSectionId
                }
            }
            return item
        })

        setFormSections(updateSectionOrder)
    }

    const handleFieldDrop = (event: DragEvent<HTMLDivElement>) => {
        const id = event.currentTarget.id
        const idValues = id.split('#')

        const fieldId = idValues[0]
        const sectionId = parseInt(idValues[1], 10)

        const oldSection = formSections[sectionId].inputTypes.find(
            item => item.id === fieldDragId,
        )
        const newSection = formSections[sectionId].inputTypes.find(
            item => item.id === fieldId,
        )

        const dragFieldOrder = oldSection?.order ?? 0
        const dropFieldOrder = newSection?.order ?? 0

        formSections[sectionId].inputTypes.map((item: FormFieldType) => {
            if (item.id === fieldDragId) {
                item.order = dropFieldOrder
            }
            if (item.id === fieldId) {
                item.order = dragFieldOrder
            }

            return item
        })

        setFormFieldTypeList(buildFormFieldSections(formSections))
    }

    const handleFieldDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleFieldDragStart = (event: DragEvent<HTMLDivElement>) => {
        const id = event.currentTarget.id

        const idValues = id.split('#')
        const fieldId = idValues[0]

        setFieldDragId(fieldId)
    }

    const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        let backToSection: FormBuilderSections = formBuildSection

        if (formBuildSection === FormBuilderSections.NAME) {
            backToSection = FormBuilderSections.SECTIONS
        } else if (formBuildSection === FormBuilderSections.SECTIONS) {
            backToSection = FormBuilderSections.INPUT_TYPES
        } else if (formBuildSection === FormBuilderSections.INPUT_TYPES) {
            backToSection = FormBuilderSections.INPUT_SECTION_ORDER
        } else if (
            formBuildSection === FormBuilderSections.INPUT_SECTION_ORDER
        ) {
            backToSection = FormBuilderSections.SAVE_EDIT
        } else if (formBuildSection === FormBuilderSections.SAVE_EDIT) {
            backToSection = FormBuilderSections.SAVE_EDIT
        }

        setFormBuildSection(backToSection)
    }

    const handleBack = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
            let backToSection: FormBuilderSections = formBuildSection

            if (formBuildSection === FormBuilderSections.NAME) {
                backToSection = FormBuilderSections.NAME
            } else if (formBuildSection === FormBuilderSections.SECTIONS) {
                backToSection = FormBuilderSections.NAME
            } else if (formBuildSection === FormBuilderSections.INPUT_TYPES) {
                backToSection = FormBuilderSections.SECTIONS
            } else if (
                formBuildSection === FormBuilderSections.INPUT_SECTION_ORDER
            ) {
                backToSection = FormBuilderSections.INPUT_TYPES
            } else if (formBuildSection === FormBuilderSections.SAVE_EDIT) {
                backToSection = FormBuilderSections.INPUT_SECTION_ORDER
            }

            setFormBuildSection(backToSection)
        },
        [formBuildSection],
    )

    return (
        <div className="flex justify-center w-full h-full my-2">
            <div className="container w-full h-screen rounded-md bg-gray-100 text-center shadow-lg">
                <Title
                    title={`${
                        !hostName ? 'Form Builder' : `${hostName} Form Builder`
                    }`}
                    textColour="text-black"
                    boldFont="font-bold"
                />
                <div className="flex justify-center mx-10">
                    <div className="w-full overflow-hidden p-6 rounded-lg shadow-xl bg-gray-400 lg:space-y-5 space-y-7">
                        {formBuildSection === FormBuilderSections.NAME && (
                            <FormName
                                formName={formName}
                                handleFormNameChange={handleFormNameChange}
                            />
                        )}
                        {formBuildSection === FormBuilderSections.SECTIONS && (
                            <FormSections
                                formSections={formSections}
                                handleFormSectionsAdd={handleFormSectionsAdd}
                                handleFormSectionsRemove={
                                    handleFormSectionsRemove
                                }
                                handleFormSectionTitle={handleFormSectionTitle}
                                handleAddFormSectionLineBreak={
                                    handleAddFormSectionLineBreak
                                }
                            />
                        )}
                        {formBuildSection ===
                            FormBuilderSections.INPUT_TYPES && (
                            <FormFields
                                formSections={formSections}
                                formFieldTypeList={formFieldTypeList}
                                handleFieldSectionAdd={handleFormFieldsAdd}
                                handleSectionDrop={handleSectionDrop}
                                handleSectionDragStart={handleSectionDragStart}
                                handleSectionDragOver={handleSectionDragOver}
                                handleFieldDrop={handleFieldDrop}
                                handleFieldDragOver={handleFieldDragOver}
                                handleFieldDragStart={handleFieldDragStart}
                            />
                        )}
                        <div className="flex space-x-4 float-right">
                            <PrimaryButton
                                text="Back"
                                type="button"
                                width="w-16"
                                onClick={handleBack}
                                name="form-navigation"
                                textColour="text-white"
                            />
                            <PrimaryButton
                                text="Next"
                                type="button"
                                width="w-16"
                                onClick={handleNext}
                                name="form-navigation"
                                textColour="text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

App.defaultProps = {
    hostName: '',
}

export default App
