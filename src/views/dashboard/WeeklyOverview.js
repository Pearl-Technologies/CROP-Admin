// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { startOfWeek, endOfWeek } from 'date-fns';
import axios from 'axios'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()
  const [weekData,setWeekData] = useState([]);
  const [currentStats,setCurrentStats]=useState(0);
  const [prevStats,setPrevStats]=useState("");
  const [gain,setGain] = useState(false);
  const [percentage,setPercentage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    // console.log(date.toISOString())
    setSelectedDate(date);
  };
  let HOST = process.env.HOST

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.background.default,
      theme.palette.primary.main,
      theme.palette.background.default,
      theme.palette.background.default
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',],
      tickPlacement: 'on',
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: value => `$${value}`
      }
    }
  }

  useEffect(()=>{
    axios.get(`${HOST}/api/admin/getWeeklyDetails?date=${selectedDate}`)
    .then((response)=>{
      let datum=response.data.data;
      let tempData=[];
      console.log(datum)
      if(datum.weeklyDetails.length > 0){
        datum.weeklyDetails[0].weeklySales.forEach((resData)=>{
          console.log(resData)
          tempData.push(resData.price)
        })
        setWeekData(tempData)
      }
      else{
        setWeekData([])
      }

      datum.weeklyPercentage.forEach((resData)=>{
        console.log(resData)
        if(resData._id=="Current Week"){
            setCurrentStats(resData.totalPrice)
        }
        else if(resData._id=="Previous Week"){
            setPrevStats(resData.totalPrice)
        }
        else if(resData._id=="Other Week"){
            setPrevStats(resData.totalPrice)
        }
      })
      // setWeekData(tempData)
    })
  },[selectedDate])

  useEffect(()=>{
    if(((currentStats/prevStats)*100)>=100){
      setGain(true)
      setPercentage(((currentStats/prevStats)*100)-100)
    }
    else{
      setGain(false)
      console.log(100-((currentStats/prevStats)*100))
      setPercentage(100-((currentStats/prevStats)*100))
    }
  },[currentStats,prevStats])

  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField style={{margin:"10px"}} {...params} onChange={() => {}} />
        )}
      />
    </LocalizationProvider>
    {/* <input type="week" id="week" style={{}} name="week"/> */}
      <CardHeader
        title='Weekly Sales Overview'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            {/* <DotsVertical /> */}
          </IconButton>
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: weekData }]} />
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            ${ Number(currentStats).toFixed(2) }
          </Typography>
          <Typography variant='body2'>Your sales performance is { Math.floor(percentage) }% { gain ? "better" : "lower" } compared to last week</Typography>
        </Box>
        {/* <Button fullWidth variant='contained'>
          Details
        </Button> */}
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
