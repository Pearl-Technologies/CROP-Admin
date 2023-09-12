import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

export const AdminContext = createContext()

export default function AdminProvider({ children }) {
  const [searchId, setSearchId] = useState()
  const [selectedOption, setSelectedOption] = useState('Customer Data')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [cdStatus, setCDStatus] = useState(false)
  const [bdStatus, setBDStatus] = useState(false)
  
  const fetchCustomerDetails = () => {
    setCDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllCustomer`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        setCustomerData(response.data.customers)
        setCDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setCDStatus(false)
      })
  }
  const fetchBusinessDetails = () => {
    setBDStatus(true)
    axios
      .post(`${process.env.HOST}/api/admin/getAllBusiness`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        // handle success
        setBusinessData(response.data.businesses)
        setBDStatus(false)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
        setBDStatus(false)
      })
  }

  const changeSearchId = data => {
    setSearchId(data)
  }
  const getCustomerByCropId = () => {
    if (selectedOption == 'Customer Data') {
        setCDStatus(true)
      axios
        .get(`${process.env.HOST}/api/admin/getCustomerById/${searchId}`, 
        {headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }}
        )
        .then(function (response) {
          // handle success
          setCustomerData(response.data.customers)
          setCDStatus(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          setCDStatus(false)
        })
        if(!searchId){
            fetchCustomerDetails()
        }
    } else {
        setBDStatus(true)
      axios
        .get(`${process.env.HOST}/api/admin/getBusinessById/${searchId}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(function (response) {
          // handle success
          setBusinessData(response.data.businesses)
          setBDStatus(false)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
          setBDStatus(false)
        })
        if(!searchId){
            fetchBusinessDetails()
        }
    }

  }
useEffect(()=>{
  if(selectedOption == "Customer Data"){
    fetchCustomerDetails()
  }else{
    fetchBusinessDetails()
  }
},[selectedOption])

useEffect(()=>{
    getCustomerByCropId()
},[searchId])
  return (
    <AdminContext.Provider value={{ 
        searchId, 
        changeSearchId, 
        selectedOption, 
        setSelectedOption,
        customerData, 
        businessData, 
        cdStatus, 
        bdStatus     
        }}>
      {children}
    </AdminContext.Provider>
  )
}
