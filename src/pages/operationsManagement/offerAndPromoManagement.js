// ** MUI Imports
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
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { left } from '@popperjs/core'
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
  applied: { color: 'info' },
  rejected: { color: 'error' },
  active: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
  published: { color: 'success' }
}

const DashboardTable = () => {
  const [productData, setProductData] = useState([])
  const [mostPopularProductData, setMostPopularProductData] = useState([])
  const [promoProductData, setPromoProductData] = useState([])
  const fetchDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllProduct`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductData(response.data.productList)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchMostPopularProductDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllMostPopularProduct`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setMostPopularProductData(response.data.productList)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchPromoProductDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllPromoProduct`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setPromoProductData(response.data.productList)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    fetchDetails()
    fetchMostPopularProductDetails()
    fetchPromoProductDetails()
  }, [])
  return (
    <Card>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
      <h1 style={{paddingLeft:"20px"}}>Most Popular</h1>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>AUD</TableCell>
              <TableCell>CROPs</TableCell>
              <TableCell>Bid AUD</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Market For</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mostPopularProductData.map(row => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography> */}
                    {/* {row?.image?.letght && row.image.map((product)=>(
                      <CardMedia component='img' height='50' image={`${process.env.HOST}/api/products/image/${product}`} alt='Paella dish' />
                    ))} */}
                    <CardMedia
                      component='img'
                      height='50'
                      image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                      alt='Paella dish'
                    />
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.title}</TableCell>
                <TableCell>{row?.rating}</TableCell>
                <TableCell>{row?.likes}</TableCell>
                <TableCell>{row?.price}</TableCell>
                <TableCell>{row?.croppoints}</TableCell>
                <TableCell>{row?.bidPrice}</TableCell>
                <TableCell>{row?.mktDate?.fromDate}</TableCell>
                <TableCell>{row?.mktDate?.toDate}</TableCell>
                <TableCell>{row?.mktOfferFor}</TableCell>
                <TableCell>{row?.sector}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status]?.color}
                    // color={'success'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{row?.slot}</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Chip
                    label={'Delete'}
                    // color={statusObj[row.status].color}
                    color={'error'}
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
      </TableContainer>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
            <h1 style={{paddingLeft:"20px"}}>Star Rating</h1>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>AUD</TableCell>
              <TableCell>CROPs</TableCell>
              <TableCell>Bid AUD</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Market For</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map(row => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography> */}
                    {/* {row?.image?.letght && row.image.map((product)=>(
                      <CardMedia component='img' height='50' image={`${process.env.HOST}/api/products/image/${product}`} alt='Paella dish' />
                    ))} */}
                    <CardMedia
                      component='img'
                      height='50'
                      image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                      alt='Paella dish'
                    />
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.title}</TableCell>
                <TableCell>{row?.rating}</TableCell>
                <TableCell>{row?.likes}</TableCell>
                <TableCell>{row?.price}</TableCell>
                <TableCell>{row?.croppoints}</TableCell>
                <TableCell>{row?.bidPrice}</TableCell>
                <TableCell>{row?.mktDate?.fromDate}</TableCell>
                <TableCell>{row?.mktDate?.toDate}</TableCell>
                <TableCell>{row?.mktOfferFor}</TableCell>
                <TableCell>{row?.sector}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status]?.color}
                    // color={'success'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{row?.slot}</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Chip
                    label={'Delete'}
                    // color={statusObj[row.status].color}
                    color={'error'}
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
      </TableContainer>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
            <h1 style={{paddingLeft:"20px"}}>Near Me</h1>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>AUD</TableCell>
              <TableCell>CROPs</TableCell>
              <TableCell>Bid AUD</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Market For</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map(row => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography> */}
                    {/* {row?.image?.letght && row.image.map((product)=>(
                      <CardMedia component='img' height='50' image={`${process.env.HOST}/api/products/image/${product}`} alt='Paella dish' />
                    ))} */}
                    <CardMedia
                      component='img'
                      height='50'
                      image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                      alt='Paella dish'
                    />
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.title}</TableCell>
                <TableCell>{row?.rating}</TableCell>
                <TableCell>{row?.likes}</TableCell>
                <TableCell>{row?.price}</TableCell>
                <TableCell>{row?.croppoints}</TableCell>
                <TableCell>{row?.bidPrice}</TableCell>
                <TableCell>{row?.mktDate?.fromDate}</TableCell>
                <TableCell>{row?.mktDate?.toDate}</TableCell>
                <TableCell>{row?.mktOfferFor}</TableCell>
                <TableCell>{row?.sector}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status]?.color}
                    // color={'success'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{row?.slot}</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Chip
                    label={'Delete'}
                    // color={statusObj[row.status].color}
                    color={'error'}
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
      </TableContainer>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
            <h1 style={{paddingLeft:"20px"}}>Promo Product</h1>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>AUD</TableCell>
              <TableCell>CROPs</TableCell>
              <TableCell>Bid AUD</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Market For</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promoProductData.map(row => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography> */}
                    {/* {row?.image?.letght && row.image.map((product)=>(
                      <CardMedia component='img' height='50' image={`${process.env.HOST}/api/products/image/${product}`} alt='Paella dish' />
                    ))} */}
                    <CardMedia
                      component='img'
                      height='50'
                      image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                      alt='Paella dish'
                    />
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.title}</TableCell>
                <TableCell>{row?.rating}</TableCell>
                <TableCell>{row?.likes}</TableCell>
                <TableCell>{row?.price}</TableCell>
                <TableCell>{row?.croppoints}</TableCell>
                <TableCell>{row?.bidPrice}</TableCell>
                <TableCell>{row?.mktDate?.fromDate}</TableCell>
                <TableCell>{row?.mktDate?.toDate}</TableCell>
                <TableCell>{row?.mktOfferFor}</TableCell>
                <TableCell>{row?.sector}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status]?.color}
                    // color={'success'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell>{row?.slot}</TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Chip
                    label={'Delete'}
                    // color={statusObj[row.status].color}
                    color={'error'}
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
      </TableContainer>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
            <h1 style={{paddingLeft:"20px"}}>All Other Product</h1>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>AUD</TableCell>
              <TableCell>CROPs</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map(row => (
              <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography> */}
                    {/* {row?.image?.letght && row.image.map((product)=>(
                      <CardMedia component='img' height='50' image={`${process.env.HOST}/api/products/image/${product}`} alt='Paella dish' />
                    ))} */}
                    <CardMedia
                      component='img'
                      height='50'
                      image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                      alt='Paella dish'
                    />
                    <Typography variant='caption'>{row.designation}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row?.title}</TableCell>
                <TableCell>{row?.rating}</TableCell>
                <TableCell>{row?.likes}</TableCell>
                <TableCell>{row?.price}</TableCell>
                <TableCell>{row?.croppoints}</TableCell>
                <TableCell>{row?.sector}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status]?.color}
                    // color={'success'}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
                <TableCell sx={{ cursor: 'pointer' }}>
                  <Chip
                    label={'Delete'}
                    // color={statusObj[row.status].color}
                    color={'error'}
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
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
