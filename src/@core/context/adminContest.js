import axios from 'axios'
import React, { createContext, useState, useEffect } from 'react'

export const AdminContext = createContext()

export default function AdminProvider({ children }) {
  const [searchId, setSearchId] = useState('')
  const [selectedOption, setSelectedOption] = useState('Customer Data')
  const [customerData, setCustomerData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [cdStatus, setCDStatus] = useState(false)
  const [bdStatus, setBDStatus] = useState(false)
  const [AMTvalue, setAMTValue] = useState('one')
  const [page, setPage] = useState(1)
  const [bPage, setBPage] = useState(1)
  const [customerCount, setCustomerCount] = useState(10)
  const [businessCount, setBusinessCount] = useState(10)
  const [forceRerender, setForceRerender] = useState(false)
  const [all, setAll] = useState(false);
    const [sms, setSms] = useState(false);
    const [email, setEmail] = useState(false);
    const [app, setApp] = useState(false);
    const [local, setLocal] = useState(false);
    const [regional, setRegional] = useState(false);
    const [national, setNational] = useState(false);

    const handelChange =()=>{
        setAll(x=>!x)
    }
  const fetchCustomerDetails = () => {
    setCDStatus(true)
    axios
      .post(
        `${process.env.HOST}/api/admin/getAllCustomer`,
        { page },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(function (response) {
        // handle success
        setCustomerData(response.data.customers)
        setCustomerCount(response.data.customerCount)
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
      .post(
        `${process.env.HOST}/api/admin/getAllBusiness`,
        { page: bPage },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(function (response) {
        // handle success
        setBusinessData(response.data.businesses)
        setBusinessCount(response.data.businessesCount)
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
      if (!searchId) {
        fetchCustomerDetails()
      } else {
        axios
        .get(`${process.env.HOST}/api/admin/getCustomerById/${searchId}`, {
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
      if (!searchId) {
        fetchBusinessDetails()
      }
    }
  }
  useEffect(() => {
    if (selectedOption == 'Customer Data') {
      fetchCustomerDetails()
    } else {
      fetchBusinessDetails()
    }
  }, [selectedOption, page, bPage, forceRerender])

  useEffect(() => {
    getCustomerByCropId()
  }, [searchId])
      
    useEffect(()=>{
            setSms(all)
            setEmail(all)
            setApp(all)
            setLocal(all)
            setRegional(all)
            setNational(all)
    },[all])
  return (
    <AdminContext.Provider
      value={{
        searchId,
        changeSearchId,
        selectedOption,
        setSelectedOption,
        customerData,
        businessData,
        cdStatus,
        bdStatus,
        AMTvalue,
        setAMTValue,
        page,
        setPage,
        customerCount,
        setBPage,
        businessCount,
        bPage,
        forceRerender,
        setForceRerender,
        all,
        app,
        setApp,
        sms,
        setSms,
        email,
        setEmail,
        handelChange,
        local,
        regional,
        national,
        setLocal,
        setNational,
        setRegional
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}
