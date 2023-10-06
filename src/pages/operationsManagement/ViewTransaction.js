import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from '@mui/material'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
const ViewTransaction = () => {
  let router = useRouter()
  let id = router.query.id
  let pay_to_business = router.query.payment
  const [soleData, setSoldData] = React.useState([])
  const [expanded, setExpanded] = React.useState(false)
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const fetchBusinessProductSoldDetails = id => {
    // setCDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getPurchasedProductStatement`, { businessId: id })
      .then(function (response) {
        // handle success
        setSoldData(response.data.statement)
        // setCDStatus(false)
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
      <TableRow>
      <ArrowBackIcon onClick={()=>router.back()} sx={{cursor:'pointer', marginRight:"auto"}}/>
      <Button onClick={()=>router.push(`TrasactionHistory?id=${id}`)}>History</Button>
        <TableContainer component={Paper}>
          <Table aria-label='simple table' stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell sx={{ textTransform: 'none' }}>CROPs</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell sx={{ textTransform: 'none' }}>TOTAL CROPs</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>GST 10%</TableCell>
                <TableCell varient='body' sx={{ textTransform: 'none' }}>CROPs VALUES</TableCell>
                <TableCell>Crop Retention 5%</TableCell>
                <TableCell>To Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soleData.map((data, i) => {
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
                      <Typography>{totalForProduct.toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography></Typography>
                </TableCell>
                <TableCell>
                  <Typography>Total To Pay</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{pay_to_business}</Typography>
                </TableCell>
              </TableRow>
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
      </TableRow>
    </div>
  )
}

export default ViewTransaction
