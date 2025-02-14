import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUpPanel = (props) => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/start-ride`,
      {
        params: { rideId: props.ride._id, otp: otp },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false);
      props.setRidePopUpPanel(false);
      navigate("/captian-riding",{state:{ride:props.ride}});
    }
  };

  return (
    <div>
      <div
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
        className="right-3 top-8 absolute text-2xl "
      >
        <i className="ri-close-line"></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-11 pl-1 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR423cdshdYl7trbZYZ7ioSLW5rsxRpQgu3kQ&s"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname}
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className=" text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className=" text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="bg-[#eee] px-6 py-4 text-lg font-mono rounded-lg w-full mt-3"
              type="number"
              placeholder="Enter OTP"
            />
            <button className=" flex justify-center items-center w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg ">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRideUpPanel(false);
              }}
              className="w-full mt-2 bg-red-600  text-white font-semibold p-3 rounded-lg "
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUpPanel;
