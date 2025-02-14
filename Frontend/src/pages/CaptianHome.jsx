import React, { useContext, useEffect, useRef, useState } from "react";
import { CaptianDataContext } from "../context/CaptianContext";
import { Link } from "react-router-dom";
import CaptianDetails from "../components/CaptianDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUpPanel from "../components/ConfirmRidePopUpPanel";
import { SocketIoContext } from "../context/SocketContext";
import { socket } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";

const CaptianHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const RidePopUpPanelRef = useRef(null);
  const ConfirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { user, setUser } = useContext(CaptianDataContext);

  const { sendMessage, receiveMessage } = useContext(SocketIoContext);

  useEffect(() => {
    sendMessage("join", { userType: "captian", userId: user._id });

    const updateLocation = () => {
      console.log("Updating location");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captian", {
            userId: user._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [sendMessage, user._id]);

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/confirm`,
      {
        rideId: ride._id,
        captianId: user._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  socket.on("new-ride", (data) => {
    console.log(data);
    setRide(data);
    setRidePopUpPanel(true);
  });

  // {animation for RidePop up panel}
  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(RidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );

  // {animation for confirm ride popup panel}
  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(ConfirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  return (
    <div className="h-screen">
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
      <div className="h-3/5 p-6">
        <LiveTracking/>
      </div>

      {/* {Captian's details} */}
      <div className="h-2/5 p-6">
        <CaptianDetails />
      </div>
      <div
        ref={RidePopUpPanelRef}
        className=" bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-8 "
      >
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div
        ref={ConfirmRidePopUpPanelRef}
        className=" bg-white w-full h-screen fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-8 "
      >
        <ConfirmRidePopUpPanel
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptianHome;
