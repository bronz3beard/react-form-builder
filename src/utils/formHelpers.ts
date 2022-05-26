import { FormFieldSections, FormSection } from '../formTypes'

export const buildFormFieldSections = (
    formSections: FormSection[],
): FormFieldSections => {
    const sections: FormFieldSections = {}

    formSections.map(item => {
        item.id
        sections[item.id] = item.inputTypes
    })

    return sections
}
