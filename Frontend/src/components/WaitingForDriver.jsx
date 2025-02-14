import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      <div
        onClick={() => {
          props.setWaitingForDriverPanel(false);
        }}
        className="right-3 top-8 absolute text-2xl "
      >
        <i className="ri-close-line"></i>
      </div>
      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="text-right">
            <h2 className="text-lg font-medium">{props.ride?.captian.fullname.firstname + " " + props.captian?.captian.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captian.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">BMW competition</p>
            <h1 className="text-lg rounded-lg text-black">OTP: {props.ride?.otp}</h1>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
