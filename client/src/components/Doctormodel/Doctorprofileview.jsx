import React, { useEffect, useState } from "react";
import axios from "axios";
import Doctorlayout from "./Doctorlayout";
import Doctorheader from "./Doctorheader";
import "./../../styles/pannel.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import Swal from "sweetalert2";
import { setDoctordata } from "../../Userreducers/reducers.js";
import FormData from "form-data";

const DoctorProfileViewUpdate = () => {
  const params = useParams();
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const doctorprofile = useSelector((state) => state?.doctordata);
  const [profileimage, setProfileimage] = useState(null);
  const [profileimageurl,setProfileimageurl]=useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
 

  const [formValue, setFormValue] = useState({
    doctorname: "",
    licensenumber: "",
    degree: "",
    alternatemobileno: "",
    age: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    department: "",
    pincode: "",
    experience: "",
  });

  const handelBack = () => {
    Navigate(-1);
  };

  const updateformvalues = () => {
    setFormValue({
      ...formValue,
      doctorname: doctorprofile?.doctorname,
      licensenumber: doctorprofile?.licensenumber,
      degree: doctorprofile?.degree,
      alternatemobileno: doctorprofile?.alternatemobileno,
      age: doctorprofile?.age,
      gender: doctorprofile?.gender,
      address: doctorprofile?.address,
      state: doctorprofile?.state,
      city: doctorprofile?.city,
      department: doctorprofile?.department,
      pincode: doctorprofile?.pincode,
      experience: doctorprofile?.experience,
    });

    setProfileimage(doctorprofile?.profileimage);
    setLicenseImage(doctorprofile?.licenseimage);
  };


  const handelFilechnage=(e)=>{
    const userimage=e.target.files[0];
    setProfileimageurl(URL.createObjectURL(userimage))

    handelprofileimageupdate(userimage)


  }

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();

      const updatedresponse = await axios.put(
        `/Hospital/doctor/updatedoctorprofile/${localStorage.getItem(
          "userID"
        )}`,
        formValue,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (updatedresponse.data.status === "success") {
        Dispatch(setDoctordata(updatedresponse.data.doctor));

        Swal.fire({
          title: updatedresponse.data.message,
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: updatedresponse.data.message,
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log("update profile error", error);
    }
  };

  const handelprofileimageupdate = async (myimage) => {
    try {
      // const myimage = e.target.files[0];

      const formdata = new FormData();
      formdata.append("profileimage", myimage);

      const updatedprofileimageresponse = await axios.put(
        `/Hospital/doctor/updateddoctorprofileimage/${params.id}`,
        formdata
      );
      if (updatedprofileimageresponse.data.status === "success") {
        Dispatch(setDoctordata(updatedprofileimageresponse.data.updateddoctor))
        Swal.fire({
          title: updatedprofileimageresponse.data.message,
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: updatedprofileimageresponse.data.message,
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.log("error in updateprofileimage", error);
    }
  };

  useEffect(() => {
    updateformvalues();
  }, [doctorprofile,Dispatch]);

  return (
    <Doctorlayout>
      <div className="vrdentamaincontent">
        <Doctorheader />

        <div className="vrdentadashboardcontent">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
              Dashboard-Doctorprofile
            </h1>
            <button
              onClick={handelBack}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                padding: "8px 10px",
                border: "none",
                borderRadius: 6,
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <i class="fa-solid fa-arrow-left" /> Back
            </button>
          </div>

          <section className="vrdentaformcontainer">
            <form className="doctorform" onSubmit={handelSubmit}>
              <div className="profilecontainer">
                <div className="profileavatar-upload">
                  <div className="profileavatar-edit">
                    <input type="file" id="imageUpload" onChange={handelFilechnage} name="profileimage" />
                    <label htmlFor="imageUpload"></label>
                  </div>
                  <div className="profileavatar-preview">
                    <div
                      id="imagePreview"
                      style={
                        profileimageurl === null
                          ?{ backgroundImage: `url(${profileimage})` }
                          :{
                              backgroundImage:
                                `url(${profileimageurl})`,
                            }
                           
                      }
                    ></div>
                  </div>
                </div>
              </div>

              {/* Doctor name and license */}
              <div className="doctorcolumn">
                <div className="doctorinput-box">
                  <label>Doctor Name</label>
                  <input
                    type="text"
                    onChange={handelChange}
                    name="doctorname"
                    value={formValue?.doctorname}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="doctorinput-box">
                  <label>License Number</label>
                  <input
                    type="text"
                    onChange={handelChange}
                    name="licensenumber"
                    value={formValue.licensenumber}
                    placeholder="Enter license number"
                  />
                </div>
              </div>

              {/* Degree */}
              <div className="doctorinput-box">
                <label>Degree</label>
                <input
                  type="text"
                  onChange={handelChange}
                  name="degree"
                  value={formValue.degree}
                  placeholder="Enter your degree"
                />
              </div>

              {/* Mobile & Age */}
              <div className="doctorcolumn">
                <div className="doctorinput-box">
                  <label>Alternate mobile number</label>
                  <input
                    type="text"
                    onChange={handelChange}
                    name="alternatemobileno"
                    value={formValue.alternatemobileno}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="doctorinput-box">
                  <label>Age</label>
                  <input
                    type="text"
                    onChange={handelChange}
                    name="age"
                    value={formValue.age}
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="doctorgender-box">
                <h3>Gender</h3>
                <div className="doctorgender-option">
                  <div className="doctorgender">
                    <input
                      type="radio"
                      id="check-male"
                      onChange={handelChange}
                      name="gender"
                      value="Male"
                      checked={formValue.gender === "Male"}
                    />
                    <label htmlFor="check-male">Male</label>
                  </div>
                  <div className="doctorgender">
                    <input
                      type="radio"
                      id="check-female"
                      onChange={handelChange}
                      name="gender"
                      value="Female"
                      checked={formValue.gender === "Female"}
                    />
                    <label htmlFor="check-female">Female</label>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="doctorinput-box address">
                <label>Address</label>
                <input
                  type="text"
                  onChange={handelChange}
                  name="address"
                  value={formValue.address}
                  placeholder="Enter street address"
                />
                <div className="doctorcolumn">
                  <div className="doctorselect-box">
                    <select
                      name="state"
                      value={formValue.state}
                      onChange={handelChange}
                    >
                      <option value="">
                        {formValue.state === ""
                          ? "Select your state"
                          : formValue.state}
                      </option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      {/* ...add all other states here */}
                    </select>
                  </div>
                  <input
                    type="text"
                    onChange={handelChange}
                    name="city"
                    value={formValue.city}
                    placeholder="Enter your city"
                  />
                </div>

                {/* Department & Pincode */}
                <div className="doctorcolumn">
                  <input
                    type="text"
                    onChange={handelChange}
                    name="department"
                    value={formValue.department}
                    placeholder="Enter your specialization"
                  />
                  <input
                    type="text"
                    name="pincode"
                    onChange={handelChange}
                    value={formValue.pincode}
                    placeholder="Enter pincode"
                  />
                </div>

                {/* License & Experience */}
                <div className="doctorcolumn">
                  <div className="doctorinput-box">
                    <label>License Image</label>
                    <input type="file" name="licenseimage" />

                    <Image width={100} height={100} src={licenseImage} />
                  </div>
                  <div className="doctorinput-box">
                    <label>Experience</label>
                    <input
                      type="text"
                      onChange={handelChange}
                      name="experience"
                      value={formValue.experience}
                      placeholder="Enter experience in years"
                    />
                  </div>
                </div>
              </div>

              <button type="submit">Update Profile</button>
            </form>
          </section>
        </div>
      </div>
    </Doctorlayout>
  );
};

export default DoctorProfileViewUpdate;
