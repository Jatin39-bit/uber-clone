
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className=" bg-cover bg-center bg-[url(https://img.freepik.com/premium-photo/blurry-image-traffic-light-city-street_853677-185323.jpg)] h-screen pt-8 flex justify-between flex-col w-full">
        <img
          className="w-20 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold ">Get Started with Uber</h2>
          <Link
            to="/login"
            className="text-lg font-normal inline-block text-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
