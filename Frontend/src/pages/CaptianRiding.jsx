import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptianRiding = () => {
  const FinishRidingPanelRef = useRef(null);
  const [finishRidingPanel, setFinishRidingPanel] = useState(false);
  const location=useLocation()
  const rideData=location.state?.ride

  // {animation for Finish riding}
  useGSAP(
    function () {
      if (finishRidingPanel) {
        gsap.to(FinishRidingPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(FinishRidingPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidingPanel]
  );

  return (
    <div className="h-screen">
      <div onClick={() => {}} className="right-3 top-8 absolute text-2xl ">
        <i className="ri-close-line"></i>
      </div>
      <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <Link
          to="/captian-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className=" text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5 p-6 ">
        <LiveTracking/>
      </div>

      {/* {Captian's details} */}
      <div className="h-1/5 flex items-center justify-between bg-yellow-300 relative">
        <div className="flex items-center justify-between p-6 w-full"><h5
          className="p-1 text-center w-[90%] absolute top-0"
          onClick={() => {setFinishRidingPanel(true)}}
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl">4 KM away</h4>
        <button className="bg-green-600 mt-3 text-white font-semibold p-3 px-10 rounded-lg"
        onClick={()=>{
            setFinishRidingPanel(true)
        }}
        >
          Complete Ride
        </button>
        </div>
        <div
          ref={FinishRidingPanelRef}
          className="fixed bg-white w-full z-10 bottom-0 translate-y-full "
        >
          <FinishRide
          rideData={rideData}
            setFinishRidingPanel={setFinishRidingPanel}
          /></div>
      </div>
    </div>
  );
};

export default CaptianRiding;
