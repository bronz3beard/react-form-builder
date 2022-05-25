import { StrictMode } from 'react'
import React, { createRoot } from 'react-dom/client'
import App from './App'
import '../assets/main.css'

const container = document.getElementById('root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)
