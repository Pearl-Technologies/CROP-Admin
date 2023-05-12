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
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import Close from 'mdi-material-ui/Close'
import ArrowBottomLeft from 'mdi-material-ui/ArrowBottomLeft'
import { useRouter } from 'next/router'
import Spinner from './spinner'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
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
  }
  const showCustomerProp = x => {
    router.push(`/accountManagement/propDetails?q=${x}`)
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
          <ViewTimelineIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
          <Button onClick={handleClose}>
          <Close />
        </Button>
          <h2 style={{textAlign:"center"}}>Profile Details</h2>
            <Grid container spacing={2}>
              <Grid item sm={4} style={{alignItems:"center",alignContent:"center",textAlign:"center"}}>
              <img style={{margin:"auto"}}
                width='150px'
                src={user?.avatar ? `${process.env.HOST}/api/products/image/${user?.avatar}` : "/images/logos/slack.png"}
              />
                <div>
                  <span>{user.UserTitle}</span>
                  <span>{user?.businessName}</span>
                
                </div>
                  {/* <span style={{ margin:"auto"}}>{user.UserTitle}{" "}{user.name.fName}{" "}{user.name.mName}{" "}{user.name.lName}</span> */}
              </Grid>
              <Grid item sm={8}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField style={{marginTop:"10px"}} id='outlined-basic' label='email' variant='outlined' value={user.email} />
                  
                    <TextField style={{marginTop:"15px"}} label='Message Notification' variant='outlined' value={user.smsNotification} />
                    <TextField style={{marginTop:"15px"}} label='Refferal Code' variant='outlined' value={user.referalCode} />
                    <TextField style={{marginTop:"15px"}} label='CROP ID' variant='outlined' value={user.cropId} />
                    <TextField style={{marginTop:"15px"}} label='Tier' variant='outlined' value={user.Tier} />
                  </Grid>
                  <Grid item sm={6}>
                  <TextField style={{marginTop:"10px"}}  label='Email Notification' variant='outlined' value={user.emailNotification} />
                    <TextField style={{marginTop:"15px"}} label='Market Notification' variant='outlined' value={user.mktNotification} />
                    <TextField style={{marginTop:"15px"}} label='Biometric status' variant='outlined' value={user.bio} />
                    <TextField style={{marginTop:"15px"}} label='Interests' variant='outlined' value={user.interestList?.valueOf()} />

                    
                  </Grid>
                </Grid>
              </Grid>
             
            </Grid>
          
                  {user.address &&
                          user.address.map((data, i) => (
                            <div  key={'address' + data._id} >
                              <h3>Address 1</h3>
                                 
                                  <Grid container spacing={2} >
                                    <Grid item sm={6}>
                                      <Grid container spacing={2} style={{width:"350px",lineHeight:"10px",borderRadius:"10px",border:"1px solid #c1c1c1"}}>
                                        <Grid item sm={2}>
                                            <p style={{fontWeight:"bold"}}>Line1 </p> 
                                            <p style={{fontWeight:"bold"}}>Line2 </p>
                                           <p style={{fontWeight:"bold"}}>Line3 </p>
                                            <p style={{fontWeight:"bold"}}>State </p>
                                            <p style={{fontWeight:"bold"}}>Pin  </p>
                                        </Grid>
                                        <Grid item sm={10}>
                                            <p>:{data.line1}</p>
                                            <p>:{data.line2}</p>
                                            <p>:{data.line3}</p>
                                            <p>:{data.state}</p>
                                            <p>:{data.pin}</p>
                                        </Grid>
                                      </Grid>
                                     
                                    </Grid>
                                    <Grid item sm={6}>
                                       
                                       
                                    </Grid>
                                
                                    
                                         
                                </Grid>          
                            </div>

                          ))}
             
          
        

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
          <ViewTimelineIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
         
        <Box sx={style}>
        <Button onClick={handleClose}>
          <Close />
        </Button>
            <h2 style={{textAlign:"center"}}>Profile Details</h2>
            <Grid container spacing={2}>
              <Grid item sm={4} style={{alignItems:"center",alignContent:"center",textAlign:"center"}}>
                <img style={{margin:"auto"}}
                  width='150px'
                  src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
                />
                <div>
                  <span>{user.UserTitle}{" "}</span>
                  <span>{user.name.fName}{" "}</span>
                  <span>{user.name.mName}{" "}</span>
                  <span>{user.name.lName}{" "}</span>
                </div>
                  {/* <span style={{ margin:"auto"}}>{user.UserTitle}{" "}{user.name.fName}{" "}{user.name.mName}{" "}{user.name.lName}</span> */}
              </Grid>
              <Grid item sm={8}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField style={{marginTop:"10px"}} id='outlined-basic' label='email' variant='outlined' value={user.email} />
                  
                    <TextField style={{marginTop:"15px"}} label='Message Notification' variant='outlined' value={user.smsNotification} />
                    <TextField style={{marginTop:"15px"}} label='Refferal Code' variant='outlined' value={user.refercode} />
                    <TextField style={{marginTop:"15px"}} label='CROP ID' variant='outlined' value={user.cropid} />
                    <TextField style={{marginTop:"15px"}} label='Tier' variant='outlined' value={user.UserTier} />
                  </Grid>
                  <Grid item sm={6}>
                  <TextField style={{marginTop:"10px"}}  label='Email Notification' variant='outlined' value={user.emailNotification} />
                    <TextField style={{marginTop:"15px"}} label='Market Notification' variant='outlined' value={user.mktNotification} />
                    <TextField style={{marginTop:"15px"}} label='Biometric status' variant='outlined' value={user.biometricterms} />
                    <TextField style={{marginTop:"15px"}} label='Interests' variant='outlined' value={user.interestList?.valueOf()} />
                    <TextField style={{marginTop:"15px"}} label='CROP ID' variant='outlined' value={user.cropid} />
                    
                  </Grid>
                </Grid>
              </Grid>             
            </Grid>        
          
        
                 
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
                    <TableCell>PROPs</TableCell>
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
                        <ReceiptLongIcon/>
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
                      <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerProp(row._id)}>
                      <Chip
                          label={row.proppoints}
                          // color={statusObj[row.status].color}
                          color={'secondary'}
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            textTransform: 'capitalize',
                            '& .MuiChip-label': { fontWeight: 500 },
                            cursor: 'pointer'
                          }}
                        />
                      </TableCell>
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
                      <TableCell>{row.tier}</TableCell>
                      <TableCell>
                        <BusinessModal user={row} />
                      </TableCell>
                      <TableCell  onClick={() => showBusinessInvoice(row._id)} sx={{ cursor: 'pointer'}}>
                        <ReceiptLongIcon/>
                      </TableCell>
                      <TableCell>
                      <Chip
                          label={row.croppoint}
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
