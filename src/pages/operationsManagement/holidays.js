// ** React Imports
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Divider from '@mui/material/Divider'
import axios from 'axios'
import LinearProgress from '@mui/material/LinearProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import ArrowUpDropCircleOutline from 'mdi-material-ui/ArrowUpDropCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import TableRow from '@mui/material/TableRow'
import Avatar from '@mui/material/Avatar'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import moment from 'moment'
// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))
const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const Holiday = () => {
  const [updateStatus, setUpdateStatus] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [profileImg, setProfileImg] = useState(null)
  const [data, setData] = useState({
    holidayDate: '',
    state: '',
    holidayName: '',
    _id: ''
  })
  const [holidayList, setHolidayList] = useState([])
  const [message, setMessage] = useState('')
  const [update, setUpdate] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const router = useRouter()
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  })

  function AlertDialogSlide({ id, categoryName }) {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }
    const handleDelete = async id => {
      handleClose()
      // setUpdateStatus(true)
      const formData = {
        _id: id
      }
      await axios
        .post(`${process.env.HOST}/api/admin/deleteHoliday`, formData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
          setMessage(response.data.msg)
          // setUpdateStatus(false)
        })
        .catch(function (error) {
          console.log(error)
          setUpdateStatus(false)
          let msg = error?.response?.data?.msg
          setMessage(msg)
          toast.error(msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: 'Toastify__progress-bar--animated'
          })
        })
    }
    return (
      <div>
        <Button onClick={handleClickOpen}>
          <DeleteForeverSharpIcon />
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle>{'Delete Holiday'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>Are you really want to delete?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={() => handleDelete(id, categoryName)}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  const changeHoliday = prop => event => {
    setData({ ...data, [prop]: event.target.value })
  }
  const getAllHolidays = () => {
    axios
      .get(`${process.env.HOST}/api/admin/getAllHolidays`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
        setHolidayList(response.data.holidays)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setUpdateStatus(true)
    const formData = {
      holidayName: data.holidayName,
      holidayDate: data.holidayDate,
      state: data.state
    }
    await axios
      .post(`${process.env.HOST}/api/admin/addHoiday`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'Application/json'
        }
      })
      .then(function (response) {
        toast.success(response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: 'Toastify__progress-bar--animated'
        })
        setMessage(response.data.msg)
        setUpdateStatus(false)
      })
      .catch(function (error) {
        console.log(error)
        setUpdateStatus(false)
        let msg = error?.response?.data?.msg
        setMessage(msg)
        toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: 'Toastify__progress-bar--animated'
        })
      })
  }
  const handleEdit = async id => {
    let newData = holidayList.filter(x => x._id === id)
    setData(newData[0])
    setUpdate(true)
  }
  const handleUpdate = async e => {
    e.preventDefault()
    setUpdateStatus(true)
    const formData = {
      holidayName: data.holidayName,
      holidayDate: data.holidayDate,
      state: data.state,
      _id: data._id
    }
    await axios
      .post(`${process.env.HOST}/api/admin/updateHoliday`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'Application/json'
        }
      })
      .then(function (response) {
        toast.success(response.data.msg, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: 'Toastify__progress-bar--animated'
        })
        setMessage(response.data.msg)
        setUpdateStatus(false)
        setUpdate(false)
      })
      .catch(function (error) {
        console.log(error)
        setUpdateStatus(false)
        setUpdate(false)
        let msg = error?.response?.data?.msg
        setMessage(msg)
        toast.error(msg, {
          position: toast.POSITION.TOP_CENTER,
          progressClassName: 'Toastify__progress-bar--animated'
        })
      })
  }

  const handleCancle = () => {
    setUpdate(false)
    setData({
      holidayName: '',
      holidayDate: '',
      state: ''
    })
  }
  useEffect(() => {
    getAllHolidays()
    // addASector()
  }, [message])
  return (
    <DatePickerWrapper>
      {updateStatus && <LinearProgress />}
      <ToastContainer />
      <ArrowBackIcon sx={{cursor:'pointer', marginBottom:5}} onClick={()=>router.back()}/>
      <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <Card>
            <TableContainer sx={{ height: 355 }}>
              <Table sx={{ minWidth: 300 }} aria-label='table in dashboard' stickyHeader>
                <TableHead>
                  {/* <button onClick={() => setShow(x => !x)}>
                    <ArrowUpDropCircleOutline />
                  </button> */}
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {holidayList.map(row => (
                    <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell>{row.state}</TableCell>
                      <TableCell>{row.holidayDate}</TableCell>
                      <TableCell>{row.holidayName}</TableCell>
                      <TableCell onClick={() => handleEdit(row._id)} sx={{ cursor: 'pointer' }}>
                        <EditIcon />
                      </TableCell>
                      <TableCell>
                        <AlertDialogSlide id={row._id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              title={`${update ? 'Update Holiday' : 'New Holiday'}`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={2}>
                  <Grid item xs={12} spacing={2}>
                    <TextField
                      label={'Name'}
                      style={{ marginBottom: '8px' }}
                      value={data.holidayName}
                      onChange={changeHoliday('holidayName')}
                    />
                  </Grid>
                  <Grid item xs={12} spacing={2}>
                    <TextField
                      label={'Date'}
                      style={{ marginBottom: '8px' }}
                      value={moment(data.holidayDate).format('YYYY-MM-DD')}
                      onChange={changeHoliday('holidayDate')}
                      type='date'
                    />
                  </Grid>
                  <Grid item xs={12} spacing={2}>
                    <TextField
                      label={'State'}
                      style={{ marginBottom: '8px' }}
                      value={data.state}
                      onChange={changeHoliday('state')}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      {!update && (
                        <Button type='submit' variant='contained' size='large' onClick={handleSubmit}>
                          Add
                        </Button>
                      )}
                      {update && (
                        <>
                          <Button type='submit' variant='contained' size='large' onClick={handleUpdate}>
                            Update
                          </Button>
                          <Button type='submit' variant='contained' size='large' onClick={handleCancle}>
                            Cancle
                          </Button>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Holiday
