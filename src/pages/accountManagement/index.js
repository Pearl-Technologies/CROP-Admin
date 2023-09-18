import React, { useState, useEffect, useContext } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
// ** Icons Imports
import Spinner from '../databaseManagement/spinner'
import { useRouter } from 'next/router'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import Switch from '@mui/material/Switch'
import {AdminContext} from '../../@core/context/adminContest'
import PaginationComponent from 'src/components/pagination'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

const AccountManagement = () => {
  const router = useRouter()
  const {AMTvalue:value, setAMTValue: setValue, customerData, customerCount, setPage, page, cdStatus, 
    bdStatus, setBPage, businessCount, businessData, selectedOption, setSelectedOption, bPage} = useContext(AdminContext)

  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
  }
  const showCustomerProp = x => {
    router.push(`/accountManagement/propDetails?q=${x}`)
  }
  const showBusinessCrop = x => {
    router.push(`/accountManagement/businessCropDetails?q=${x}`)
  }
  const showCustomerInvoice = x => {
    router.push(`/accountManagement/customerInvoiceDetails?q=${x}`)
  }
  const showBusinessInvoice = x => {
    router.push(`/accountManagement/businessInvoiceDetails?q=${x}`)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Grid container >
       <div style={{ display: 'flex', gap: 2, margin:0}}>
      <Switch
        {...label}
        defaultChecked color="default"
        onChange={() => setSelectedOption(x => {
          x==="Customer Data"? setValue('four'):setValue("one")
          return(x === 'Customer Data' ? 'Business Data' : 'Customer Data')})}
      />
      <p style={{marginTop:8, fontWeight:"bold"}}>{selectedOption==="Customer Data" ? "Customer Transactions" : "Business Transactions"}</p>
      </div>

      {selectedOption === 'Customer Data' ? (
        <>
          <Grid item sm={12}>
            {cdStatus && value === 'one' && <Spinner />}
            {cdStatus && value === 'two' && <Spinner />}
            {cdStatus && value === 'three' && <Spinner />}
            <Card>
              <Box sx={{ width: '100%' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor='secondary'
                  indicatorColor='secondary'
                  aria-label='secondary tabs example'
                >
                  <Tab value='one' label='CROP' sx={{ textTransform: 'none' }}/>
                  <Tab value='two' label='PROP' sx={{ textTransform: 'none' }}/>
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
                        {/* <TableCell>{'CROP'}</TableCell> */}
                        <TableCell sx={{ textTransform: 'none' }}>CROPs</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerData.map((item, index) => {
                        return (
                          <TableRow hover key={'customerCropData'+index}sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`, width:"400px" }}>
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
                            <TableCell sx={{width:"400px"}}>
                            {item?.cropid} 
                            </TableCell>
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerCrop(item._id)}>
                              <img width='10px' src={'/images/crop2.png'} alt='crop logo' /> {item.croppoints.toFixed(2)}
                             
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <PaginationComponent count={customerCount} limit={10} callback={setPage} page={page}/>
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
                        {/* <TableCell>{'PROP'}</TableCell> */}
                        <TableCell sx={{ textTransform: 'none' }}>PROPs</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerData.map((item, index) => {
                        return (
                          <TableRow hover key={'customer_crop_data'+index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`, width:"400px"}}>
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
                            <TableCell sx={{width:"400px"}}>
                              {item?.cropid} 
                            </TableCell>
                            <TableCell sx={{ cursor: 'pointer' }} onClick={() => showCustomerProp(item._id)}>
                              <img width='20px' height={"15px"} src={'/images/prop.png'} alt='crop logo' /> {item.proppoints.toFixed(2)}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <PaginationComponent count={customerCount} limit={10} callback={setPage} page={page}/>
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
                          <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`, width:"400px" }}>
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
                  <PaginationComponent count={customerCount} limit={10} callback={setPage} page={page}/>
                </TableContainer>
              )}
            </Card>
          </Grid>
        </>
      ) : (
        <>
          {/* business crop */}
          <Grid item xs={12}>
            {bdStatus && value === 'four' && <Spinner />}
            {bdStatus && value === 'five' && <Spinner />}
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
                        <TableCell sx={{ textTransform: 'none' }}>CROPs</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {businessData.map((item, index) => {
                        return (
                          <TableRow hover 
                          key={'businessCrop' + item._id}
                          sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`, width:"400px" }}>
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
                            <TableCell sx={{width:"400px"}}>          
                              {item.cropId}
                            </TableCell>
                            <TableCell sx={{ cursor: 'pointer'}} onClick={() => showBusinessCrop(item._id)}>
                              <img width='10px' src={'/images/crop2.png'} alt='crop logo' />
                              {" "}{item.croppoint.toFixed(2)}
                              
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                  <PaginationComponent count={businessCount} limit={10} callback={setBPage} page={bPage}/>
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
                          <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important`, width:"400px" }}>
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
                            </Box>
                          </TableCell>

                          <TableCell sx={{ cursor: 'pointer'}} onClick={() => showBusinessInvoice(row._id)}>                            
                            <ReceiptLongIcon sx={{height:"18.3px"}}/>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <PaginationComponent count={businessCount} limit={10} callback={setBPage} page={bPage}/>
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