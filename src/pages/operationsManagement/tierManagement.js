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
import Switch from '@mui/material/Switch'

import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Eye from 'mdi-material-ui/Eye'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@mui/material/CircularProgress'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


const statusObj = {
  presuspended: { color: 'info' },
  deactivated: { color: 'error' },
  current: { color: 'primary' },
  suspended: { color: 'warning' },
  active: { color: 'success' }
}
const label = { inputProps: { 'aria-label': 'Switch demo' } }

const TierManagement = () => {
  const router = useRouter()
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [message, setMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState('Customer Data')

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

  function ChangeAccountTier({ user, type }) {
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

    const ChangeTier = (type, sts) => {
      SetUpdateStatus(true)
      const body = {
        tier: sts,
        _id: user,
        type
      }
      axios({ method: 'post', url: `${process.env.HOST}/api/admin/updateTier`, data: body })
        .then(function (response) {
          SetUpdateStatus(false)
          setMessage('success')
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })

          handleClose()
        })
        .catch(function (error) {
          console.log(error)
          SetUpdateStatus(false)
          handleClose()
          toast.error(error.response?.data?.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })

          setMessage('fail')
        })
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
        {type == 'customer' && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Chip
                label={'Base'}
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
                  ChangeTier(type, 'Base')
                }}
              />
              <Chip
                label={'Silver'}
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
                  ChangeTier(type, 'Silver')
                }}
              />
              <Chip
                label={'Gold'}
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
                  ChangeTier(type, 'Gold')
                }}
              />
              <Chip
                label={'Platinum'}
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
                  ChangeTier(type, 'Platinum')
                }}
              />
            </Box>
          </Modal>
        )}
        {type == 'business' && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Chip
                label={'A'}
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
                  ChangeTier(type, 'A')
                }}
              />
              <Chip
                label={'B'}
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
                  ChangeTier(type, 'B')
                }}
              />
              <Chip
                label={'C'}
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
                  ChangeTier(type, 'C')
                }}
              />
              <Chip
                label={'D'}
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
                  ChangeTier(type, 'D')
                }}
              />
            </Box>
          </Modal>
        )}
      </div>
    )
  }
  useEffect(() => {
    fetchCustomerDetails()
    fetchBusinessDetails()
  }, [message])

  return (
    <Grid container spacing={2}>
      <ToastContainer />
      <ArrowBackIcon sx={{cursor:'pointer', marginRight:"auto"}} onClick={()=>router.back()}/>
      <div style={{ display: 'flex', gap: 2 }}>
        <Switch
          {...label}
          defaultChecked
          sx={{ marginTop: 3 }}
          onChange={() => setSelectedOption(x => (x === 'Customer Data' ? 'Business Data' : 'Customer Data'))}
        />
        <h5>{selectedOption}</h5>
      </div>
      {selectedOption == 'Customer Data' ? (
        <Grid item xs={12}>
          <Card>
            <TableContainer sx={{ height: 420 }}>
              <h4 style={{ marginLeft: '15px' }}>Customer Data</h4>
              <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{textTransform:"none"}}>Customer Name</TableCell>
                    <TableCell sx={{textTransform:"none"}}>CROP Id</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Status</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Tier</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Earn CROPs</TableCell>
                    {/* <TableCell>Invoices</TableCell> */}
                    <TableCell sx={{textTransform:"none"}}>Last Change date</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Change Tier</TableCell>
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
                      <TableCell>{row.croppoints.toFixed(2)}</TableCell>
                      <TableCell>
                        {/* <CustomerModal user={row} /> */}
                        {new Date(row.TierChangeDate).toLocaleDateString()}
                      </TableCell>
                      
                    {/* <TableCell>{'PROP Info'}</TableCell> */}
                      <TableCell>
                        <ChangeAccountTier user={row._id} type='customer' />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Card>
            <TableContainer sx={{height:420}}>
              <h4 style={{ marginLeft: '15px' }}>Business Data</h4>
              <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{textTransform:"none"}}>Business Name</TableCell>
                    <TableCell sx={{textTransform:"none"}}>CROP Id</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Status</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Tier</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Offered CROPS</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Last Change Date</TableCell>
                    <TableCell sx={{textTransform:"none"}}>Change Tier</TableCell>
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
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                            {row.businessName}
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
                      <TableCell>{row.tier}</TableCell>
                      <TableCell>
                     {row?.croppoint}                     
                    </TableCell>
                      <TableCell>{new Date(row.tierChangeDate).toLocaleDateString()}</TableCell>

                      <TableCell>
                        <ChangeAccountTier user={row._id} type='business' />
                      </TableCell>
                      {/* <TableCell>{'view active offers'}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default TierManagement
