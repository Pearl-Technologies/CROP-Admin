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

const Sector = () => {
  const [updateStatus, setUpdateStatus] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [profileImg, setProfileImg] = useState(null)
  const [sectorName, setSectorName] = useState('')
  const [category, setCategory] = useState([])
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
    const handleDelete = async (id, sectorName) => {
      handleClose()
      // setUpdateStatus(true)
      const formData = new FormData()
      formData.append('sectorName', sectorName)
      formData.append('id', id)
      await axios
        .post(`${process.env.HOST}/api/admin/deleteCategory`, formData, {
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
          <DialogTitle>{"Use Google's location service?"}</DialogTitle>
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
  const getAllSector = () => {
    axios
      .get(`${process.env.HOST}/api/admin/getCategories`)
      .then(function (response) {
        setCategory(response.data.categories)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    setUpdateStatus(true)
    const formData = new FormData()
    formData.append('sectorName', sectorName)
    formData.append('image', imageFile)
    await axios
      .post(`${process.env.HOST}/api/admin/createCategory`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
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
    setUpdate(true)
    setUpdateStatus(true)
    const postData = {
      id: id
    }
    await axios
      .post(`${process.env.HOST}/api/admin/getCategoryById`, postData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        
        setSectorName(response.data.categories.categoryName)
        setCategoryId(response.data.categories._id)
        // toast.success(response.data.msg, {
        //   position: toast.POSITION.TOP_CENTER,
        //   progressClassName: "Toastify__progress-bar--animated",
        // })
        // setMessage(response.data.msg);
        setUpdateStatus(false)
      })
      .catch(function (error) {
        console.log(error)
        setUpdateStatus(false)
        // let msg = error?.response?.data?.msg
        // setMessage(msg);
        // toast.error(msg, {
        //   position: toast.POSITION.TOP_CENTER,
        //   progressClassName: "Toastify__progress-bar--animated",
        // })
      })
  }
  const handleUpdate = async e => {
    e.preventDefault()
    setUpdateStatus(true)
    const formData = new FormData()
    formData.append('sectorName', sectorName)
    formData.append('image', imageFile)
    formData.append('id', categoryId)
    await axios
      .post(`${process.env.HOST}/api/admin/updateCategory`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
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
    setCategoryId('')
    setSectorName('')
  }
  useEffect(() => {
    getAllSector()
    // addASector()
  }, [message])

  return (
    <DatePickerWrapper>      
      {updateStatus && <LinearProgress />}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <ArrowBackIcon sx={{cursor:'pointer', marginBottom:5}} onClick={()=>router.back()}/>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card>
            <TableContainer sx={{ height: 355 }}>
              <Table sx={{ minWidth: 300 }} aria-label='table in dashboard' stickyHeader>
                <TableHead>
                  {/* <button onClick={() => setShow(x => !x)}>
                    <ArrowUpDropCircleOutline />
                  </button> */}
                  <TableRow>
                    <TableCell>Icon</TableCell>
                    <TableCell>Sector</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.map(row => (
                    <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                      <TableCell>
                        <Avatar src={`${process.env.HOST}/api/products/image/${row.image}`} />
                      </TableCell>
                      <TableCell>{row.categoryName}</TableCell>
                      <TableCell onClick={() => handleEdit(row._id)}>
                        <EditIcon />
                      </TableCell>
                      <TableCell>
                        <AlertDialogSlide id={row._id} categoryName={row.categoryName} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={`${update ? 'Update Sector' : 'New Sector'}`} titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <h5 style={{ marginLeft: 'auto' }}> Sector Name</h5>
                  </Grid>
                  <Grid item xs={6} spacing={2}>
                    <TextField
                      label={'Sector'}
                      style={{ marginBottom: '8px' }}
                      value={sectorName}
                      onChange={e => setSectorName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ImgStyled src={profileImg ? profileImg : '/images/logos/slack.png'} alt='Profile Pic' />
                      {/* {`${process.env.HOST}/api/products/image/${data?.filename}`} */}
                      <Box>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                          Upload New Photo
                          <input
                            hidden
                            type='file'
                            onChange={e => {
                              setImageFile(e.target.files[0])
                              let reader = new FileReader()
                              let file = e.target.files[0]
                              reader.onloadend = () => {
                                setProfileImg(reader.result)
                              }
                              reader.readAsDataURL(file)
                            }}
                            accept='image/png, image/jpeg'
                            id='account-settings-upload-image'
                          />
                        </ButtonStyled>
                        <Typography variant='body2' sx={{ marginTop: 5 }}>
                          Allowed PNG or JPEG. Max size of 800K.
                        </Typography>
                      </Box>
                    </Box>
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

export default Sector
