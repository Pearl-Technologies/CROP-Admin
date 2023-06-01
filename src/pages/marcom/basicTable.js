import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import axios from 'axios'
import CardActions from '@mui/material/CardActions'
import OutlinedInput from '@mui/material/OutlinedInput'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Box } from '@mui/joy'
import Switch from '@mui/material/Switch'

const label = { inputProps: { 'aria-label': 'Switch demo' } }

export default function BasicTable() {
  const [customerData, setCustomerData] = React.useState([])
  const [businessData, setBusinessData] = React.useState([])
  const [data, setData] = React.useState([])
  const [emailData, setEmailData] = React.useState([])
  const [userData, setUserData] = React.useState([])
  const [userEmailData, setUserEmailData] = React.useState([])
  const [deme, setDemo] = React.useState(false)
  const [businessNotificationContent, setBusinessNotificationContent] = React.useState('')
  const [customerNotificationContent, setCustomerNotificationContent] = React.useState('')
  const [selectedOption, setSelectedOption] = React.useState('Customer Account')
  const handleChange = prop => event => {
    setData({ ...data, [prop]: event.target.value })
  }
  const handleUserChange = prop => event => {
    setUserData({ ...userData, [prop]: event.target.value })
  }
  const fetchAllCustomerByContent = () => {
    axios({
      url: `${process.env.HOST}/api/admin/getAllCustomerByContent`,
      method: 'post',
      data: userData
    })
      .then(function (response) {
        setCustomerData(response.data.customerDetails)
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }
  const fetchAllBusinessByContent = () => {
    axios({
      url: `${process.env.HOST}/api/admin/getAllBusinessByContent`,
      method: 'post',
      data: data
    })
      .then(function (response) {
        setBusinessData(response.data.businessDetails)
      })
      .catch(function (error) {
        console.log(error.message)
      })
  }
  const handleEmailData = email => {
    setDemo(e => !e)
    if (emailData.includes(email)) {
      // let newData = emailData
      // let index = newData.indexOf(email)
      // newData.splice(index, 1)
      let index = emailData.indexOf(email)
      emailData.splice(index, 1)
      setEmailData(emailData)
    } else {
      setEmailData(x => x.concat(email))
      // emailData.push(email)
    }
  }
  const handleUserEmailData = email => {
    setDemo(e => !e)
    if (userEmailData.includes(email)) {
      // let newData = emailData
      // let index = newData.indexOf(email)
      // newData.splice(index, 1)
      let index = userEmailData.indexOf(email)
      userEmailData.splice(index, 1)
      setUserEmailData(userEmailData)
    } else {
      setUserEmailData(x => x.concat(email))
      // emailData.push(email)
    }
  }
  const sendMassNotificationForBusiness = () => {
    axios({
      url: `${process.env.HOST}/api/admin/sendMassNotification`,
      method: 'post',
      data: { businessNotificationContent, emailData }
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const sendMassNotificationForCustomer = () => {
    axios({
      url: `${process.env.HOST}/api/admin/sendMassNotification`,
      method: 'post',
      data: { customerNotificationContent, userEmailData }
    })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleSelectAllUser = () => {
    if (userEmailData.length) {
      setUserEmailData([])
      // emailData.splice(0, businessData.length);
    } else {
      for (let i = 0; i < customerData.length; i++) {
        setUserEmailData(x => x.concat(customerData[i].email))
        // emailData.push(businessData[i].email)
      }
    }
  }
  const handleSelectAll = () => {
    if (emailData.length) {
      setEmailData([])
      // emailData.splice(0, businessData.length);
    } else {
      for (let i = 0; i < businessData.length; i++) {
        setEmailData(x => x.concat(businessData[i].email))
        // emailData.push(businessData[i].email)
      }
    }
  }
  React.useEffect(() => {
    fetchAllCustomerByContent()
    fetchAllBusinessByContent()
  }, [data])
  return (
    <>
      <div style={{ display: 'flex', gap: 2 }}>
        <Switch
          {...label}
          defaultChecked
          sx={{ marginTop: 3 }}
          onChange={() => setSelectedOption(x => (x === 'Customer Account' ? 'Business Account' : 'Customer Account'))}
        />
        <h5>{selectedOption}</h5>
      </div>
      {selectedOption == 'Customer Account' ? (
        <TableContainer component={Paper} sx={{ height: 380 }}>
          {/* <h3 style={{ marginLeft: '20px' }}>Customer Account</h3> */}
          <Box margin={2}>
            <OutlinedInput
              placeholder='Customer Name'
              style={{ marginLeft: '2px' }}
              value={userData?.customerName}
              onChange={handleUserChange('customerName')}
            />
            <OutlinedInput
              placeholder='Email'
              style={{ marginLeft: '2px' }}
              value={userData?.email}
              onChange={handleChange('email')}
            />
            <OutlinedInput
              placeholder='Address'
              style={{ marginLeft: '2px' }}
              value={userData?.address}
              onChange={handleChange('address')}
            />
          </Box>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSelectAllUser}>
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell align='right'>Email</TableCell>
                <TableCell align='right'>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData.map((row, i) => (
                <TableRow key={row._id.toString()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Checkbox
                      onClick={() => handleUserEmailData(row.email)}
                      checked={userEmailData.includes(row.email)}
                    />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row?.name?.fName}
                  </TableCell>
                  <TableCell align='right'>{row?.email}</TableCell>
                  <TableCell align='right'>
                    {row?.address?.length
                      ? row.address.map((add, i) => (
                          <p>
                            Address{i + 1}
                            {': '}
                            {add?.line1 + ', ' + add?.line2 + ', ' + add?.state + ', ' + add?.pin}
                          </p>
                        ))
                      : row.address
                      ? row.address?.line1 +
                        ', ' +
                        row.address?.line2 +
                        ', ' +
                        row.address?.state +
                        ', ' +
                        row.address?.pin
                      : 'no address found'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ px: 5 }}>
            <TextField
              fullWidth
              label='Notification Text'
              value={customerNotificationContent}
              onChange={event => setCustomerNotificationContent(event.target.value)}
            />
          </Box>
          <CardActions>
            <div sx={{ m: 1, width: 300 }}>
              <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={sendMassNotificationForCustomer}>
                Send Mass Notification
              </Button>
            </div>
          </CardActions>
        </TableContainer>
      ) : (
        <TableContainer component={Paper} sx={{ height: 380 }}>
          {/* <h3 style={{ marginLeft: '20px' }}>Business Account</h3> */}
          <Box margin={2}>
            <OutlinedInput
              placeholder='business name'
              style={{ marginLeft: '2px' }}
              value={data?.businessName}
              onChange={handleChange('businessName')}
            />
            <OutlinedInput
              placeholder='pin'
              style={{ marginLeft: '2px' }}
              value={data?.Zip_code}
              onChange={handleChange('Zip_code')}
            />
            <OutlinedInput
              placeholder='nature of business'
              style={{ marginLeft: '2px' }}
              value={data?.natureOfBusiness}
              onChange={handleChange('natureOfBusiness')}
            />
          </Box>
          <Table sx={{ minWidth: 650 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell onClick={handleSelectAll}>
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Nature Of Business</TableCell>
                <TableCell align='right'>Email</TableCell>
                <TableCell align='right'>Address</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {businessData?.map(row => (
                <TableRow
                  key={row._id + 'marconNotficationForBusiness'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Checkbox onClick={() => handleEmailData(row.email)} checked={emailData.includes(row.email)} />
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row?.businessName}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {row.natureOfBusiness}
                  </TableCell>
                  <TableCell align='right'>{row?.email}</TableCell>
                  <TableCell align='left'>
                    {row?.address?.length ? (
                      row?.address.map((addr, i) => (
                        <p>
                          <strong>
                            address {i + 1}: {'  '}
                          </strong>
                          {addr?.line1 + ', ' + addr?.line2 + ', ' + addr.state + ', ' + addr?.pincode}
                        </p>
                      ))
                    ) : (
                      <p>
                        <strong>address: {'  '}</strong>
                        {row?.address?.line1 +
                          ', ' +
                          row?.address?.line2 +
                          ', ' +
                          row?.address?.state +
                          ', ' +
                          row?.address?.pincode}
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ px: 5 }}>
            <TextField
              fullWidth
              label='Notification Text'
              value={businessNotificationContent}
              onChange={event => setBusinessNotificationContent(event.target.value)}
            />
          </Box>
          <CardActions>
            <div sx={{ m: 1, width: 300 }}>
              <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={sendMassNotificationForBusiness}>
                Send Mass Notification
              </Button>
            </div>
          </CardActions>
        </TableContainer>
      )}
    </>
  )
}
