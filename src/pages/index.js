// ** MUI Imports
import Grid from '@mui/material/Grid'
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import AccountCircle from 'mdi-material-ui/AccountCircle'
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
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Dashboard = () => {
  let HOST=process.env.HOST;
  const [customerCount, setCustomerCount] = useState('');
  const [businessCount, setBusinessCount] = useState('');
  const fetchCustomerCount=()=>{
    axios
    .post(`${HOST}/api/customer/getAllCustomer`)
    .then(function (response) {
      // handle success
      // console.log(response);
      setCustomerCount(response.data?.user?.length);
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
  }
  const fetchBusinessCount=()=>{
    axios
    .post(`${HOST}/api/business/getAllBusiness`)
    .then(function (response) {
      // handle success
      // console.log(response);
      setBusinessCount(response.data?.user?.length);
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
  }
  const makeSlot=(data)=>{
    axios({
      url:`${HOST}/api/admin/createEveryDayPromotionSlot`,
      method:"post",
      data:data
    })
    .then(function (response) {
      // handle success
      // console.log(response);
      setBusinessCount(response.data?.user?.length);
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    
  }

  let datas = [{
    "publishedAs":"promo",
    "publishingSlot":"monthly"
  },
   {
    "publishedAs":"promo",
    "publishingSlot":"weekday"
  },
  {
    "publishedAs":"promo",
    "publishingSlot":"weekly"
  },
  {
    "publishedAs":"topRank",
    "publishingSlot":"monthly"
  },
  {
    "publishedAs":"topRank",
    "publishingSlot":"weekday"
  },
  {
    "publishedAs":"topRank",
    "publishingSlot":"weekly"
  }
]
const everyDayRender=()=>{
  datas.map(data=>{makeSlot(data)})
}
  useEffect(()=>{
    // fetchCustomerCount();
    // fetchBusinessCount();
    everyDayRender()
  },[])

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
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title='Total Profit'
                subtitle='Weekly Profit'
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={businessCount}
                trend='negative'
                trendNumber='-18%'
                title='Total business'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats={customerCount}
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='from start'
                title='Total Customer'
                icon={<AccountCircle />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
        <Grid item xs={12}>
          <Table />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
