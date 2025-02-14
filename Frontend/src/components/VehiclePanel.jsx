import React from "react";

const VehiclePanel = (props) => {
  return (
    <>
      <div
        onClick={() => props.setVehiclePanel(false)}
        className="right-3 top-8 absolute text-xl"
      >
        <i className="ri-close-line"></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">choose a Vehicle</h3>
      {/* {vehicle-car} */}
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.setVehicleType('car')
        }}
        className="flex w-full border-2 active:border-black rounded-xl bg-[#eee] items-center justify-between p-3 mb-2"
      >
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">{props.fare.duration} mins away</h5>
          <p className="font-normal text-xs">Affordable, Comapact rides</p>
        </div>
        <h2 className="text-xl font-semibold">${props.fare.car}</h2>
      </div>
      {/* {vehicle-motorcycle} */}
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.setVehicleType('motorcycle')
        }}
        className="flex w-full border-2 active:border-black rounded-xl bg-[#eee] items-center justify-between p-3 mb-2"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">2</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">{props.fare.duration} mins away</h5>
          <p className="font-normal text-xs">Affordable, Motorcycle rides</p>
        </div>
        <h2 className="text-xl font-semibold">${props.fare.motorcycle}</h2>
      </div>
      {/* {vehicle-auto} */}
      <div
        onClick={() => {
          props.setConfirmedRidePanel(true);
          props.setVehicleType('auto')
        }}
        className="flex w-full border-2 active:border-black rounded-xl bg-[#eee] items-center justify-between p-3 mb-2"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">{props.fare.duration} mins away</h5>
          <p className="font-normal text-xs">Affordable, Auto rides</p>
        </div>
        <h2 className="text-xl font-semibold">${props.fare.auto}</h2>
      </div>
    </>
  );
};

export default VehiclePanel;
