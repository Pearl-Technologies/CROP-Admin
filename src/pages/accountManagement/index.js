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
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'
import ArrowUpDropCircleOutline from 'mdi-material-ui/ArrowUpDropCircleOutline'
import ArrowDownDropCircleOutline from 'mdi-material-ui/ArrowDownDropCircleOutline'
import CustomerTransitionsModal from './customerMotal'
import CardMedia from '@mui/material/CardMedia'
import CropDetails from './cropDetails'
// ** Icons Imports
import Spinner from '../databaseManagement/spinner'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { useRouter } from 'next/router'

const AccountManagement = () => {
  const router = useRouter()
  const [businessData, setBusinessData] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [bdStatus, setBDStatus] = useState(false)
  const [cdStatus, setCDStatus] = useState(false)
  const [customerCropData, setCustomerCropData] = useState([])
  const [customerPropData, setCustomerPropData] = useState([])
  const [businessCropData, setBusinessCropData] = useState([])
  const [customerAccountBalanceData, setCustomerAccountBalanceData] = useState([])
  const [businessAccountBalanceData, setBusinessAccountBalanceData] = useState([])
  const fetchCustomerCropTrasaction = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerCropData(response.data.customers)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchCustomerPropTrasaction = () => {
    axios
      .post(`${process.env.HOST}/api/customer/getAllCustomerProp`)
      .then(function (response) {
        // handle success
        // console.log(response);
        console.log(response.data.propData)
        setCustomerPropData(response.data.propData)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchBusinessCropTrasaction = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessCropData(response.data.businesses)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchCustomerAccountBalance = () => {
    axios
      .post(`${process.env.HOST}/api/customer/getCustomerAccountBalance`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerAccountBalanceData(response.data.availBalance)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchBusinessAccountBalance = () => {
    axios
      .post(`${process.env.HOST}/api/business/getBusinessAccountBalance`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessAccountBalanceData(response.data.availBalance)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    fetchCustomerCropTrasaction()
    // fetchCustomerPropTrasaction()
    fetchBusinessCropTrasaction()
    fetchBusinessDetails()
    fetchCustomerDetails()
    // fetchCustomerAccountBalance()
    // fetchBusinessAccountBalance()
  }, [])

  const TransactionDetails = ({ item, data }) => {
    const [show, setShow] = useState(false)

    return show ? (
      <Grid item xs={12} style={{ border: '1px solid blue' }}>
        <Card>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <button onClick={() => setShow(x => !x)}>
                  <ArrowUpDropCircleOutline />
                </button>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Order No</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Credit</TableCell>
                  <TableCell>Debit</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .filter(x => x.user === item.user)
                  .map(row => (
                    <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                            {new Date(row.createdAt).toDateString()}
                          </Typography>
                          <Typography variant='caption'>{row.designation}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{row.orderNo}</TableCell>
                      <TableCell>{row.transactionType}</TableCell>
                      <TableCell>{row.transactionAmount}</TableCell>
                      <TableCell>{row?.credit}</TableCell>
                      <TableCell>{row?.debit}</TableCell>
                      <TableCell>{'view'}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    ) : (
      <span onClick={() => setShow(x => !x)}>
        <ArrowDownDropCircleOutline />
      </span>
    )
  }

  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
  }
  const showCustomerProp = x => {
    router.push(`/accountManagement/propDetails?q=${x}`)
  }
  const showBusinessCrop = x => {
    router.push(`/accountManagement/businessCropDetails?q=${x}`)
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
  const showCustomerInvoice = x => {
    router.push(`/accountManagement/customerInvoiceDetails?q=${x}`)
  }
  const showBusinessInvoice = x => {
    router.push(`/accountManagement/businessInvoiceDetails?q=${x}`)
  }

  return (
    <Grid container spacing={2} xs={10} margin={'auto'}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Customer Crops'
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '22px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box width='100px'>
                <Typography variant='body2' sx={{ mb: 0.5, mr: 5, fontWeight: 600, color: 'text.primary' }}>
                  CROP_ID
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}>
                  Customer Name
                </Typography>
              </Box>

              <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}>
                  {'CROP'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important`, height: '300px', overflow: 'auto' }}>
            {customerCropData.map((item, index) => {
              return (
                <Box
                  key={'customerCropBalance' + item.cropid}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ...(index !== item.length - 1 ? { mb: 8.5 } : {})
                  }}
                >
                  <Avatar
                    variant='rounded'
                    sx={{
                      mr: 3,
                      width: 40,
                      height: 40,
                      // backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                    }}
                  >
                    {/* <img src={item.imgSrc} alt={item.title} height={item.imgHeight} /> */}
                  </Avatar>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}                    
                  >
                    <Box width='100px'>
                      <Typography variant='body2' sx={{ mb: 0.5, mr: 5, fontWeight: 600, color: 'text.primary' }}>
                        {item.cropid}
                      </Typography>
                    </Box>
                    <Box component="span" sx={{width: 200 }}>
                      <Typography
                        variant='body2'
                        sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary', cursor: 'pointer'}}
                        onClick={() => showCustomerCrop(item._id)}
                      >
                        {item?.name?.fName??" "}{" "}{item?.name?.mName??" "}{" "}{item?.name?.lName??" "}
                      </Typography>
                    </Box>

                    <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant='body2'
                        sx={{ mb: 2, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}
                        onClick={() => showCustomerCrop(item._id)}
                      >
                        <img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.croppoints.toFixed(2)}
                      </Typography>
                      <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Customer Props'
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '22px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box width='100px'>
                <Typography variant='body2' sx={{ mb: 0.5, mr: 5, fontWeight: 600, color: 'text.primary' }}>
                  CROP_ID
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}>
                  Customer Name
                </Typography>
              </Box>

              <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}>
                  {'PROP'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important`, height: '300px', overflow: 'auto' }}>
            {customerCropData.map((item, index) => {
              return (
                <Grid item xs={12} sx={{ gap: '2px' }}>
                  <Box
                    key={'customerPropBalance' + item._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ...(index !== item.length - 1 ? { mb: 8.5 } : {})
                    }}
                  >
                    <Avatar
                      variant='rounded'
                      sx={{
                        mr: 3,
                        width: 40,
                        height: 40,
                        // backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                      }}
                    >
                      {/* <img src={item.imgSrc} alt={item.title} height={item.imgHeight} /> */}
                    </Avatar>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box>
                        <Typography variant='body2' sx={{ mb: 0.5, mr: 5, fontWeight: 600, color: 'text.primary' }}>
                          {item.cropid}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant='body2'
                          sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}
                          onClick={() => showCustomerProp(item._id)}
                        >
                          {item?.name?.fName??" "}{" "}{item?.name?.mName??" "}{" "}{item?.name?.lName??" "}
                        </Typography>
                      </Box>

                      <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                          {item?.proppoints}
                        </Typography>
                        <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                      </Box>
                    </Box>
                  </Box>
                  {/* {Boolean(customerPropData.filter(x => x.user === item.user).length) &&
                        <TransactionDetails item={item} data={customerPropData} />
                      } */}
                </Grid>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Business Crops'
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
                <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '22px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box width='100px'>
                <Typography variant='body2' sx={{ mb: 0.5, mr: 5, fontWeight: 600, color: 'text.primary' }}>
                  CROP_ID
                </Typography>
              </Box>
              <Box>
                <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}>
                  Business Name
                </Typography>
              </Box>

              <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}>
                  {'CROP'}
                </Typography>
              </Box>
            </Box>
          </Box>
          <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important`, height: '300px', overflow: 'auto' }}>
            {businessCropData.map((item, index) => {
              return (
                <>
                  <Box
                    key={'businessCrop' + item._id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ...(index !== item.length - 1 ? { mb: 8.5 } : {})
                    }}
                  >
                    <Avatar
                      variant='rounded'
                      sx={{
                        mr: 3,
                        width: 40,
                        height: 40,
                        // backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                      }}
                    >
                      {/* <img src={item.imgSrc} alt={item.title} height={item.imgHeight} /> */}
                    </Avatar>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          variant='body2'
                          sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}
                          onClick={() => showBusinessCrop(item._id)}
                        >
                          {item.cropId}
                        </Typography>                      
                      </Box>
                      <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          variant='body2'
                          sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}
                          onClick={() => showBusinessCrop(item._id)}
                        >
                          {item.businessName}
                        </Typography>                      
                      </Box>

                      <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          variant='body2'
                          sx={{ mb: 2, fontWeight: 600, color: 'text.primary', cursor: 'pointer' }}
                          onClick={() => showBusinessCrop(item._id)}
                        >
                          <img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.croppoint}
                        </Typography>
                        <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                      </Box>
                    </Box>
                  </Box>
                  {/* {Boolean(businessCropData.filter(x => x.user === item.user).length) && (
                    <TransactionDetails item={item} data={businessCropData} />
                  )} */}
                </>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h4 style={{ marginLeft: '20px' }}>Customer Invoices</h4>
            {cdStatus ? (
              <Spinner />
            ) : !customerData.length ? (
              <h6 style={{ textAlign: 'center' }}>Data not found</h6>
            ) : (
              <Table stickyHeader aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>

                    <TableCell>Invoices</TableCell>
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

                      <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerInvoice(row._id)}>
                        {'invoices'}
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
            <h3 style={{ marginLeft: '20px' }}>Business Invoices</h3>
            {bdStatus ? (
              <Spinner />
            ) : !businessData.length ? (
              <h6 style={{ textAlign: 'center' }}>Data not found</h6>
            ) : (
              <Table stickyHeader aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Business Name</TableCell>

                    <TableCell>Invoices</TableCell>
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
                      <TableCell sx={{ cursor: 'pointer' }} onClick={() => showBusinessInvoice(row._id)}>
                        {'invoices'}
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

export default AccountManagement
