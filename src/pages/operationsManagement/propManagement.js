// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Divider from '@mui/material/Divider'
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const CropMilestone = () => {
  const [open, setOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const [message, setMessage] = useState([])
  const [reponseCode, setResponseCode] = useState(null)
  const [values, setValues] = useState({
    defaultProp: '',
    purchaseProp: ''
  })
  const [milestoneValue, setMileStoneValue] = useState({
    first: {
      base: 40,
      silver: 50,
      gold: 55,
      platinum: 60
    },
    second: {
      base: 120,
      silver: 120,
      gold: 132,
      platinum: 144
    },
    third: {
      base: 300,
      silver: 300,
      gold: 330,
      platinum: 360
    },
    fourth: {
      base: 60,
      silver: 60,
      gold: 66,
      platinum: 72
    }
  })
  const [confirmPassValues, setConfirmPassValues] = useState({
    password: '',
    showPassword: false
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleMileStoneDataChange = (obj, prop) => event => {
    event.preventDefault()
    if (obj === 'first') {
      setMileStoneValue(milestoneValue => ({
        ...milestoneValue,
        first: { ...milestoneValue.first, [prop]: event.target.value }
      }))
    }
    if (obj === 'second') {
      setMileStoneValue(milestoneValue => ({
        ...milestoneValue,
        second: { ...milestoneValue.second, [prop]: event.target.value }
      }))
    }
    if (obj === 'third') {
      setMileStoneValue(milestoneValue => ({
        ...milestoneValue,
        third: { ...milestoneValue.third, [prop]: event.target.value }
      }))
    }
    if (obj === 'fourth') {
      setMileStoneValue(milestoneValue => ({
        ...milestoneValue,
        fourth: { ...milestoneValue.fourth, [prop]: event.target.value }
      }))
    }
  }

  const handleConfirmPassChange = propValuationDataprop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: parseInt(event.target.value) })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const fetchPropData = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getPropValuation`)
      .then(function (response) {
        setValues(response.data.propValuationData[0])
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchDefaultMileStoneData = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getMilestoneData`)
      .then(function (response) {
        setMileStoneValue(response.data.milestoneReport[0])
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const handelUpdate = e => {
    setUpdateStatus(true)
    e.preventDefault()
 
    let body={'defaultProp': parseInt(values.defaultProp),
    'purchaseProp': parseFloat(values.purchaseProp),
    '_id': values._id,
    'user': values.user}
    axios({
      method: 'post',
      url: `${process.env.HOST}/api/admin/updatePropValuation`,
      data: body
    })
      .then(function (response) {
        setUpdateStatus(false)
        setMessage(response.data)
        setResponseCode(response.status)
        toast.success(response.data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
      .catch(function (error) {
        setUpdateStatus(false)
        console.log(error)
        setMessage(error.response.data)
        setResponseCode(error.response.status)
        toast.success(response.data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
  }
  const handelMileStoneUpdate = e => {
    setUpdateStatus(true)
    e.preventDefault()
    axios({
      method: 'post',
      url: `${process.env.HOST}/api/admin/updateMilestoneData`,
      data: milestoneValue
    })
      .then(function (response) {
        setUpdateStatus(false)
        console.log(response)
        setMessage(response.data)
        setResponseCode(response.status)
        toast.success(response.data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
      .catch(function (error) {
        setUpdateStatus(false)
        console.log(error)
        setMessage(error.response.data)
        setResponseCode(error.response.status)
        toast.success(error.response.data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
        })
      })
  }
  useEffect(() => {
    fetchPropData()
    fetchDefaultMileStoneData()
  }, [])
  
  return (
    <DatePickerWrapper>
      {updateStatus && <LinearProgress/>}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Prop' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <h5 style={{ marginLeft: 'auto' }}> 1PROP (default)</h5>
                  </Grid>
                  <Grid item xs={6} spacing={2}>
                    <TextField
                      label={'AUD'}
                      value={values?.defaultProp}
                      style={{ marginBottom: '8px' }}
                      onChange={handleChange('defaultProp')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <h5 style={{ marginLeft: 'auto' }}> 1PROP (purchase)</h5>
                  </Grid>
                  <Grid item xs={6} spacing={2}>
                    <TextField
                      label={'AUD'}
                      value={values?.purchaseProp}
                      style={{ marginBottom: '8px' }}
                      onChange={handleChange('purchaseProp')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Button type='submit' variant='contained' size='large' onClick={handelUpdate}>
                        Update
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Milestone data' titleTypographyProps={{ variant: 'h6' }} />
            {milestoneValue && (
              <CardContent>
                <form onSubmit={e => e.preventDefault()} style={{height:"190px", overflow:"auto", padding:"10px"}}>
                  <Grid container spacing={5}>
                    <Grid item xs={6}>
                      <h5 style={{ marginLeft: 'auto' }}> CROP 5k</h5>
                    </Grid>
                    <Grid item xs={6} spacing={2}>
                      <TextField
                        label='Base'
                        value={milestoneValue.first.base}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('first', 'base')}
                      />
                      <TextField
                        label='Silver'
                        style={{ marginBottom: '8px' }}
                        value={milestoneValue.first.silver}
                        onChange={handleMileStoneDataChange('first', 'silver')}
                      />
                      <TextField
                        label='Gold'
                        value={milestoneValue.first.gold}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('first', 'gold')}
                      />
                      <TextField
                        label='Platinum'
                        value={milestoneValue.first.platinum}
                        onChange={handleMileStoneDataChange('first', 'platinum')}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <h5 style={{ marginLeft: 'auto' }}> CROP 10k</h5>
                    </Grid>
                    <Grid item xs={6} spacing={2}>
                      <TextField
                        label='Base'
                        value={milestoneValue.second.base}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('second', 'base')}
                      />
                      <TextField
                        label='Silver'
                        value={milestoneValue.second.silver}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('second', 'silver')}
                      />
                      <TextField
                        label='Gold'
                        value={milestoneValue.second.gold}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('second', 'gold')}
                      />
                      <TextField
                        label='Platinum'
                        value={milestoneValue.second.platinum}
                        onChange={handleMileStoneDataChange('second', 'platinum')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <h5 style={{ marginLeft: 'auto' }}> CROP 25k</h5>
                    </Grid>

                    <Grid item xs={6} spacing={2}>
                      <TextField
                        label='Base'
                        value={milestoneValue.third.base}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('third', 'base')}
                      />
                      <TextField
                        label='Silver'
                        value={milestoneValue.third.silver}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('third', 'silver')}
                      />
                      <TextField
                        label='Gold'
                        value={milestoneValue.third.gold}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('third', 'gold')}
                      />
                      <TextField
                        label='Platinum'
                        value={milestoneValue.third.platinum}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('third', 'platinum')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <h5 style={{ marginLeft: 'auto' }} xs={6} title='multiple of props/5k crops after 25k crops'>
                        {' '}
                        CROP 25k Plus{' '}
                      </h5>
                    </Grid>

                    <Grid item xs={6} spacing={6}>
                      <TextField
                        label='Base'
                        value={milestoneValue.fourth.base}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('fourth', 'base')}
                      />
                      <TextField
                        label='Silver'
                        value={milestoneValue.fourth.silver}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('fourth', 'silver')}
                      />
                      <TextField
                        label='Gold'
                        value={milestoneValue.fourth.gold}
                        style={{ marginBottom: '8px' }}
                        onChange={handleMileStoneDataChange('fourth', 'gold')}
                      />
                      <TextField
                        label='Platinum'
                        value={milestoneValue.fourth.platinum}
                        onChange={handleMileStoneDataChange('fourth', 'platinum')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          gap: 5,
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Button type='submit' variant='contained' size='large' onClick={handelMileStoneUpdate}>
                          Update
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            )}
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default CropMilestone
