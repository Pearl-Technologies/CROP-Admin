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
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Tooltip from '@mui/material/Tooltip'
import CardMedia from '@mui/material/CardMedia'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
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
import TextareaAutosize from '@mui/base/TextareaAutosize'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const statusObj = {
  presuspend: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}

const Request = () => {
  const router = useRouter()
  // const customerRequest = require('../../db/admin_customer_requests.json')
  // const businessComplain = require('../../db/admin_business_complains.json')
  const [businessRequest, setBusinessRequest] = useState([])
  const [customerRequest, setCustomerRequest] = useState([])
  const [status, setStatus] = useState('')
  const [requestResponse, setRequestResponse] = useState('')
  const [selectedOption, setSelectedOption] = useState('Customer Data')
  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
    // return<CropDetails id={x}/>
   
  }
  // console.log(customerRequest,'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHh')
  const showCustomerAuditReport = x => {
    router.push(`/databaseManagement/auditReport?q=${x}`)
  }

  const fetchCustomerDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/get-all-users`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        setCustomerData(response.data.users)
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
    const updateBusinessRequest = () => {
      axios({
        url: `${process.env.HOST}/api/admin/updateBusinessRequest`,
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
      
    }
    
    return (
      <div>
        <Button onClick={handleOpen}>
          {user.requestNumber
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
              <TextField label='request number' disabled variant='outlined' focused value={data.requestNumber} />
            </Typography>
            <Typography sx={{ mt: 2, width: '100%' }}>
              <Select value={data.requestStatus} onChange={handleChange('requestStatus')}>
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
                value={data.requestResponse}
                onChange={handleChange('requestResponse')}
              />
            </Typography>
            <Button onClick={updateBusinessRequest} variant='contained' style={{ float: 'right', margin: '2px' }}>
              Update
            </Button>
            {updateStatus && <CircularProgress />}
          </Box>
        </Modal>
      </div>
    )
  }
  function StoreModal({ user }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
      <div>
        <Button onClick={handleOpen}>
          <Eye />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Profile
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <Grid item xs={12} md={12}>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Tier: </span>
                  <span>{user.Tier}</span>
                </p>
                {/* <h3>TierChangeDate:</h3><span>{new Date(user.TierChangeDate.$date)}</span> */}
                <p>
                  <span style={{ fontWeight: 'bold' }}>Biometric: </span>
                  <span>{user.bio ? 'true' : 'false'}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>BusinessName:</span>
                  <span>{user.businessId.BusinessName}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>ABN No:</span>
                  <span>{user.businessId.ABN}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>ACN No:</span>
                  <span>{user.businessId.ACN}</span>
                </p>
                {/* <p>span style={{fontWeight:"bold"}} <h3>JoinDate:</h3><span>{user.createdAt }</span></p>  */}
                <p>
                  <span style={{ fontWeight: 'bold' }}>CROP ID:</span>
                  <span>{user.cropId}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Delivery Services:</span>
                  <span>{user.deliveryServices}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Email:</span>
                  <span>{user.email}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Email Notification:</span>
                  <span>{user.emailNotification}</span>
                </p>
                {/* <p><span style={{fontWeight:"bold"}}> Tier Change Date:</span><span>{user.lastUpdatedDate }</span></p> */}
                <p>
                  <span style={{ fontWeight: 'bold' }}>Market Notification:</span>
                  <span>{user.mktNotification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Mobile Number:</span>
                  <span>{parseInt(user.mobileNumber.$numberLong)}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Nature Of Business:</span>
                  <span>{user.natureOfBusiness}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>News Letter Subscription:</span>
                  <span>{user.newsLetterSubscription}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Notification:</span>
                  <span>{user.notification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>OutletCount:</span>
                  <span>{user.outletCount}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>OwnerName:</span>
                  <span>
                    {user.ownerName.title +
                      ' ' +
                      user.ownerName?.fName +
                      ' ' +
                      user?.ownerName?.mName +
                      ' ' +
                      user.ownerName?.lName}
                  </span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>PROP ID:</span>
                  <span>{user.propId}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>RefferalCode:</span>
                  <span>{user.refferalCode}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Message Notification:</span>
                  <span>{user.smsNotification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Status:</span>
                  <span>{user.status}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>TransctionInterface:</span>
                  <span>{user.transctionInterface}</span>
                </p>
              </Grid>
            </Typography>
          </Box>
        </Modal>
      </div>
    )
  }
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
        url: `${process.env.HOST}/api/admin/updateCustomerRequest`,
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
    }
    return (
      <div>
        <Button onClick={handleOpen}>
          {user.requestNumber
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
              <TextField label='request number' disabled variant='outlined' focused value={data.requestNumber} />
            </Typography>
            <Typography sx={{ mt: 2, width: '100%' }}>
              <Select value={data.requestStatus} onChange={handleChange('requestStatus')}>
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
                value={data.requestResponse}
                onChange={handleChange('requestResponse')}
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
  const fetchBusinessRequest = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getBusinessRequest`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        
        setBusinessRequest(response.data.getRequestList)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchCustomerRequest = () => {
    axios.post(`${process.env.HOST}/api/admin/getCustomerRequest`,{
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(function (response) {
      setCustomerRequest(response.data.getRequestList)
    })
  }
  const [updateStatus, setUpdateStatus] = useState(false)
  const [message, setMessage] = useState([])
  const [reponseCode, setResponseCode] = useState(null)
  useEffect(() => {
    // fetchCustomerDetails()
    // fetchBusinessDetails()
    fetchCustomerRequest()
    fetchBusinessRequest()
  }, [message])

  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <ArrowBackIcon sx={{cursor:'pointer', marginRight:"auto"}} onClick={()=>router.back()}/>
      <div style={{ display: 'flex', gap: 2 }}>
        <Switch
            {...label}
            defaultChecked
            sx={{ marginTop: 3 }}
            onChange={() => setSelectedOption(x => (x === 'Customer Data' ? 'Business Data' : 'Customer Data'))}
          />
          <h5>{selectedOption}</h5>
      </div>
      { 
      selectedOption == 'Customer Data' ? 
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Customer Request'
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
          <Snackbar
            open={open}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            {reponseCode > 299 ? (
              <Alert onClose={handleCloseAlert} severity='error' sx={{ width: '100%' }}>
                {message?.msg}
              </Alert>
            ) : (
              <Alert onClose={handleCloseAlert} severity='success' sx={{ width: '100%' }}>
                {message?.msg}
              </Alert>
            )}
          </Snackbar>
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
                  <TableCell>Raised</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>PCM</TableCell>
                  <TableCell>Actioned</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Resolution</TableCell>
                  <TableCell>SLA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerRequest.map(row => (
                  <TableRow
                    hover
                    key={'complain' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography style={{display:"flex",width:"150px"}}>
                        <span style={{marginTop:"7px"}}>R - </span>
                          <CustomerModal user={row} />
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>{new Date(Date(row.createdAt)).toLocaleDateString()}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.requestType}</TableCell>
                    <TableCell>{row.preferredMediumContact}</TableCell>
                    <TableCell>{new Date(Date(row.requestUpdateDate)).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {console.log(row.requestStatus)}
                      {row.requestStatus === "completed" ? "Closed" : 
                        row.requestStatus === "open" ? "Open" :
                        row.requestStatus === "inprogress" ? "In Progress" :
                        row.requestStatus}
                    </TableCell>
                    <TableCell sx={{width:"400px"}}>{row.requestResponse}</TableCell>
                    <TableCell style={{ gap: '5px', width:"200px" }}>
                      <Button size='small' variant='outlined' style={{ margin: '2px' }}>
                        Yes
                      </Button>
                      <Button size='small' variant='outlined' style={{ margin: '2px' }}>
                        No
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
        :
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Business Request'
            titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
            action={
              <IconButton
                size='small'
                aria-label='settings'
                className='card-more-options'
                sx={{ color: 'text.secondary' }}
              />
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
                  <TableCell>Raised</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>PCM</TableCell>
                  <TableCell>Actioned</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Resolution</TableCell>
                  <TableCell>SLA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessRequest.map(row => (
                  <TableRow
                    hover
                    key={'businessComplain' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                     
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography style={{display:"flex",width:"150px"}}>
                        <span style={{marginTop:"7px"}}>R - </span>
                          <BusinessModal user={row} />
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.requestType}</TableCell>
                    <TableCell>{row.preferredMediumContact}</TableCell>
                    <TableCell>{new Date(row.requestUpdateDate).toLocaleDateString()}</TableCell>
                    
                    
                    <TableCell>
                      {console.log(row.requestStatus)}
                      {row.requestStatus === "completed" ? "Closed" : 
                        row.requestStatus === "open" ? "Open" :
                        row.requestStatus === "inprogress" ? "In Progress" :
                        row.requestStatus}
                    </TableCell>

                    <TableCell sx={{width:"400px"}}>{row.requestResponse}</TableCell>
                    <TableCell style={{ gap: '5px', width:"200px" }}>
                      <Button size='small' variant='outlined' style={{ margin: '2px' }}>
                        Yes
                      </Button>
                      <Button size='small' variant='outlined' style={{ margin: '2px' }}>
                        No
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid> 
      }
    </Grid>
  )
}

export default Request
