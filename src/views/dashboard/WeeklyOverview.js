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
import { LocalizationProvider, DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import TextField from '@mui/material/TextField'
import { startOfWeek, endOfWeek } from 'date-fns'
import axios from 'axios'
// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  // ** Hook
  const theme = useTheme()
  const [series, setSeries] = useState(
    [
      {
        name: 'WTD',
        type: 'line',
        data: [0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'MTD',
        type: 'line',
        data: [0, 0 , 100, 250, 120, 130, 200]
      }
    ],
  )
  const [currentStats, setCurrentStats] = useState(0)
  const [prevStats, setPrevStats] = useState(0)
  const [gain, setGain] = useState(false)
  const [percentage, setPercentage] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const handleDateChange = date => {
    // setCurrentStats(0);
    // setPrevStats(0)
    setSelectedDate(date)
  }
  const [data, setData] = useState({
    
    options: {
      chart: {
        height: 350,
        type: 'line'
      },
      // stroke: {
      //   width: [0, 4]
      // },
      // title: {
      //   text: 'Traffic Sources'
      // },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [0, 1]
      },
      labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      xaxis: {
        type: 'STRING'
      },
      yaxis: {
        labels: {
          // offsetX: -17,
          formatter: value => `$${value}`
        }
      }
      // yaxis: [{
      //   title: {
      //     text: 'Website Blog',
      //   },

      // }, {
      //   opposite: true,
      //   title: {
      //     text: 'Social Media'
      //   }
      // }]
    }
  })
  let HOST = process.env.HOST

  // const options = {
  //   chart: {
  //     parentHeightOffset: 0,
  //     toolbar: { show: false }
  //   },
  //   // plotOptions: {
  //   //   bar: {
  //   //     borderRadius: 9,
  //   //     distributed: true,
  //   //     columnWidth: '40%',
  //   //     endingShape: 'rounded',
  //   //     startingShape: 'rounded'
  //   //   }
  //   // },
  //   stroke: {
  //     width: 2,
  //     colors: [theme.palette.background.paper]
  //   },
  //   legend: { show: false },
  //   grid: {
  //     strokeDashArray: 7,
  //     padding: {
  //       top: -1,
  //       right: 0,
  //       left: -12,
  //       bottom: 5
  //     }
  //   },
  //   dataLabels: { enabled: false },
  //   colors: [
  //     theme.palette.background.default,
  //     theme.palette.background.default,
  //     theme.palette.background.default,
  //     theme.palette.primary.main,
  //     theme.palette.background.default,
  //     theme.palette.background.default
  //   ],
  //   states: {
  //     hover: {
  //       filter: { type: 'none' }
  //     },
  //     active: {
  //       filter: { type: 'none' }
  //     }
  //   },
  //   xaxis: {
  //     categories: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  //     tickPlacement: 'on',
  //     labels: { show: true },
  //     axisTicks: { show: false },
  //     axisBorder: { show: false }
  //   },
  //   yaxis: {
  //     show: true,
  //     tickAmount: 4,
  //     labels: {
  //       offsetX: -17,
  //       formatter: value => `$${value}`
  //     }
  //   }
  // }

  useEffect(() => {
    // axios
    //   .get(`${HOST}/api/admin/getWeeklyDetails?date=${selectedDate}`, {
    //     headers: {
    //       authorization: `Bearer ${localStorage.getItem('token')}`
    //     }
    //   })
    //   .then(response => {
    //     let datum = response?.data?.data
    //     let tempData = []
    //     if (datum.weeklyDetails.length > 0) {
    //       datum.weeklyDetails[0].weeklySales.forEach(resData => {
    //         tempData.push(resData.price)
    //       })
    //       // setWeekData(tempData)
    //       setWeekData([40, 30, 80, 100, 70, 60, 150])
    //     } else {
    //       setWeekData([40, 30, 80, 100, 70, 60, 150])
    //     }

    //     datum.weeklyPercentage[0]?.weeklyPercentage.forEach(resData => {
    //       if (resData.week == 'Current Week') {
    //         setCurrentStats(resData.totalPrice)
    //       } else if (resData.week == 'Previous Week') {
    //         setPrevStats(resData.totalPrice)
    //       }

    //     })

        
    //   })
    axios.get(`${HOST}/api/admin/getWeeklyDetails?data=${selectedDate}`).then(response=>{

      let datum = response?.data?.data
        let tempData = []
        let currentDayCount = new Date().getDay()
        for(let i=0; i<currentDayCount; i++){
          tempData[i]=0;
        }
        if (datum?.length > 0) {
          datum.forEach(resData => {
            let getDay = new Date(resData._id).getDay(); 
            tempData[getDay]=(resData.totalSaleAmount)   
             
          })
          
         setSeries([{...series[0], data:tempData}, {...series[1]}])
        }
    })
  }, [selectedDate])
  console.log(series)
  useEffect(() => {
    if (prevStats == 0) {
      setGain(true)
      setPercentage(100)
    } else if ((currentStats / prevStats) * 100 >= 100) {
      setGain(true)
      setPercentage((currentStats / prevStats) * 100 - 100)
    } else {
      setGain(false)
      setPercentage(100 - (currentStats / prevStats) * 100)
    }
  }, [currentStats, prevStats])
  
  return (
    <Card>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
        maxDate={new Date()}
          label='Select Date'
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={params => <TextField style={{ margin: '10px' }} {...params} onChange={() => {}} />}
        />
      </LocalizationProvider>
      <CardHeader
        title={'Weekly Sales Overview'}
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
        {/* <ReactApexcharts type='bar' height={205} options={options} series={[{ data: weekData }]} /> */}
        <ReactApexcharts type='line' height={200} options={data.options} series={series} />
        {/* <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ mr: 4 }}>
            ${ Number(currentStats).toFixed(2) }
          </Typography>
          <Typography variant='body2'>Your sales performance is { Math.floor(percentage) }% { gain ? "better" : "lower" } compared to last week</Typography>
        </Box>
        <Button fullWidth variant='contained'>
          Details
        </Button> */}
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
