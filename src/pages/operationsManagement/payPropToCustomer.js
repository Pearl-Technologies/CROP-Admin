import React, { useState, useEffect } from 'react'
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
import CardMedia from '@mui/material/CardMedia'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Eye from 'mdi-material-ui/Eye'
import { useRouter } from 'next/router'
import Spinner from '../databaseManagement/spinner'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from '@mui/material'
import TreeView from './treeView'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: 1000,
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  display: 'flex'
}

const statusObj = {
  presuspend: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}

const PayToCustomer = () => {
  const router = useRouter()
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [cdStatus, setCDStatus] = useState(false)
  const [bdStatus, setBDStatus] = useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const [soleData, setSoldData] = React.useState([])
  const fetchBusinessProductSoldDetails = id => {
    setCDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getPurchasedProductStatement`, { businessId: id })
      .then(function (response) {
        // handle success
        setSoldData(response.data.statement)
        setCDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)

      })
  }

  const handleChange = (panel, id) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
    fetchBusinessProductSoldDetails(id)
  }
  const showCustomerCrop = x => {
    router.push(`/accountManagement/cropDetails?q=${x}`)
    // return<CropDetails id={x}/>
  }
  const showCustomerAuditReport = x => {
    router.push(`/databaseManagement/auditReport?q=${x}`)
  }
  const showBusinessAuditReport = x => {
    router.push(`/databaseManagement/businessAuditReport?q=${x}`)
  }
  const showActiveOffers = x => {
    router.push(`/databaseManagement/offers?q=${x}`)
  }

  const fetchCustomerDetails = () => {
    setCDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomerForPropPayment`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerData(response.data.userDetails)
        setCDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setCDStatus(false)
      })
  }
  const fetchBusinessDetails = () => {
    setBDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessData(response.data.businesses)
        setBDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setBDStatus(false)
      })
  }
  useEffect(() => {
    fetchCustomerDetails()
    fetchBusinessDetails()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h4 style={{ marginLeft: '20px' }}>Customer Data</h4>
            {cdStatus ? (
              <Spinner />
            ) : !customerData.length ? (
              <h6 style={{ textAlign: 'center' }}>Data not found</h6>
            ) : (
              <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>CROP Id</TableCell>
                    <TableCell>Tier</TableCell>
                    <TableCell>Tier Changed Date</TableCell>
                    <TableCell>CROPs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customerData.map(row => (
                    <TableRow
                      hover
                      key={'customer' + row._id}
                      sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                    >
                      <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                            {row.name.fName} {row.name.mName} {row.name.lName}{' '}
                          </Typography>
                          {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                          {/* <Typography variant='caption'>{row.designation}</Typography> */}
                        </Box>
                      </TableCell>
                      <TableCell onClick={() => showCustomerCrop(row._id)} sx={{ cursor: 'pointer' }}>
                        {row.cropid}
                      </TableCell>
                      <TableCell>{row.UserTier}</TableCell>
                      <TableCell>{new Date(row.TierChangeDate).toLocaleDateString()}</TableCell>
                      <TableCell>{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h3 style={{ marginLeft: '20px' }}>Business Data</h3>
            {bdStatus ? (
              <Spinner />
            ) : !businessData.length ? (
              <h6 style={{ textAlign: 'center' }}>Data not found</h6>
            ) : (
              <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell>Business Name</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {businessData.map((row, x) => {
                    let value_pay_to_business = 0
                    return (
                      <TreeView id={row._id} data={row}/>                     
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default PayToCustomer
