import LandingPage from "./components/landingPage";
import SignupPage from "./components/Login/signupPage";
import LoginPage from "./components/Login/loginPage";
import Dashboard from "./components/Dashbored/Dashbored";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Secretlist from "./components/SecretList/Secretlist";
import ProfileCard from "./components/Dashbored/ProfileCard";
import Dashcontent from "./components/Dashbored/Dashcontent";
import FavList from "./components/favlist/FavList";
import SecretFile from "./components/SecretFile/Secretfile";
import ForgetPass from "./components/Login/ForgetPass";
import ResetPassword from "./components/Login/RestPassWord";

function App() {
  return (
    <div className="App">
      {/* <LandingPage/> */}
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Forgetpass" element={<ForgetPass />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/DashBoard"
          element={
            <Dashboard>
              <Dashcontent />
            </Dashboard>
          }
        />
        <Route
          path="/Profile"
          element={
            <Dashboard>
              <ProfileCard />
            </Dashboard>
          }
        />
        <Route
          path="/Secretlist"
          element={
            <Dashboard>
              <Secretlist />
            </Dashboard>
          }
        />
        <Route
          path="/FavList"
          element={
            <Dashboard>
              <FavList />
            </Dashboard>
          }
        />
        <Route
          path="/SecretFile"
          element={
            <Dashboard>
              <SecretFile />
            </Dashboard>
          }
        />
        {/* //  <Route path='/Profile' element={}/>
        // <Route path='/Secretlist' element={}/> */}
      </Routes>
    </div>
  );
}

export default App;
