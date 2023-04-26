import router, { useRouter } from 'next/router'
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
import axios from 'axios'

const CustomerInvoiceDetails = ({}) => {
  // const productData = require('../../db/orders_customers.json')
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceStatus, setInvoiceStatus] = useState(false);
  const router = useRouter()
  const { q } = router.query
  //   console.log(productData);
  const myInvoiceData = invoiceData.filter(data => data.user === q)
//   const myInvoiceData = invoiceData
  console.log(myInvoiceData)
  

  const getAllOrders=()=>{
    setInvoiceStatus(true);
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomerInvoice`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setInvoiceData(response.data.invoices)
        setInvoiceStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setInvoiceStatus(false)
      })
  }
  useEffect(()=>{
    getAllOrders()
  },[])

  return (
        <Grid item xs={12}>
        <Card>
          <CardHeader title='Customer invoice Details' titleTypographyProps={{ variant: 'h6' }} />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
            {invoiceStatus ? <Spinner/>: !myInvoiceData.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>                  
                      <TableCell> Date</TableCell>
                      <TableCell> Description</TableCell>
                      <TableCell> Invoice Number</TableCell>                                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myInvoiceData.map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={"orderDetails"+row._id}>
                        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{row.invoiceDesecription}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row.invoiceNumber}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>}
            </TableContainer>
          </Paper>
        </Card>
      </Grid>
  )
}

export default CustomerInvoiceDetails