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
import Spinner from '../databaseManagement/spinner';
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BusinessAuditReport = ({}) => {
  const router = useRouter()
  const { q } = router.query
  //   console.log(productData);

  const columns = [
    { id: 'Date', label: 'Date', minWidth: 170 },
    { id: 'Description', label: 'Description', minWidth: 100 },
  ]
  function createData(name, code, population, size) {
    const density = population / size

    return { name, code, population, size, density }
  }
  const [businessAuditData, setBusinessAuditData] = useState([]);
  const [adStatus, setADStatus] = useState(false);

  const myAuditData = businessAuditData?.filter(data => data.user === q)
  const getAuditReport=()=>{
    setADStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getBusinessAuditReport`)
      .then(function (response) {
        setBusinessAuditData(response.data.auditReport)
        setADStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  useEffect(()=>{
    getAuditReport();
  },[])

  // console.log(myAuditData)
  return (
    <Grid item xs={12}>
      <Card>
      <span onClick={()=>router.back()}><ArrowBackIcon/></span>
        <CardHeader title='Business Audit Records' titleTypographyProps={{ variant: 'h6' }} />
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
                      <TableCell>{new Date(row.date).toDateString()}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      
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

export default BusinessAuditReport
