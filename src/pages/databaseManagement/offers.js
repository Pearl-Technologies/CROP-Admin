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
import { useRouter } from 'next/router'
import Rating from '@mui/material/Rating'
import ThumbUp from 'mdi-material-ui/ThumbUp'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
const Offers = () => {
  const router = useRouter()
  const { q } = router.query
  const [productData, setProductData] = useState([])
  const product = require('../../db/busin_products.json')
  const fetchDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllProduct`, { businessId: q })
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
  const myProduct = productData
  useEffect(() => {
    fetchDetails()
  }, [q])
  console.log(productData)
  return (
    <Card>
      <span onClick={() => router.back()}>
        <ArrowBackIcon />
      </span>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
        <Table stickyHeader aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Star Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Dollar Value</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {myProduct &&
              myProduct.map(row => (
                <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component='img'
                        height='50'
                        image={`${process.env.HOST}/api/products/image/${row?.image[0]}`}
                        alt='Paella dish'
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ width: '200px' }}>{row?.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Rating
                      value={row?.rating}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography style={{ width: '50px' }}>
                      {' '}
                      {row?.likes}
                      <ThumbUp />
                    </Typography>
                  </TableCell>
                  <TableCell><Typography style={{ width: '100px' }}>AUD {row?.price}</Typography></TableCell>
                

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default Offers
