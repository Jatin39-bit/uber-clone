import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptianLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const logoutCaptian = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captian/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          localStorage.removeItem("token");
          navigate("/captian-login");
        }
      } catch (err) {
        console.log(`Failed: ${err}`);
      }
    };
    logoutCaptian();
  }, [token]);

  return <div>CaptianLogout</div>;
};

export default CaptianLogout;
