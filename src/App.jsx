import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import RegistrationPage from "./components/pages/user/Registration.jsx";
import Login from "./components/pages/user/Login.jsx";
import Schedule from "./components/Schedule/Schedule.jsx";
import AllMeeting from "./components/Schedule/AllMeeting.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Schedule/Home.jsx";
import UpdateMeeting from "./components/Schedule/UpdateMeeting.jsx";
function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<Schedule token={token} />} />
        <Route
          path="/updateMeeting/:id"
          element={<UpdateMeeting token={token} />}
        />
        <Route path="/allMeet" element={<AllMeeting token={token} />} />
      </Routes>
    </>
  );
}

export default App;
