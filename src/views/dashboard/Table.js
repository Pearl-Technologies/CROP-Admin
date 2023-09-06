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
import CardMedia from '@mui/material/CardMedia';
import React, { useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
const rows = [
  {
    age: 27,
    status: 'current',
    date: '09/27/2018',
    name: 'Sally Quinn',
    salary: '$19586.23',
    email: 'eebsworth2m@sbwire.com',
    designation: 'Human Resources Assistant'
  },
  {
    age: 61,
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'professional',
    name: 'Margaret Bowers',
    email: 'kocrevy0@thetimes.co.uk',
    designation: 'Nuclear Power Engineer'
  },
  {
    age: 59,
    date: '10/15/2017',
    name: 'Minnie Roy',
    status: 'rejected',
    salary: '$18991.67',
    email: 'ediehn6@163.com',
    designation: 'Environmental Specialist'
  },
  {
    age: 30,
    date: '06/12/2018',
    status: 'resigned',
    salary: '$19252.12',
    name: 'Ralph Leonard',
    email: 'dfalloona@ifeng.com',
    designation: 'Sales Representative'
  },
  {
    age: 66,
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    name: 'Annie Martin',
    designation: 'Operator',
    email: 'sganderton2@tuttocitta.it'
  },
  {
    age: 33,
    date: '08/25/2017',
    salary: '$10909.52',
    name: 'Adeline Day',
    status: 'professional',
    email: 'hnisius4@gnu.org',
    designation: 'Senior Cost Accountant'
  },
  {
    age: 61,
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    name: 'Lora Jackson',
    designation: 'Geologist',
    email: 'ghoneywood5@narod.ru'
  },
  {
    age: 22,
    date: '12/03/2017',
    salary: '$12336.17',
    name: 'Rodney Sharp',
    status: 'professional',
    designation: 'Cost Accountant',
    email: 'dcrossman3@google.co.jp'
  }
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' },
  published: { color: 'success' }
}

const DashboardTable = () => {
  const [productData, setProductData] = useState([]);
  const [performanceVal,setPerformanceVal] = useState("high");
  // const product = require("../../db/products2.json");
  const fetchDetails = () => {
    axios
      .get(`${process.env.HOST}/api/admin/getPerformingProducts?filter=${performanceVal}`)
      .then(function (response) {
        // handle success
        setProductData(response.data.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  function handleChange(e){
    setPerformanceVal(e.target.value);
  }

  useEffect(() => {
    fetchDetails()
  }, [performanceVal])
  return (
    <Card style={{marginTop:"10px"}}>
      <h3 style={{marginLeft:"18px"}}>Performing Products</h3>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={performanceVal}
          label="select market"
          onChange={handleChange}
          style={{margin:"10px"}}
        >
          <MenuItem value="high">High performance</MenuItem>
          <MenuItem value="low">Low performance</MenuItem>
        </Select>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
            <TableCell>Product</TableCell>
              <TableCell>Total Sale Price</TableCell>
              <TableCell>Quantities</TableCell>
              <TableCell>Business Name</TableCell>
              <TableCell>Business Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((row, i) =>{
              return(
              <TableRow hover key={"product_table"+i} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.productName}</TableCell>
                {/* <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  {row?.productDetails[0]?.businessName}
                </TableCell> */}
                <TableCell>{row?.price}</TableCell>
                <TableCell>{row?.quantity}</TableCell>
                <TableCell>{row?.productDetails[0]?.businessName}</TableCell>
                <TableCell>{row?.productDetails[0]?.fName+" "+row?.productDetails[0]?.mName+" "+row?.productDetails[0]?.lName}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
