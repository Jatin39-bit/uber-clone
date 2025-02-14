import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate=useNavigate()
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
      { rideId: props.rideData._id },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if(response.status === 200){
      navigate('/captian-home')
    }
  }
  return (
    <div className="p-6">
      <div
        onClick={() => {
          props.setFinishRidingPanel(false);
        }}
        className="right-3 top-6 absolute text-2xl "
      >
        <i className="ri-close-line"></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-11 pl-1 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR423cdshdYl7trbZYZ7ioSLW5rsxRpQgu3kQ&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.rideData?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className=" text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className=" flex justify-center items-center w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg text-lg"
          >
            Finish Ride
          </button>
          <p className="text-xs text-red-500 mt-10">
            Click on finish ride button if you have completed the payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
