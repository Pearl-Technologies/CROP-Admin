import * as React from 'react'

import { StyledEngineProvider } from '@mui/material/styles'
import SearchCI from './searchCustomiseInput'

export default function Search() {
  return (
    <StyledEngineProvider injectFirst>
      <SearchCI />
    </StyledEngineProvider>
  )
}
