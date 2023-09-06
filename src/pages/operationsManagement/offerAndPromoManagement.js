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
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import axios from 'axios'
import { left } from '@popperjs/core'
import Switch from '@mui/material/Switch'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
const label = { inputProps: { 'aria-label': 'Switch demo' } }
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Spinner from '../databaseManagement/spinner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/router'
const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  active: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
  published: { color: 'success' }
}

const OfferAndPromoManagement = () => {
  const [productData, setProductData] = useState([])
  const [mostPopularProductData, setMostPopularProductData] = useState([])
  const [promoProductData, setPromoProductData] = useState([])
  const [ccStatus, setccStatus] = useState(false)
  const [value, setValue] = React.useState('one')
  const [selectedOption, setSelectedOption] = useState('Earn CROPs')
  const [productCategory, setProductCategory] = React.useState('None');
  const[zipCode, setZipCode] = useState();
  const router= useRouter();
  
  // const fetchDetails = () => {
  //   axios
  //     .post(`${process.env.HOST}/api/admin/getAllProduct`)
  //     .then(function (response) {
  //       // handle success
  //       
  //       setProductData(response.data.productList)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error)
  //     })
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchMostPopularProductDetails = () => {
    setccStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllMostPopularProduct?mktFor=${productCategory}&apply=${selectedOption}`)
      .then(function (response) {
        // handle success
        
        setMostPopularProductData(response.data.productList)
        setccStatus(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const handleNearMeProduct = (event) => {
    setccStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllProductByZipCode`, {zipCode:zipCode, apply:selectedOption})
      .then(function (response) {
        // handle success
        
        setPromoProductData(response.data.productList)
        setccStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  const fetchStarRatingProducts = () => {
    setccStatus(true)
    let type = ''
    if (selectedOption == 'Earn CROPs') {
      type = 'earnCrop'
    } else {
      type = 'redeemCrop'
    }
    axios
      .get(`${process.env.HOST}/api/admin/getBusinessProductRatedAll?applyType=${type}`)
      .then(function (response) {
        // handle success
        
        setProductData(response.data.productCommentsAndRatings)
        setccStatus(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  useEffect(() => {
    handleNearMeProduct()
    fetchMostPopularProductDetails()
    fetchStarRatingProducts()
  }, [value, selectedOption, productCategory, zipCode])
  
  return (
    <>
    <ArrowBackIcon sx={{cursor:'pointer', marginRight:"auto"}} onClick={()=>router.back()}/>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h3 style={{ margin: '2px 2px 0px 10px' }}>Offer and Promo Management</h3>
        <div style={{ display: 'flex' }}>
          <Switch
            {...label}
            defaultChecked
            onChange={() => setSelectedOption(x => (x === 'Earn CROPs' ? 'Redeem CROPs' : 'Earn CROPs'))}
          />
          <p style={{ fontWeight: 'bold', marginTop: 8 }}>{selectedOption}</p>
        </div>
      </div>
      <Card>
      {ccStatus && <Spinner/>}
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor='secondary'
            indicatorColor='secondary'
            aria-label='secondary tabs example'
          >
            <Tab value='one' label={selectedOption === "Earn CROPs"? "Most Popular":"Most Recommended"} />
            <Tab value='two' label='Star Rating' />
            <Tab value='three' label='Near Me' />
            {/* <Tab value='four' label='All Other Product' /> */}
            </Tabs>
          
{value == 'one' &&<FormControl>              
              <Select
                value={productCategory}
                onChange={(e)=>setProductCategory(e.target.value)}
              >
                <MenuItem value={"topRank"}>Top Rank</MenuItem>
                <MenuItem value={"promo"}>Promo</MenuItem>
                <MenuItem value={"None"}>None</MenuItem>
              </Select>
            </FormControl>}
            {value == 'three' &&<FormControl>              
            <TextField label="Zip Code" variant="outlined" value={zipCode} onChange={(event)=>setZipCode(event.target.value)}/>
            </FormControl>}           
            
        </Box>

        {value == 'one' && (
          <TableContainer style={{ height: 400, overflow: 'auto' }}>
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>AUD</TableCell>
                  <TableCell sx={{ textTransform: 'none' }}>CROPs</TableCell>
                  {/* <TableCell>Bid AUD</TableCell> */}
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  {/* <TableCell>Market For</TableCell> */}
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Slot</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mostPopularProductData.map(row => (
                  <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row?.sector}</TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                          component='img'
                          height='50'
                          image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                          alt='Paella dish'
                          style={{ borderRadius: '5px' }}
                        />
                        <Typography variant='caption'>{row.designation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row?.title}</TableCell>
                    <TableCell>{row?.rating}</TableCell>
                    <TableCell>{row?.likes}</TableCell>
                    <TableCell>{row?.price}</TableCell>
                    <TableCell>{row?.croppoints}</TableCell>
                    {/* <TableCell>{row?.bidPrice}</TableCell> */}
                    <TableCell>{row?.mktDate?.fromDate}</TableCell>
                    <TableCell>{row?.mktDate?.toDate}</TableCell>
                    {/* <TableCell sx={{width:20}}>{row?.mktOfferFor === 'topRank' ? 'Top Rank' : row?.mktOfferFor}</TableCell> */}
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
                    {/* <TableCell>{row?.slot}</TableCell> */}
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
        )}
        {value == 'two' && (
          <TableContainer style={{ height: 400, overflow: 'auto' }}>
            {/* <h1 style={{ paddingLeft: '20px' }}>Star Rating</h1> */}
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>AUD</TableCell>
                  <TableCell>CROPs</TableCell>
                  {/* <TableCell>Bid AUD</TableCell> */}
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  {/* <TableCell>Market For</TableCell> */}
                  <TableCell>Status</TableCell>
                  {/* <TableCell>Slot</TableCell> */}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.map(row => (
                  <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row?.sector}</TableCell>
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
                          style={{ borderRadius: '5px' }}
                        />
                        <Typography variant='caption'>{row.designation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row?.title}</TableCell>
                    <TableCell>{row?.rating}</TableCell>
                    <TableCell>{row?.likes}</TableCell>
                    <TableCell>{row?.price}</TableCell>
                    <TableCell>{row?.croppoints}</TableCell>
                    {/* <TableCell>{row?.bidPrice}</TableCell> */}
                    <TableCell>{row?.mktDate?.fromDate}</TableCell>
                    <TableCell>{row?.mktDate?.toDate}</TableCell>
                    {/* <TableCell sx={{width: 100}}>{row?.mktOfferFor}</TableCell> */}

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
                    {/* <TableCell>{row?.slot}</TableCell> */}
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
        )}
        {false && (
          <TableContainer style={{ height: 400, overflow: 'auto' }}>
            <h1 style={{ paddingLeft: '20px' }}>Near Me</h1>
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Sector</TableCell>
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
                  <TableCell>Status</TableCell>
                  <TableCell>Slot</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.map(row => (
                  <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row?.sector}</TableCell>
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
                          style={{ borderRadius: '5px' }}
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
        )}
        {value == 'three' && (
          <TableContainer style={{ height: 400, overflow: 'auto' }}>
            {/* <h1 style={{ paddingLeft: '20px' }}>Promo Product</h1> */}
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>AUD</TableCell>
                  <TableCell>CROPs</TableCell>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promoProductData.map(row => (
                  <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row?.sector}</TableCell>
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
                          style={{ borderRadius: '5px' }}
                        />
                        <Typography variant='caption'>{row.designation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row?.title}</TableCell>
                    <TableCell>{row?.rating}</TableCell>
                    <TableCell>{row?.likes}</TableCell>
                    <TableCell>{row?.price}</TableCell>
                    <TableCell>{row?.croppoints}</TableCell>
                    <TableCell>{row?.mktDate?.fromDate}</TableCell>
                    <TableCell>{row?.mktDate?.toDate}</TableCell>
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
        )}
        {value == 'four' && (
          <TableContainer style={{ height: 400, overflow: 'auto' }}>
            {/* <h1 style={{ paddingLeft: '20px' }}>All Other Product</h1> */}
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Sector</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Likes</TableCell>
                  <TableCell>AUD</TableCell>
                  <TableCell>CROPs</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.map(row => (
                  <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell>{row?.sector}</TableCell>
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
                          style={{ borderRadius: '5px' }}
                        />
                        <Typography variant='caption'>{row.designation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row?.title}</TableCell>
                    <TableCell>{row?.rating}</TableCell>
                    <TableCell>{row?.likes}</TableCell>
                    <TableCell>{row?.price}</TableCell>
                    <TableCell>{row?.croppoints}</TableCell>

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
        )}
      </Card>
    </>
  )
}

export default OfferAndPromoManagement
