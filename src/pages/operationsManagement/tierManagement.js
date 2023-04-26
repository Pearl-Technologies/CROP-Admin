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


const statusObj = {
  presuspend: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}

const TierManagement = () => {
  const router = useRouter()
  const users = require('../../db/users_customers.json')
  const business = require('../../db/businesses.json')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const showCustomerCrop =(x)=>{
    router.push(`/accountManagement/cropDetails?q=${x}`)
    // return<CropDetails id={x}/>
  }
  const showCustomerAuditReport =(x)=>{
    router.push(`/databaseManagement/auditReport?q=${x}`)
    
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
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
      <div>
        <Button onClick={handleOpen}><Eye/></Button>
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
                <p><span style={{fontWeight:"bold"}}>Tier:  </span><span>{user.Tier}</span></p>
                {/* <h3>TierChangeDate:</h3><span>{new Date(user.TierChangeDate.$date)}</span> */}
                <p><span style={{fontWeight:"bold"}}>Biometric: </span><span>{user.bio? "true":"false"}</span></p>
                <p><span style={{fontWeight:"bold"}}>BusinessName:</span><span>{user.businessId.BusinessName}</span></p>
                <p><span style={{fontWeight:"bold"}}>ABN No:</span><span>{user.businessId.ABN }</span></p>
                <p><span style={{fontWeight:"bold"}}>ACN No:</span><span>{user.businessId.ACN }</span></p>
                {/* <p>span style={{fontWeight:"bold"}} <h3>JoinDate:</h3><span>{user.createdAt }</span></p>  */}
                <p><span style={{fontWeight:"bold"}}>CROP ID:</span><span>{user.cropId }</span></p>
                <p><span style={{fontWeight:"bold"}}>Delivery Services:</span><span>{user.deliveryServices }</span></p>
                <p><span style={{fontWeight:"bold"}}>Email:</span><span>{user.email }</span></p>
                <p><span style={{fontWeight:"bold"}}>Email Notification:</span><span>{user.emailNotification }</span></p>
                {/* <p><span style={{fontWeight:"bold"}}> Tier Change Date:</span><span>{user.lastUpdatedDate }</span></p> */}
                <p><span style={{fontWeight:"bold"}}>Market Notification:</span><span>{user.mktNotification }</span></p>
                <p><span style={{fontWeight:"bold"}}>Mobile Number:</span><span>{parseInt(user.mobileNumber.$numberLong) }</span></p>
                <p><span style={{fontWeight:"bold"}}>Nature Of Business:</span><span>{user.natureOfBusiness }</span></p>
                <p><span style={{fontWeight:"bold"}}>News Letter Subscription:</span><span>{user.newsLetterSubscription }</span></p>
                <p><span style={{fontWeight:"bold"}}>Notification:</span><span>{user.notification }</span></p>
                <p><span style={{fontWeight:"bold"}}>OutletCount:</span><span>{user.outletCount }</span></p>
                <p><span style={{fontWeight:"bold"}}>OwnerName:</span><span>{user.ownerName.title+" "+ user.ownerName?.fName+" "+ user?.ownerName?.mName+" "+user.ownerName?.lName  }</span></p>
                <p><span style={{fontWeight:"bold"}}>PROP ID:</span><span>{user.propId}</span></p>
                <p><span style={{fontWeight:"bold"}}>RefferalCode:</span><span>{user.refferalCode}</span></p>
                <p><span style={{fontWeight:"bold"}}>Message Notification:</span><span>{user.smsNotification}</span></p>
                <p><span style={{fontWeight:"bold"}}>Status:</span><span>{user.status}</span></p>
                <p><span style={{fontWeight:"bold"}}>TransctionInterface:</span><span>{user.transctionInterface}</span></p>
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
        <Button onClick={handleOpen}><Eye/></Button>
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
                <p><span style={{fontWeight:"bold"}}>Tier:  </span><span>{user.Tier}</span></p>
                {/* <h3>TierChangeDate:</h3><span>{new Date(user.TierChangeDate.$date)}</span> */}
                <p><span style={{fontWeight:"bold"}}>Biometric: </span><span>{user.bio? "true":"false"}</span></p>
                <p><span style={{fontWeight:"bold"}}>BusinessName:</span><span>{user.businessId.BusinessName}</span></p>
                <p><span style={{fontWeight:"bold"}}>ABN No:</span><span>{user.businessId.ABN }</span></p>
                <p><span style={{fontWeight:"bold"}}>ACN No:</span><span>{user.businessId.ACN }</span></p>
                {/* <p>span style={{fontWeight:"bold"}} <h3>JoinDate:</h3><span>{user.createdAt }</span></p>  */}
                <p><span style={{fontWeight:"bold"}}>CROP ID:</span><span>{user.cropId }</span></p>
                <p><span style={{fontWeight:"bold"}}>Delivery Services:</span><span>{user.deliveryServices }</span></p>
                <p><span style={{fontWeight:"bold"}}>Email:</span><span>{user.email }</span></p>
                <p><span style={{fontWeight:"bold"}}>Email Notification:</span><span>{user.emailNotification }</span></p>
                {/* <p><span style={{fontWeight:"bold"}}> Tier Change Date:</span><span>{user.lastUpdatedDate }</span></p> */}
                <p><span style={{fontWeight:"bold"}}>Market Notification:</span><span>{user.mktNotification }</span></p>
                <p><span style={{fontWeight:"bold"}}>Mobile Number:</span><span>{parseInt(user.mobileNumber.$numberLong) }</span></p>
                <p><span style={{fontWeight:"bold"}}>Nature Of Business:</span><span>{user.natureOfBusiness }</span></p>
                <p><span style={{fontWeight:"bold"}}>News Letter Subscription:</span><span>{user.newsLetterSubscription }</span></p>
                <p><span style={{fontWeight:"bold"}}>Notification:</span><span>{user.notification }</span></p>
                <p><span style={{fontWeight:"bold"}}>OutletCount:</span><span>{user.outletCount }</span></p>
                <p><span style={{fontWeight:"bold"}}>OwnerName:</span><span>{user.ownerName.title+" "+ user.ownerName?.fName+" "+ user?.ownerName?.mName+" "+user.ownerName?.lName  }</span></p>
                <p><span style={{fontWeight:"bold"}}>PROP ID:</span><span>{user.propId}</span></p>
                <p><span style={{fontWeight:"bold"}}>RefferalCode:</span><span>{user.refferalCode}</span></p>
                <p><span style={{fontWeight:"bold"}}>Message Notification:</span><span>{user.smsNotification}</span></p>
                <p><span style={{fontWeight:"bold"}}>Status:</span><span>{user.status}</span></p>
                <p><span style={{fontWeight:"bold"}}>TransctionInterface:</span><span>{user.transctionInterface}</span></p>
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
                <h4>Name:</h4> <span>{user.UserTitle + ' ' + user.name.fName + ' ' + user.name.mName + ' ' + user.name.lName}</span>
                <p><span style={{fontWeight:'bold'}}>Gender: </span><span>{user.gender}</span></p>
                {/* <p>age: {user?.dob.}</p> */}
                <p><span style={{fontWeight:'bold'}}>AgeGroup:</span> <span>{user.agegroup}</span></p>
                <p><span style={{fontWeight:'bold'}}>MobileNo:</span> <span>{user.mobileNumber}</span></p>
                <p><span style={{fontWeight:'bold'}}>Email:</span> <span>{user.email}</span></p>
                <p><span style={{fontWeight:'bold'}}>Avatar:</span> <span>{user.avatar}</span></p>
                <p><span style={{fontWeight:'bold'}}>CROP ID:</span> <span>{user.cropid}</span></p>
                <p><span style={{fontWeight:'bold'}}>PROP ID:</span> <span>{user.propid}</span></p>
                <p><span style={{fontWeight:'bold'}}>Biometric status:</span> <span>{user.biometricterms}</span></p>
                <p><span style={{fontWeight:'bold'}}>Tier:</span> <span>{user.UserTier}</span></p>
                <p><span style={{fontWeight:'bold'}}>Email Notification:</span> <span>{user.emailNotification}</span></p>
                <p><span style={{fontWeight:'bold'}}>Email Notification:</span> <span>{user.emailNotification}</span></p>
                <p><span style={{fontWeight:'bold'}}>Market Notification:</span> <span>{user.mktNotification}</span></p>
                <p><span style={{fontWeight:'bold'}}>Message Notification:</span> <span>{user.smsNotification}</span></p>
                <p><span style={{fontWeight:'bold'}}>Refferal Code: </span><span>{user.refercode}</span>  </p>

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
  }, [])
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h4>Customer Data</h4>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>CROP Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tier</TableCell>
                  {/* <TableCell>Profile</TableCell> */}
                  {/* <TableCell>Invoices</TableCell> */}
                  <TableCell>Last Tier Changed date</TableCell>
                  <TableCell>Change Tier</TableCell>
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
                      {/* <CustomerModal user={row} /> */}
                      {"01/01/2023"}
                    </TableCell>
                    {/* <TableCell onClick={
                          ()=>showCustomerCrop(row._id.$oid)}>{row.croppoints}</TableCell>
                    <TableCell>{'PROP Info'}</TableCell> */}
                    <TableCell>
                    <Chip
                        label={"Change"}
                        // color={statusObj[row.status].color}
                        color={'info'}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 },
                          cursor:'pointer'
                          
                        }}
                        disabled
                      />
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
          <TableContainer>
            <h3>Business Data</h3>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Business Name</TableCell>
                  <TableCell>CROP Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell>Last Tier Change Date</TableCell>            
                  <TableCell>Change Tier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessData.map(row => (
                  <TableRow hover key={"business"+row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                          {row.businessId?.BusinessName}
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
                    <TableCell>{"01/01/2023"}</TableCell>
                    
                    <TableCell>
                    <Chip
                        label={"Change"}
                        // color={statusObj[row.status].color}
                        color={'info'}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 },
                          cursor:'pointer'
                        }}
                        disabled
                      />
                    </TableCell>
                    {/* <TableCell>{'view active offers'}</TableCell> */}
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

export default TierManagement
