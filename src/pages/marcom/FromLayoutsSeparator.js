// ** React Imports
import React, { forwardRef, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Checkbox from '@mui/material/Checkbox'
const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
import Table from '@mui/material/Table'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TableContent from './table';
import axios from 'axios'
import BasicTable from './basicTable'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const user = ['All User', 'Business User', 'Customer User']
const area = ['Region', 'Pin Code', 'Age', 'CROP', 'Nature of Business']

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  const customer = require('../../db/users_customers.json')
  const business = require('../../db/businesses.json')
  const users = customer.concat(business)
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [customerData, setCustomerData] = useState();
  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  // useEffect(()=>{
    
  // },[])

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])

  const handleChange = event => {
    const {
      target: { value }
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  return (
    <Card>
      <CardHeader title='Marcom  (Marketing and Communication)' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        {/* <CardContent>
          <div style={{ display: 'flex' }}>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id='demo-multiple-name-label'>User</InputLabel>
                <Select
                  labelId='demo-multiple-name-label'
                  id='demo-multiple-name'
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label='User' />}
                  MenuProps={MenuProps}
                >
                  {customer.map(name => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id='demo-multiple-name-label'>content</InputLabel>
                <Select
                  labelId='demo-multiple-name-label'
                  id='demo-multiple-name'
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label='content' />}
                  MenuProps={MenuProps}
                >
                  {area.map(name => (
                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField id='standard-basic' label='value' variant='outlined' />
          </div>
        </CardContent> */}
              <BasicTable/>

      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
