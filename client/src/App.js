import { Outlet } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctordata, setPatientdata } from "./Userreducers/reducers.js";

function App() {
  // Gets the Redux dispatch function so we can update the Redux store
  const Dispatch = useDispatch();
  const doctorprofile = useSelector((state) => state?.doctordata);
  const patientprofile = useSelector((state) => state?.patientdata);

  const getDoctorprofile = async () => {
    try {
      const getdoctorprofileresponse = await axios.get(
        `/Hospital/doctor/doctorprofile/${localStorage.getItem("userID")}`,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (getdoctorprofileresponse.data.status === "success") {
        Dispatch(setDoctordata(getdoctorprofileresponse.data.existdoctor));
      }
    } catch (error) {
      console.log("error in get doctorprofile", error);
    }
  };

  const getPatientprofile = async () => {
    try {
      const getPatientprofileresponse = await axios.get(
        `/Hospital/patient/patientprofile/${localStorage.getItem("userID")}`,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if(getPatientprofileresponse.data.status=="success"){
        Dispatch(setPatientdata(getPatientprofileresponse.data.existpatient));
      }
    } catch (error) {
      console.log("error in get patientprofile", error);
    }
  };

  useEffect(() => {
    if (!doctorprofile) {
      getDoctorprofile();
    }

    if (!patientprofile) {
      getPatientprofile();
    }
  }, []);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
