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
import Link from '@mui/material/Link';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment'
const BusinessInvoiceDetails = ({}) => {
  // const productData = require('../../db/orders_customers.json')
  // const businessInvoices = require('../../db/admin_payment_trackers.json')
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceStatus, setInvoiceStatus] = useState(false);
  const router = useRouter()
  const { q } = router.query
  // const myInvoiceData = invoiceData.filter(data => data.businessId.$oid === q)
  const myInvoiceData = invoiceData

  const getAllOrders=()=>{
    setInvoiceStatus(true);
    axios
      .post(`${process.env.HOST}/api/admin/findBusinessInvoice`,{user:q},{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }, )
      .then(function (response) {
        // handle success
        
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
  },[q])
  return (
        <Grid item xs={12}>
        <Card>
        <span onClick={()=>router.back()}><ArrowBackIcon/></span>
          <CardHeader title='Business invoice Details' titleTypographyProps={{ variant: 'h6' }} />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
            {invoiceStatus ? <Spinner/>: !myInvoiceData?.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>                  
                      <TableCell> Date</TableCell>
                      <TableCell> Invoice Number</TableCell>                                    
                      <TableCell> Description</TableCell>                                    
                      <TableCell> Amount</TableCell>                                    
                      <TableCell> Crop Offered</TableCell>                                    
                      <TableCell> Invoice Link</TableCell>                                    
                      <TableCell> Invoice PDF</TableCell>                                                                        
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myInvoiceData.map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={"orderDetails"+row._id.$oid}>
                        <TableCell>{moment(new Date(row.createdAt)).format('DD/MM/YYYY')}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row?.number}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row?.description}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row?.amount}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row?.product[0]?.croppoints}</TableCell>
                        <TableCell style={{textAlign:"left"}}><Link href={row.invoice_url}>Invoice View</Link></TableCell>
                        <TableCell style={{textAlign:"left"}}><Link href={row.invoice_pdf}>Download Invoice</Link></TableCell>
                        {/* <TableCell style={{textAlign:"left"}}>{row.status}</TableCell> */}
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

export default BusinessInvoiceDetails
