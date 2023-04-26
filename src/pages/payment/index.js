import React from 'react'
import { useState } from 'react'

const paymentLink = () => {
  const [customerEmail, setCustomerEmail] = useState('')
  const [paymentLink, setPaymentLink] = useState(null)

  async function createPaymentLink(amount, currency, description, customerEmail) {
    const response = await fetch(`${process.env.HOST}/api/admin/paymentLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, description, customerEmail })
    })

    const data = await response.json()
    return data.url
  }
  async function handleSubmit(event) {
    event.preventDefault()
    const url = await createPaymentLink(1000, 'usd', 'Test payment', customerEmail)
    setPaymentLink(url)
    sendEmail(customerEmail, url) // send email to customer
  }
  async function sendEmail(email, paymentLink) {
    // use a third-party email service like SendGrid or Nodemailer to send the email
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Customer email:
          <input type='email' value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
        </label>
        <br />
        <button type='submit'>Generate payment link and send email</button>
      </form>
      {paymentLink && <a href={paymentLink}>Pay now</a>}
    </div>
  )
}

export default paymentLink
