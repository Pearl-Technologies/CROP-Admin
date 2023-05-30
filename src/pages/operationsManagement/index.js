import React from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const OperationsManagement = () => {
  const router = useRouter()
  return (
    <Grid container spacing={2}>
      <Grid item sm={3} style={{ paddingBottom: '36px' }}>
        <Card
          onClick={() => router.push('/operationsManagement/services')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-tool'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#2c3e50'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Services
          </p>
        </Card>

        <Card
          onClick={() => router.push('/operationsManagement/propManagement')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brand-edge'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M20.978 11.372a9 9 0 1 0 -1.593 5.773' />
            <path d='M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79' />
            <path d='M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688' />
            <path d='M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            PROP Management
          </p>
        </Card>
        <Card
          onClick={() => router.push('/operationsManagement/loyalty')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brand-edge'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M20.978 11.372a9 9 0 1 0 -1.593 5.773' />
            <path d='M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79' />
            <path d='M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688' />
            <path d='M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Loyalty
          </p>
        </Card>
      </Grid>
      <Grid item sm={3}>
        <Card
          onClick={() => router.push('/operationsManagement/request')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brand-open-source'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 3a9 9 0 0 1 3.618 17.243l-2.193 -5.602a3 3 0 1 0 -2.849 0l-2.193 5.603a9 9 0 0 1 3.617 -17.244z' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Request
          </p>
        </Card>
        <Card
          onClick={() => router.push('/operationsManagement/tierManagement')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brightness-2'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <circle cx='12' cy='12' r='3' />
            <path d='M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Tier Management
          </p>
        </Card>
        <Card
          onClick={() => router.push('/operationsManagement/InterestsManagement')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brand-edge'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M20.978 11.372a9 9 0 1 0 -1.593 5.773' />
            <path d='M20.978 11.372c.21 2.993 -5.034 2.413 -6.913 1.486c1.392 -1.6 .402 -4.038 -2.274 -3.851c-1.745 .122 -2.927 1.157 -2.784 3.202c.28 3.99 4.444 6.205 10.36 4.79' />
            <path d='M3.022 12.628c-.283 -4.043 8.717 -7.228 11.248 -2.688' />
            <path d='M12.628 20.978c-2.993 .21 -5.162 -4.725 -3.567 -9.748' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
          Interests Management
          </p>
        </Card>
      </Grid>
      <Grid item sm={3}>
        <Card
          onClick={() => router.push('/operationsManagement/complaint')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-disc'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <circle cx='12' cy='12' r='9' />
            <circle cx='12' cy='12' r='1' />
            <path d='M7 12a5 5 0 0 1 5 -5' />
            <path d='M12 17a5 5 0 0 0 5 -5' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Complaint
          </p>
        </Card>

        <Card
          onClick={() => router.push('/operationsManagement/payPropToCustomer')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brand-slack'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#2c3e50'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6' />
            <path d='M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6' />
            <path d='M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6' />
            <path d='M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Payment Process
          </p>
        </Card>
      </Grid>
      <Grid item sm={3}>
        <Card
          onClick={() => router.push('/operationsManagement/sector')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-brand-slack'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='#2c3e50'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 12v-6a2 2 0 0 1 4 0v6m0 -2a2 2 0 1 1 2 2h-6' />
            <path d='M12 12h6a2 2 0 0 1 0 4h-6m2 0a2 2 0 1 1 -2 2v-6' />
            <path d='M12 12v6a2 2 0 0 1 -4 0v-6m0 2a2 2 0 1 1 -2 -2h6' />
            <path d='M12 12h-6a2 2 0 0 1 0 -4h6m-2 0a2 2 0 1 1 2 -2v6' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Sector
          </p>
        </Card>

        <Card
          onClick={() => router.push('/operationsManagement/offerAndPromoManagement')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            style={{ marginTop: '20px' }}
            class='icon icon-tabler icon-tabler-chart-donut-2'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 3v5m4 4h5' />
            <circle cx='12' cy='12' r='4' />
            <circle cx='12' cy='12' r='9' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Offer and Promo Management
          </p>
        </Card>
      </Grid>
    </Grid>
  )
}

export default OperationsManagement
