// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import dotenv from 'dotenv'
const host = process.env.HOST
const salesData = [
  {
    stats: '245k',
    title: 'Sales',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '12.5k',
    title: 'Customers',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '1.54k',
    color: 'warning',
    title: 'Products',
    icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '$88k',
    color: 'info',
    title: 'Revenue',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  }
]

const StatisticsCard = () => {
  const [accountDetails, setAccountDetails] = useState({ propCredit: 0, propDebit: 0, cropCredit: 0, cropDebit: 0 })

  const renderStats = () => {
    return (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  color: 'common.white',
                  backgroundColor: 'primary.main'
                }}
                src='/images/crop.png'
              >
                <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Typography variant='caption' noWrap>
                  {'Total CROPs Credit'}
                </Typography>
                <Typography variant='h6' noWrap title={accountDetails.cropCredit}>
                  {accountDetails.cropCredit}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  color: 'common.white',
                  backgroundColor: 'primary.main'
                }}
                src='/images/crop.png'
              >
                <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Typography variant='caption' noWrap>
                  {'Total CROPs Debit'}
                </Typography>
                <Typography variant='h6' noWrap title={accountDetails.cropDebit}>
                  {accountDetails.cropDebit}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: 'primary.main'
                }}
                src='/images/prop.png'
              >
                <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Typography variant='caption' noWrap>
                  {'Total PROPs Credit'}
                </Typography>
                <Typography variant='h6' noWrap title={accountDetails.propCredit}>
                  {accountDetails.propCredit}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 44,
                  height: 44,
                  boxShadow: 3,
                  color: 'common.white',
                  backgroundColor: 'primary.main'
                }}
                src='/images/prop.png'
              >
                <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <Typography variant='caption' noWrap>
                  {'Total PROPs Debit'}
                </Typography>
                <Typography variant='h6' noWrap title={accountDetails.propDebit}>
                  {accountDetails.propDebit}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
    )
  }

  useEffect(() => {
    const getDetails = () => {
      axios
        .get(`${process.env.HOST}/api/admin/getCropPropDebitCredit`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(function (response) {
          // handle success
          if (response.data.crop.length > 0) {
            response.data.crop.forEach(datum => {
              if (datum._id == 'credit') {
                // setAccountDetails({...accountDetails,cropCredit:datum.totalCredit})
                setAccountDetails(prevState => {
                  return {
                    ...prevState,
                    cropCredit: Number(datum.totalCredit).toFixed(2)
                  }
                })
              } else {
                // setAccountDetails({...accountDetails,cropDebit:datum.totalDebit})
                setAccountDetails(prevState => {
                  return {
                    ...prevState,
                    cropDebit: Number(datum.totalDebit).toFixed(2)
                  }
                })
              }
            })
          }

          if (response.data.prop.length > 0) {
            response.data.prop.forEach(datum => {
              if (datum._id == 'credit') {
                // setAccountDetails({...accountDetails,propCredit:datum.totalCredit,})
                setAccountDetails(prevState => {
                  return {
                    ...prevState,
                    propCredit: Number(datum.totalCredit).toFixed(2)
                  }
                })
              } else {
                // setAccountDetails({...accountDetails,propDebit:datum.totalDebit})
                setAccountDetails(prevState => {
                  return {
                    ...prevState,
                    propDebit: Number(datum.totalDebit).toFixed(2)
                  }
                })
              }
            })
          }
          // setAccountDetails(response.data.availBalance[0])
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
    getDetails()
  }, [])

  return (
    <Card style={{height:155}}>
      <CardHeader
        title='CROPs and PROPs Status'
        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
        //     <DotsVertical />
        //   </IconButton>
        // }
        // subheader={
        //   <Typography variant='body2'>
        //     <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
        //       Total 48.5% growth
        //     </Box>{' '}
        //     😎 this month
        //   </Typography>
        // }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
