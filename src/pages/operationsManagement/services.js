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
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Eye from 'mdi-material-ui/Eye'
import { useRouter } from 'next/router'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 800,
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

const services = () => {
  const router = useRouter()
  // const users = require('../../db/users_customers.json')
  // const business = require('../../db/businesses.json')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState([])
  const [reponseCode, setResponseCode] = useState(null)
  // const handleOpen = () => setOpen(true)

  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
    // return<CropDetails id={x}/>
  }
  const showCustomerAuditReport = x => {
    router.push(`/databaseManagement/auditReport?q=${x}`)
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
  

  const fetchCustomerDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerData(response.data.customers)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  function BusinessModal({ user }) {
    // const [open, setOpen] = useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)
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
  function CustomerModal({ user }) {
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
              Profile Details
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              <FormControl variant='standard'>
                <h4>Name:</h4>{' '}
                <span>{user.UserTitle + ' ' + user.name.fName + ' ' + user.name.mName + ' ' + user.name.lName}</span>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Gender: </span>
                  <span>{user.gender}</span>
                </p>
                {/* <p>age: {user?.dob.}</p> */}
                <p>
                  <span style={{ fontWeight: 'bold' }}>AgeGroup:</span> <span>{user.agegroup}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>MobileNo:</span> <span>{user.mobileNumber}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Email:</span> <span>{user.email}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Avatar:</span> <span>{user.avatar}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>CROP ID:</span> <span>{user.cropid}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>PROP ID:</span> <span>{user.propid}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Biometric status:</span> <span>{user.biometricterms}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Tier:</span> <span>{user.UserTier}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Email Notification:</span> <span>{user.emailNotification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Email Notification:</span> <span>{user.emailNotification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Market Notification:</span> <span>{user.mktNotification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Message Notification:</span> <span>{user.smsNotification}</span>
                </p>
                <p>
                  <span style={{ fontWeight: 'bold' }}>Refferal Code: </span>
                  <span>{user.refercode}</span>{' '}
                </p>
                {user.interestList && (
                  <div>
                    <h6>Interests</h6>
                    {user.interestList &&
                      user.interestList.map((data, i) => (
                        <span key={'interest' + i}>
                          <p>{data}</p>
                        </span>
                      ))}
                  </div>
                )}
                {user.address &&
                  user.address.map((data, i) => (
                    <span key={'address' + data._id}>
                      <h6>
                        Home:{' '}
                        {data.address.line1 +
                          ' ' +
                          data.address.line2 +
                          ' ' +
                          data.address.line3 +
                          ' ' +
                          data.address.pin +
                          ' ' +
                          data.address.state}
                      </h6>
                    </span>
                  ))}
              </FormControl>
            </Typography>
          </Box>
        </Modal>
      </div>
    )
  }
  function ChangeAccountStatus({ user }) {
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      justifyContent: 'space-between',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      flexDirection: 'column'
    }
    const [updateStatus, SetUpdateStatus] = useState(false)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const ChangeStatus = sts => {
      SetUpdateStatus(true);
      // let formData = new FormData()
      // formData.append('status', sts)
      // formData.append('_id', user)
      const body = {
        status: sts,
        _id: user
      }
      axios({ method: 'post', url: `${process.env.HOST}/api/admin/updateCustomerStatus`, data: body})
        .then(function (response) {
          setMessage(response.data)
          SetUpdateStatus(false);
          handleClick()
        })
        .catch(function (error) {
          console.log(error.message)
          SetUpdateStatus(false);
          handleClick()
        })
      handleClose()
    }

    return (
      <div>
        <Chip
          label={'Change'}
          // color={statusObj[row.status].color}
          color={'primary'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 },
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        />
        {updateStatus && <CircularProgress size={20}/>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Chip
              label={'suspended'}
              // color={statusObj[row.status].color}
              color={'info'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('suspended')
              }}
            />
            <Chip
              label={'Deactivated'}
              // color={statusObj[row.status].color}
              color={'error'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
               
                ChangeStatus('deactivated')
              }}
            />
            <Chip
              label={'presuspend'}
              // color={statusObj[row.status].color}
              color={'warning'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                
                ChangeStatus('presuspend')
              }}
            />
            <Chip
              label={'Active'}
              // color={statusObj[row.status].color}
              color={'primary'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                
                ChangeStatus('active')
              }}
            />
          </Box>
        </Modal>
      </div>
    )
  }

  function ChangeBusinessAccountStatus({ user }) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }
    const [updateStatus, SetUpdateStatus] = useState(false)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const ChangeStatus = sts => {
      SetUpdateStatus(true)
      let body = {'status': sts, '_id': user}
      axios({ method: 'post', url: `${process.env.HOST}/api/admin/updateBusinessAccountStatus`, data: body})
        .then(function (response) {
          console.log(response)
          setMessage(response.data)
          SetUpdateStatus(false);
          handleClick()
        })
        .catch(function (error) {
          console.log(error.message)
          SetUpdateStatus(false);
          handleClick()
        })
        handleClose()
    }

    return (
      <div>
        <Chip
          label={'Change'}
          // color={statusObj[row.status].color}
          color={'primary'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 },
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        />
        {updateStatus && <CircularProgress size={20}/>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Chip
              label={'suspended'}
              // color={statusObj[row.status].color}
              color={'info'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
  
                ChangeStatus('suspended')
              }}
            />
            <Chip
              label={'Deactivated'}
              // color={statusObj[row.status].color}
              color={'error'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                
                ChangeStatus('deactivated')
              }}
            />
            <Chip
              label={'presuspend'}
              // color={statusObj[row.status].color}
              color={'warning'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                
                ChangeStatus('presuspend')
              }}
            />
            <Chip
              label={'Active'}
              // color={statusObj[row.status].color}
              color={'primary'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                
                ChangeStatus('active')
              }}
            />
          </Box>
        </Modal>
      </div>
    )
  }
  const fetchBusinessDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessData(response.data.businesses)
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
      
      <Snackbar open={open} anchorOrigin={{ vertical:"top", horizontal:"center" }} autoHideDuration={6000} onClose={handleClose} style={{ border: '1px solid blue' }}>
        {reponseCode > 299 ? (
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            {message?.msg}
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            {message?.msg}
          </Alert>
        )}
      </Snackbar>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h3 style={{ marginLeft: '20px' }}>Customer Data</h3>  
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>CROP Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell>Change Account Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerData.map(row => (
                  <TableRow
                    hover
                    key={'customer' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                          {row.name.fName} {row.name.mName} {row.name.lName}{' '}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.cropid}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        // color={statusObj[row.status].color}
                        color={statusObj[`${row.status}`]?.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.UserTier}</TableCell>
                    <TableCell>
                      <ChangeAccountStatus user={row._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h3 style={{ marginLeft: '20px' }}>Business Data</h3>
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Business Name</TableCell>
                  <TableCell>CROP Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell>CHANGE ACCOUNT STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessData.map(row => (
                  <TableRow
                    hover
                    key={'business' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                          {row?.businessName}
                        </Typography>
                        {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                        <Typography variant='caption'>{row.designation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.cropId}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        // color={statusObj[row.status].color}
                        color={statusObj[`${row.status}`]?.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.Tier}</TableCell>
                    {/* <TableCell>
                     <BusinessModal user={row} />                      
                    </TableCell> */}
                    <TableCell>
                      <ChangeBusinessAccountStatus user={row._id} />
                    </TableCell>
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

export default services
