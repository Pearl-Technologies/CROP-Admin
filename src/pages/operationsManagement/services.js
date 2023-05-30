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
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@mui/material/CircularProgress'
import Avatar from '@mui/material/Avatar'

const statusObj = {
  presuspend: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}

const services = () => {
  const router = useRouter()
  // const users = require('../../db/users_customers.json')
  // const business = require('../../db/businesses.json')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState([])
  const [reponseCode, setResponseCode] = useState(null)
  // const handleOpen = () => setOpen(true)

  const fetchCustomerDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerData(response.data.customers)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  function ChangeAccountStatus({ user }) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      justifyContent: 'space-between',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      flexDirection: 'column'
    }
    const [updateStatus, SetUpdateStatus] = useState(false)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const ChangeStatus = sts => {
      SetUpdateStatus(true)
      // let formData = new FormData()
      // formData.append('status', sts)
      // formData.append('_id', user)
      const body = {
        status: sts,
        _id: user
      }
      axios({ method: 'post', url: `${process.env.HOST}/api/admin/updateCustomerStatus`, data: body })
        .then(function (response) {
          setMessage(response.data)
          SetUpdateStatus(false)
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
        .catch(function (error) {
          console.log(error.message)
          SetUpdateStatus(false)
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
      handleClose()
    }

    return (
      <div>
        <Chip
          label={'Change'}
          // color={statusObj[row.status].color}
          color={'primary'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 },
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        />
        {updateStatus && <CircularProgress size={20} />}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Chip
              label={'suspended'}
              // color={statusObj[row.status].color}
              color={'info'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('suspended')
              }}
            />
            <Chip
              label={'Deactivated'}
              // color={statusObj[row.status].color}
              color={'error'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('deactivated')
              }}
            />
            <Chip
              label={'presuspend'}
              // color={statusObj[row.status].color}
              color={'warning'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('presuspend')
              }}
            />
            <Chip
              label={'Active'}
              // color={statusObj[row.status].color}
              color={'primary'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('active')
              }}
            />
          </Box>
        </Modal>
      </div>
    )
  }

  function ChangeBusinessAccountStatus({ user }) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column'
    }
    const [updateStatus, SetUpdateStatus] = useState(false)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const ChangeStatus = sts => {
      SetUpdateStatus(true)
      let body = { status: sts, _id: user }
      axios({ method: 'post', url: `${process.env.HOST}/api/admin/updateBusinessAccountStatus`, data: body })
        .then(function (response) {
          console.log(response)
          setMessage(response.data)
          SetUpdateStatus(false)
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
        .catch(function (error) {
          console.log(error.message)
          SetUpdateStatus(false)
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
      handleClose()
    }

    return (
      <div>
        <Chip
          label={'Change'}
          // color={statusObj[row.status].color}
          color={'primary'}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 },
            cursor: 'pointer'
          }}
          onClick={handleOpen}
        />
        {updateStatus && <CircularProgress size={20} />}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Chip
              label={'suspended'}
              // color={statusObj[row.status].color}
              color={'info'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('suspended')
              }}
            />
            <Chip
              label={'Deactivated'}
              // color={statusObj[row.status].color}
              color={'error'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('deactivated')
              }}
            />
            <Chip
              label={'presuspend'}
              // color={statusObj[row.status].color}
              color={'warning'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('presuspend')
              }}
            />
            <Chip
              label={'Active'}
              // color={statusObj[row.status].color}
              color={'primary'}
              sx={{
                height: 24,
                fontSize: '0.75rem',
                textTransform: 'capitalize',
                '& .MuiChip-label': { fontWeight: 500 },
                cursor: 'pointer',
                margin: '3px'
              }}
              onClick={() => {
                ChangeStatus('active')
              }}
            />
          </Box>
        </Modal>
      </div>
    )
  }
  const fetchBusinessDetails = () => {
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessData(response.data.businesses)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  useEffect(() => {
    fetchCustomerDetails()
    fetchBusinessDetails()
  }, [message])

  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <Grid item xs={12}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h3 style={{ marginLeft: '20px' }}>Customer Data</h3>
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>CROP Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell>Change Account Status</TableCell>
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
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Avatar
                          variant='rounded-circle'
                          src={
                            row?.avatar
                              ? `${process.env.HOST}/api/products/image/${row?.avatar}`
                              : '/images/avatars/1.png'
                          }
                        ></Avatar>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem !important',
                            alignSelf: 'center',
                            marginLeft: '10px'
                          }}
                        >
                          {row.name.fName} {row.name.mName} {row.name.lName}{' '}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.cropid}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        // color={statusObj[row.status].color}
                        color={statusObj[`${row.status}`]?.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.UserTier}</TableCell>
                    <TableCell>
                      <ChangeAccountStatus user={row._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
      <Grid item xs={12} style={{ marginTop: '20px' }}>
        <Card>
          <TableContainer sx={{ height: 400 }}>
            <h3 style={{ marginLeft: '20px' }}>Business Data</h3>
            <Table stickyHeader sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Business Name</TableCell>
                  <TableCell>CROP Id</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Tier</TableCell>
                  <TableCell>CHANGE ACCOUNT STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessData.map(row => (
                  <TableRow
                    hover
                    key={'business' + row._id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Avatar
                          variant='rounded-circle'
                          src={
                            row?.avatar
                              ? `${process.env.HOST}/api/products/image/${row?.avatar}`
                              : '/images/logos/slack.png'
                          }
                        ></Avatar>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.875rem !important',
                            alignSelf: 'center',
                            marginLeft: '10px'
                          }}
                        >
                          {row?.businessName}
                        </Typography>
                        {/* <CardMedia component='img' height='50' image={row.image} alt='Paella dish' /> */}
                        <Typography variant='caption'>{row.designation}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.cropId}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        // color={statusObj[row.status].color}
                        color={statusObj[`${row.status}`]?.color}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.Tier}</TableCell>
                    {/* <TableCell>
                     <BusinessModal user={row} />                      
                    </TableCell> */}
                    <TableCell>
                      <ChangeBusinessAccountStatus user={row._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </Grid>
  )
}

export default services
