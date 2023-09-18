// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import LinearProgress from '@mui/material/LinearProgress'

// ** Icons Imports
import MenuUp from 'mdi-material-ui/MenuUp'
import MenuDown from 'mdi-material-ui/MenuDown'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { useEffect, useState } from 'react'
import axios from 'axios'

// const data = [
//   {
//     progress: 75,
//     imgHeight: 20,
//     title: 'Business A',
//     color: 'primary',
//     amount: '$24,895.65',
//     subtitle: 'Vuejs, React & HTML',
//     imgSrc: '/images/cards/logo-zipcar.png'
//   },
//   {
//     progress: 50,
//     color: 'info',
//     imgHeight: 27,
//     title: 'Business B',
//     amount: '$8,650.20',
//     subtitle: 'Sketch, Figma & XD',
//     imgSrc: '/images/cards/logo-bitbank.png'
//   },
//   {
//     progress: 20,
//     imgHeight: 20,
//     title: 'Business C',
//     color: 'secondary',
//     amount: '$1,245.80',
//     subtitle: 'HTML & Angular & XD',
//     imgSrc: '/images/cards/logo-aviato.png'
//   }
// ]

const TotalEarning = () => {

  const [data,setData]=useState([]);
  const [prevStats,setPrevStats]=useState(0);
  const [currentStats,setCurrentStats]=useState(0);
  const [gain,setGain] = useState(false);
  const [percentage,setPercentage] = useState(0);

  let HOST = process.env.HOST

  useEffect(()=>{
   axios.get(`${HOST}/api/admin/getSalesDetails`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
   })
    .then((res)=>{
      let data = res.data.data;
      
      setData(data.finalData)
      data.stats.filter((datum)=>{
        
        if(datum._id=="Current Month"){
          setCurrentStats(datum.totalPrice)
        }
        else{
          setPrevStats(datum.totalPrice)
        }
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    if(((currentStats/prevStats)*100)>=100){
      setGain(true)
      setPercentage(((currentStats/prevStats)*100)-100)
    }
    else{
      setGain(false)
      setPercentage(100-((currentStats/prevStats)*100))
    }
  },[currentStats,prevStats])

  return (
    <Card>
      <CardHeader
        title='Total Sales'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            {/* <DotsVertical /> */}
          </IconButton>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important`, height:"310px"}}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
           ${currentStats.toFixed(2)}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            {
              gain==true ?
              <>
                <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} /> 
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
                { Math.floor(percentage) }%
                </Typography>
              </>
             :
             <>
             <MenuDown sx={{ fontSize: '1.875rem', verticalAlign: 'middle', color:"#ff1c1c" }} />
             <Typography variant='body2' sx={{ fontWeight: 600, color: "#ff1c1c" }}>
              { Math.floor(percentage) }%
            </Typography>
             </>
            }
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 5}}>
          Compared to ${prevStats} last month
        </Typography>

        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 3.5 } : {})
              }}
            >
              {/* <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => `rgba(${theme.palette.customColors?.main}, 0.04)`
                }}
              >
                <img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
              </Avatar> */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.name}
                  </Typography>
                  <Typography variant='caption'>{item.productNames.slice(0,2).toString()}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    ${item.totalPrice.toFixed(2)}
                  </Typography>
                  
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default TotalEarning
