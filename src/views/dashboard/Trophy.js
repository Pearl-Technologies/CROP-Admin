// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useState,useEffect } from 'react'
import axios from 'axios'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')`
  height: 98px;
  position: absolute;
  right: 36px;
  bottom: 20px;

  @media (min-width: 768px) {
    /* Styles for screens with a maximum width of 768px */
    height: 64px;
    right: 24px;
    display:none;
    bottom: 16px;
  }

  @media (max-width: 768px) {
    /* Styles for screens with a maximum width of 768px */
    height: 64px;
    right: 24px;
    bottom: 16px;
    transform: translate(-50%,-50%);
  }

  @media (max-width: 480px) {
    /* Styles for screens with a maximum width of 480px */
    height: 48px;
    right: 16px;
    bottom: 12px;
    display:none;
  }
`;

const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const [userName,setUserName] = useState("");
  let HOST = process.env.HOST
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  useEffect(()=>{
    axios({
      url: `${HOST}/api/admin/getDashboard`,
      method: 'get',
    })
      .then(function (response) {
        // handle success
        // console.log(response);
        setUserName(response?.data?.data[0]?.fName+" "+response?.data?.data[0]?.mName+" "+response?.data?.data[0]?.lName)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  },[])

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Hall of Fame! 🥳</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
        Employee of the Month
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
          {/* 98% SLA */}
          {userName}
        </Typography>
        <Button size='small' variant='contained'>
        View Performance
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
