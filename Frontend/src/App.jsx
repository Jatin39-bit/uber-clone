import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptianSignup from "./pages/CaptianSignup";
import Captianlogin from "./pages/Captianlogin";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptianHome from "./pages/CaptianHome";
import CaptianLogout from "./pages/CaptianLogout";
import CaptianProtectWrapper from "./pages/CaptianProtectWrapper";
import Riding from "./pages/Riding";
import CaptianRiding from "./pages/CaptianRiding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding/>}/>
        <Route path="/captian-riding" element={<CaptianRiding/>}/>
        <Route path="signup" element={<UserSignup />} />
        <Route path="/captian-signup" element={<CaptianSignup/>} />
        <Route path="/captian-login" element={<Captianlogin />} />
        <Route path="/home" element={<UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>}/>
        <Route path="/captian-home" element={<CaptianProtectWrapper>
          <CaptianHome/>
        </CaptianProtectWrapper>}/>
        <Route path='/user/logout' element={<UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>}/>
        <Route path='/captian/logout' element={<CaptianProtectWrapper>
          <CaptianLogout/>
        </CaptianProtectWrapper>}/>
      </Routes>
    </div>
  );
};

export default App;
