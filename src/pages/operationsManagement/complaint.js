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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Switch from '@mui/material/Switch'
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

const Complaint = () => {
  const [updateStatus, setUpdateStatus] = useState(false)
  const [message, setMessage] = useState([])
  const [reponseCode, setResponseCode] = useState(null)
  const router = useRouter()
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [selectedOption, setSelectedOption]=useState("Customer Complaint")

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
      .post(`${process.env.HOST}/api/admin/getCustomerComplain`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
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
          
          setUpdateStatus(false)
          setMessage(response.data)
          setResponseCode(response.status)
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
        .catch(function (error) {
          setUpdateStatus(false)
          console.log(error)
          setMessage(error?.response?.data)
          setResponseCode(error?.response?.status)
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
      handleClose()
    }
    return (
      <div>
        <Button onClick={handleOpen}>
          {data.complainNumber
            .toLocaleString('en-US', { maximumFractionDigits: 0, maximumSignificantDigits: 7 })
            .slice(0, 7)}
        </Button>
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
                <MenuItem value={'Open'}>Open</MenuItem>
                <MenuItem value={'Progress'}>Progress</MenuItem>
                <MenuItem value={'Closed'}>Closed</MenuItem>
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
          
          setUpdateStatus(false)
          setMessage(response.data)
          setResponseCode(response.status)
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
        .catch(function (error) {
          setUpdateStatus(false)
          console.log(error)
          setMessage(error?.response?.data)
          setResponseCode(error?.response?.status)
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
      handleClose()
    }
    return (
      <div>
        <Button onClick={handleOpen}>
          {data.complainNumber
            .toLocaleString('en-US', { maximumFractionDigits: 0, maximumSignificantDigits: 7 })
            .slice(0, 7)}
        </Button>
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
                <MenuItem value={'open'}>Open</MenuItem>
                <MenuItem value={'progress'}>Progress</MenuItem>
                <MenuItem value={'closed'}>Closed</MenuItem>
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
      .post(`${process.env.HOST}/api/admin/getBusinessComplain`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        
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
      <ArrowBackIcon sx={{cursor:'pointer', marginRight:"auto"}} onClick={()=>router.back()}/>
      <div style={{ display: 'flex', gap: 2 }}>
        <Switch
            
            defaultChecked
            sx={{ marginTop: 3 }}
            onChange={() => setSelectedOption(x => (x === 'Customer Complaint' ? 'Business Complaint' : 'Customer Complaint'))}
          />
          <h5>{selectedOption}</h5>
      </div>
      <Grid item xs={12}>
        {selectedOption==="Customer Complaint"&&<Card>
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

          <TableContainer >
            <Table
              sx={{ minWidth: 800 }}
              aria-label='table in dashboard'
              stickyHeader
              style={{ border: '1px solid #F4F5FA' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell title='DESCRIPTION'>DESC</TableCell>
                  <TableCell title='Expectation Outcomes'>Exp OC</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell title='Preferred Contact Medium'>PCM</TableCell>
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
        </Card>}
        {selectedOption==="Business Complaint"&&<Card>
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

          <TableContainer>
            <Table
              sx={{ minWidth: 800 }}
              aria-label='table in dashboard'
              stickyHeader
              style={{ border: '1px solid #F4F5FA' }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Number</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell title='DESCRIPTION'>DESC</TableCell>
                  <TableCell title='Expectation Outcomes'>Exp OC</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell title='Preferred Contact Medium'>PCM</TableCell>
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
        </Card>}
      </Grid>
     

      
    </Grid>
  )
}

export default Complaint
