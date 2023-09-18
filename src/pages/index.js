// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Icons Imports
import AccountCircle from 'mdi-material-ui/AccountCircle'
import GoogleMyBusiness from 'mdi-material-ui/GoogleMyBusiness'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import MarketSlots from 'src/views/dashboard/MarketSlot'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'

import React, { useState, useEffect } from 'react'

import axios from 'axios'
const Dashboard = () => {
  let HOST = process.env.HOST
  const [activeCustomers, setActiveCustomers] = useState('')
  const [activeBusiness, setActiveBusiness] = useState('')
  const [totalCustomers, setTotalCustomers] = useState('')
  const [totalBusiness, setTotalBusiness] = useState('')

  useEffect(() => {
    axios({
      url: `${HOST}/api/admin/getDetailsCount`,
      method: 'get'
    })
      .then(function (response) {
        let data = response.data.data

        data.business.filter(data => {
          if (data.status == 'active') {
            setActiveBusiness(data.count)
          }
        })
        setTotalBusiness(data.TotalBusiness)

        data.customer.filter(data => {
          if (data.status == 'active') {
            setActiveCustomers(data.count)
          }
        })

        setTotalCustomers(data.TotalCustomer)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4} style={{ marginBottom: '10px' }}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={totalCustomers}
                icon={<AccountCircle />}
                color='info'
                // trendNumber='+42%'
                title='Total Customers'
                // subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={activeCustomers}
                title='Active Customers'
                trend='negative'
                color='success'
                // trendNumber='-15%'
                // subtitle='Past Month'
                icon={<AccountCircle />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={totalBusiness}
                trend='negative'
                // trendNumber='-18%'
                title='Total Businesses'
                color='info'
                // subtitle='Yearly Project'
                icon={<GoogleMyBusiness />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={activeBusiness}
                color='success'
                trend='negative'
                // trendNumber='-18%'
                // subtitle='from start'
                title='Active Businesses'
                icon={<GoogleMyBusiness />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        <MarketSlots />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
