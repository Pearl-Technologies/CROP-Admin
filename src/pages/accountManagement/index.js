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
import { Select, MenuItem, InputLabel } from '@mui/material'
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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
// ** Icons Imports
import Spinner from '../databaseManagement/spinner'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { useRouter } from 'next/router'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import Switch from '@mui/material/Switch'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const AccountManagement = () => {
  const router = useRouter()
  const [businessData, setBusinessData] = useState([])
  const [customerData, setCustomerData] = useState([])
  const [ccStatus, setccStatus] = useState(false)
  const [cpStatus, setcpStatus] = useState(false)
  const [bcStatus, setbcStatus] = useState(false)
  const [ciStatus, setciStatus] = useState(false)
  const [biStatus, setbiStatus] = useState(false)
  const [customerCropData, setCustomerCropData] = useState([])
  const [customerPropData, setCustomerPropData] = useState([])
  const [businessCropData, setBusinessCropData] = useState([])
  const [customerAccountBalanceData, setCustomerAccountBalanceData] = useState([])
  const [businessAccountBalanceData, setBusinessAccountBalanceData] = useState([])
  const [selectedOption, setSelectedOption] = useState('Customer Transactions')
  const [selectedCustomerOpt, setSelectedCustomerOpt] = useState('')
  const [selectedBusinessOpt, setSelectedBusinessOpt] = useState('')
  const fetchCustomerCropTrasaction = () => {
    setccStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerCropData(response.data.customers)
        setccStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setccStatus(false)
      })
  }
  const fetchBusinessCropTrasaction = () => {
    setbcStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessCropData(response.data.businesses)
        setbcStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setbcStatus(false)
      })
  }

  useEffect(() => {
    fetchCustomerCropTrasaction()
    fetchBusinessCropTrasaction()
    fetchBusinessDetails()
    fetchCustomerDetails()
  }, [])

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
    setbiStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessData(response.data.businesses)
        setbiStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setbiStatus(false)
      })
  }
  const fetchCustomerDetails = () => {
    setciStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerData(response.data.customers)
        setciStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setciStatus(false)
      })
  }
  const showCustomerInvoice = x => {
    router.push(`/accountManagement/customerInvoiceDetails?q=${x}`)
  }
  const showBusinessInvoice = x => {
    router.push(`/accountManagement/businessInvoiceDetails?q=${x}`)
  }

  const RenderOptions = () => {
    return (
      <Select
        sx={{ margin: 5 }}
        value={selectedOption}
        onChange={e => {
          // setSelectedOption()
          console.log(e.target.value)
          setSelectedOption(e.target.value)
        }}
      >
        <MenuItem value='customerData'>Customer Data</MenuItem>
        <MenuItem value='businessData'>Business Data</MenuItem>
      </Select>
    )
  }

  const RenderCustomerOptions = () => {
    return (
      <Select
        sx={{ margin: 5 }}
        value={selectedCustomerOpt}
        onChange={e => {
          // setSelectedOption()
          console.log(e.target.value)
          setSelectedCustomerOpt(e.target.value)
        }}
      >
        <MenuItem value='customerCrops'>Customer CROPs</MenuItem>
        <MenuItem value='customerProps'>Customer PROPs</MenuItem>
        <MenuItem value='customerInvoices'>Customer Invoices</MenuItem>
      </Select>
    )
  }

  const [value, setValue] = React.useState('one')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container >
       <div style={{ display: 'flex', gap: 2, margin:0}}>
      <Switch
        {...label}
        defaultChecked
        onChange={() => setSelectedOption(x => {
          x==="Customer Transactions"? setValue('four'):setValue("one")
          return(x === 'Customer Transactions' ? 'Business Transactions' : 'Customer Transactions')})}
      />
      <p style={{marginTop:8, fontWeight:"bold"}}>{selectedOption}</p>
      </div>

      {selectedOption === 'Customer Transactions' ? (
        <>
          <Grid item sm={12}>
            {ccStatus && value === 'one' && <Spinner />}
            {ccStatus && value === 'two' && <Spinner />}
            {ciStatus && value === 'three' && <Spinner />}
            <Card>
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor='secondary'
                  indicatorColor='secondary'
                  aria-label='secondary tabs example'
                >
                  <Tab value='one' label='CROP' />
                  <Tab value='two' label='PROP' />
                  <Tab value='three' label='Invoice' />
                </Tabs>
              </Box>
              {value === 'one' && (
                <TableContainer sx={{ height: 400 }}>
                  <Table
                    sx={{ minWidth: 800 }}
                    aria-label='table in dashboard'
                    stickyHeader
                    style={{ border: '1px solid #F4F5FA' }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>CROP ID</TableCell>
                        <TableCell>{'CROP'}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerCropData.map((item, index) => {
                        return (
                          <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`}}>
                              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar variant='rounded-circle' 
                                src={
                                  item?.avatar
                                    ? `${process.env.HOST}/api/products/image/${item?.avatar}`
                                    : '/images/avatars/1.png'
                                }
                                ></Avatar>
                                <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem !important',
                                  alignSelf: 'center',
                                  marginLeft: '10px'
                                }}
                              >
                                 {item?.name?.fName ?? ''} {item?.name?.mName ?? ''} {item?.name?.lName ?? ''}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                            {item?.cropid} 
                            </TableCell>
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerCrop(item._id)}>
                              <img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.croppoints.toFixed(2)}
                              <LinearProgress
                                color={item.color}
                                value={item.progress}
                                variant='determinate'
                                style={{ width: '80px' }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {value === 'two' && (
                <TableContainer sx={{ height: 400 }}>
                  <Table
                    sx={{ minWidth: 800 }}
                    aria-label='table in dashboard'
                    stickyHeader
                    style={{ border: '1px solid #F4F5FA' }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>CROP ID</TableCell>
                        <TableCell>{'PROP'}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerCropData.map((item, index) => {
                        return (
                          <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar variant='rounded-circle'
                                src={
                                  item?.avatar
                                    ? `${process.env.HOST}/api/products/image/${item?.avatar}`
                                    : '/images/avatars/1.png'
                                } />
                                <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem !important',
                                  alignSelf: 'center',
                                  marginLeft: '10px'
                                }}
                              >
                                 {item.name.fName} {item.name.mName} {item.name.lName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              {item?.cropid} 
                            </TableCell>
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerProp(item._id)}>
                              <img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.proppoints.toFixed(2)}
                              <LinearProgress
                                color={item.color}
                                value={item.progress}
                                variant='determinate'
                                style={{ width: '80px' }}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {value === 'three' && (
                <TableContainer sx={{ height: 400 }}>
                  <Table
                    sx={{ minWidth: 800 }}
                    aria-label='table in dashboard'
                    stickyHeader
                    style={{ border: '1px solid #F4F5FA' }}
                  >
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
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Avatar
                                variant='rounded-circle'
                                src={
                                  row?.avatar
                                    ? `${process.env.HOST}/api/products/image/${row?.avatar}`
                                    : '/images/avatars/1.png'
                                }
                              ></Avatar>
                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem !important',
                                  alignSelf: 'center',
                                  marginLeft: '10px'
                                }}
                              >
                                {row.name.fName} {row.name.mName} {row.name.lName}{' '}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerInvoice(row._id)}>
                            {' '}
                            <ReceiptLongIcon sx={{height:"19.4px"}}/>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </Grid>
        </>
      ) : (
        <>
          {/* business crop */}
          <Grid item xs={12}>
            {bcStatus && value === 'four' && <Spinner />}
            {biStatus && value === 'five' && <Spinner />}
            <Card>
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor='secondary'
                  indicatorColor='secondary'
                  aria-label='secondary tabs example'
                >
                  <Tab value='four' label='CROP' />
                  <Tab value='five' label='Invoice' />
                </Tabs>
              </Box>

              {value === 'four' && (
                <TableContainer  sx={{ height: 400 }}>
                  <Table
                    sx={{ minWidth: 800 }}
                    aria-label='table in dashboard'
                    stickyHeader
                    style={{ border: '1px solid #F4F5FA' }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Business Name</TableCell>
                        <TableCell> CROP ID</TableCell>
                        <TableCell>{'CROP'}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {businessCropData.map((item, index) => {
                        return (
                          <TableRow hover 
                          key={'businessCrop' + item._id}
                          sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar
                                  variant='rounded-circle'
                                  src={
                                    item?.avatar
                                      ? `${process.env.HOST}/api/products/image/${item?.avatar}`
                                      : '/images/logos/slack.png'
                                  }
                                ></Avatar>
                                <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem !important',
                                  alignSelf: 'center',
                                  marginLeft: '10px'
                                }}
                              >
                                {item.businessName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell >          
                              {item.cropId}
                            </TableCell>
                            <TableCell sx={{ cursor: 'pointer', display:"flex", gap:2 }} onClick={() => showBusinessCrop(item._id)}>
                              <img height='20px' src={'/images/crop.png'} alt='crop logo' />
                              <Typography>{item.croppoint.toFixed(2)}</Typography> 
                              {/* <LinearProgress
                                color={item.color}
                                value={item.progress}
                                variant='determinate'
                                style={{ width: '80px' }}
                              /> */}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {value === 'five' && (
                <TableContainer sx={{ height: 400 }}>
                  <Table
                    sx={{ minWidth: 800 }}
                    aria-label='table in dashboard'
                    stickyHeader
                    style={{ border: '1px solid #F4F5FA' }}
                  >
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
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Avatar
                                variant='rounded-circle'
                                src={
                                  row?.avatar
                                    ? `${process.env.HOST}/api/products/image/${row?.avatar}`
                                    : '/images/logos/slack.png'
                                }
                              ></Avatar>

                              <Typography
                                sx={{
                                  fontWeight: 500,
                                  fontSize: '0.875rem !important',
                                  alignSelf: 'center',
                                  marginLeft: '10px'
                                }}
                              >
                                {row?.businessName}
                              </Typography>
                              {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                              {/* <Typography variant='caption'>{row.designation}</Typography> */}
                            </Box>
                          </TableCell>

                          <TableCell sx={{ cursor: 'pointer'}} onClick={() => showBusinessInvoice(row._id)}>                            
                            <ReceiptLongIcon sx={{height:"18.3px"}}/>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default AccountManagement