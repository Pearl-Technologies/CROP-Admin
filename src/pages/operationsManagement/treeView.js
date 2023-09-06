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
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
const TreeView = ({ id, data}) => {
  const router = useRouter()
  const row = data;  
  const [soleData, setSoldData] = React.useState([])  

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
      -(((data.item.price * data.item.cartQuantity))*5/100)
      -(data.item.price * data.item.cartQuantity)*0.1
      +pay_to_business
    })      

    // totalPrice-totalCropValuation-retainTionFivePercent-gstCost
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
    } catch (error) {
      console.error(error);
    }
  };
  
  return (          
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.businessName}
              </TableCell>
              <TableCell align="right">{"AUD "}{pay_to_business.toFixed(2)}</TableCell>
              <TableCell align="right"><Button variant="contained" style={{color:"white"}} onClick={()=>router.push(`ViewTransaction?id=${row?._id}&payment=${pay_to_business.toFixed(2)}`)}>View</Button></TableCell>
            </TableRow>
  )
}
export default TreeView

