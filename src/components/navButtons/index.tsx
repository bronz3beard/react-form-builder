import React, { useCallback, FC, Dispatch, MouseEvent } from 'react'
import { FormBuilderSections } from '../../App'
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

    return (
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
    )
}

export default NavButtonRow
