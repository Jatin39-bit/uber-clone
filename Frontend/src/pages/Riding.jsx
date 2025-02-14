/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketIoContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
import {socket} from '../context/SocketContext'

const Riding = () => {
  const location=useLocation()
  const rideData=location.state?.ride
  const navigate=useNavigate()

  socket.on('ride-ended',()=>{
    navigate('/home')
  })

  return (
    <div className="h-screen">
        <Link to='/home' className="fixed h-10 w-10 right-2 top-2  bg-white flex items-center justify-center rounded-full">
            <i className=" text-lg font-medium ri-home-5-line"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-16"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{rideData.captian?.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{rideData.captian?.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">BMW competition</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {rideData.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className=" text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">${rideData.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg ">Make Payment</button>
      </div>
    </div>
  );
};

export default Riding;
