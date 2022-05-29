/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AIRTABLE_API_KEY: string
  readonly VITE_AIRTABLE_BASE: string
  readonly VITE_AIRTABLE_TABLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
