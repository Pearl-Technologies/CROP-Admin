import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import CardMedia from '@mui/material/CardMedia'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Eye from 'mdi-material-ui/Eye'
import { useRouter } from 'next/router'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: 800,
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4
}
const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const statusObj = {
  presuspend: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}

const Complaint = () => {
  const [updateStatus, setUpdateStatus] = useState(false)
  const [message, setMessage] = useState([])
  const [reponseCode, setResponseCode] = useState(null)
  const router = useRouter()
  // const customerComplain = require('../../db/admin_customer_complains')
  const businessComplain = require('../../db/admin_business_complains.json')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const fetchCustomerDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getCustomerComplain`)
      .then(function (response) {
        setCustomerData(response.data.getComplainList)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  function BusinessModal({ user }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [data, setData] = useState(user)
    const handleChange = prop => event => {
      setData({ ...data, [prop]: event.target.value })
    }
    const updateComplaint = () => {
      setUpdateStatus(true)
      axios({
        url: `${process.env.HOST}/api/admin/updateBusinessComplain`,
        method: 'post',
        data: data
      })
        .then(function (response) {
          console.log(response)
          setUpdateStatus(false)
          setMessage(response.data)
          setResponseCode(response.status)
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: "Toastify__progress-bar--animated",
          })
        })
        .catch(function (error) {
          setUpdateStatus(false)
          console.log(error)
          setMessage(error?.response?.data)
          setResponseCode(error?.response?.status)
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: "Toastify__progress-bar--animated",
          })
        })
      handleClose()
    }
    return (
      <div>
        <Button onClick={handleOpen}>{data.complainNumber.toLocaleString('en-US', { maximumFractionDigits: 0, maximumSignificantDigits: 7 }).slice(0, 7)}</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Update
            </Typography>
            <Typography sx={{ mt: 2, width: '100%' }}>
              <TextField label='request number' disabled variant='outlined' focused value={data.complainNumber} />
            </Typography>
            <Typography sx={{ mt: 2, width: '100%' }}>
              <Select value={data.complainStatus} onChange={handleChange('complainStatus')}>
                <MenuItem value={'received'}>Received</MenuItem>
                <MenuItem value={'process'}>Process</MenuItem>
                <MenuItem value={'completed'}>Completed</MenuItem>
              </Select>
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <TextField
                sx={{ width: '100%' }}
                label='Response'
                variant='outlined'
                focused
                value={data.complainResponse}
                onChange={handleChange('complainResponse')}
              />
            </Typography>
            <Button onClick={updateComplaint} variant='contained' style={{ margin: '2px', float: 'right' }}>
              Update
            </Button>
            {updateStatus && <CircularProgress />}
          </Box>
        </Modal>
      </div>
    )
  }

  function CustomerModal({ user }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [data, setData] = useState(user)
    const handleChange = prop => event => {
      setData({ ...data, [prop]: event.target.value })
    }

    const updateRequest = () => {
      setUpdateStatus(true)
      axios({
        url: `${process.env.HOST}/api/admin/updateCustomerComplaint`,
        method: 'post',
        data: data
      })
        .then(function (response) {
          console.log(response)
          setUpdateStatus(false)
          setMessage(response.data)
          setResponseCode(response.status)
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: "Toastify__progress-bar--animated",
          })
        })
        .catch(function (error) {
          setUpdateStatus(false)
          console.log(error)
          setMessage(error?.response?.data)
          setResponseCode(error?.response?.status)
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: "Toastify__progress-bar--animated",
          })
        })
      handleClose()
    }
    return (
      <div>
        <Button onClick={handleOpen}>{data.complainNumber.toLocaleString('en-US', { maximumFractionDigits: 0, maximumSignificantDigits: 7 }).slice(0, 7)}</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Update
            </Typography>
            <Typography sx={{ mt: 2, width: '100%' }}>
              <TextField label='request number' disabled variant='outlined' focused value={data.complainNumber} />
            </Typography>
            <Typography sx={{ mt: 2, width: '100%' }}>
              <Select value={data.complainStatus} onChange={handleChange('complainStatus')}>
                <MenuItem value={'received'}>Received</MenuItem>
                <MenuItem value={'process'}>Process</MenuItem>
                <MenuItem value={'completed'}>Completed</MenuItem>
              </Select>
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <TextField
                sx={{ width: '100%' }}
                label='Response'
                variant='outlined'
                focused
                value={data.complainResponse}
                onChange={handleChange('complainResponse')}
              />
            </Typography>
            <Button onClick={updateRequest} variant='contained' style={{ margin: '2px', float: 'right' }}>
              Update
            </Button>
            {updateStatus && <CircularProgress />}
          </Box>
        </Modal>
      </div>
    )
  }
  const fetchBusinessDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getBusinessComplain`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessData(response.data.getComplainList)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    fetchCustomerDetails()
    fetchBusinessDetails()
  }, [message])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Card>
          <CardHeader
            title='Customer Complaint'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            action={
              <IconButton
                size='small'
                aria-label='settings'
                className='card-more-options'
                sx={{ color: 'text.secondary' }}
              >
                {/* <DotsVertical /> */}
              </IconButton>
            }
          />
      
           <TableContainer style={{paddingLeft:"50px",paddingRight:"50px"}}>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard' stickyHeader style={{border:"1px solid #F4F5FA"}}>
              <TableHead>
              
              <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell title="DESCRIPTION">DESC</TableCell>
                  <TableCell  title="Expectation Outcomes">Exp OC</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell  title="Preferred Contact Medium">PCM</TableCell>
                  <TableCell>Modified</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerData.map(row => (
                  <TableRow
                    hover
                    key={'complain' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                          {/* {row.complainNumber} */}
                          <CustomerModal user={row} />
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(Date(row.createdAt)).toLocaleDateString()}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.expectedOutcoms}</TableCell>
                    <TableCell>{row.complainType}</TableCell>
                    <TableCell>{row.preferredMediumContact}</TableCell>

                    <TableCell>{new Date(Date(row.complainUpdateDate)).toLocaleDateString()}</TableCell>
                    <TableCell>{row.complainStatus}</TableCell>
                    <TableCell>{row.complainResponse}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Card>
          <CardHeader
            title='Business Complaint'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            action={
              <IconButton
                size='small'
                aria-label='settings'
                className='card-more-options'
                sx={{ color: 'text.secondary' }}
              >
                {/* <DotsVertical /> */}
              </IconButton>
            }
          />
      
           <TableContainer style={{paddingLeft:"50px",paddingRight:"50px"}}>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard' stickyHeader style={{border:"1px solid #F4F5FA"}}>
              <TableHead>
              
              <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell title="DESCRIPTION">DESC</TableCell>
                  <TableCell  title="Expectation Outcomes">Exp OC</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell  title="Preferred Contact Medium">PCM</TableCell>
                  <TableCell>Modified</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessData.map(row => (
                  <TableRow
                    hover
                    key={'businessComplain' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                          {/* {row.complainNumber} */}
                          <BusinessModal user={row} />
                        </Typography>
                        {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                        {/* <Typography variant='caption'>{row.designation}</Typography> */}
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(Date(row.createdAt)).toLocaleDateString()}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.expectedOutcoms}</TableCell>
                    <TableCell>{row.complainType}</TableCell>
                    <TableCell>{row.preferredMediumContact}</TableCell>
                    <TableCell>{new Date(Date(row.complainUpdateDate)).toLocaleDateString()}</TableCell>
                    <TableCell>{row.complainStatus}</TableCell>
                    <TableCell>{row.complainResponse}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        
        </Card>
      </Grid>
    </Grid>
  )
}

export default Complaint
