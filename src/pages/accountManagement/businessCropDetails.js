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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment'
const businessCropDetails = ({}) => {
  // const productData = require('../../db/orders_customers.json')
  const [orderData, setOrderData] = useState([]);
  const [odStatus, setODStatus] = useState(false);
  const router = useRouter()
  const { q } = router.query
  const myCropData = orderData
  
  function createData(name, code, population, size) {
    const density = population / size

    return { name, code, population, size, density }
  }
  //   order id, order time, status, CROP, amount
  

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const getAllOrders=()=>{
    setODStatus(true);
    axios
      .post(`${process.env.HOST}/api/admin/getBusinessCropStatement`,{businessId:q},{
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        
        setOrderData(response.data.statement)
        setODStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setODStatus(false)
      })
  }
  useEffect(()=>{
    getAllOrders()
  },[q])
  return (
          <Grid item xs={12}>
        <Card>
        <span onClick={()=>router.back()}><ArrowBackIcon/></span>
          <CardHeader title='Business CROPs Details' titleTypographyProps={{ variant: 'h6' }} />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
            {odStatus ? <Spinner/>: !myCropData?.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>                  
                      <TableCell> Date</TableCell>
                      <TableCell> Order Number</TableCell>
                      <TableCell> Amount</TableCell>
                      <TableCell> Description</TableCell>
                      <TableCell> Debit</TableCell>                  
                      <TableCell> Credit</TableCell>                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myCropData.map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={"orderDetails"+row._id}>
                        <TableCell>{moment(new Date(row?.createdAt)).format("DD/MM/YYYY")}</TableCell>
                        <TableCell>{row?.orders?.number}</TableCell>
                        <TableCell>{row?.item.tempPrice}</TableCell>
                        <TableCell>{row?.desc}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{(row.type === "Earn Crop") ? row.item.cropRulesWithBonus.toFixed(2):""}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{(row.type === "Redeem Crop") ? row.item.cropRulesWithBonus.toFixed(2):""}</TableCell>
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

export default businessCropDetails
