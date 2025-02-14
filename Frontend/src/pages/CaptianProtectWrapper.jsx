import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { CaptianDataContext } from '../context/CaptianContext'

const CaptianProtectWrapper = ({children}) => {
const token=localStorage.getItem('token')
const navigate=useNavigate()
const {user, setUser}=useContext(CaptianDataContext)
const [isLoading, setIsLoading]=useState(true)

useEffect(()=>{
    if(!token){
        return navigate('/captian-login')
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captian/profile`,{headers:{
        Authorization:`Bearer ${token}`
    }}).then((response)=>{
        if(response.status === 200){
            const data=response.data
            console.log(data)
            setUser(data.captian)
            setIsLoading(false)
        }
    }).catch((err)=>{
        console.log(err)
        localStorage.removeItem('token')
        navigate('/captian-login')
    })
},[token])


if(isLoading){
    return(
        <div>....Loading</div>
    )
}

  return (
    <>
        {children}
    </>
  )
}

export default CaptianProtectWrapper