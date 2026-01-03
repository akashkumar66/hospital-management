import React, { useState } from "react";
import "./../styles/register.css";
import axios from "axios";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Register = () => {
  const Navigate = useNavigate();
  const [validmobile, setValidmobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);

  const [formvalue, setFormvalue] = useState({
    email: "",
    mobileno: "",
    password: "",
    usertype: "",
  });

  console.log(formvalue);

  const handelChange = (e) => {
    const { name, value } = e.target;

    setFormvalue({
      ...formvalue,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formvalue.mobileno.length < 10  ) {
        Swal.fire({
          icon: "error",
          title: "Please enter a valid mobile number",
          text: "Something went wrong!",
        });

        return
      }
      let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(!regex.test(formvalue.email)){
         Swal.fire({
          icon: "error",
          title: "Please enter a valid email",
          text: "Something went wrong!",
        });

        return

      }

      setLoading(true);
      const registerresponse = await axios.post(
        "/Hospital/user/register",
        formvalue,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (registerresponse.data.status === "success") {
        setLoading(false);
        Swal.fire({
          title: registerresponse.data.message,
          icon: "success",
          draggable: true,
        });
        setFormvalue({
          email: "",
          mobileno: "",
          password: "",
          usertype: "",
        });
        Navigate("/login");
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: registerresponse.data.message,
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("error on register", error);
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
            <span>Register Now</span>
          </div>
          <form action="#" onSubmit={handelSubmit}>
            <div className="row">
              <i class="fa-solid fa-envelope"></i>
              <input
                name="email"
                onChange={handelChange}
                value={formvalue.email}
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="row">
              <i className="fas fa-lock" />
              <input
                name="password"
                onChange={handelChange}
                value={formvalue.password}
                type={showpassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                onClick={() => setShowpassword((prev) => !prev)}
                className="visiblity"
              >
                {showpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </span>
            </div>

            <div className="row">
              <i class="fa-solid fa-phone"></i>
              <input
                name="mobileno"
                onChange={handelChange}
                value={formvalue.mobileno}
                type="text"
                maxLength={10}
                placeholder="Enter mobile no"
                required
              />
            </div>

            <div className="row">
              <i class="fa-solid fa-user"></i>
              <input
                name="usertype"
                onChange={handelChange}
                value={formvalue.usertype}
                type="text"
                placeholder="Enter user type"
                required
              />
            </div>
            <div className="pass">
              <Link to="#">Forget password</Link>
            </div>
            <div className="row button">
              <input type="submit" defaultValue="Register" />
            </div>
            <div className="signup-link">
              Not a member? <Link to={"/login"}>Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
