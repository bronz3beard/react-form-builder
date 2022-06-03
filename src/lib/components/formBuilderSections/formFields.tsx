import React, { useState, MouseEvent, FC, useRef } from 'react'
import { FormFieldType, FormSection, InputType } from '../../formTypes'
import { Field, Section } from '../../hooks/useDragDrop'
import { PrimaryButton } from '../common/button'

type FormFieldProps = {
  field: Field
  section: Section
  formSections: FormSection[]
  handleFormFieldsAdd: (event: MouseEvent<HTMLButtonElement>) => void
  handleFormFieldsRemove: (event: MouseEvent<HTMLButtonElement>) => void
}

const FormFields: FC<FormFieldProps> = (props: FormFieldProps) => {
  const {
    field,
    section,
    formSections,
    handleFormFieldsAdd,
    handleFormFieldsRemove,
  } = props
  const [sectionIsDraggable, setSectionIsDraggable] = useState<boolean>(false)
const [sectionId, setSectionId] = useState<string>('')

const myRefs = useRef<HTMLDivElement[]>([])

const { handleFieldDrop, handleFieldDragOver, handleFieldDragStart } = field
const { handleSectionDrop, handleSectionDragStart, handleSectionDragOver } =
  section

const handleDraggableTrue = () => {
  setSectionIsDraggable(!sectionIsDraggable)
}

const handleSectionClick = (event: MouseEvent<HTMLButtonElement>) => {
  const { id, name } = event.currentTarget

  setSectionId(name)

  if (myRefs.current[parseInt(id, 10)] !== null) {
    const isSmoothScrollSupported =
      'scrollBehavior' in document.documentElement.style

    if (isSmoothScrollSupported) {
      myRefs.current[parseInt(id, 10)] &&
        myRefs.current[parseInt(id, 10)].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
    } else {
      myRefs.current[parseInt(id, 10)] &&
        myRefs.current[parseInt(id, 10)].scrollIntoView(false)
    }
  }
}

return (
  <div className="flex">
    <span className="lg:fixed absolute lg:w-max w-full top-0 left-0 bg-white overflow-hidden content-center z-40">
      <div className="lg:w-64 lg:h-screen h-min flex flex-col overflow-y-scroll lg:space-y-4 space-y-1">
        <h2 className="text-center lg:text-2xl bg-red-200 flex justify-center items-center h-10 select-none">
          Select Form Section
        </h2>
        {formSections?.length &&
          formSections
            .sort((a, b) => a.order - b.order)
            .map((item: FormSection, key) => {
              return (
                <PrimaryButton
                  type="button"
                  width="w-full"
                  id={`${item.order}`}
                  name={`${item.id}`}
                  textColour="text-white"
                  key={`${InputType[key]}`}
                  onClick={handleSectionClick}
                  text={`${item.title}(${item.order})`}
                  buttonClass="flex flex-row items-center font-medium p-2"
                  childContainerClass="w-full items-center static text-center not-italic tracking-tight font-base text-xs lg:text-base px-2 select-none"
                />
              )
            })}
        <h2 className="text-center lg:text-2xl bg-red-200 flex justify-center items-center h-10 select-none">
          Select a Form Field Type
        </h2>
        <div className="flex flex-wrap lg:justify-start justify-center items-center my-8">
          {(Object.keys(InputType) as Array<keyof typeof InputType>)
            .filter(
              key => !parseInt(`${InputType[key]}`) && InputType[key] !== 0,
            )
            .map((key, index) => {
              return (
                <div className="lg:m-2 mx-1" key={`${index}-${InputType[key]}`}>
                  <PrimaryButton
                    type="button"
                    name={key}
                    width="w-min"
                    id={sectionId}
                    disabled={!sectionId}
                    textColour="text-white"
                    key={`${InputType[key]}`}
                    text={`${InputType[key]}`}
                    onClick={handleFormFieldsAdd}
                    buttonClass="flex flex-row items-center font-medium rounded-lg p-1"
                    childContainerClass="'w-full items-center static text-left not-italic tracking-tight font-base text-xs lg:text-base px-1 select-none"
                  />
                </div>
              )
            })}
        </div>
      </div>
    </span>
    <div className="lg:ml-64 w-full h-full bg-transparent">
      <div className="relative flex flex-col justify-between min-w-0 max-h-[80vh] break-words bg-gray-400 rounded p-2 space-y-6 overflow-y-scroll">
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
                  className="w-full border border-gray-50 border-1 rounded-lg"
                >
                  <div
                    key={item.order}
                    id={`${item.id}`}
                    draggable={sectionIsDraggable}
                    onDragStart={handleSectionDragStart}
                    className="w-full text-base uppercase"
                  >
                    <div
                      onMouseOver={handleDraggableTrue}
                      ref={ref => {
                        if (ref) {
                          return (myRefs.current[item.order] = ref)
                        }
                      }}
                      className="w-full text-xl p-6 bg-gray-300 text-white rounded-t-lg hover:cursor-grab active:cursor-grabbing select-none"
                    >
                      {item.title}
                    </div>

                    <div className="px-4">
                      {item.inputTypes?.length > 0 &&
                        item.inputTypes
                          .sort((a, b) => a.order - b.order)
                          .map((itm: FormFieldType) => {
                            return (
                              <div
                                key={`${item.id}-${itm.order}`}
                                id={`${itm.id}#${item.id}`}
                                onDrop={handleFieldDrop}
                                onDragOver={handleFieldDragOver}
                                className="w-full p-2 my-2 border-2 hover:cursor-grab active:cursor-grabbing bg-gray-300 text-white rounded-lg text-base uppercase"
                              >
                                <div
                                  draggable
                                  key={itm.id}
                                  id={`${itm.id}#${item.id}`}
                                  onDragStart={handleFieldDragStart}
                                >
                                  <div className="flex justify-between items-center mx-6 select-none">
                                    {itm.type}({itm.order + 1})
                                    <PrimaryButton
                                      text="X"
                                      type="button"
                                      width="w-min"
                                      name="remove-field"
                                      id={`${itm.id}#${item.id}`}
                                      key={`${InputType[key]}`}
                                      onClick={handleFormFieldsRemove}
                                      textColour="text-white"
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                    </div>
                  </div>
                  {item.hasLineBreak && <hr className="mt-4" />}
                </div>
              )
            })}
      </div>
    </div>
  </div>
)
}

export default FormFields
