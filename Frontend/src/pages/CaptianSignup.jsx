import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptianDataContext } from "../context/CaptianContext";

const CaptianSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [color, setColor] = useState("black");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");


  const { user, setUser } = useContext(CaptianDataContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newCaptian = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captian/register`,
      newCaptian
    );
    if (response.status === 200) {
      const data = response.data;
      setUser(data);
      localStorage.setItem("token", data.token);
      navigate("/captian-home");
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setCapacity('')
    setColor('')
    setPlate('')
    setVehicleType('')
  }

  return (
    <div className="px-7 py-4 h-screen flex-col flex justify-between">
      <div>
        <img
          className="w-16 mb-1"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-medium font-medium mb-1">
            What's your Name Captian
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              value={firstName}
              min={3}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
              type="text"
              value={lastName}
              min={3}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-medium font-medium mb-1">
            What's your Email Captian?
          </h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
          />
          <h3 className="text-medium font-medium mb-1">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            min={8}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <h3 className="text-lg font-medium mb-1">Vehicle Details</h3>
          <div className="flex gap-2">
            <div>
              <h3 className="text-medium font-medium mb-1">Color</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded  border w-8 h-12 text-lg placeholder:text-base"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="text-medium font-medium mb-1">Plate</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base capitalize"
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                required
                placeholder="Plate"
              />
            </div>
            <div className="w-1/4">
              <h3 className="text-medium font-medium mb-1">Capacity</h3>
              <input
                className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                type="number"
                value={capacity}
                min={1}
                max={4}
                onChange={(e) => setCapacity(e.target.value)}
                required
                placeholder="Capacity"
              />
            </div>
            <div>
              <h3 className="text-medium font-medium mb-1 text-nowrap  tracking-tighter">vehicle Type</h3>
              <select value={vehicleType}  
              onChange={(e) => setVehicleType(e.target.value)}
               className="w-full py-3 bg-[#eeeeee] text-medium text-black rounded">
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>
          <button
            className="bg-[#111] text-white font-semibold mb-7 rounded 
          px-4 py-2 border w-full text-lg "
          type="submit"
          >
            Captian Signup
          </button>

          <p className="text-center mb-2">
            Already have an account?
            <Link to="/captian-login" className="text-blue-600 ml-1">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        {/* <Link
          to="/captian-signup"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg "
        >
          Signup as Captian
        </Link> */}
      </div>
    </div>
  );
};

export default CaptianSignup;
