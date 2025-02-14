import React, { createContext, useEffect, useState } from 'react'
import {io} from 'socket.io-client'

export const SocketIoContext=createContext()
const socket=io(`${import.meta.env.VITE_BASE_URL}`)
export {socket}

const SocketContext = ({children}) => {
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('connected to server')
        })

        socket.on('disconnect',()=>{
            console.log('disconnected from server')
        })

    },[])

    const sendMessage=(eventName, message)=>{
        socket.emit(eventName,message)
    }

    const receiveMessage=(eventName,callback)=>{
        socket.on(eventName,callback)
    }

  return (
    <SocketIoContext.Provider value={{sendMessage, receiveMessage}}>
        {children}
    </SocketIoContext.Provider>
  )
}

export default SocketContext