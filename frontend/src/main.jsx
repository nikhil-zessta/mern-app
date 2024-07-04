import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WorkOutContextProvider } from "./context/WorkoutContext.jsx";
import { AuthContextProvider } from "./context/UserContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkOutContextProvider>
        <App />
      </WorkOutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
