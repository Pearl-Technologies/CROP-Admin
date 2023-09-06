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
import { Select, MenuItem, InputLabel } from '@mui/material'
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
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline'
import Close from 'mdi-material-ui/Close'
import { useRouter } from 'next/router'
import Spinner from './spinner'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import Avatar from '@mui/material/Avatar'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import Switch from '@mui/material/Switch'
import Search from 'src/components/search'
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
  p: 4
}
const label = { inputProps: { 'aria-label': 'Switch demo' } }
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
  presuspended: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}

const Database = () => {
  const router = useRouter()
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [cdStatus, setCDStatus] = useState(false)
  const [bdStatus, setBDStatus] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Customer Data')
  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
  }
  const showCustomerLikeProduct = x => {
    router.push(`/databaseManagement/customerLikeProducts?q=${x}`)
  }
  const showCustomerRatedProduct = x => {
    router.push(`/databaseManagement/customerRatedProducts?q=${x}`)
  }
  const showBusinessCrop = x => {
    router.push(`/accountManagement/businessCropDetails?q=${x}`)
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
            <h2 style={{ textAlign: 'center' }}>Profile Details</h2>
            <Grid container spacing={2}>
              <Grid item sm={4} style={{ alignItems: 'center', alignContent: 'center', textAlign: 'center' }}>
                <img
                  style={{ margin: 'auto' }}
                  width='150px'
                  src={
                    user?.avatar ? `${process.env.HOST}/api/products/image/${user?.avatar}` : '/images/logos/slack.png'
                  }
                />
                <div>
                  {/* <span>{user.UserTitle}</span> */}
                  <span>{user?.businessName}</span>
                </div>
                {/* <span style={{ margin:"auto"}}>{user.UserTitle}{" "}{user.name.fName}{" "}{user.name.mName}{" "}{user.name.lName}</span> */}
              </Grid>
              <Grid item sm={8}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField
                      style={{ marginTop: '10px' }}
                      id='outlined-basic'
                      label='Business Name'
                      variant='outlined'
                      value={user?.businessName}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      id='outlined-basic'
                      label='Owner Name'
                      variant='outlined'
                      value={user?.fName + ' ' + user?.mName + ' ' + user?.lName}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Nature of Business'
                      variant='outlined'
                      value={user?.natureOfBusiness}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Mobile Number'
                      variant='outlined'
                      value={user?.mobile}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      id='outlined-basic'
                      label='Email'
                      variant='outlined'
                      value={user.email}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      id='outlined-basic'
                      label='Number of Outlet'
                      variant='outlined'
                      value={user.outletCount}
                    />
                    <TextField style={{ marginTop: '10px' }} label='CROP ID' variant='outlined' value={user.cropId} />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Active Loyalty Program'
                      variant='outlined'
                      value={user?.loyaltyProgram?.length ? 'true' : 'false'}
                    />
                    {/* <TextField style={{ marginTop: '10px' }} label='Name Of Loyalty Program' variant='outlined' value={user?.nameOfLoyaltyProgram} /> */}
                  </Grid>
                  <Grid item sm={6}>
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Market Notification Status'
                      variant='outlined'
                      value={user.mktNotification}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Newsletter Subscription Status'
                      variant='outlined'
                      value={user?.newsLetterSubscription}
                    />
                    <TextField style={{ marginTop: '10px' }} label='Tier' variant='outlined' value={user.Tier} />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Promo Code'
                      variant='outlined'
                      value={user?.promoCode}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='referral Code'
                      variant='outlined'
                      value={user?.referelCode}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Signup Date'
                      variant='outlined'
                      value={new Date(user.createdAt).toLocaleDateString()}
                    />
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Last Tier Change Date'
                      variant='outlined'
                      value={new Date(user.TierChangeDate).toLocaleDateString()}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div style={{ marginLeft: '327px' }}>
              {user.address &&
                user.address.map((data, i) => (
                  <div key={'address' + data._id}>
                    <h3>Address {i + 1}</h3>

                    <Grid container spacing={2}>
                      <Grid item sm={6}>
                        <Grid
                          container
                          spacing={2}
                          style={{
                            width: '350px',
                            lineHeight: '10px',
                            borderRadius: '10px',
                            border: '1px solid #c1c1c1'
                          }}
                        >
                          <Grid item sm={2}>
                            <p style={{ fontWeight: 'bold' }}>Line1 </p>
                            <p style={{ fontWeight: 'bold' }}>Line2 </p>
                            <p style={{ fontWeight: 'bold' }}>Line3 </p>
                            <p style={{ fontWeight: 'bold' }}>State </p>
                            <p style={{ fontWeight: 'bold' }}>Pin </p>
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
                    </Grid>
                  </div>
                ))}
            </div>
            <div style={{ marginLeft: '327px' }}>
              <h3> Name of Loyalty Programs</h3>
              <div
                style={{
                  width: '350px',
                  lineHeight: '10px',
                  borderRadius: '10px',
                  border: '1px solid #c1c1c1',
                  padding: '10px',
                  height: '200px',
                  overflow: 'auto'
                }}
              >
                {user.loyaltyProgram &&
                  user.loyaltyProgram.map((data, i) => (
                    <div key={'loyalty' + data._id}>
                      <p>{data.programmeName}</p>
                    </div>
                  ))}
              </div>
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
            <h2 style={{ textAlign: 'center' }}>Profile Details</h2>
            <Grid container spacing={2}>
              <Grid item sm={4} style={{ alignItems: 'center', alignContent: 'center', textAlign: 'center' }}>
                <img
                  style={{ margin: 'auto' }}
                  width='150px'
                  src={user.avatar ? `${process.env.HOST}/api/products/images/${user.avatar}` : `/images/avatars/1.png`}
                />
                <div>
                  <span>{user.UserTitle} </span>
                  <span>{user.name.fName} </span>
                  <span>{user.name.mName} </span>
                  <span>{user.name.lName} </span>
                </div>
                {/* <span style={{ margin:"auto"}}>{user.UserTitle}{" "}{user.name.fName}{" "}{user.name.mName}{" "}{user.name.lName}</span> */}
              </Grid>
              <Grid item sm={8}>
                <Grid container spacing={2}>
                  <Grid item sm={6}>
                    <TextField
                      style={{ marginTop: '10px' }}
                      label='Customer Name'
                      variant='outlined'
                      value={user.name?.fName + ' ' + user.name?.mName + ' ' + user.name?.lName}
                    />
                    <TextField style={{ marginTop: '15px' }} label='Gender' variant='outlined' value={user.gender} />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='DOB'
                      variant='outlined'
                      value={`${new Date(user.dob).getDate()}/${new Date(user.dob).getMonth()}`}
                    />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='AgeGroup'
                      variant='outlined'
                      value={user?.agegroup}
                    />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Mobile Number'
                      variant='outlined'
                      value={user?.mobileNumber}
                    />
                    <TextField style={{ marginTop: '10px' }} label='Email' variant='outlined' value={user.email} />
                    <TextField style={{ marginTop: '15px' }} label='CROP ID' variant='outlined' value={user.cropid} />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Promo Code'
                      variant='outlined'
                      value={user.promocode}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <TextField style={{ marginTop: '10px' }} label='Loyalty' variant='outlined' value={user?.loyalty} />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Interests'
                      variant='outlined'
                      value={user?.interest}
                    />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Marketing Notification Status'
                      variant='outlined'
                      value={user.mktNotification}
                    />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Newsletter Subscription Status'
                      variant='outlined'
                      value={user?.newsLetterSubscription}
                    />
                    <TextField style={{ marginTop: '15px' }} label='Tier' variant='outlined' value={user.UserTier} />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Refferal Code'
                      variant='outlined'
                      value={user.refercode}
                    />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Customer Signup date'
                      variant='outlined'
                      value={user.signUpDate}
                    />
                    <TextField
                      style={{ marginTop: '15px' }}
                      label='Last Tier Change Date'
                      variant='outlined'
                      value={new Date(user?.TierChangeDate).toLocaleDateString()}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {user.address &&
              user.address.map((data, i) => (
                <div key={'address' + data._id} style={{ marginLeft: '327px' }}>
                  <h3>Address {i + 1}</h3>
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <Grid
                        container
                        spacing={2}
                        style={{
                          width: '280px',
                          lineHeight: '10px',
                          borderRadius: '10px',
                          border: '1px solid #c1c1c1'
                        }}
                      >
                        <Grid item sm={2}>
                          <p style={{ fontWeight: 'bold' }}>Line1 </p>
                          <p style={{ fontWeight: 'bold' }}>Line2 </p>
                          <p style={{ fontWeight: 'bold' }}>Line3 </p>
                          <p style={{ fontWeight: 'bold' }}>State </p>
                          <p style={{ fontWeight: 'bold' }}>Pin </p>
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
                  </Grid>
                </div>
              ))}
            <div style={{ display: 'flex', flexDirection: 'start', marginLeft: '327px', gap: '5px' }}>
              <div>
                <h3>Loyalty</h3>
                <div
                  style={{
                    border: '1px solid #c1c1c1',
                    width: '250px',
                    lineHeight: '10px',
                    borderRadius: '10px',
                    padding: '5px'
                  }}
                >
                  {user.interestList?.length &&
                    user.interestList?.map((data, i) => (
                      <div key={'interest' + data._id}>
                        <p>
                          {i + 1}: {data}{' '}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h3>Loyalty</h3>
                <div
                  style={{
                    border: '1px solid #c1c1c1',
                    width: '250px',
                    lineHeight: '10px',
                    borderRadius: '10px',
                    padding: '5px'
                  }}
                >
                  {user.loyaltyList?.length &&
                    user.loyaltyList?.map((data, i) => (
                      <div key={'interest' + data._id}>
                        <p>
                          {i + 1}: {data}{' '}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
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
  const showBusinessProductRated = x => {
    router.push(`/databaseManagement/businessProductRated?q=${x}`)
  }
  useEffect(() => {
    fetchCustomerDetails()
    fetchBusinessDetails()
  }, [])

  return (
    <Grid container spacing={2}>
      <div style={{ display: 'flex', gap: 2 }}>
        <Switch
          {...label}
          defaultChecked
          sx={{ marginTop: 3 }}
          onChange={() => setSelectedOption(x => (x === 'Customer Data' ? 'Business Data' : 'Customer Data'))}
        />
        <h5>{selectedOption}</h5>
      </div>
      <Grid item xs={12}>
        <Search />
      </Grid>
      {selectedOption == 'Customer Data' ? (
        <Grid item xs={12}>
          <Card>
            <TableContainer sx={{ height: '420px' }}>
              {/* <h4 style={{ marginLeft: '20px' }}>Customer Data</h4> */}

              {cdStatus ? (
                <Spinner />
              ) : !customerData.length ? (
                <h6 style={{ textAlign: 'center' }}>Data not found</h6>
              ) : (
                <Table stickyHeader aria-label='table in dashboard'>
                  <TableHead>
                    <TableRow>
                      <TableCell>SI</TableCell>
                      <TableCell>Customer Name</TableCell>
                      <TableCell>CROP Id</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Tier</TableCell>
                      <TableCell>Profile</TableCell>
                      <TableCell>Invoices</TableCell>
                      <TableCell sx={{ textTransform: 'none' }}>CROPs</TableCell>
                      <TableCell sx={{ textTransform: 'none' }}>PROPs</TableCell>
                      <TableCell>Liked Product</TableCell>
                      <TableCell>Rated Product</TableCell>
                      <TableCell>Audit Trail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customerData.map((row, index) => (
                      <TableRow
                        hover
                        key={'customer' + row._id}
                        sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important', minWidth: '160px' }}>
                              {row.name.fName} {row.name.mName} {row.name.lName}{' '}
                            </Typography>
                            {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                            {/* <Typography variant='caption'>{row.designation}</Typography> */}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ paddingRight: '64px' }}>{row.cropid}</TableCell>
                        <TableCell sx={{ minWidth: '100px' }}>
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
                        <TableCell sx={{ minWidth: '100px' }}>{row.UserTier}</TableCell>
                        <TableCell sx={{ minWidth: '100px' }}>
                          <CustomerModal user={row} />
                        </TableCell>
                        <TableCell
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                          onClick={() => showCustomerInvoice(row._id)}
                        >
                          <ReceiptLongIcon />
                        </TableCell>
                        <TableCell onClick={() => showCustomerCrop(row._id)} sx={{ paddingRight: '30px' }}>
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
                        <TableCell
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                          onClick={() => showCustomerProp(row._id)}
                        >
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
                        <TableCell
                          onClick={() => showCustomerLikeProduct(row._id)}
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                        >
                          <ThumbUp />
                        </TableCell>
                        <TableCell
                          onClick={() => showCustomerRatedProduct(row._id)}
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                        >
                          <Avatar
                            style={{ width: '20px', height: '20px' }}
                            alt='rating product'
                            src='/images/rating.png'
                          />
                        </TableCell>
                        <TableCell
                          onClick={() => showCustomerAuditReport(row._id)}
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                        >
                          <Avatar
                            style={{ width: '20px', height: '20px' }}
                            alt='audit trail'
                            src='/images/icons8-audit-48.png'
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
      ) : (
        <Grid item xs={12}>
          <Card>
            <TableContainer sx={{ height: '420px' }}>
              {bdStatus ? (
                <Spinner />
              ) : !businessData.length ? (
                <h6 style={{ textAlign: 'center' }}>Data not found</h6>
              ) : (
                <Table stickyHeader aria-label='table in dashboard'>
                  <TableHead>
                    <TableRow>
                      <TableCell>SI</TableCell>
                      <TableCell>Business Name</TableCell>
                      <TableCell>CROP Id</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Tier</TableCell>
                      <TableCell>Profile</TableCell>
                      <TableCell>Invoices</TableCell>
                      <TableCell sx={{ textTransform: 'none' }}>CROPs</TableCell>
                      <TableCell>Active Offers</TableCell>
                      <TableCell>Product Rated</TableCell>
                      <TableCell>Audit Trail</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {businessData.map((row, index) => (
                      <TableRow
                        hover
                        key={'business' + row._id}
                        sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important', minWidth: '160px' }}>
                              {row.businessName}
                            </Typography>
                            {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                            {/* <Typography variant='caption'>{row.designation}</Typography> */}
                          </Box>
                        </TableCell>
                        <TableCell>{row.cropId}</TableCell>
                        <TableCell sx={{ minWidth: '100px' }}>
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
                        <TableCell sx={{ minWidth: '100px' }}>{row.tier}</TableCell>
                        <TableCell sx={{ minWidth: '100px' }}>
                          <BusinessModal user={row} />
                        </TableCell>
                        <TableCell
                          onClick={() => showBusinessInvoice(row._id)}
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                        >
                          <ReceiptLongIcon />
                        </TableCell>
                        <TableCell sx={{ minWidth: '100px' }} onClick={() => showBusinessCrop(row._id)}>
                          <Chip
                            label={row.croppoint.toFixed(2)}
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
                        <TableCell
                          onClick={() => showBusinessProductRated(row._id)}
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                        >
                          <Avatar
                            style={{ width: '20px', height: '20px' }}
                            alt='rating product'
                            src='/images/rating.png'
                          />
                        </TableCell>
                        <TableCell
                          onClick={() => showBusinessAuditReport(row._id)}
                          sx={{ cursor: 'pointer', minWidth: '100px' }}
                        >
                          <Avatar
                            style={{ width: '20px', height: '20px' }}
                            alt='audit trail'
                            src='/images/icons8-audit-48.png'
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
      )}
    </Grid>
  )
}

export default Database
