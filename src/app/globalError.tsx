"use client"

import React from 'react'

const GlobalError = ({error} : {error: Error & {digest?: string}; }) => {
  return (
    <html>
        <body>
            <h1>Global Error</h1>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
        </body>
    </html>
  )
}

export default GlobalError