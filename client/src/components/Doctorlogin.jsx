import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/doctorlogin.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";
import FormData from "form-data";

const Doctorlogin = () => {
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileimage, setProfileimage] = useState(null);
  const [profileimageurl, setprofileImageurl] = useState(null);
  const [licenseimage, setLicenseimage] = useState(null);
  const [licenseimageUrl, setlicenseImageUrl] = useState(null);
  const [formvalue, setFormValue] = useState({
    doctorname: "",
    age: "",
    gender: "",
    department: "",
    experience: "",
    licensenumber: "",
    degree: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    alternatemobileno: "",
  });
  console.log(formvalue);

  const handelchange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formvalue,
      [name]: value,
    });
  };

  const handelfilechangeprofileimage = (e) => {
    const image = e.target.files[0];
    setProfileimage(image);
    setprofileImageurl(URL.createObjectURL(image));
  };

  const handelfilechangelicenseimage = (e) => {
    const image = e.target.files[0];
    setLicenseimage(image);
    setlicenseImageUrl(URL.createObjectURL(image));
  };

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formvalue.alternatemobileno.length < 10  ) {
              Swal.fire({
                icon: "error",
                title: "Please enter a valid mobile number",
                text: "Something went wrong!",
              });
      
              return
            }

      setLoading(true);
      const formdata = new FormData();
      formdata.append("doctorname", `Dr. ${formvalue.doctorname}`);
      formdata.append("experience", `${formvalue.experience}+ Years`);
      formdata.append("age", formvalue.age);
      formdata.append("gender", formvalue.gender);
      formdata.append("address", formvalue.address);
      formdata.append("city", formvalue.city);
      formdata.append("state", formvalue.state);
      formdata.append("pincode", formvalue.pincode);
      formdata.append("degree", formvalue.degree);
      formdata.append("department", formvalue.department);
      formdata.append("alternatemobileno", formvalue.alternatemobileno);
      formdata.append("profileimage", profileimage);
      formdata.append("licenseimage", licenseimage);
      formdata.append("licensenumber", formvalue.licensenumber);
      formdata.append("userID", localStorage.getItem("userID"));


      const createresponse = await axios.post(
        "/Hospital/doctor/adddoctor",
        formdata
      );

      if (createresponse.data.status === "success") {
        setLoading(false);
        Swal.fire({
          title: createresponse.data.message,
          icon: "success",
          draggable: true,
        });
        if (formvalue.alternatemobileno.length < 10) {
          Swal.fire({
            icon: "error",
            title: "Please enter a valid mobile number",
            text: "Something went wrong!",
          });

          return;
        }
        Navigate("/doctor-dashboard");
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: createresponse.data.message,
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("create profile error is", error);
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
      <div className="doctor-wrapper">
        <section className="doctorcontainer">
          {/* <header>Create Doctor Profile</header> */}
          <form action="#" className="doctorform" onSubmit={handelSubmit}>
            <div class="profilecontainer">
              <h1>
                Create Doctor profile
                <small>Upload profile image</small>
              </h1>
              <div class="profileavatar-upload">
                <div class="profileavatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={handelfilechangeprofileimage}
                    name="profileimage"
                  />
                  <label for="imageUpload"></label>
                </div>
                <div class="profileavatar-preview">
                  <div
                    id="imagePreview"
                    style={
                      profileimageurl === null
                        ? {
                            backgroundImage:
                              "url(http://i.pravatar.cc/500?img=7)",
                          }
                        : { backgroundImage: `url(${profileimageurl})` }
                    }
                  ></div>
                </div>
              </div>
            </div>
            <div className="doctorcolumn">
              <div className="doctorinput-box">
                <label>Doctor Name</label>
                <input
                  type="text"
                  value={formvalue.doctorname}
                  onChange={handelchange}
                  name="doctorname"
                  placeholder="Enter full name"
                  required=""
                />
              </div>
              <div className="doctorinput-box">
                <label>License Number</label>
                <input
                  type="text"
                  name="licensenumber"
                  value={formvalue.licensenumber}
                  onChange={handelchange}
                  placeholder="Enter license number"
                  required=""
                />
              </div>
            </div>
            <div className="doctorinput-box">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={formvalue.degree}
                onChange={handelchange}
                placeholder="Enter your degree"
                required=""
              />
            </div>
            <div className="doctorcolumn">
              <div className="doctorinput-box">
                <label>Alternate mobile number</label>
                <input
                  type="text"
                  value={formvalue.alternatemobileno}
                  onChange={handelchange}
                  name="alternatemobileno"
                  maxLength={10}
                  placeholder="Enter phone number"
                  required=""
                />
              </div>
              <div className="doctorinput-box">
                <label>Age</label>
                <input
                  type="text"
                  name="age"
                  value={formvalue.age}
                  onChange={handelchange}
                  placeholder="Enter your age"
                  required=""
                />
              </div>
            </div>
            <div className="doctorgender-box">
              <h3>Gender</h3>
              <div className="doctorgender-option">
                <div className="doctorgender">
                  <input
                    type="radio"
                    id="check-male"
                    name="gender"
                    defaultChecked=""
                    value="Male"
                    onChange={handelchange}
                  />
                  <label htmlFor="check-male">Male</label>
                </div>
                <div className="doctorgender">
                  <input
                    type="radio"
                    id="check-female"
                    onChange={handelchange}
                    name="gender"
                    value="Female"
                  />
                  <label htmlFor="check-female">Female</label>
                </div>
                {/* <div className="doctorgender">
                  <input type="radio" id="check-other" name="gender" />
                  <label htmlFor="check-other">prefer not to say</label>
                </div> */}
              </div>
            </div>
            <div className="doctorinput-box address">
              <label>Address</label>

              <input
                type="text"
                placeholder="Enter street address"
                required=""
                onChange={handelchange}
                value={formvalue.address}
                name="address"
              />
              <div className="doctorcolumn">
                <div className="doctorselect-box">
                  <select onChange={handelchange} name="state">
                    <option value="">Select your state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Goa">Goa</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli">
                      Dadra and Nagar Haveli
                    </option>
                    <option value="Daman and Diu">Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  value={formvalue.city}
                  onChange={handelchange}
                  required=""
                />
              </div>
              <div className="doctorcolumn">
                <input
                  type="text"
                  placeholder="Enter your specilization"
                  required=""
                  name="department"
                  onChange={handelchange}
                  value={formvalue.department}
                />
                <input
                  type="text"
                  onChange={handelchange}
                  value={formvalue.pincode}
                  name="pincode"
                  placeholder="Enter pincode code"
                  required=""
                />
              </div>

              <div className="doctorcolumn">
                <div className="doctorinput-box">
                  <label>License Image</label>
                  <input
                    type="file"
                    onChange={handelfilechangelicenseimage}
                    name="licenseimage"
                    placeholder="Enter phone number"
                    required=""
                  />
                </div>
                <div className="doctorinput-box">
                  <label>Experience</label>
                  <input
                    type="number"
                    value={formvalue.experience}
                    onChange={handelchange}
                    name="experience"
                    placeholder="Enter phone experience"
                    required=""
                  />
                </div>
              </div>
            </div>
            <button>Create profile</button>
          </form>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Doctorlogin;
