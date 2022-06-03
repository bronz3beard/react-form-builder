import React, { useCallback, FC, Dispatch, MouseEvent } from 'react'
import { FormBuilderSections } from '../../App'
import { clearAllSessionStorage } from '../../utils/sessionStorage'
import { PrimaryButton } from '../common/button'

type NavButtonProps = {
  formBuildSection: FormBuilderSections
  setFormBuildSection: Dispatch<FormBuilderSections>
}

const NavButtonRow: FC<NavButtonProps> = (props: NavButtonProps) => {
  const { formBuildSection, setFormBuildSection } = props

  const handleNext = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()

      let toNextSection: FormBuilderSections = formBuildSection

      if (formBuildSection === FormBuilderSections.NAME) {
        toNextSection = FormBuilderSections.SECTIONS
      } else if (formBuildSection === FormBuilderSections.SECTIONS) {
        toNextSection = FormBuilderSections.INPUT_TYPES
      } else if (formBuildSection === FormBuilderSections.INPUT_TYPES) {
        toNextSection = FormBuilderSections.REVIEW
      } else if (formBuildSection === FormBuilderSections.REVIEW) {
        toNextSection = FormBuilderSections.SAVE_EDIT
      } else if (formBuildSection === FormBuilderSections.SAVE_EDIT) {
        toNextSection = FormBuilderSections.SAVE_EDIT
      }

      setFormBuildSection(toNextSection)
    },
    [formBuildSection],
  )

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
      } else if (formBuildSection === FormBuilderSections.REVIEW) {
        backToSection = FormBuilderSections.INPUT_TYPES
      } else if (formBuildSection === FormBuilderSections.SAVE_EDIT) {
        backToSection = FormBuilderSections.REVIEW
      }

      setFormBuildSection(backToSection)
    },
    [formBuildSection],
  )

  const handleFormReset = () => {
    location.reload()
    clearAllSessionStorage()
  }

  return (
    <div className="flex space-x-4 float-right">
      {formBuildSection !== FormBuilderSections.NAME && (
        <PrimaryButton
          text="Restart Form"
          type="button"
          width="w-32"
          name="form-navigation"
          textColour="text-white"
          onClick={handleFormReset}
          buttonBackgroundColour="bg-red-500"
          buttonClass="flex flex-row items-center rounded-lg font-medium p-2"
          childContainerClass="w-full items-center static text-center not-italic tracking-tight font-base text-xs lg:text-base px-2"
        />
      )}
      {formBuildSection !== FormBuilderSections.NAME && (
        <PrimaryButton
          text="Back"
          type="button"
          width="w-16"
          onClick={handleBack}
          name="form-navigation"
          textColour="text-white"
          buttonClass="flex flex-row items-center rounded-lg font-medium p-2"
          childContainerClass="w-full items-center static text-center not-italic tracking-tight font-base text-xs lg:text-base px-2"
        />
      )}
      <PrimaryButton
        text="Next"
        type="button"
        width="w-16"
        onClick={handleNext}
        name="form-navigation"
        textColour="text-white"
        buttonClass="flex flex-row items-center rounded-lg font-medium p-2"
        childContainerClass="w-full items-center static text-center not-italic tracking-tight font-base text-xs lg:text-base px-2"
      />
    </div>
  )
}

export default NavButtonRow
