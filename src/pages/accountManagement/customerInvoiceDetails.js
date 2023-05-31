import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Spinner from '../databaseManagement/spinner'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import axios from 'axios'
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography'

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const CustomerInvoiceDetails = ({}) => {
  // const productData = require('../../db/orders_customers.json')
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceStatus, setInvoiceStatus] = useState(false);
  const [invoiceStatus2, setInvoiceStatus2] = useState(false);
  const [pointPurchaseData, setPointPurchaseData] = useState([]);
  const [data, setData] = useState('one');
  const router = useRouter()
  const { q } = router.query
  // const myInvoiceData = invoiceData.filter(data => data.user === q)
  const myInvoiceData = invoiceData
  console.log(myInvoiceData)  

  const getAllOrders=()=>{
    setInvoiceStatus(true);
    axios
      .get(`${process.env.HOST}/api/admin/productPurchaseTrasaction?user=${router.query.q}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setInvoiceData(response.data.data)
        setInvoiceStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setInvoiceStatus(false)
      })
  }
  const getAllPointPurchase=()=>{
    setInvoiceStatus2(true);
    axios
      .get(`${process.env.HOST}/api/admin/pointPurchaseTrasaction?user=${router.query.q}`)
      .then(function (response) {
        // handle success
        console.log(response);
        setPointPurchaseData(response.data.data)
        setInvoiceStatus2(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setInvoiceStatus2(false)
      })
  }
  useEffect(()=>{
    if(q != undefined) {
      getAllOrders()
      getAllPointPurchase()
    }
  },[q])

  return (
        <Grid item xs={12}>
        <span onClick={()=>router.back()}><ArrowBackIcon/></span>
        <div style={{display:"flex"}}>
        <Switch {...label} defaultChecked onChange={()=>setData(x=> x === "one" ? "two": "one")}/>
        <Typography variant='h5'>
        {`${data==='one' ? 'Customer Purchase Details and Invoice' : 'Customer Point Purchase Details and Invoice'}`}
        </Typography>
        </div>
        <Card>
          {data==="one" && <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{height:400, overflow:"auto"}}>
            {invoiceStatus ? <Spinner/>: !myInvoiceData?.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>                  
                      <TableCell> Date</TableCell>
                      <TableCell> Product</TableCell>
                      <TableCell> Name</TableCell>
                      <TableCell> Price</TableCell>
                      <TableCell> Quatity</TableCell>
                      <TableCell> Total</TableCell>
                      <TableCell> Total CROPs</TableCell>
                      <TableCell> Invoice Number</TableCell>
                      <TableCell> View</TableCell>
                      <TableCell> Download</TableCell>                                            
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myInvoiceData.map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={"orderDetails"+row._id}>
                        <TableCell>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell><img style={{width:"20px"}} src={`${process.env.HOST}/api/products/image/${row?.cartDetails.cartItems.image[0]}`}/></TableCell>
                        <TableCell>{row?.cartDetails.cartItems.title}</TableCell>
                        <TableCell>{row?.cartDetails.cartItems.price}</TableCell>
                        <TableCell>{row?.cartDetails.cartItems.cartQuantity}</TableCell>
                        <TableCell>{(row?.cartDetails.cartItems.cartQuantity *row?.cartDetails.cartItems.price)}</TableCell>
                        <TableCell>{(row?.cartDetails.cartItems.cartQuantity) * (row?.cartDetails.cartItems.cropRulesWithBonus)}</TableCell>
                        <TableCell>{row?.number}</TableCell>
                        <TableCell><a href={row?.invoice_url}><ReceiptLongIcon/></a></TableCell>
                        <TableCell><a href={row?.invoice_pdf}><FileDownloadIcon/></a></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>}            
            </TableContainer>
          </Paper>}
          {data === "two"&& <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{height:400, overflow:"auto"}}>
            {invoiceStatus2 ? <Spinner/>: !pointPurchaseData?.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>                  
                      <TableCell> Date</TableCell>
                      <TableCell> Product</TableCell>
                      <TableCell> Price</TableCell>
                      <TableCell> Quatity</TableCell>
                      <TableCell> Total</TableCell>
                      <TableCell> View</TableCell>
                      <TableCell> Download</TableCell>                                            
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pointPurchaseData.map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={"orderDetails"+row._id}>
                        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{row?.type}</TableCell>          
                        <TableCell>{row?.amount/row?.quantity}</TableCell>
                        <TableCell>{row?.quantity}</TableCell>
                        <TableCell>{row?.amount}</TableCell>
                        <TableCell><a href={row?.invoice_url}><ReceiptLongIcon/></a></TableCell>
                        <TableCell><a href={row?.invoice_pdf}><FileDownloadIcon/></a></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>}        
            </TableContainer>
          </Paper>}
        </Card>
      </Grid>
  )
}

export default CustomerInvoiceDetails
