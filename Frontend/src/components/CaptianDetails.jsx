import React, { useContext } from 'react'
import { CaptianDataContext } from '../context/CaptianContext'


const CaptianDetails = () => {
  const {user}=useContext(CaptianDataContext)
  return (
    <div>        <div className="flex items-center justify-between">
    <div className="flex items-center justify-start gap-3">
      <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR423cdshdYl7trbZYZ7ioSLW5rsxRpQgu3kQ&s" alt="" />
      <h4 className="text-lg font-medium capitalize">{user.fullname.firstname + " " + user.fullname.lastname}</h4>
    </div>
    <div>
      <h4 className="text-xl font-semibold">$368.8</h4>
      <p className="text-sm text-gray-600">Earned</p>
    </div>
  </div>
  <div className="flex p-4 bg-gray-100 rounded-xl items-center justify-evenly mt-4 gap-4">
    <div className="text-center">
      <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-600">Hours Online</p>
    </div>
    <div className="text-center">
      <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-600">Hours Online</p>
    </div>
    <div className="text-center">
      <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
      <h5 className="text-lg font-medium">10.2</h5>
      <p className="text-sm text-gray-600">Hours Online</p>
    </div>
  </div></div>
  )
}

export default CaptianDetails