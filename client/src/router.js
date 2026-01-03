import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App.js";
import Register from "./components/Register";
import Login from "./components/Login";
import Doctorlogin from "./components/Doctorlogin.jsx";
import Doctorpannel from "./components/Doctormodel/Doctorpannel.jsx";
import Protectedroute from "./components/Protectedroute.jsx";
import DoctorProfileViewUpdate from "./components/Doctormodel/Doctorprofileview.jsx";
import Patientprofcreate from "./components/Patientprofcreate.jsx";
import Patientprofviewupdate from "./components/Patientmodel/Patientprofviewupdate.jsx";
import Patientdoctorlist from "./components/Patientmodel/Patientdoctorlist.jsx";
import Patientpannel from "./components/Patientmodel/Patientpannel.jsx";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Protectedroute />}>
          <Route path="/doctor-dashboard" element={<Doctorpannel />} />
          <Route
            path="/doctor-profile-view/:id"
            element={<DoctorProfileViewUpdate />}
          />
          <Route
            path="/patient-profile-view/:id"
            element={<Patientprofviewupdate />}
          />
          <Route path="/patient-dashboard" element={<Patientpannel />} />
          <Route path="/patientdoctorlist" element={<Patientdoctorlist />} />

          <Route path="/doctorlogin" element={<Doctorlogin />} />
          <Route
            path="/patient-profile-login"
            element={<Patientprofcreate />}
          />
        </Route>
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

export default routes;
