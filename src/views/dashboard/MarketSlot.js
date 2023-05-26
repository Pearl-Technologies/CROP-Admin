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
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const renderStats = (market) => {
  const [slots, setSlots] = useState([])

  // console.log(accountDetails);
  const getSlots = () => {
    axios
      .get(`${process.env.HOST}/api/admin/getSlot`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setSlots(response.data.allSlot)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  useEffect(() => {
    getSlots()
  }, [])
  return (
    <>
      {slots.length
        ? slots
            .filter(x => x.publishedAs === market)
            .map(data => (
              <Grid item xs={12} sm={3}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      border: 1,
                      p: 3,
                      backgroundColor: '#349beb',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant='h6' color={'white'}>
                      {data.publishingSlot.toUpperCase()}
                    </Typography>
                    <Typography variant='caption' color={'white'}>
                      {data.published_start_date} to {data.published_end_date}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))
        : ' no record found'}
    </>
  )
}

const MarketSlots = () => {
    const [market, setMarket] = React.useState('')
    const handleChange = event => {
        setMarket(event.target.value)
      }
    return (
    <Card>
      <CardHeader
        title='Market Slots'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <FormControl sx={{mx:5}}>
        <InputLabel id="demo-simple-select-label">select market</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={market}
          label="select market"
          onChange={handleChange}
        >
          <MenuItem value={"topRank"}>Top Rank</MenuItem>
          <MenuItem value={'promo'}>Promo</MenuItem>
        </Select>
      </FormControl>
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
      
        <Grid container spacing={[5, 0]}>
          {renderStats(market)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MarketSlots
