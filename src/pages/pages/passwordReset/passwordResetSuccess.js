import React from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
const PasswordResetSuccess = () => {
        if (typeof window !== 'undefined') {
          // Perform localStorage action
        }
  return (
    <div>
        <Box>
        <h1 style={{textAlign:"center"}}>You Have Successfully Reset Your Password</h1>
        <div style={{textAlign:"center"}}>
        <a href="/pages/login" style={{cursor:"pointer"}} ><Button size='small'
              style={{backgroundColor:"#5d53d4", color:"white"}}>Back to Login</Button></a>

        </div>
        </Box>
        <FooterIllustrationsV1 />
    </div>
  )
}
PasswordResetSuccess.getLayout = page => <BlankLayout>{page}</BlankLayout>
export default PasswordResetSuccess