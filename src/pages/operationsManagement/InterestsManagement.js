import * as React from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddBoxIcon from '@mui/icons-material/AddBox'
import PropTypes from 'prop-types'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useSpring, animated } from '@react-spring/web'
import 'react-toastify/dist/ReactToastify.css'
import CircularProgress from '@mui/material/CircularProgress'
import { ToastContainer, toast } from 'react-toastify'
import Spinner from '../databaseManagement/spinner'

export default function InterestsManagement() {
  const [interestsList, setInterestsList] = React.useState([]);
  const [msg, setMsg] = React.useState('')
  const [status, setStatus] = React.useState(false)

  const getLoyaltyList = () => {
    setStatus(true)
    axios
      .get(`${process.env.HOST}/api/admin/getInterestList`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        setInterestsList(response.data.interests)
        setStatus(false)
      })
      .catch(function (error) {
        console.log(error)
        setStatus(false)
      })
  }
  const handleDelete=(id)=>{
    setStatus(true)
    axios
      .post(
        `${process.env.HOST}/api/admin/deleteInterest`,
        { id },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(function (response) {
        toast.success(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: "Toastify__progress-bar--animated",
          })
        setMsg(response.data.msg);
        setStatus(false)
      })
      .catch(function (error) {
        console.log(error)
        toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            progressClassName: "Toastify__progress-bar--animated",
          })
          setMsg(error.response.data.msg);
          setStatus(false)
      })
}
  const Fade = React.forwardRef(function Fade(props, ref) {
    const { children, in: open, onClick, onEnter, onExited, ownerState, ...other } = props
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true)
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true)
        }
      }
    })

    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    )
  })

  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  }
  function SpringModal({id, interestsName}) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [interestName, setInterestName] = React.useState(interestsName)
    const handleSave = e => {
        e.preventDefault()
        axios
          .post(
            `${process.env.HOST}/api/admin/addInterestName`,
            { interest_name: interestName },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then(function (response) {
            toast.success(response.data.msg, {
                position: toast.POSITION.TOP_CENTER,
                progressClassName: "Toastify__progress-bar--animated",
              })
            setMsg(response.data.msg);
            setLoyaltyName('')
          })
          .catch(function (error) {
            console.log(error)
            toast.error(error.response?.data?.msg, {
                position: toast.POSITION.TOP_CENTER,
                progressClassName: "Toastify__progress-bar--animated",
              })
              setMsg(error.response?.data?.msg);
          })
      }
    const handleUpdate=()=>{
        axios
          .post(
            `${process.env.HOST}/api/admin/updateInterest`,
            { interest_name: interestName, id },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then(function (response) {
            toast.success(response.data.msg, {
                position: toast.POSITION.TOP_CENTER,
                progressClassName: "Toastify__progress-bar--animated",
              })
            setMsg(response.data.msg);
            setLoyaltyName('')
          })
          .catch(function (error) {
            console.log(error)
            toast.error(error.response?.data?.msg, {
                position: toast.POSITION.TOP_CENTER,
                progressClassName: "Toastify__progress-bar--animated",
              })
              setMsg(error.response?.data?.msg);
          })
    }
    return (
      <div>
        {!id && <Button onClick={handleOpen}>Add A Interest</Button>}
        {id && <Button onClick={handleOpen}><EditIcon/></Button>}
        <Modal
          aria-labelledby='spring-modal-title'
          aria-describedby='spring-modal-description'
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade
            }
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography variant='h6' component='h2'>
                {id ? "Update Interest":"Add Interest"}
              </Typography>
              <Typography id='spring-modal-description' sx={{ mt: 2, display:'flex', justifyContent:"space-between"}}>
                  <TextField
                    id='standard-basic'
                    label='Interest Name'
                    value={interestName}
                    variant='standard'
                    onChange={e => setInterestName(e.target.value)}
                  />
               {!id &&  <Button variant='contained' onClick={handleSave}>
                    Save
                  </Button> }           
               {id &&  <Button variant='contained' onClick={handleUpdate}>
                    Update
                  </Button> }           
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    )
  }
  React.useEffect(() => {
    getLoyaltyList()
  }, [msg])

  return (
    <>
    {status && <Spinner/>}
          <ToastContainer/>
      <h4>Interes List</h4>
      <List
        sx={{
          width: '50%',
          maxWidth: 760,
        //   display:'flex',
        //   justifyContent:'space-between',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
        //   maxHeight: 'screen',
          '& ul': { padding: 0 }
        }}
       
      >
        
          <ul>
            {interestsList.map(item => (
              <ListItem key={`${item._id}`} >
                <ListItemText primary={`${item.interestName}`} sx={{width:500}}/>
                <ListItemText sx={{ textAlign:'right'}}>                  
                  <SpringModal id={item._id} interestsName={item.interestName}/>
       
                </ListItemText>
                <ListItemText sx={{textAlign:'right'}}>                  
                         <Button onClick={()=>handleDelete(item._id)}><DeleteForeverIcon /></Button>
                </ListItemText>
              </ListItem>
            ))}
            <SpringModal />
          </ul>
        
      </List>
    </>
  )
}
