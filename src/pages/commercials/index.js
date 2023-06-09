import React from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from './layoutForm'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Commercials = () => {
  return (
    <DatePickerWrapper>
        <FormLayoutsAlignment />
  </DatePickerWrapper>
  )
}

export default Commercials



