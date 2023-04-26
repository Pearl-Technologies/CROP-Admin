import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const bull = (
  <Box component='span' sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, margin:"5px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
        Notification to customers with Promo Code for MGM
        </Typography>
        <Typography component='div'>
        Hello [name],
        </Typography>
        <Typography>
        Don’t waste this limited opportunity to grab your favorite [product] for [X] off. Simply use this [discount code] at checkout.

        </Typography>
        <Typography>Follow this link to use your coupon now [link].</Typography>
      </CardContent>
      




      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}
