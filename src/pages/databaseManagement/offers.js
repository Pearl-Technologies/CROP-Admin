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
import Rating from '@mui/material/Rating';
import ThumbUp from 'mdi-material-ui/ThumbUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Offers = () => {
  const router = useRouter()
  const { q } = router.query
  const [productData, setProductData] = useState([])
  const product = require('../../db/busin_products.json')
  const fetchDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllProducts`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setProductData(response.data.allProduct)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const myProduct = product?.filter(data => data.user.$oid === q)
  //   useEffect(() => {
  // fetchDetails()
  //   }, [])
  return (
    <Card>
             <span onClick={()=>router.back()}><ArrowBackIcon/></span>
      <TableContainer style={{ height: 600, overflow: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Star Rating</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Dollar Value</TableCell>
              <TableCell>CROPs</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Market For</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myProduct &&
              myProduct.map(row => (
                <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      {/* <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography> */}
                      <CardMedia component='img' height='50' image={row.image} alt='Paella dish' />
                      <Typography variant='caption'>{row.designation}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row?.title}</TableCell>
                  <TableCell>
                    <Rating
                      value={4}
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </TableCell>
                  <TableCell>1000<ThumbUp/>
                  </TableCell>
                  <TableCell>AUD {row?.price}</TableCell>
                  <TableCell>{'450'}</TableCell>
                  <TableCell>{new Date('apr/15/2023').toLocaleDateString()}</TableCell>
                  <TableCell>{new Date('apr/30/2023').toLocaleDateString()}</TableCell>
                  <TableCell>{'top rank'}</TableCell>
                  <TableCell>{'electronic'}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      // color={statusObj[row.status].color}
                      color={'success'}
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

export default Offers
