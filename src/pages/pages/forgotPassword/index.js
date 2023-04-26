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
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import LinearProgress from '@mui/material/LinearProgress';


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

const ForgotPassword = () => {
  if (typeof window !== 'undefined') {
    // Perform localStorage action

  }


  // ** State
  const [values, setValues] = useState({
    password: '',
    email:'',
    showPassword: false
  })
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState([])
  const [loginStatus, setLoginStatus] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    setLoginStatus(true);
    
    axios
      .post(`${process.env.HOST}/api/admin/passwordRest_email`, values)
      .then(function (response) {
        console.log(response)
        if(response.status === 200){
          setLoginStatus(false);
          localStorage.setItem('email', values.email)
          router.push('/pages/passwordReset')
        }else{
          console.log("status code change")
          setLoginStatus(false);
        }
      })
      .catch(function (error) {
        setLoginStatus(false);
        console.log(error);
        let {errors} = error.response.data;
        console.log(errors)
        // console.log(error)
          handleClick()
          // console.log(message);
        
      })
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })
  useEffect(() => {
    setValues({ ...values, ['email']: localStorage.getItem('email'), ['password']:localStorage.getItem('password') })

  }, [])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='/images/logo.png' alt='logo' width='150px' />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {/* {themeConfig.templateName} */}
            </Typography>
          </Box>
          <Typography variant="h5" component="h2" textAlign={"center"}>Forgot Password</Typography>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              focused
              label='Email'
              sx={{ marginBottom: 4 }}
              onChange={handleChange('email')}
              value={values.email}
            />
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={login} disabled={loginStatus}>
              submit
            </Button>
            <Link passHref href='/pages/login'>
                <LinkStyled>Go to Login</LinkStyled>
              </Link>
            {loginStatus &&<LinearProgress/>}
          
          </form>
        </CardContent>
        <Stack spacing={2} sx={{ width: '100%' }}>
        
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} style={{ border: '1px solid blue' }}>
            <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
              {message?.msg}
            </Alert>
          </Snackbar>
        </Stack>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
ForgotPassword.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
