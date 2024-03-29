import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
import Spinner from '../databaseManagement/spinner';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios'
import moment from 'moment'
const AuditReport = ({}) => {
  const router = useRouter()
  const { q } = router.query

  const columns = [
    { id: 'Date', label: 'Date', minWidth: 170 },
    { id: 'Description', label: 'Description', minWidth: 100 },
    // {
    //   id: 'status',
    //   label: 'Status',
    //   minWidth: 170,
    //   align: 'right',
    //   format: value => value.toLocaleString('en-US')
    // },
    // {
    //   id: 'crop',
    //   label: 'CROP',
    //   minWidth: 170,
    //   align: 'right',
    //   format: value => value.toLocaleString('en-US')
    // },
    // {
    //   id: 'amount',
    //   label: 'Amount',
    //   minWidth: 170,
    //   align: 'right',
    //   format: value => value.toFixed(2)
    // }
  ]
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
  const [auditData, setAuditData] = useState([]);
  const [adStatus, setADStatus] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const myAuditData = auditData?.filter(data => data.user === q)
  const getAuditReport=()=>{
    setADStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getCustomerAuditReport?q=${q}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
       
        setAuditData(response.data.auditReport)
        setADStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  useEffect(()=>{
    getAuditReport();
  },[q])

 
  return (
    <Grid item xs={12}>
      <Card>
      <span onClick={()=>router.back()}><ArrowBackIcon/></span>
        <CardHeader title='Customer Audit Trail' titleTypographyProps={{ variant: 'h6' }} />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
          {adStatus ? <Spinner/>: !myAuditData.length ? <h6 style={{textAlign:'center'}}>Data not found</h6> :
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {myAuditData?.map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                      {/* {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })} */}
                      <TableCell>{moment(new Date(row.date)).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      
                    </TableRow>
                  )
                })}                
              </TableBody>
            </Table>}
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Paper>
      </Card>
    </Grid>
  )
}

export default AuditReport
