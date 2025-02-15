import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {CaptianDataContext} from '../context/CaptianContext'
import axios from 'axios';


const Captianlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captianData, setCaptianData] = useState({})

  const {user, setUser}=useContext(CaptianDataContext)
  const navigate=useNavigate()
  async function handleSubmit(e){
    e.preventDefault()
    const captianData={
      email:email,
      password:password
    }
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/captian/login`,captianData)
    if(response.status === 200){
      const data=response.data
      localStorage.setItem('token',data.token)
      setUser(data.captian)
      navigate('/captian-home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className="px-7 py-4 h-screen flex-col flex justify-between">
      <div>
        <img
          className="w-16 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
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
            Captian Login
          </button>

          <p className="text-center mb-2">
            Join fleet?
            <Link to="/captian-signup" className="text-blue-600 ml-1">
              Register as Captian
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg "
        >
          Login in as User
        </Link>
      </div>
    </div>
)
}

export default Captianlogin