/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketIoContext } from "../context/SocketContext";
import { socket } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelCloseRef = useRef(null);
  const panelRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverPanelRef = useRef(null);
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [rideData, setRideData] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);
  const { sendMessage, receiveMessage } = useContext(SocketIoContext);
  useEffect(() => {
    sendMessage("join", { userType: "user", userId: user.user._id });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setWaitingForDriverPanel(true);
    setLookingForDriverPanel(false);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriverPanel(false);
    navigate("/riding", { state: { ride } });
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      console.log("error in try");
    }
  };

  const hanldeDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch(err){console.log(err)}
  };

  const handleFindTrip = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);

    setVehiclePanel(true);
    setPanelOpen(false);
  };

  async function createRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/ride/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRideData(response.data);
    setConfirmedRidePanel(false);
    socket.emit("new-ride", response.data);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  // {location pannel animation}
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen, panelCloseRef]
  );

  // {vehicle pannel animation}
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  // {confirmed ride pannel animation}
  useGSAP(
    function () {
      if (confirmedRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmedRidePanel]
  );

  // {looking for Driver panel animation}
  useGSAP(
    function () {
      if (lookingForDriverPanel) {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(lookingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [lookingForDriverPanel]
  );

  // {waiting for Driver panel animation}
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      {/* {Map's div} */}
      <div className="h-screen w-screen">
        <LiveTracking />
      </div>
      <div className=" absolute flex flex-col justify-end h-screen top-0 w-full">
        {/* {location and destination div} */}
        <div className="h-[26%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="opacity-0 absolute top-5 right-3 text-2xl"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="line absolute h-16 w-[2px] top-[50%] left-9 bg-gray-900 rounded-full"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              onChange={hanldeDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              onClick={handleFindTrip}
              className="w-full mt-5 mb-3 bg-black text-white font-semibold p-2 rounded-lg "
            >
              Find trip
            </button>
          </form>
        </div>

        {/* {locations suggestions} */}
        <div ref={panelRef} className="h-0 bg-white pt-0 mt-3">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* {vehicle selection pannel} */}
      <div
        ref={vehiclePanelRef}
        className=" bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-8 "
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          vehiclePanel={vehiclePanel}
          confirmedRidePanel={confirmedRidePanel}
          setConfirmedRidePanel={setConfirmedRidePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      {/* {Confirmed Ride pannel} */}
      <div
        ref={confirmedRidePanelRef}
        className="bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-8 "
      >
        <ConfirmedRide
          setConfirmedRidePanel={setConfirmedRidePanel}
          confirmedRidePanel={confirmedRidePanel}
          setLookingForDriverPanel={setLookingForDriverPanel}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare[vehicleType]}
          createRide={createRide}
        />
      </div>

      {/* {looking for driver pannel} */}
      <div
        ref={lookingForDriverPanelRef}
        className="bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-8 "
      >
        <LookingForDriver
          setLookingForDriverPanel={setLookingForDriverPanel}
          rideData={rideData}
          vehicleType={vehicleType}
        />
      </div>

      {/* waiting for driver pannel} */}
      <div
        ref={waitingForDriverPanelRef}
        className="bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-10 pt-8 "
      >
        <WaitingForDriver
          setWaitingForDriverPanel={setWaitingForDriverPanel}
          setLookingForDriverPanel={setLookingForDriverPanel}
          ride={ride}
        />
      </div>
    </div>
  );
};

export default Home;
