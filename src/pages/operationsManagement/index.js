import React from 'react'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const OperationsManagement = () => {
  const router = useRouter()  
  return (
    <Grid container spacing={2}>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/propManagement")} style={{marginRight:"2px"}}>Prop Management</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/services")} style={{marginRight:"2px"}}>Services</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/request")} style={{marginRight:"2px"}}>Request</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/complaint")} style={{marginRight:"2px"}}>Complaint</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/tierManagement")} style={{marginRight:"2px"}}>Tier Management</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/offerAndPromoManagement")} style={{ marginTop:"2px"}}>Offer and Promo Management</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/payPropToCustomer")} style={{ marginTop:"2px"}}> Pay to Customer</Button>
      <Button variant="contained" onClick={()=>router.push("/operationsManagement/payToBusiness")} style={{ marginTop:"2px"}}>Pay to Business </Button>
    </Grid>
  )
}

export default OperationsManagement
