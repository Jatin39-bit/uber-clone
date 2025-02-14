import React, { createContext, useState } from 'react'

export const CaptianDataContext=createContext()

const CaptianContext = ({children}) => {
    const [user, setUser] = useState({
        fullname:{
            firstname:'',
            lastname:''
        },
        email:'',
    })
  return (
    <>
    <CaptianDataContext.Provider value={{user, setUser}}>
        {children}
    </CaptianDataContext.Provider>
    </>
  )
}

export default CaptianContext