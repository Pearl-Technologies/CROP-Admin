// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import AccountCircle from 'mdi-material-ui/AccountCircle'
import GoogleMyBusiness from 'mdi-material-ui/GoogleMyBusiness'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

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
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
const Dashboard = () => {
  const router = useRouter()
  let HOST = process.env.HOST
  const [customerCount, setCustomerCount] = useState('')
  const [businessCount, setBusinessCount] = useState('')
  const [activeCustomers,setActiveCustomers] = useState("");
  const [activeBusiness,setActiveBusiness] = useState("");
  const [totalCustomers,setTotalCustomers] = useState("");
  const [totalBusiness,setTotalBusiness] = useState("");
  const fetchCustomerCount = () => {
    axios
      .post(`${HOST}/api/customer/getAllCustomer`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setCustomerCount(response.data?.user?.length)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const fetchBusinessCount = () => {
    axios
      .post(`${HOST}/api/business/getAllBusiness`)
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessCount(response.data?.user?.length)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }
  const makeSlot = data => {
    axios({
      url: `${HOST}/api/admin/createEveryDayPromotionSlot`,
      method: 'post',
      data: data
    })
      .then(function (response) {
        // handle success
        // console.log(response);
        setBusinessCount(response.data?.user?.length)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  }

  //   let datas = [{
  //     "publishedAs":"promo",
  //     "publishingSlot":"monthly"
  //   },
  //    {
  //     "publishedAs":"promo",
  //     "publishingSlot":"weekday"
  //   },
  //   {
  //     "publishedAs":"promo",
  //     "publishingSlot":"weekly"
  //   },
  //   {
  //     "publishedAs":"topRank",
  //     "publishingSlot":"monthly"
  //   },
  //   {
  //     "publishedAs":"topRank",
  //     "publishingSlot":"weekday"
  //   },
  //   {
  //     "publishedAs":"topRank",
  //     "publishingSlot":"weekly"
  //   }
  // ]
  // const everyDayRender=()=>{
  //   datas.map(data=>{makeSlot(data)})
  // }

  useEffect(() => {
    // fetchCustomerCount();
    // fetchBusinessCount();
    // everyDayRender()
    if (!localStorage.getItem('token')) {
      router.push('/pages/login')
    }

    axios({
      url: `${HOST}/api/admin/getDetailsCount`,
      method: 'get',
    })
    .then(function (response) {
        console.log(response)
        let data = response.data.data;

        data.business.filter((data)=>{
          if(data.status=="active"){
            setActiveBusiness(data.count)
          }
        })
        setTotalBusiness(data.TotalBusiness)

        data.customer.filter((data)=>{
          if(data.status=="active"){
            setActiveCustomers(data.count)
          }
        })

        setTotalCustomers(data.TotalCustomer)

    })
    .catch(function (error) {
        // handle error
        console.log(error)
    })

    // router.push('/databaseManagement')
  }, [])

  return (
    <ApexChartWrapper>
      {/* <Grid container spacing={6}>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid> */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4} style={{marginBottom:"10px"}}>
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
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}
      </Grid>
      <Grid item xs={12} md={8}>
        <MarketSlots />
      </Grid>
      <Grid item xs={12}>
        <Table />
      </Grid>
      {/* Comming Soon */}
    </ApexChartWrapper>
  )
}

export default Dashboard
