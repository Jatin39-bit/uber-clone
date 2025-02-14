import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptianContext from "./context/CaptianContext.jsx";
import SocketContext from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptianContext>
      <UserContext>
        <SocketContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        </SocketContext>
      </UserContext>
    </CaptianContext>
  </StrictMode>
);
