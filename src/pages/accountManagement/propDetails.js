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

const PropDetails = ({}) => {
  // const productData = require('../../db/orders_customers.json')
  const [orderData, setOrderData] = useState([]);
  const [odStatus, setODStatus] = useState(false);
  const router = useRouter()
  const { q } = router.query
  //   console.log(productData);
  const myCropData = orderData.filter(data => data.user === q)
  console.log(myCropData)
  
  function createData(name, code, population, size) {
    const density = population / size

    return { name, code, population, size, density }
  }
  //   order id, order time, status, CROP, amount
  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
  ]

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
      .post(`${process.env.HOST}/api/admin/getAllCustomerProp`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setOrderData(response.data.propDetails)
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
  },[])

  return (
          <Grid item xs={12}>
        <Card>
          <CardHeader title='Customer Crop Details' titleTypographyProps={{ variant: 'h6' }} />
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
            {odStatus ? <Spinner/>: !myCropData.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
              <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                  <TableRow>                  
                      <TableCell> Date</TableCell>
                      <TableCell> Description</TableCell>
                      <TableCell> Debit</TableCell>                  
                      <TableCell> Credit</TableCell>                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myCropData.map(row => {
                    return (
                      <TableRow hover role='checkbox' tabIndex={-1} key={"orderDetails"+row._id}>
                        <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row.debit}</TableCell>
                        <TableCell style={{textAlign:"left"}}>{row.credit}</TableCell>
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

export default PropDetails