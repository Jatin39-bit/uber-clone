import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({})

  const navigate=useNavigate()

  const {user, setUser}=React.useContext(UserDataContext)

  async function handleSubmit(e){
    e.preventDefault()
    const loginUser={
      email:email,
      password:password
    }

    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginUser)
    if(response.status === 200){
      const data=response.data
      console.log(data)
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex-col flex justify-between">
      <div>
        <img
          className="w-16 mb-7"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e)=>{handleSubmit(e)}}>
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            required
            placeholder="example@email.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            minLength={6}
            required
            placeholder="Password"
          />
          <button 
          className="bg-[#111] text-white font-semibold mb-7 rounded 
          px-4 py-2 border w-full text-lg "
          >
            Login
          </button>

          <p className="text-center mb-2">
            New here?
            <Link to="/signup" className="text-blue-600 ml-1">
              Create new Accout
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/captian-login"
          className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg "
        >
          Login in as Captian
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
