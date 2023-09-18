// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import moment from 'moment'
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
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Stack } from '@mui/joy'
import { Input } from '@mui/icons-material'
import TextField from '@mui/material/TextField';
import { LocalizationProvider, DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import multiColors from "react-multi-date-picker/plugins/colors"
import Settings from "react-multi-date-picker/plugins/settings"
import Toolbar from "react-multi-date-picker/plugins/toolbar"
const dateObject = new DateObject()

const toDateObject = day => new DateObject(dateObject).setDay(day)

const colors = {
  green: [2, 10, 17].map(toDateObject),
  amber: [5, 6, 14].map(toDateObject),
  red: [13, 19, 25].map(toDateObject),
  // yellow: [15, 22, 28].map(toDateObject)
}
Object.keys(colors).forEach(color => {
  colors[color].forEach((date, index) => {
      colors[color][index].color = color
  })
})
const initialProps ={
  value: [
    ...colors.green,
    ...colors.amber,
    ...colors.red,
    // ...colors.yellow
  ], 
  multiple: true
}

function DatePickerPlugins() {
  const [props, setProps] = useState(initialProps)
  const isRTL = ["fa", "ar"].includes(props.locale?.name?.split?.("_")?.[1])

  return (
    <div 
      style={{ 
        display: "flex", 
        justifyContent: "center" 
      }}
    >
      <Calendar
        {...props}
        plugins={[
          // <DatePickerHeader 
          //   position="top" 
          //   size="medium" 
          // />,
          // <DatePanel
          //   position={isRTL ? "left" : "right"}
          //   sort="date"
          //   eachDaysInRange={!props.onlyMonthPicker && !props.onlyYearPicker}
          // />,
          multiColors({ position: isRTL ? "right" : "left" }),
          // <Settings 
          //   position="bottom" 
          //   defaultActive="locale" 
          // />,
          // <Toolbar 
          //   position="bottom" 
          // />
        ]}
      />
    </div>
  )
}

const renderStats = (market, slot, date) => {
  const [slots, setSlots] = useState([])
  let  filteredData =[]
  const getSlots = () => {
    axios
      .get(`${process.env.HOST}/api/admin/getSlot`)
      .then(function (response) {
        // handle success
        
        setSlots(response.data.allSlot)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  if(market && slot && date){
    filteredData = slots.filter(x => (x.publishedAs === market && x.publishingSlot === slot && x.published_start_date===date))
  }else if(market && slot){
    filteredData =slots.filter(x => (x.publishedAs === market && x.publishingSlot === slot))
  }else if(market && date){
    filteredData = slots.filter(x => (x.publishedAs === market && x.published_start_date===date))
  }else if(slot && date){
    filteredData = slots.filter(x => (x.publishingSlot === slot && x.published_start_date===date))
  }else if(market){
    filteredData = slots.filter(x => (x.publishedAs === market))
  }else if(slot){
    filteredData =slots.filter(x => (x.publishingSlot === slot))
  }else if(date){
    filteredData = slots.filter(x => (x.published_start_date===date))
  }
  useEffect(() => {
    getSlots()
  }, [])
  
  return (
    <>
      {filteredData.length
        ? filteredData.map(data => (
              <Grid item xs={12} sm={3}>
                {/* <Box sx={{ display: 'flex', alignItems: 'center'}}> */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: 1,
                    p: 2,
                    m: 1,
                    // backgroundColor: `${
                    //   moment(data.bid_end_date) > moment().subtract(1, 'day') ? '#56CA00' : '#ef5350'
                    // }`,
                    backgroundColor: "#bad6e3",
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant='caption' color={'black'} fontWeight={'bold'}>
                    {data.publishingSlot[0].toUpperCase() + data.publishingSlot.substr(1)}{' '}
                    {data.publishedAs === 'topRank' ? 'Top Rank' : data.publishedAs === 'Promo'?'Promo':'Combo'} {'Slot'}
                  </Typography>
                  <Typography variant='caption' color={'black'}>
                    From: {data.published_start_date}
                  </Typography>
                  <Typography variant='caption' color={'black'}>
                    To: {data.published_end_date}
                  </Typography>
                  <Typography variant='caption' color={'black'}>
                    Bid End Date: {data.bid_end_date}
                  </Typography>
                </Box>
                {/* </Box> */}
              </Grid>
            ))
        : ' no record found'}
    </>
  )
}

const MarketSlots = () => {
  const [market, setMarket] = React.useState('')
  const [slots, setSlots] = React.useState('')
  const [date, setDate] = React.useState(false)
  const [selected, setSelected] = React.useState()

  const handleChange = event => {
    setMarket(event.target.value)
  }
  const handleSlot = event => {
    setSlots(event.target.value)
  }

  let footer = <p>Please pick a day.</p>
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>
  }
  
  return (
    <Card>
      <CardHeader 
        title='Market Slots'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}/>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      {/* <FormControl sx={{ ml: 6, px:2 }}>
        <InputLabel >Select Market</InputLabel>
        <Select
          value={market}
          label='select market'
          onChange={handleChange}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'topRank'}>Top Rank</MenuItem>
          <MenuItem value={'promo'}>Promo</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mx: 1 }}>
        <InputLabel >Select Slot</InputLabel>
        <Select
          value={slots}
          label='select market'
          onChange={handleSlot}
        >
          <MenuItem value={''}>None</MenuItem>
          <MenuItem value={'weekday'}>Weekday</MenuItem>
          <MenuItem value={'weekend'}>Weekend</MenuItem>
          <MenuItem value={'weekly'}>Weekly</MenuItem>
          <MenuItem value={'monthly'}>Monthly</MenuItem>
        </Select>
      </FormControl> */}
      <TextField type="date" onChange={(e)=>setDate(e.target.value)} value={date} sx={{ ml: 3, px:2 }} />
      {/* <DatePickerPlugins/> */}
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(market, slots, date)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default MarketSlots
