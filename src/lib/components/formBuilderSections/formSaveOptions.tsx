import React, { FC, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { FormSection } from '../../formTypes'

type FormSaveProps = {
  formName: string
  formSections: FormSection[]
}

const FormSaveOptions: FC<FormSaveProps> = (props: FormSaveProps) => {
  const { formName, formSections } = props
  const [cSVExportData, setCSVExportData] = useState<string[][]>([])

  useEffect(() => {
    const createExportCSV = () => {
      const fields: string[][] = []
      const columns: string[] = []
      const arrayLength: number = formSections.length

      for (let i = 0; i < arrayLength; i += 1) {
        fields[i] = []
      }

      formSections.forEach((value, i) => {
        const headerTitle = value.title
        fields[i % arrayLength].push(headerTitle)
        columns.push('')

        value.inputTypes.forEach((itm, j) => {
          fields[i % arrayLength].push(itm.type)
        })
      })

      setCSVExportData([columns, ...fields])
    }

    createExportCSV()
  }, [])

  return (
    <div className="w-full flex lg:flex-row flex-col items-start justify-center my-2 p-2 border border-1 border-gray-200 rounded-md">
      <div className="lg:w-1/2 w-full">
        <CSVLink
          target="_blank"
          data={cSVExportData}
          filename={`${formName}.csv`}
          className="flex flex-row w-full items-center static text-center text-white bg-primary-colour not-italic tracking-tight font-base text-xs lg:text-base px-2 font-medium rounded-lg p-2"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  )
}

export default FormSaveOptions
