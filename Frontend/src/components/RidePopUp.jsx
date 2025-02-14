import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <div
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className="right-3 top-8 absolute text-2xl "
        >
          <i className="ri-close-line"></i>
        </div>
        <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
        <div className='flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-lg'>
            <div className='flex items-center gap-3'>
            <img className="h-10 w-11 pl-1 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR423cdshdYl7trbZYZ7ioSLW5rsxRpQgu3kQ&s" alt="" />
            <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
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
            <div></div>
          </div>
          <div className='flex items-center justify-between w-full '>
          <button
              onClick={()=>{
                props.setRidePopUpPanel(false)
              }}
               className="w-full mt-2 bg-gray-400  text-gray-700 font-semibold p-3 px-8 rounded-lg text-lg ">
                Ignore
              </button>
              <button
              onClick={()=>{
                props.setRidePopUpPanel(false)
                props.setConfirmRidePopUpPanel(true)
                console.log(props.confirmRide)
                props.confirmRide()
              }}
               className="w-full bg-green-600 text-white font-semibold p-3 px-8 rounded-lg text-lg ">
                Accept
              </button>
          </div>
        </div>
    </div>
  )
}

export default RidePopUp