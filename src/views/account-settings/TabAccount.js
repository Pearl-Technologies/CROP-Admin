// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** MUI Imports
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress'
// ** Icons Imports
import Snackbar from '@mui/material/Snackbar'
import Close from 'mdi-material-ui/Close'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [date, setDate] = useState(null)
  const [open, setOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const [message, setMessage] = useState("")
  const [openAlert, setOpenAlert] = useState(false)
  const [imgSrc, setImgSrc] = useState([])
  const [data, setData] = useState({
    name: '',
    email: '',
    birthDate: null,
    phone: '',
    gender: ''
  })
  const [imageFile, setImageFile] = useState(null);
  const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
  })
  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      // reader.onload = () => setImgSrc(reader.result)
      setImgSrc(files[0])
      reader.readAsDataURL(files[0])
    }
  }

  const handelChange = prop => event => {
    setData({ ...data, [prop]: event.target.value })
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

  const handleSubmit = async(e) => {
    e.preventDefault()
    setUpdateStatus(true)
    const formData = new FormData()
    formData.append('name', data?.name)
    formData.append('birthDate', data?.birthDate)
    formData.append('phone', data?.phone)
    formData.append('gender', data?.gender)
    formData.append('image', imageFile);
    await axios
      .post(`${process.env.HOST}/api/admin/updateAdminUser`, formData, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": 'multipart/form-data'
        }
      })
      .then(function (response) {
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
        setMessage(response.data.msg);
        setUpdateStatus(false)
      })
      .catch(function (error) {
        console.log(error)
        setUpdateStatus(false)
        let msg = error?.response?.data?.msg
        setMessage(msg);
        toast.error(msg, {
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
  
  const getDetails = async () => {
    const resoponse = await fetch(`${process.env.HOST}/api/admin/getAdminData`, {
      method: 'post',
      headers: { authorization: `Bearer ${localStorage.getItem('token')}`, 'content-type': 'application/json' }
    })
    
    const parseData = await resoponse.json()
    // setImgSrc(parseData.user[0]?.imageUrl)
    setData(parseData.user)
  }
  useEffect(() => {
    getDetails()
  }, [message])
  
  return (
    <CardContent>
      {updateStatus && <LinearProgress />}
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
      <form encType='multipart/form-data'>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={`${process.env.HOST}/api/products/image/${data?.filename}`} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={(e) => setImageFile(e.target.files[0])}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                {/* <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled> */}
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              placeholder='John Doe'
              value={data?.name}
              onChange={handelChange('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              // placeholder='johnDoe@example.com'
              value={data?.email}
              // onChange={handelChange('email')}
              aria-readonly
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={new Date(data?.birthDate).valueOf()}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                // onChange={date => {setDate(date); setData({...data, ['birthDate']: date})}}
                onChange={date => setData({ ...data, birthDate: new Date(date).toDateString() })}
              />
            </DatePickerWrapper>
          </Grid>
          {/* <Grid item xs={12} sm={6} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Day</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={data.day}
                  label='Day'
                  onChange={handelChange('day')}
                >
                  {[
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
                    27, 28, 29, 30, 31
                  ].map(day => (
                    <MenuItem value={day} key={'day' + day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            </Grid>
            <Grid item xs={12} sm={6} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Month</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={data.month}
                  label='Month'
                  onChange={handelChange('month')}
                >
                  {[
                   'Jan', 'Feb', 'Mar', 'Apr','May','Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                  ].map(month => (
                    <MenuItem value={month} key={'month' + month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            </Grid>
            <Grid item xs={12} sm={6} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Age Group</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={data.agegroup}
                  label='Age Group'
                  onChange={handelChange('agegroup')}
                >
                  <MenuItem value={'13 – 18 Years'}>13 – 18 Years</MenuItem>
                  <MenuItem value={'18 – 25 Years'}>18 – 25 Years</MenuItem>
                  <MenuItem value={'25 – 35 Years'}>25 – 35 Years</MenuItem>
                  <MenuItem value={'35 – 45 Years'}>35 – 45 Years</MenuItem>
                  <MenuItem value={'45 – 55 Years'}>45 – 55 Years</MenuItem>
                  <MenuItem value={'Over 55 Years'}>Over 55 Years</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='number'
              label='Phone'
              value={data.phone}
              placeholder='(123) 456-7890'
              onChange={handelChange('phone')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Gender</FormLabel>
              <RadioGroup
                row
                defaultValue='male'
                value={data.gender}
                aria-label='gender'
                name='account-settings-info-radio'
                onChange={handelChange('gender')}
              >
                <FormControlLabel value='male' label='Male' control={<Radio />} />
                <FormControlLabel value='female' label='Female' control={<Radio />} />
                <FormControlLabel value='other' label='Other' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
              Save Changes
            </Button>
            {/* <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
