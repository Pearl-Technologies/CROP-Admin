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
          Notification to customers for a new business addition
        </Typography>
        <Typography component='div'>
          Dear [name]
        </Typography>
        <Typography>
          We are excited to announce that, due to our remarkable growth over the last [enter number] of years, we are
          expanding!
        </Typography>
        <Typography>In fact, we are opening a new store in [enter location and specifics].</Typography>
        <Typography>
          We invite you to celebrate with us during the big opening day on [enter date]. There will be many exciting
          surprises, including irresistible discounts.
        </Typography>
        <Typography>
          [Add specific CTA depending on your specific offer] If you want to make use of your opening day discount,
          please click on the button below so we can send you the discount code.
        </Typography>
        <Typography>See you there.</Typography>
        <Typography>Team [name of your brand]</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  )
}
