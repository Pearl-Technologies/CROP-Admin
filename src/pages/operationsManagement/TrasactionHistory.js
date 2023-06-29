import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Spinner from '../databaseManagement/spinner'
const TrasactionHistory = () => {
  let router = useRouter()
  let id = router.query.id
  const [fromDate, setFromDate]=useState('');
  const [toDate, setToDate]=useState("");
  const [soleData, setSoldData] =useState([])
  const [status, setStatus] = useState(false);
  const fetchBusinessProductSoldDetails = id => {
    setStatus(true)
    axios
      .post(
        `${process.env.HOST}/api/admin/getAllPurchasedProductStatementByDateRange`,
        { businessId: id, fromDate, toDate },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(function (response) {
        // handle success
        setSoldData(response.data.statement)
        setStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    fetchBusinessProductSoldDetails(id)
  }, [])
  return (
    <div>
      
      <ArrowBackIcon sx={{cursor:'pointer', marginRight:"auto"}} onClick={()=>router.back()}/>
      <h6>Transaction history</h6>
      <div style={{display:"flex", gap:2, marginTop:5}}>
         <TextField variant='outlined' type='date' label="From" focused value={fromDate} onChange={(event)=>setFromDate(event.target.value)}/>
        <TextField variant='outlined' type='date' label="To" focused value={toDate} onChange={(event)=>setToDate(event.target.value)}/>
        <Button variant="contained" onClick={()=>fetchBusinessProductSoldDetails(id)}>Filter</Button>
      </div>
      {status && <Spinner/>}
      <TableContainer component={Paper}>
          <Table aria-label='simple table' stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>CROPs</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total CROPs</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>GST 10%</TableCell>
                <TableCell varient='body'>CROPs Values</TableCell>
                <TableCell>Crop Retention 5%</TableCell>
                <TableCell>To Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soleData.length ? soleData.map((data, i) => {
                let date = new Date(data.createdAt).toLocaleDateString()
                let title = data.item.title
                let price = data.item.price
                let offerCrops = data.item.cropRulesWithBonus
                let quantity = data.item.cartQuantity
                let totalOfferCrops = quantity * offerCrops
                let totalPrice = price * quantity
                let gstCost = totalPrice * 0.1
                let totalCropValuation = totalOfferCrops * 0.1
                let retainTionFivePercent = (totalPrice * 5) / 100
                let totalToPayForProduct = totalPrice - totalCropValuation - retainTionFivePercent - gstCost
                return (
                  <TableRow key={'dorder' + i}>
                    <TableCell>
                      <Typography>{date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{offerCrops.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{quantity}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{totalOfferCrops.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{totalPrice.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{gstCost.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{totalCropValuation.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{retainTionFivePercent.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{totalToPayForProduct.toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>
                )
              }):<TableRow><TableCell colSpan={10} align='center'>no record found</TableCell></TableRow>}
              {/* <TableRow>
                <TableCell colSpan={8}>
                  <Typography></Typography>
                </TableCell>
                <TableCell>
                  <Typography>Total ToPay</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{"pay_to_business"}</Typography>
                </TableCell>
              </TableRow> */}
              {/* <TableRow>
                <TableCell colSpan={9}>
                  <Typography></Typography>
                </TableCell>
                <TableCell>
                  <Link
                    component='button'
                    variant='body2'
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Pay Now
                  </Link>
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>

    </div>
  )
}

export default TrasactionHistory
