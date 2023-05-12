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
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

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
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <Card>
          <CardHeader
            title='Customer CROPs'
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
                  <TableCell>CROP_ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>{'CROP'}</TableCell>
            
                </TableRow>
              </TableHead>
              <TableBody>
              {customerCropData.map((item, index) => {
              return (
               
                    <TableRow hover  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell ><p style={{display:"flex",alignItems:"center",marginLeft:"10px"}}><Avatar variant='rounded'></Avatar>{item.cropid}</p></TableCell>
                      <TableCell sx={{cursor:'pointer'}} onClick={() => showCustomerCrop(item._id)}>{item?.name?.fName??" "}{" "}{item?.name?.mName??" "}{" "}{item?.name?.lName??" "}</TableCell>
                      <TableCell sx={{cursor:'pointer'}} onClick={() => showCustomerCrop(item._id)}><img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.croppoints.toFixed(2)}
                      <LinearProgress color={item.color} value={item.progress} variant='determinate' style={{width:"80px"}}/></TableCell>
                    </TableRow>
                )}
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Card>
          <CardHeader
            title='Customer PROPs'
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
                  <TableCell>CROP_ID</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>{'PROP'}</TableCell>
            
                </TableRow>
              </TableHead>
              <TableBody>
              {customerCropData.map((item, index) => {
              return (
               
                    <TableRow hover  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell ><p style={{display:"flex",alignItems:"center",marginLeft:"10px"}}><Avatar variant='rounded'></Avatar>{item.cropid}</p></TableCell>
                      <TableCell sx={{cursor:'pointer'}} onClick={() => showCustomerProp(item._id)}>{item?.name?.fName??" "}{" "}{item?.name?.mName??" "}{" "}{item?.name?.lName??" "}</TableCell>
                      <TableCell sx={{cursor:'pointer'}} onClick={() => showCustomerProp(item._id)}><img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.proppoints.toFixed(2)}
                      <LinearProgress color={item.color} value={item.progress} variant='determinate' style={{width:"80px"}}/></TableCell>
                    </TableRow>
                )}
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Card>
          <CardHeader
            title='Business CROPs'
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
                  <TableCell>CROP_ID</TableCell>
                  <TableCell>Business Name</TableCell>
                  <TableCell>{'CROP'}</TableCell>
            
                </TableRow>
              </TableHead>
              <TableBody>
              {businessCropData.map((item, index) => {
              return (
               
                    <TableRow hover  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell ><p style={{display:"flex",alignItems:"center",marginLeft:"10px"}}><Avatar variant='rounded'></Avatar>{item.cropId}</p></TableCell>
                      <TableCell  sx={{cursor:'pointer'}} onClick={() => showBusinessCrop(item._id)}>  {item.businessName}</TableCell>
                      <TableCell  sx={{cursor:'pointer'}} onClick={() => showBusinessCrop(item._id)}><img width='10px' src={'/images/crop.png'} alt='crop logo' /> {item.croppoint}
                      <LinearProgress color={item.color} value={item.progress} variant='determinate' style={{width:"80px"}}/></TableCell>
                    </TableRow>
                )}
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
      <Card>
          <CardHeader
            title='Customer Invoices'
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
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Invoices</TableCell>
                
            
                </TableRow>
              </TableHead>
              <TableBody>
              {customerData.map(row => (
               
                    <TableRow hover    key={'customer' + row._id}  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                     
                     <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                            {row.name.fName} {row.name.mName} {row.name.lName}{' '}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell  sx={{cursor:'pointer'}} onClick={() => showCustomerInvoice(row._id)}>  <ReceiptLongIcon/></TableCell>
                    
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
            title='Business Invoices'
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
                  <TableCell>Business Name</TableCell>
                  <TableCell>Invoices</TableCell>
                
            
                </TableRow>
              </TableHead>
              <TableBody>
              {businessData.map(row => (
               
                    <TableRow hover    key={'business' + row._id}  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                     
                     <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                            {row?.businessName}
                          </Typography>
                          {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                          <Typography variant='caption'>{row.designation}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell  sx={{cursor:'pointer'}} onClick={() => showBusinessInvoice(row._id)}>  <ReceiptLongIcon/></TableCell>
                    
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

export default AccountManagement
