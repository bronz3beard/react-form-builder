import Airtable, { FieldSet } from 'airtable'

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY
const AIRTABLE_BASE = import.meta.env.VITE_AIRTABLE_BASE
const AIRTABLE_TABLE = import.meta.env.VITE_AIRTABLE_TABLE

const config = {
  baseName: AIRTABLE_BASE,
  table: AIRTABLE_TABLE,
  // gridView: 'Main View',
  recordBuilder: (record: { id: any }) => ({
    id: record.id,
  }),
}

export const airTableAddRecord = async (
  data: string[] | Partial<FieldSet>[] | { fields: Partial<FieldSet> }[],
) => {
  const baseName: string = config.baseName as string
  const tableName: string = config.table as string

  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: AIRTABLE_API_KEY,
  })
  const base = Airtable.base(baseName)

  const response = new Promise((resolve, reject) => {
    base(tableName).create(data, (err: Error, record: any) => {
      if (err) {
        reject(err)
      } else {
        resolve(config.recordBuilder(record))
      }
    })
  })

  return response
}
