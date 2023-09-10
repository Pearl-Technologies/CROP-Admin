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
import Spinner from '../databaseManagement/spinner'
const Offers = () => {
  const router = useRouter()
  const { q } = router.query
  const [productData, setProductData] = useState([])
  const [status, setStatus]= useState(false)
  const fetchDetails = () => {
    setStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllProduct`,{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, { businessId: q })
      .then(function (response) {
        // handle success
        
        setProductData(response.data.productList)
        setStatus(false)
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
  const likeCount = data => {
    let y = 0
    if (data[0]?.product_likes.length) {
      data[0].product_likes.map(x => {
        if (x.like) {
          y++
        }
      })
    }
  }
  const ratingCount = data => {
    let y = 0
    let index = 0
    if (data[0]?.details.length) {
      data[0].details.map(x => {
        if (x.rating) {
          y = y + x.rating
          index++
        }
      })
    }

    return y / index
  }
  return (
    <Card>
      <ArrowBackIcon sx={{ cursor: 'pointer', marginRight: 'auto' }} onClick={() => router.back()} />
      {status && <Spinner/>}
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
        <Table stickyHeader aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Star Rating</TableCell>
              <TableCell>Likes</TableCell>
              {/* <TableCell>Dollar Value</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {myProduct.length ? (
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
                      value={ratingCount(row.pd)}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography style={{ width: '50px' }}>
                      {likeCount(row.pd)}
                      <ThumbUp />
                    </Typography>
                  </TableCell>
                  {/* <TableCell><Typography style={{ width: '100px' }}>AUD {row?.price}</Typography></TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align='center'>
                  No Record Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default Offers
