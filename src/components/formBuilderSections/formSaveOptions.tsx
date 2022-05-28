import React, { FC, MouseEvent } from 'react'
import { FormSection } from '../../formTypes'
import { PrimaryButton } from '../common/button'

type FormSaveProps = {
    formSections: FormSection[]
}

const FormSaveOptions: FC<FormSaveProps> = (props: FormSaveProps) => {
    const { formSections } = props
    console.log(
        '🚀 ~ file: formSaveOptions.tsx ~ line 11 ~ formSections',
        formSections,
    )

    // const createExportCSV = (arrayHeader, arrayData, delimiter, fileName) => {
    //     const header = arrayHeader.join(delimiter) + '\n'
    //     let csv = header

    //     arrayData.forEach(obj => {
    //         const row = []
    //         for (key in obj) {
    //             if (obj.hasOwnProperty(key)) {
    //                 row.push(obj[key])
    //             }
    //         }
    //         csv += row.join(delimiter) + '\n'
    //     })

    //     const csvData = new Blob([csv], { type: 'text/csv' })
    //     const csvUrl = URL.createObjectURL(csvData)

    //     // hiddenElement.target = '_blank';
    //     // hiddenElement.download = fileName + '.csv';
    //     // hiddenElement.click();
    //     window.open(csvUrl)
    // }

    const downloadCSV = (event: MouseEvent<HTMLButtonElement>) => {
        // const dummyData = 'rahul,delhi,accountsdept\n'
        // const csvContent = `data:text/csv;charset=utf-8,${dummyData}`
        // const encodedURI = encodeURI(csvContent)
        // window.open(encodedURI)
        // createExportCSV()
    }

    return (
        <div className="w-full flex lg:flex-row flex-col items-start justify-center my-2 p-2 border border-1 border-gray-200 rounded-md">
            <div className="lg:w-1/2 w-full">
                <PrimaryButton
                    id="csv"
                    type="button"
                    name="download-csv"
                    text="Download CSV"
                    onClick={downloadCSV}
                />
            </div>
        </div>
    )
}

export default FormSaveOptions
