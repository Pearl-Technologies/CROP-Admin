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
import Spinner from './spinner'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: 1000,
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  display: 'flex'
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

const Database = () => {
  const router = useRouter()
  const users = require('../../db/users_customers.json')
  const business = require('../../db/businesses.json')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [cdStatus, setCDStatus] = useState(false)
  const [bdStatus, setBDStatus] = useState(false)
  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
    // return<CropDetails id={x}/>
  }
  const showCustomerAuditReport = x => {
    router.push(`/databaseManagement/auditReport?q=${x}`)
  }
  const showBusinessAuditReport = x => {
    router.push(`/databaseManagement/businessAuditReport?q=${x}`)
  }
  const showActiveOffers = x => {
    router.push(`/databaseManagement/offers?q=${x}`)
  }

  const fetchCustomerDetails = () => {
    setCDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerData(response.data.customers)
        setCDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setCDStatus(false)
      })
  }
  function BusinessModal({ user }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    console.log(user)
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
          <div style={{display:"flex", flexDirection:"column", margin:"5%"}}>
              <img style={{margin:"auto"}}
                width='150px'
                src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
              />
              {/* <span>Edogaru</span> */}
              <span style={{ margin:"auto"}}>{user.email}</span>
              <span> </span>
            </div>
            <div style={{padding:"10px", overflow:"auto"}}>
              <FormControl variant='standard' sx={{ gap: '10px' }} >
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <TextField id='outlined-basic' label='Title' variant='outlined' value={user.UserTitle} />
                  <TextField id='outlined-basic' label='First Name' variant='outlined' value={user?.businessName} />
  
                </Box>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <TextField label='MobileNo' variant='outlined' value={user?.mobileNumber} />
                </Box>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                <TextField label='CROP ID' variant='outlined' value={user?.cropId} />
                <TextField label='Tier' variant='outlined' value={user?.Tier} />
                </Box>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                <TextField label='Biometric status' variant='outlined' value={user?.bio} />
                <TextField label='Email Notification' variant='outlined' value={user?.emailNotification} />
                <TextField label='Market Notification' variant='outlined' value={user?.mktNotification} />
                <TextField label='Message Notification' variant='outlined' value={user.smsNotification} />
                </Box >
                <Box sx={{ display: 'flex', gap: '2px' }}>
                <TextField label='Refferal Code' variant='outlined' value={user.refferalCode} />
                <TextField label='Interests' variant='outlined' value={user.interestList?.valueOf()} />
                </Box>                          
            <h4>Address</h4>
          <Box  sx={{ display: 'flex',  flexDirection: 'column'   }}>
            {user?.address &&
                    user?.address.map((data, i) => (
                      <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column', margin:"20px" }} key={'address' + data._id}>
                        <TextField label='line1' variant='outlined' value={data?.line1}/>                        
                        <TextField label='line2' variant='outlined' value={data?.line2}/>                        
                        <TextField label='line3' variant='outlined' value={data?.line3}/>                        
                        <TextField label='state' variant='outlined' value={data?.state}/>                        
                        <TextField label='pin' variant='outlined' value={data?.pin}/>                        
                      </Box>
                    ))}
          </Box>
              </FormControl>
            </div>

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
            {/* <Typography id='modal-modal-title' variant='h6' component='h2'>
              Profile Details
            </Typography> */}

            <div style={{display:"flex", flexDirection:"column", margin:"5%"}}>
              <img style={{margin:"auto"}}
                width='150px'
                src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
              />
              {/* <span>Edogaru</span> */}
              <span style={{ margin:"auto"}}>{user.UserTitle}{" "}{user.name.fName}{" "}{user.name.mName}{" "}{user.name.lName}</span>
              <span> </span>
            </div>

            <div style={{padding:"10px", overflow:"auto"}}>
              <FormControl variant='standard' sx={{ gap: '10px' }} >
                <Box sx={{ display: 'flex', gap: '2px' }}>
                  <TextField id='outlined-basic' label='email' variant='outlined' value={user.email} />
                  <TextField id='outlined-basic' label='mobile' variant='outlined' value={user.mobileNumber} />
                  {/* <TextField id='outlined-basic' label='Title' variant='outlined' value={user.UserTitle} />
                  <TextField id='outlined-basic' label='First Name' variant='outlined' value={user.name.fName} />
                  <TextField id='outlined-basic' label='Middle Name' variant='outlined' value={user.name.mName} />
                  <TextField id='outlined-basic' label='Last Name' variant='outlined' value={user.name.lName} /> */}
                </Box>
                {/* <Box sx={{ display: 'flex', gap: '2px' }}>
                  <TextField label='Gender' variant='outlined' value={user.gender} />
                  <TextField label='AgeGroup' variant='outlined' value={user.agegroup} />
                  <TextField label='MobileNo' variant='outlined' value={user.mobileNumber} />
                </Box> */}
                <Box sx={{ display: 'flex', gap: '2px', space: "10px" }}>
                <TextField label='Email Notification' variant='outlined' value={user.emailNotification} />
                <TextField label='Market Notification' variant='outlined' value={user.mktNotification} />
                <TextField label='Message Notification' variant='outlined' value={user.smsNotification} />
                </Box >
                <Box sx={{ display: 'flex', gap: '2px' }}>
                <TextField label='CROP ID' variant='outlined' value={user.cropid} />
                <TextField label='PROP ID' variant='outlined' value={user.propid} />
                <TextField label='Tier' variant='outlined' value={user.UserTier} />
                </Box>
                <Box sx={{ display: 'flex', gap: '2px' }}>
                <TextField label='Biometric status' variant='outlined' value={user.biometricterms} />
                <TextField label='Refferal Code' variant='outlined' value={user.refercode} />
                <TextField label='Interests' variant='outlined' value={user.interestList?.valueOf()} />
                </Box>                          
            <h4>Address</h4>
          <Box  sx={{ display: 'flex',  flexDirection: 'column'   }}>
            {user.address &&
                    user.address.map((data, i) => (
                      <Box sx={{ display: 'flex', gap: '10px', flexDirection: 'column', margin:"20px" }} key={'address' + data._id}>
                        <TextField label='line1' variant='outlined' value={data.line1}/>                        
                        <TextField label='line2' variant='outlined' value={data.line2}/>                        
                        <TextField label='line3' variant='outlined' value={data.line3}/>                        
                        <TextField label='state' variant='outlined' value={data.state}/>                        
                        <TextField label='pin' variant='outlined' value={data.pin}/>                        
                      </Box>
                    ))}
          </Box>
              </FormControl>
            </div>
          </Box>
        </Modal>
      </div>
    )
  }
  const fetchBusinessDetails = () => {
    setBDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessData(response.data.businesses)
        setBDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setBDStatus(false)
      })
  }
  const showCustomerInvoice = x => {
    router.push(`/accountManagement/customerInvoiceDetails?q=${x}`)
  }
  const showBusinessInvoice = x => {
    router.push(`/accountManagement/businessInvoiceDetails?q=${x}`)
  }
  useEffect(() => {
    fetchCustomerDetails()
    fetchBusinessDetails()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h4 style={{ marginLeft: '20px' }}>Customer Data</h4>
            {cdStatus ? (
              <Spinner />
            ) : !customerData.length ? (
              <h6 style={{ textAlign: 'center' }}>Data not found</h6>
            ) : (
              <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>CROP Id</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tier</TableCell>
                    <TableCell>Profile</TableCell>
                    <TableCell>Invoices</TableCell>
                    <TableCell>CROPs</TableCell>
                    <TableCell>PROP Id</TableCell>
                    <TableCell>Audit Report</TableCell>
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
                          {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                          {/* <Typography variant='caption'>{row.designation}</Typography> */}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => showCustomerCrop(row._id)} sx={{ cursor: 'pointer' }}>
                        {row.cropid}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={statusObj[row.status]?.color}
                          // color={statusObj[`${row.status}`].color}

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
                        <CustomerModal user={row} />
                      </TableCell>
                      <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerInvoice(row._id)}>
                        {'invoices'}
                      </TableCell>
                      <TableCell onClick={() => showCustomerCrop(row._id)}>
                        <Chip
                          label={row.croppoints.toFixed(2)}
                          // color={statusObj[row.status].color}
                          color={'primary'}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 },
                            cursor: 'pointer'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ cursor: 'pointer' }}>{row.propid}</TableCell>
                      <TableCell onClick={() => showCustomerAuditReport(row._id)}>
                        <Chip
                          label={'Audit report'}
                          // color={statusObj[row.status].color}
                          color={'info'}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 },
                            cursor: 'pointer'
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h3 style={{ marginLeft: '20px' }}>Business Data</h3>
            {bdStatus ? (
              <Spinner />
            ) : !businessData.length ? (
              <h6 style={{ textAlign: 'center' }}>Data not found</h6>
            ) : (
              <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Business Name</TableCell>
                    <TableCell>CROP Id</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tier</TableCell>
                    <TableCell>Profile</TableCell>
                    <TableCell>Invoices</TableCell>
                    <TableCell>CROPs</TableCell>
                    <TableCell>Active Offers</TableCell>
                    <TableCell>Audit Report</TableCell>
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
                            {row.businessName}
                          </Typography>
                          {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                          {/* <Typography variant='caption'>{row.designation}</Typography> */}
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
                      <TableCell>
                        <BusinessModal user={row} />
                      </TableCell>
                      <TableCell onClick={() => showBusinessInvoice(row._id)} sx={{ cursor: 'pointer' }}>
                        {'invoices'}
                      </TableCell>
                      <TableCell>{row.croppoint}</TableCell>
                      <TableCell>
                        <Chip
                          label={'Active Offers'}
                          // color={statusObj[row.status].color}
                          color={'info'}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 }
                          }}
                          onClick={() => showActiveOffers(row._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={'Audit Report'}
                          // color={statusObj[row.status].color}
                          color={'info'}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 },
                            cursor: 'pointer'
                          }}
                          onClick={() => showBusinessAuditReport(row._id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Database
