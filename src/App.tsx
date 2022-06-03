import React, { FC, ChangeEvent, MouseEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Title from './components/common/title'
import FormFields from './components/formBuilderSections/formFields'
import FormName from './components/formBuilderSections/formName'
import FormReview from './components/formBuilderSections/formReview'
import FormSaveOptions from './components/formBuilderSections/formSaveOptions'
import FormSections from './components/formBuilderSections/formSections'
import NavButtonRow from './components/navButtons'
import { FormSection, FormFieldType, InputType } from './formTypes'
import useDragDrop from './hooks/useDragDrop'
import useStateWithSession from './hooks/useStateWithSession'

export enum FormBuilderSections {
  NAME,
  SECTIONS,
  INPUT_TYPES,
  REVIEW,
  SAVE_EDIT,
}

export interface AppProps {
  hostName?: string
}

const App: FC<AppProps> = (props: AppProps) => {
  const { hostName } = props
  const [formBuildSection, setFormBuildSection] =
    useStateWithSession<FormBuilderSections>(
      'formBuildSection',
      FormBuilderSections.NAME,
    )
  const [formName, setFormName] = useStateWithSession<string>('formName', '')
  const [formSections, setFormSections] = useStateWithSession<FormSection[]>(
    'formSections',
    [],
  )

  const { section, field } = useDragDrop(formSections, setFormSections)

  const handleFormNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setFormName(value)
  }

  const handleFormSectionTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget

    const sectionUpdate = formSections.find(item => item.id === id)

    if (sectionUpdate) {
      sectionUpdate.title = value

      setFormSections([...formSections])
    }
  }

  const handleAddFormSectionLineBreak = (
    event: MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const { id } = event.currentTarget

    const sectionUpdate = formSections.find(item => item.id === id, 10)

    if (sectionUpdate) {
      sectionUpdate.hasLineBreak = !sectionUpdate.hasLineBreak

      setFormSections([...formSections])
    }
  }

  const handleFormSectionsAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const section: FormSection = {
      id: uuidv4(),
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

    const newFormSections = formSections.filter(item => item.id !== id, 10)

    setFormSections(newFormSections)
  }

  const handleFormFieldsAdd = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const { id, name } = event.currentTarget

    const newFormField = formSections.find(item => item.id === id, 10)

    if (newFormField) {
      const field: FormFieldType = {
        id: uuidv4(),
        sectionId: newFormField.id,
        type: InputType[parseInt(name, 10)],
        order: newFormField.inputTypes.length ?? 0,
      }

      newFormField.inputTypes = [...newFormField.inputTypes, field]

      setFormSections([...formSections])
    }
  }

  const handleFormFieldsRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const { id } = event.currentTarget

    const idValues = id.split('#')

    const fieldId = idValues[0]
    const sectionId = idValues[1]

    const newFormSections = formSections.find(item => item.id === sectionId)

    if (newFormSections) {
      newFormSections.inputTypes = newFormSections.inputTypes.filter(
        item => item.id !== fieldId,
      )

      setFormSections([...formSections])
    }
  }

  return (
    <div className="flex justify-center w-full h-full overflow-x-hidden">
      <div
        className={`${
          formBuildSection === FormBuilderSections.REVIEW ? 'h-full' : ''
        } w-full pb-6 bg-gray-200 text-center`}
      >
        <Title
          boldFont="font-bold"
          textColour="text-black"
          containerClassName="w-full text-left ml-64 pl-6"
          title={`${!hostName ? 'Form Builder' : `${hostName} Form Builder`}`}
        />
        <div className="flex justify-center">
          <div className="w-full overflow-hidden p-6 lg:space-y-5 space-y-7">
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
                handleFormSectionsRemove={handleFormSectionsRemove}
                handleFormSectionTitle={handleFormSectionTitle}
                handleAddFormSectionLineBreak={handleAddFormSectionLineBreak}
              />
            )}
            {formBuildSection === FormBuilderSections.INPUT_TYPES && (
              <FormFields
                field={field}
                section={section}
                formSections={formSections}
                handleFormFieldsAdd={handleFormFieldsAdd}
                handleFormFieldsRemove={handleFormFieldsRemove}
              />
            )}
            {formBuildSection === FormBuilderSections.REVIEW && (
              <FormReview formSections={formSections} />
            )}
            {formBuildSection === FormBuilderSections.SAVE_EDIT && (
              <FormSaveOptions
                formName={formName}
                formSections={formSections}
              />
            )}
            <NavButtonRow
              formBuildSection={formBuildSection}
              setFormBuildSection={setFormBuildSection}
            />
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
