// ** React Imports
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios'
import MuiAlert from '@mui/material/Alert'
// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import Email from 'mdi-material-ui/EmailOutline'
import Key from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import LinearProgress from '@mui/material/LinearProgress'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MenuItem } from '@mui/material'
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action
  }

  // ** State
  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false
  })
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState([])
  const [loginStatus, setLoginStatus] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const theme = useTheme()
  const router = useRouter()

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }
  const login = () => {
    setLoginStatus(true)
    if (rememberMe) {
      localStorage.setItem('email', values.email)
      // localStorage.setItem('password', values.password)
    }
    axios
      .post(`${process.env.HOST}/api/admin/adminLogIn`, values)
      .then(function (response) {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.accessToken)
          localStorage.setItem('user', response.data.user)
          localStorage.setItem('profileImage', response.data.profileImage)
          localStorage.setItem('name', response.data.name)
          setLoginStatus(false)
          router.push('/')
        } else {
          setLoginStatus(false)
        }
      })
      .catch(function (error) {
        setLoginStatus(false)
        console.log(error)
        let msg = error?.response?.data?.msg
        toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: 'Toastify__progress-bar--animated'
        })
      })
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/admin')
    }
    setValues({ ...values, ['email']: localStorage.getItem('email') })
  }, [])
  return (
    <Box
      className='content-center'
      style={{
        backgroundImage: `url("/images/BG.png")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <ToastContainer />
      <Card sx={{ zIndex: 1, boxShadow: 10 }} style={{ width: '28%' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logo.png' alt='logo' width='100px' />
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <Box borderRadius={'50%'}>
              <TextField
                autoFocus
                fullWidth
                size='small'
                id='email'
                label='Email'
                sx={{ marginBottom: 4, border: 'none' }}
                onChange={handleChange('email')}
                value={values.email}
                InputProps={{
                  style: {
                    borderRadius: '20px'
                  },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Box sx={{display:"flex", gap:3}}>
                        <Email />
                        <svg
                          margin_left='10'
                          width='3'
                          height='21'
                          viewBox='0 0 3 21'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            opacity='0.43'
                            d='M0.804917 1.2023H1.56664V20.4611H0.804917V1.2023Z'
                            fill='#2D6192'
                            stroke='#2D6192'
                          />
                        </svg>
                      </Box>
                    </InputAdornment>
                  )
                }}
              ></TextField>
            </Box>
            {/* <img src="/images/login_page/Combined_shape_17.png" alt="email" width="20px"/> */}
            <FormControl fullWidth>
              {/* <InputLabel htmlFor='auth-login-password'>Password</InputLabel> */}
              <TextField
                size='small'
                label='Password'
                value={values.password}
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                InputProps={{
                  style: {
                    borderRadius: '20px'
                  },
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Box sx={{display:"flex", gap:3}}>
                        <Key />
                        <svg
                          margin_left='10'
                          width='3'
                          height='21'
                          viewBox='0 0 3 21'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            opacity='0.43'
                            d='M0.804917 1.2023H1.56664V20.4611H0.804917V1.2023Z'
                            fill='#2D6192'
                            stroke='#2D6192'
                          />
                        </svg>
                      </Box>
                    </InputAdornment>
                  )
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                control={<Checkbox style={{ color: '#5d53d4' }} />}
                label='Remember Me'
                onClick={() => setRememberMe(remember => !remember)}
              />
              <Link passHref href='/pages/forgotPassword'>
                <LinkStyled>Forgot Password?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='small'
              // variant='contained'
              style={{ backgroundColor: '#58D1FC', color: 'white' }}
              sx={{ marginBottom: 7, borderRadius:"20px" }}
              onClick={login}
              disabled={loginStatus}
            >
              Login
            </Button>
            {loginStatus && <LinearProgress />}
            {/* <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                New on our platform?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                  <LinkStyled>Create an account</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
      <Card sx={{ marginLeft: '-80px' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/rewardGift.png' alt='logo' height={400} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
