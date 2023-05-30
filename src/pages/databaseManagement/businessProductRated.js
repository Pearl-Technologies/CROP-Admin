import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Rating from '@mui/material/Rating'

const businessProductRated = () => {
  const [productData, setProductData] = useState([]);
  const router = useRouter()
  const { q } = router.query
  const fetchBusinessProductRatedData=()=>{
    axios.get(`${process.env.HOST}/api/admin/getBusinessProductRated?businessId=${q}`,
    {headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }}
    ).then(function(response){
      setProductData(response.data.productCommentsAndRatings)
    }).catch(function(error){
      console.log(error)
    })
  }
  useEffect(()=>{
    fetchBusinessProductRatedData();
  },[q])
  console.log(productData);
  return (
    <TableContainer style={{ height:450, overflow: 'auto' }}>
    <span onClick={()=>router.back()}><ArrowBackIcon/></span>
<h5 style={{paddingLeft:"20px"}}>Rated Product</h5>
<Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
<TableHead>
<TableRow>
  <TableCell>Sector</TableCell>
  <TableCell>Product</TableCell>
  <TableCell>Title</TableCell>    
  <TableCell>Rated</TableCell>    
  {/* <TableCell>Comment</TableCell>     */}
</TableRow>
</TableHead>
<TableBody>
{productData?.map(row => (
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
          height='70'
          image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
          alt='product image'
          style={{borderRadius:"5px", width:"50px"}}/>                
      </Box>
    </TableCell>
    <TableCell>
    <Typography variant='caption'>{row?.title}</Typography>
    </TableCell>
    <TableCell>
    {/* <Typography variant='caption'>{row?.details.rating}</Typography> */}
    <Rating
              value={row?.averageRating}
              
            />
    </TableCell>
    <TableCell>
    {/* <Typography variant='caption'>{row?.comment}</Typography> */}
    </TableCell>
  </TableRow>
))}
</TableBody>
</Table>
</TableContainer>
  )
}

export default businessProductRated