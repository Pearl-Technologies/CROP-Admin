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
            className='icon icon-tabler icon-tabler-tool'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#2c3e50'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
            className='icon icon-tabler icon-tabler-propeller'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{ marginTop: '20px' }}
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
            <path d='M14.167 10.5c.722 -1.538 1.156 -3.043 1.303 -4.514c.22 -1.63 -.762 -2.986 -3.47 -2.986s-3.69 1.357 -3.47 2.986c.147 1.471 .581 2.976 1.303 4.514' />
            <path d='M13.169 16.751c.97 1.395 2.057 2.523 3.257 3.386c1.3 1 2.967 .833 4.321 -1.512c1.354 -2.345 .67 -3.874 -.85 -4.498c-1.348 -.608 -2.868 -.985 -4.562 -1.128' />
            <path d='M8.664 13c-1.693 .143 -3.213 .52 -4.56 1.128c-1.522 .623 -2.206 2.153 -.852 4.498s3.02 2.517 4.321 1.512c1.2 -.863 2.287 -1.991 3.258 -3.386' />
          </svg>

          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            PROPs Management
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
          <svg xmlns="http://www.w3.org/2000/svg" 
          className="icon icon-tabler icon-tabler-tags" 
          style={{ marginTop: '20px' }}
          width="44"
          height="44" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="#2c3e50" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M7.859 6h-2.834a2.025 2.025 0 0 0 -2.025 2.025v2.834c0 .537 .213 1.052 .593 1.432l6.116 6.116a2.025 2.025 0 0 0 2.864 0l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-6.117 -6.116a2.025 2.025 0 0 0 -1.431 -.593z" />
          <path d="M17.573 18.407l2.834 -2.834a2.025 2.025 0 0 0 0 -2.864l-7.117 -7.116" />
          <path d="M6 9h-.01" />
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
            className='icon icon-tabler icon-tabler-brand-open-source'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
            className='icon icon-tabler icon-tabler-brightness-2'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
            className='icon icon-tabler icon-tabler-brand-edge'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
            className='icon icon-tabler icon-tabler-disc'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
          onClick={() => router.push('/operationsManagement/paymentProcess')}
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
            className='icon icon-tabler icon-tabler-brand-cashapp'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#2c3e50'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057z' />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Payment Process
          </p>
        </Card>
        <Card
          onClick={() => router.push('/operationsManagement/holidays')}
          style={{
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            marginTop: '10px',
            backgroundColor: '#58D1FC',
            height: '120px'
          }}
        >
 
          <svg xmlns="http://www.w3.org/2000/svg" 
          style={{ marginTop: '20px' }}
          className="icon icon-tabler icon-tabler-calendar-event" 
          width="44" 
          height="44" 
          viewBox="0 0 24 24" 
          strokeWidth="1.5" 
          stroke="#2c3e50" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M16 3l0 4" />
          <path d="M8 3l0 4" />
          <path d="M4 11l16 0" />
          <path d="M8 15h2v2h-2z" />
          </svg>
          <p style={{ color: '#0053df', height: '50px', cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}>
            Holidays
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
            className='icon icon-tabler icon-tabler-brand-slack'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#2c3e50'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
            className='icon icon-tabler icon-tabler-chart-donut-2'
            width='44'
            height='44'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
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
