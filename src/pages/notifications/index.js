import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ArrowDownBoldCircle from 'mdi-material-ui/ArrowDownBoldCircle'
import axios from 'axios'
import NotificationTable from './notificationTable'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Notifications = () => {
  const [notificationData, setNotificationData] = useState([])
  const [customerAccountNotification, setCustomerAccountNotification] = useState([])
  const [customerGeneralNotification, setCustomerGeneralNotification] = useState([])
  const [customerPurchaseAndRedeemtionNotification, setCustomerPurchaseAndRedeemtionNotification] = useState([])
  const [customerRequestAndComplaintNotification, setCustomerRequestAndComplaintNotification] = useState([])
  const [businessAccountNotification, setBusinessAccountNotification] = useState([])
  const [businessGeneralNotification, setBusinessGeneralNotification] = useState([])
  const [businessPurchaseAndRedeemptionNotification, setBusinessPurchaseAndRedeemptionNotification] = useState([])
  const [BusinessRequestAndComplaintNotification, setBusinessRequestAndComplaintNotification] = useState([])
  const [message, setMessage] = useState('')
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const handelChange = prop => event => {
    setCustomerAccountNotification({ ...customerAccountNotification, [prop]: event.target.value })
  }
  const handelChangeGeneralNotification = prop => event => {
    setCustomerGeneralNotification({ ...customerGeneralNotification, [prop]: event.target.value })
  }
  const handelChangePurchaseAndRedeemtionNotification = prop => event => {
    setCustomerPurchaseAndRedeemtionNotification({
      ...customerPurchaseAndRedeemtionNotification,
      [prop]: event.target.value
    })
  }
  const handelChangeRequestAndComplaintNotification = prop => event => {
    setCustomerRequestAndComplaintNotification({
      ...customerRequestAndComplaintNotification,
      [prop]: event.target.value
    })
  }

  const handelChangeBusinessAccountNotification = prop => event => {
    setBusinessAccountNotification({ ...businessAccountNotification, [prop]: event.target.value })
  }
  const handelChangeBusinessGeneralNotification = prop => event => {
    setBusinessGeneralNotification({ ...businessGeneralNotification, [prop]: event.target.value })
  }
  const handelChangeBusinessPurchaseAndRedeemptionNotification = prop => event => {
    setBusinessPurchaseAndRedeemptionNotification({
      ...businessPurchaseAndRedeemptionNotification,
      [prop]: event.target.value
    })
  }
  const handelChangeBusinessRequestAndComplaintNotification = prop => event => {
    setBusinessRequestAndComplaintNotification({
      ...BusinessRequestAndComplaintNotification,
      [prop]: event.target.value
    })
  }

  const updateCustomerAccountNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateCustomerAccountNotification`,
      method: 'post',
      data: customerAccountNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }
  const updateCustomerGeneralNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateCustomerGenearlNotification`,
      method: 'post',
      data: customerGeneralNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }
  const updateCustomerPurchaseAndRedeemtionNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateCustomerPurchaseAndRedeemNotification`,
      method: 'post',
      data: customerPurchaseAndRedeemtionNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }
  const updateCustomerRequestAndComplaintNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateCustomerRequestAndComplaintNotification`,
      method: 'post',
      data: customerRequestAndComplaintNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }

  const updateBusinessAccountNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateBusinessAccountNotification`,
      method: 'post',
      data: businessAccountNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }
  const updateBusinessGeneralNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateBusinessGenearlNotification`,
      method: 'post',
      data: businessGeneralNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }
  const updateBusinessPurchaseAndRedeemptionNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateBusinessPurchaseAndRedeemNotification`,
      method: 'post',
      data: businessPurchaseAndRedeemptionNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }
  const updateBusinessRequestAndComplaintNotification = () => {
    axios({
      url: `${process.env.HOST}/api/admin/updateBusinessRequestAndComplaintNotification`,
      method: 'post',
      data: BusinessRequestAndComplaintNotification
    }).then(function (response) {
      setMessage(response.data.msg)
      toast.success(response.data.msg, {
        position: toast.POSITION.TOP_CENTER,
        progressClassName: "Toastify__progress-bar--animated",
      })
    })
  }

  const fetchNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getAllNotifications`).then(function (response) {
      setNotificationData(response.data.notifications)
    })
  }
  const fetchCustomerAccountNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getCustomerAccountNotification`).then(function (response) {
      setCustomerAccountNotification(response.data.notification[0])
    })
  }
  const fetchCustomerGeneralNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getCustomerGeneralNotification`).then(function (response) {
      setCustomerGeneralNotification(response.data.notification[0])
    })
  }
  const fetchCustomerPurchaseAndRedeemtionNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getCustomerPurchaseAndRedeemNotification`).then(function (response) {
      setCustomerPurchaseAndRedeemtionNotification(response.data.notification[0])
    })
  }
  const fetchCustomerRequestAndComplaintNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getCustomerRequestAndComplaintNotification`).then(function (response) {
      setCustomerRequestAndComplaintNotification(response.data.notification[0])
    })
  }
  const fetchBusinessAccountNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getBusinessAccountNotification`).then(function (response) {
      console.log(response)
      setBusinessAccountNotification(response.data.notification[0])
    })
  }
  const fetchBusinessGeneralNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getBusinessGeneralNotification`).then(function (response) {
      setBusinessGeneralNotification(response.data.notification[0])
    })
  }
  const fetchBusinessPurchaseAndRedeemtionNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getBusinessPurchaseAndRedeemNotification`).then(function (response) {
      setBusinessPurchaseAndRedeemptionNotification(response.data.notification[0])
    })
  }
  const fetchBusinessRequestAndComplaintNotification = () => {
    axios.post(`${process.env.HOST}/api/admin/getBusinessRequestAndComplaintNotification`).then(function (response) {
      setBusinessRequestAndComplaintNotification(response.data.notification[0])
    })
  }

  useEffect(() => {
    fetchNotification()
    fetchCustomerAccountNotification()
    fetchCustomerGeneralNotification()
    fetchCustomerPurchaseAndRedeemtionNotification()
    fetchCustomerRequestAndComplaintNotification()
    fetchBusinessAccountNotification()
    fetchBusinessGeneralNotification()
    fetchBusinessPurchaseAndRedeemtionNotification()
    fetchBusinessRequestAndComplaintNotification()
  }, [])
  console.log(businessAccountNotification)
  return (
    <div>
      <ToastContainer/>
      <div>
        <h3 style={{ marginLeft: '10px' }}>Customer notification</h3>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>Account Notifications</Typography>
          </AccordionSummary>
          {customerAccountNotification && (
            <AccordionDetails>
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='First Time Subscription'
                variant='outlined'
                focused
                value={customerAccountNotification?.first_time_notification}
                onChange={handelChange('first_time_notification')}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Subscription Renewal'
                variant='outlined'
                focused
                onChange={handelChange('subscription_renewal')}
                value={customerAccountNotification.subscription_renewal}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Points Credit Against spends'
                variant='outlined'
                focused
                onChange={handelChange('points_credit_against_spends')}
                value={customerAccountNotification.points_credit_against_spends}
              />
              <TextField
                focused
                style={{ margin: '5px', width: '100%' }}
                label='Points Credit Social Media Posts'
                variant='outlined'
                onChange={handelChange('points_credit_solical_media_posts')}
                value={customerAccountNotification.points_credit_solical_media_posts}
              />
              <TextField
                focused
                style={{ margin: '5px', width: '100%' }}
                label='Points Expiry'
                variant='outlined'
                onChange={handelChange('points_expiry')}
                value={customerAccountNotification.points_expiry}
              />
              <TextField
                focused
                style={{ margin: '5px', width: '100%' }}
                label='Points Redeemed'
                variant='outlined'
                onChange={handelChange('points_redeemed')}
                value={customerAccountNotification.points_redeemed}
              />
              <TextField
                focused
                style={{ margin: '5px', width: '100%' }}
                label='Redemption Limit'
                variant='outlined'
                onChange={handelChange('redeemtion_limit')}
                value={customerAccountNotification.redeemtion_limit}
              />
              <TextField
                focused
                style={{ margin: '5px', width: '100%' }}
                label='Pin Change'
                variant='outlined'
                onChange={handelChange('pin_change')}
                value={customerAccountNotification.pin_change}
              />
              <TextField
                focused
                style={{ margin: '5px', width: '100%' }}
                label='Transfer In '
                variant='outlined'
                onChange={handelChange('transfer_in')}
                value={customerAccountNotification.transfer_in}
              />
              <Button
                variant='contained'
                tyle={{ margin: '5px' }}
                onClick={() => {
                  updateCustomerAccountNotification()
                }}
              >
                Update
              </Button>
            </AccordionDetails>
          )}
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel2a-content' id='panel2a-header'>
            <Typography>General Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              focused
              style={{ margin: '5px', width: '100%' }}
              label='Business Promos'
              variant='outlined'
              onChange={handelChangeGeneralNotification('business_promos')}
              value={customerGeneralNotification.business_promos}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='CROP Promos'
              variant='outlined'
              onChange={handelChangeGeneralNotification('CROP_promos')}
              focused
              value={customerGeneralNotification.CROP_promos}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Offers'
              variant='outlined'
              onChange={handelChangeGeneralNotification('offers')}
              focused
              value={customerGeneralNotification.offers}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Bonus Points'
              variant='outlined'
              onChange={handelChangeGeneralNotification('bonus_points')}
              focused
              value={customerGeneralNotification.bonus_points}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Get a Mate'
              variant='outlined'
              onChange={handelChangeGeneralNotification('get_a_mate')}
              focused
              value={customerGeneralNotification.get_a_mate}
            />
            <Button
              variant='contained'
              style={{ margin: '5px' }}
              onClick={() => {
                updateCustomerGeneralNotification()
              }}
            >
              Update
            </Button>
          </AccordionDetails>
        </Accordion>{' '}
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel3a-content' id='panel3a-header'>
            <Typography>Purchase and Redemption Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Offers Purchased'
              variant='outlined'
              focused
              onChange={handelChangePurchaseAndRedeemtionNotification('offers_purchased')}
              value={customerPurchaseAndRedeemtionNotification.offers_purchased}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Offers Redeemed (Both Points as well as PROPs Redemption)'
              variant='outlined'
              focused
              onChange={handelChangePurchaseAndRedeemtionNotification('offers_redeemed')}
              value={customerPurchaseAndRedeemtionNotification.offers_redeemed}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Points Purchased'
              variant='outlined'
              focused
              onChange={handelChangePurchaseAndRedeemtionNotification('points_purchased')}
              value={customerPurchaseAndRedeemtionNotification.points_purchased}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Payment Notifications'
              variant='outlined'
              focused
              onChange={handelChangePurchaseAndRedeemtionNotification('payment_notifications')}
              value={customerPurchaseAndRedeemtionNotification.payment_notifications}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='E-Vouchers'
              variant='outlined'
              focused
              onChange={handelChangePurchaseAndRedeemtionNotification('e_vouchers')}
              value={customerPurchaseAndRedeemtionNotification.e_vouchers}
            />
            <Button
              variant='contained'
              style={{ margin: '5px' }}
              onClick={() => {
                updateCustomerPurchaseAndRedeemtionNotification()
              }}
            >
              Update
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel4a-content' id='panel4a-header'>
            <Typography>Request and Complaint Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Missing Points Claim (With reference number)'
              variant='outlined'
              focused
              onChange={handelChangeRequestAndComplaintNotification('missing_points_claim')}
              value={customerRequestAndComplaintNotification.missing_points_claim}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Complaint (With complaint reference number)'
              variant='outlined'
              focused
              onChange={handelChangeRequestAndComplaintNotification('complaint')}
              value={customerRequestAndComplaintNotification.complaint}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Request (With Request Number)'
              variant='outlined'
              focused
              onChange={handelChangeRequestAndComplaintNotification('request')}
              value={customerRequestAndComplaintNotification.request}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Rate Your Experience'
              variant='outlined'
              focused
              onChange={handelChangeRequestAndComplaintNotification('rate_your_experience')}
              value={customerRequestAndComplaintNotification.rate_your_experience}
            />
            <Button
              variant='contained'
              style={{ margin: '5px' }}
              onClick={() => {
                updateCustomerRequestAndComplaintNotification()
              }}
            >
              Update
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
      <h3 style={{ marginLeft: '10px' }}>Business notification</h3>
      <div>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>Account Notifications</Typography>
          </AccordionSummary>
          {businessAccountNotification && (
            <AccordionDetails>
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='First Time Subscription'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('first_time_subscription')}
                value={businessAccountNotification.first_time_subscription}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Subscription Renewal'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('subscription_renewal')}
                value={businessAccountNotification.subscription_renewal}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Points Transaction (End of day update on points given vs redeemed)'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('points_transaction')}
                value={businessAccountNotification.points_transaction}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Sales (End of day update on total purchase from the APP)'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('sales')}
                value={businessAccountNotification.sales}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Point Offered Against Spends)'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('point_offered_against_spends')}
                value={businessAccountNotification.point_offered_against_spends}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Point Offered Surveys Completed)'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('point_offered_surveys_completed')}
                value={businessAccountNotification.point_offered_surveys_completed}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Point Offered Social Media Posts)'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('point_Offered_social_media')}
                value={businessAccountNotification.point_Offered_social_media}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Base Threshold Limit'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('base_threshold_limit')}
                value={businessAccountNotification.base_threshold_limit}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Pin Change'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('pin_change')}
                value={businessAccountNotification.pin_change}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Program Change Offer Points'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('program_change_Offer_points')}
                value={businessAccountNotification.program_change_Offer_points}
              />
              {/* <TextField style={{ margin: '5px', width:"100%"}} label='Program Change Offer Points' variant='outlined' focused onChange={handelChangeBusinessAccountNotification('program_change_redemption')} value={businessAccountNotification.}/> */}
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Program Change Redemption Rules'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('program_change_redemption')}
                value={businessAccountNotification.program_change_redemption}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Program Change Bonus Points'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('program_change_bonus_points')}
                value={businessAccountNotification.program_change_bonus_points}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Program Change Slash Redemption Changes'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('program_change_slash_redeemption_changes')}
                value={businessAccountNotification.program_change_slash_redeemption_changes}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Transfer Out'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('transfer_out')}
                value={businessAccountNotification.transfer_out}
              />
              <TextField
                style={{ margin: '5px', width: '100%' }}
                label='Statement Generation'
                variant='outlined'
                focused
                onChange={handelChangeBusinessAccountNotification('statement_generation')}
                value={businessAccountNotification.statement_generation}
              />
              <Button
                variant='contained'
                style={{ margin: '5px' }}
                onClick={() => {
                  updateBusinessAccountNotification()
                }}
              >
                Update
              </Button>
            </AccordionDetails>
          )}
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel2a-content' id='panel2a-header'>
            <Typography>General Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Confirmation of Booked Promos'
              variant='outlined'
              focused
              onChange={handelChangeBusinessGeneralNotification('confirmation_of_booked_promos')}
              value={businessGeneralNotification.confirmation_of_booked_promos}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='CROP Promos (With Promo Code where applicable)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessGeneralNotification('CROP_promos')}
              value={businessGeneralNotification.CROP_promos}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Upload And Removal Of Offers'
              variant='outlined'
              focused
              onChange={handelChangeBusinessGeneralNotification('upload_and_removal_of_offer')}
              value={businessGeneralNotification.upload_and_removal_of_offer}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Business Insights'
              variant='outlined'
              focused
              onChange={handelChangeBusinessGeneralNotification('business_insights')}
              value={businessGeneralNotification.business_insights}
            />
            <Button
              variant='contained'
              style={{ margin: '5px' }}
              onClick={() => {
                updateBusinessGeneralNotification()
              }}
            >
              Update
            </Button>
          </AccordionDetails>
        </Accordion>{' '}
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel3a-content' id='panel3a-header'>
            <Typography>Invoice and Payment Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Payment Notification (Against Purchase of offers)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessPurchaseAndRedeemptionNotification('payment_notification')}
              value={businessPurchaseAndRedeemptionNotification.payment_notification}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Order Notification For Purchase (With Order Number and Unique Code)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessPurchaseAndRedeemptionNotification('order_notification_for_purchase')}
              value={businessPurchaseAndRedeemptionNotification.order_notification_for_purchase}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Redemption Notification (Both Points as well as PROPs Redemption)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessPurchaseAndRedeemptionNotification('redeemption_notification')}
              value={businessPurchaseAndRedeemptionNotification.redeemption_notification}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Order Notification For Redemption (With Order Number and Unique Code) '
              variant='outlined'
              focused
              onChange={handelChangeBusinessPurchaseAndRedeemptionNotification('order_notification_for_redeemption')}
              value={businessPurchaseAndRedeemptionNotification.order_notification_for_redeemption}
            />
            <Button
              variant='contained'
              style={{ margin: '5px' }}
              onClick={() => {
                updateBusinessPurchaseAndRedeemptionNotification()
              }}
            >
              Update
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ArrowDownBoldCircle />} aria-controls='panel4a-content' id='panel4a-header'>
            <Typography>Request and Complaint Notifications</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Missing Points Claim (With reference number)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessRequestAndComplaintNotification('missing_points_claim')}
              value={BusinessRequestAndComplaintNotification.missing_points_claim}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Complaint (With complaint reference number)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessRequestAndComplaintNotification('complaint')}
              value={BusinessRequestAndComplaintNotification.complaint}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Request (With Request Number)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessRequestAndComplaintNotification('request')}
              value={BusinessRequestAndComplaintNotification.request}
            />
            <TextField
              style={{ margin: '5px', width: '100%' }}
              label='Auto generated service requests (With Request Number)'
              variant='outlined'
              focused
              onChange={handelChangeBusinessRequestAndComplaintNotification('auto_generated_service_requests')}
              value={BusinessRequestAndComplaintNotification.auto_generated_service_requests}
            />
            <Button
              variant='contained'
              style={{ margin: '5px' }}
              onClick={() => {
                updateCustomerRequestAndComplaintNotification()
              }}
            >
              Update
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
      {/* <h5>Notification</h5>
      <NotificationTable /> */}
      <div>
        {/* {notificationData && notificationData.map((data)=>(
          <div key={data._id+"nitification"}>
            <p>{data.createAt}</p>
            <p>{data.type}</p>
            <p>{data.description}</p>            
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default Notifications
