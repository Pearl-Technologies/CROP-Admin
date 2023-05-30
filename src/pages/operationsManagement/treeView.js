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
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
const TreeView = ({ id, data}) => {
  const row = data;  
  const [expanded, setExpanded] = React.useState(false)
  const [soleData, setSoldData] = React.useState([])
  const handleChange = (panel) => (event, isExpanded) => {
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
  let pay_to_business=0;
    soleData.map((data) => {
      pay_to_business =(data.item.price * data.item.cartQuantity)
      -((data.item.cartQuantity * data.item.cropRulesWithBonus) * 0.1)
      -(((data.item.price * data.item.cartQuantity)-(((data.item.cartQuantity * data.item.cropRulesWithBonus) * 0.1)))*5/100)
      +pay_to_business
    })      

  useEffect(()=>{
    fetchBusinessProductSoldDetails(id);

  },[])

  const handleSubmit = async () => {

    try {
      const response = await fetch(`${process.env.HOST}/api/admin/payToBusiness`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        }),
      });
      const transfer = await response.json();
      console.log(transfer); // Handle the transfer response
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
 <TableRow>
      <Accordion expanded={expanded === `pannel${id}`} onChange={handleChange(`pannel${id}`)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1bh-content' id='panel1bh-header'>
          <Typography sx={{ width: '25%', flexShrink: 0 }}>{row?.businessName}</Typography>
          <Typography sx={{ width: '25%', flexShrink: 0, color: 'text.secondary' }}>{"AUD "}{pay_to_business.toFixed(2)}</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
          <Table aria-label="simple table" stickyHeader sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>CROPs</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total CROPs</TableCell>
                <TableCell>Total</TableCell>
                <TableCell varient='body'>CROPs Values</TableCell>
                <TableCell>Crop Retention %5</TableCell>
                <TableCell>To Pay</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soleData.map((data, i) => {
                  let date  = new Date(data.createdAt).toLocaleDateString()
                  let title = data.item.title;
                  let price = data.item.price;
                  let offerCrops = data.item.cropRulesWithBonus
                  let quantity = data.item.cartQuantity
                  let totalOfferCrops = (quantity * offerCrops)
                  let totalPrice = price * quantity
                  let totalCropValuation = (totalOfferCrops * 0.1)
                  let retainTionFivePercent = (totalPrice-totalCropValuation)*5/100
                  let totalToPayForProduct = totalPrice-totalCropValuation-retainTionFivePercent
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
                      <Typography>
                        {totalCropValuation.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {retainTionFivePercent.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {totalToPayForProduct.toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography></Typography>
                </TableCell>
                <TableCell>
                  <Typography>Total ToPay</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{pay_to_business.toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
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
              </TableRow>
            </TableBody>
          </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </TableRow>    
  )
}
export default TreeView

