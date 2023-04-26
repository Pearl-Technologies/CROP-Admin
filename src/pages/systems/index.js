import React from 'react'

const System = () => {
  return (
    <div>
      <ol>
        <li>Loyalty Program Number (Customer): Generate Unique Loyalty Program Number – Numeric Code</li>
        <li>Loyalty Business Identity (Business): Generate Unique Loyalty Business Identity – Alphanumeric Code</li>
        <li>Business Validation Integration: Validate Business through ABN lookup (https://abr.business.gov.au/)</li>
        <li>
          Verification / Password Reset: Validate login, generate verification link for first time login and password
          reset link where needed
        </li>
        <li>
          Email Integration: For communication with Customers and Business including circulation of verification links
        </li>
        <li>OTP / QR Code: Capability to generate OTP and/or QR code based on requirement</li>
        <li>
          SMS Integration: For communication needs with Customers and Business including circulation of OTP and/or QR
          Code
        </li>
        <li>GPSS Integration: For ‘Near Me’ functionality when opted by Customers</li>
        <li>Order Number: To generate Order Number with unique when opted by Customers</li>
        <li>
          {' '}
          E-Voucher: Automated creation of E-Vouchers with Order Number and unique code upon confirmation of order by
          Customers
        </li>
        <li>Request & Complaint Reference Number: Generate unique reference number for requests and complaints</li>
        <li>
          Promo Code: Generate Promo Code for Customers and Business based on requirement. Also to generate Promo Code
          for sales team and circulation through SMS
        </li>
        <li>
          Third Party Integration: Integrate with third party apps including payment gateway and apps for offer design
          by Business
        </li>
      </ol>
    </div>
  )
}

export default System
