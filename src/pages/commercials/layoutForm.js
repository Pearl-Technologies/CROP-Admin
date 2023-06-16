// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import axios from 'axios'

// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const layoutFrom = () => {

  const [basePrice, setBasePrice] = useState([])

  // Handle Password
  const handleChange = prop => event => {
    setBasePrice({ ...basePrice, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const fetchBasePrice = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getBasePrice`)
      .then(function (response) {
        setBasePrice(response.data.defaultPrice[0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const updateBasePrice = () => {
    axios({ url: `${process.env.HOST}/api/admin/updateBasePrice`, method: 'post', data: basePrice })
      .then(function (response) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: "Toastify__progress-bar--animated",
          
        })
      })  
      .catch(function (error) {
        console.log(error.message)
        toast.success(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: "Toastify__progress-bar--animated",       
        })
      })
  }

  useEffect(() => {
    fetchBasePrice()
  }, [])
  return (
    <Card>
      <ToastContainer/>
      <CardHeader title='Commercial' titleTypographyProps={{ variant: 'h5' }} />
      <Grid item xs={4}>
              <Typography variant='body' style={{marginLeft:"20px"}}>Update Base Prices</Typography>
            </Grid>
          <Grid container spacing={3} style={{padding:"25px"}}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Base Price for Top Ranking of Offers (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.top_offers}
                onChange={handleChange('top_offers')}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Base Price for Top Ranking of Promos (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.top_promo}
                onChange={handleChange('top_promo')}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Base Price for Top Ranking of Offers - Store (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.top_storeOffer}
                onChange={handleChange('top_storeOffer')}
                focused
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Base Price for Mass Notifications (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.massNotification}
                onChange={handleChange('massNotification')}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Base Price for Survey Design Assistance (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.surveyDesign}
                onChange={handleChange('surveyDesign')}
                focused
              />
            </Grid>
            {/* <Grid item xs={4}>
              <TextField
                fullWidth
                label='Set valuation for CROP for Earn CROPs (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.earnCropValuation}
                onChange={handleChange('earnCropValuation')}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Set valuation for CROP for Redeem CROPs (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.redeemCropValuation}
                onChange={handleChange('redeemCropValuation')}
                focused
              />
            </Grid> */}
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Weekday (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.weekday}
                focused
                onChange={handleChange('weekday')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Weekend (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.weekend}
                onChange={handleChange('weekend')}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='Public Holidays (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.publicHoliday}
                onChange={handleChange('publicHoliday')}
                focused
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label='monthly (AUD)'
                // placeholder='Enter the value'
                value={basePrice?.monthly}
                onChange={handleChange('monthly')}
                focused
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }} onClick={updateBasePrice}>
                update
              </Button>
            </Grid>
    </Card>
  )
}

export default layoutFrom
