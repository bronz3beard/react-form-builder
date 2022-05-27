import React, { Dispatch, DragEvent } from 'react'
import { FormFieldType, FormSection } from '../formTypes'
import useStateWithLocal from './useStateWithLocal'

export type Section = {
    handleSectionDragOver: (event: DragEvent<HTMLDivElement>) => void
    handleSectionDragStart: (event: DragEvent<HTMLDivElement>) => void
    handleSectionDrop: (event: DragEvent<HTMLDivElement>) => void
}

export type Field = {
    handleFieldDrop: (event: DragEvent<HTMLDivElement>) => void
    handleFieldDragOver: (event: DragEvent<HTMLDivElement>) => void
    handleFieldDragStart: (event: DragEvent<HTMLDivElement>) => void
}

export type DragAndDropProps = {
    section: Section
    field: Field
}

const useDragDrop = (
    formSections: FormSection[],
    setFormSections: Dispatch<FormSection[]>,
): DragAndDropProps => {
    const [sectionDragId, setSectionDragId] = useStateWithLocal<string>(
        'sectionDragId',
        '',
    )
    const [fieldDragId, setFieldDragId] = useStateWithLocal<string>(
        'fieldDragId',
        '',
    )

    const handleSectionDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const handleSectionDragStart = (event: DragEvent<HTMLDivElement>) => {
        const id = event.currentTarget.id

        setSectionDragId(id)
    }

    const handleSectionDrop = (event: DragEvent<HTMLDivElement>) => {
        const id = event.currentTarget.id

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

            const dropFieldSectionId = newSectionFields?.sectionId ?? id

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
        const sectionId = idValues[1]

        const getSection = formSections.find(item => item.id === sectionId)

        if (getSection) {
            const oldSection = getSection.inputTypes.find(
                item => item.id === fieldDragId,
            )
            const newSection = getSection.inputTypes.find(
                item => item.id === fieldId,
            )

            const dragFieldOrder = oldSection?.order ?? 0
            const dropFieldOrder = newSection?.order ?? 0

            getSection.inputTypes.map((item: FormFieldType) => {
                if (item.id === fieldDragId) {
                    item.order = dropFieldOrder
                }
                if (item.id === fieldId) {
                    item.order = dragFieldOrder
                }

                return item
            })

            setFormSections([...formSections, getSection])
        }
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

    return {
        section: {
            handleSectionDragOver,
            handleSectionDragStart,
            handleSectionDrop,
        },
        field: {
            handleFieldDrop,
            handleFieldDragOver,
            handleFieldDragStart,
        },
    }
}

export default useDragDrop
