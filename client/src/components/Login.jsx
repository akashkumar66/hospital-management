import React, { useState } from "react";
import "./../styles/register.css";
import axios from "axios";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const [showpassword,setShowpassword]=useState(false)
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    usertype: "",
  });

  console.log(formValue);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const loginresponse = await axios.post(
        "/Hospital/user/login",
        formValue,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (loginresponse.data.status === "success") {
        setLoading(false);
        localStorage.setItem("userID",loginresponse.data.userID)
        localStorage.setItem("token",loginresponse.data.token)


        if(loginresponse.data.usertype.toLowerCase()==="Doctor".toLowerCase()){
           if(loginresponse.data.isprofilecreated){
             Navigate("/doctor-dashboard")
           }
           else{
            Navigate("/doctorlogin")
           }
        }else if(loginresponse.data.usertype.toLowerCase()==="Patient".toLowerCase()){
          if(loginresponse.data.isprofilecreated){
            Navigate(`/patient-profile-view/${localStorage.getItem("userID")}`)
          }else{
            Navigate("/patient-profile-login");
          }
        }

        Swal.fire({
          title: loginresponse.data.message,
          icon: "success",
          draggable: true,
        });
        setFormValue({
          email: "",
          password: "",
          usertype: "",
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: loginresponse.data.message,
          text: "Something went wrong!",
        });
        Navigate("/register");
      }
    } catch (error) {
      setLoading(false);
      console.log("error on login", error);
    }
  };

  return (
    <React.Fragment>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="main-wrapper">
          <div className="wrapper">
        <div className="title">
          <span>Login Form</span>
        </div>
        <form action="#" onSubmit={handleSubmit}>
          <div className="row">
            <i class="fa-solid fa-envelope"></i>
            <input
              name="email"
              onChange={handleChange}
              value={formValue.email}
              type="text"
              placeholder="Email"
              required=""
            />
          </div>
          <div className="row">
            <i className="fas fa-lock" />
            <input
              name="password"
              onChange={handleChange}
              value={formValue.password}
              type={showpassword?"text":"password"}
              placeholder="Password"
              required=""
            />
            <span
              onClick={() => setShowpassword((prev) => !prev)}
              className="visiblity"
            >
              {showpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>
          <div className="row">
            <i class="fa-solid fa-user"></i>
            <input
              name="usertype"
              onChange={handleChange}
              value={formValue.usertype}
              type="text"
              placeholder="Usertype"
              required=""
            />
          </div>
          <div className="pass">
            <a href="#">Forgot password?</a>
          </div>
          <div className="row button">
            <input type="submit" defaultValue="Login" />
          </div>
          <div className="signup-link">
            Not a member? <Link to={"/register"}>Signup now</Link>
          </div>
        </form>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
