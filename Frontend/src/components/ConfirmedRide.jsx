import React from "react";

const ConfirmedRide = (props) => {
  const vehicleImages={car:"https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",motorcycle:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png",auto:"https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"}
  return (
    <>
      <div>
        <div
          onClick={() => {
            props.setConfirmedRidePanel(false);
          }}
          className="right-3 top-8 absolute text-2xl "
        >
          <i className="ri-close-line"></i>
        </div>
        <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
        <div className="flex gap-2 justify-between flex-col items-center">
          <img
            className="h-20"
            src={vehicleImages[props.vehicleType]}
            alt=""
          />
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {props.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {props.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3">
              <i className=" text-lg ri-currency-line"></i>
              <div>
                <h3 className="text-lg font-medium">${props.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash, Cash</p>
              </div>
            </div>
            <div></div>
          </div>
          <button
          onClick={()=>{
            props.setLookingForDriverPanel(true)
            props.createRide()
          }}
           className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg ">
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmedRide;
