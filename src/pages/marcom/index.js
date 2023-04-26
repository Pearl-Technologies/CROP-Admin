import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDownBoldCircle from 'mdi-material-ui/ArrowDownBoldCircle'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from './card'
import PromoCodeCard from './promoCodoCard'
import BusinessInsights from './businessInsightsCard'
import BusinessDrivePromo from './businessDrivePromo'
import DriveBusinessPromo from './driveBusinessPromo'
import OfferUploadInStore from './offerUploadInStore'
import SalesTeam from './salesTeam'
import TransferIn from './transferIn'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsSeparator from './FromLayoutsSeparator'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel1a-content' id='panel1a-header'>
          <Typography>Account Notifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card />
          <PromoCodeCard />
          <BusinessInsights />
          <SalesTeam />
          <BusinessDrivePromo />
          <TransferIn />
          <OfferUploadInStore />
          <DriveBusinessPromo />
          <Button
            variant='contained'
            style={{ margin: '5px' }}
            onClick={() => {
              alert('clicked')
            }}
          >
            Update
          </Button>
        </AccordionDetails>
      </Accordion>
      <FormLayoutsSeparator />
    </>
  )
}

export default FormLayouts
