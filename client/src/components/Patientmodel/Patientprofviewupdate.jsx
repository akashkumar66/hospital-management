import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import Swal from "sweetalert2";
import { setPatientdata } from "../../Userreducers/reducers.js";
import FormData from "form-data";
import "./../../styles/patientprofviewupdate.css";
import Patientlayout from "./Patientlayout.jsx";
import Patientheader from "./Patientheader.jsx";

const Patientprofviewupdate = () => {
  const params = useParams();
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const patientprofile = useSelector((state) => state?.patientdata);

  const [profileimage, setProfileimage] = useState(null);

  const [formvalue, setFormvalue] = useState({
    patientname: "",
    age: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    alternatemobileno: "",
    alcohol: "",
    height: "",
    weight: "",
    smoking: "",
    dob: "",
    geneticdiseases: "",
    bloodgroup: "",
    allergies: "",
    previoussurgeries: "",
    exerciseroutine: "",
  });

  const updateformvalues = () => {
    setFormvalue({
      ...formvalue,
      patientname: `${patientprofile?.patientname}`,
      age: patientprofile?.age,
      gender: patientprofile?.gender,
      address: patientprofile?.address,
      city: patientprofile?.city,
      state: patientprofile?.state,
      pincode: patientprofile?.pincode,
      alternatemobileno: patientprofile?.alternatemobileno,
      alcohol: patientprofile?.alcohol,
      height: patientprofile?.height,
      weight: patientprofile?.weight,
      smoking: patientprofile?.smoking,
      dob: patientprofile?.dob,
      geneticdiseases: patientprofile?.geneticdiseases,
      bloodgroup: patientprofile?.bloodgroup,
      allergies: patientprofile?.allergies,
      previoussurgeries: patientprofile?.previoussurgeries,
      exerciseroutine: patientprofile?.exerciseroutine,
    });

    setProfileimage(patientprofile?.patientprofileimage);
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormvalue({
      ...formvalue,
      [name]: value,
    });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      const updatedresponse = await axios.put(
        `/Hospital/patient/updatepatientprofile/${localStorage.getItem(
          "userID"
        )}`,
        formvalue,
        {
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (updatedresponse.data.status === "success") {
        Dispatch(setPatientdata(updatedresponse.data.patient));

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
      console.log(error);
    }
  };

  const handleprofileimageupdate = async (e) => {
    try {
      const myimage = e.target.files[0];

      const formdata = new FormData();
      formdata.append("profileimage", myimage);

      const updatedprofileimageresponse = await axios.put(
        `/Hospital/patient/updatepatientimage/${params.id}`,
        formdata
      );

      if (updatedprofileimageresponse.data.status == "success") {
        Dispatch(
          setPatientdata(updatedprofileimageresponse.data.updatepatient)
        );
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
      console.log("profileimageupdate error ", error);
    }
  };

  useEffect(() => {
    updateformvalues();
  }, [patientprofile, Dispatch]);

  return (
    <Patientlayout>
      <div className="vrdentamaincontent">
        <Patientheader />

        <div className="patient-profile-wrapper">
          <div className="patient-profile-card">
            <header className="patient-profile-header">
              Patient Profile Overview
            </header>

            <form className="patient-profile-form" onSubmit={handlesubmit}>
              {/* Profile Image Upload */}
            <div className="profilecontainer">
                <div className="profileavatar-upload">
                  <div className="profileavatar-edit">
                    <input type="file" id="imageUpload" onChange={handleprofileimageupdate} name="profileimage" />
                    <label htmlFor="imageUpload"></label>
                  </div>
                  <div className="profileavatar-preview">
                    <div
                      id="imagePreview"
                      style={
                        profileimage === null
                          ? {
                              backgroundImage:
                                "url(http://i.pravatar.cc/500?img=7)",
                            }
                          : { backgroundImage: `url(${profileimage})` }
                      }
                    ></div>
                  </div>
                </div>
              </div>

              {/* Patient Basic Details */}
              <div className="profile-row">
                <div className="profile-field">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    name="patientname"
                    placeholder="Full Name"
                    onChange={handelChange}
                    value={formvalue?.patientname}
                  />
                </div>

                <div className="profile-field">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    onChange={handelChange}
                    value={formvalue?.age}
                  />
                </div>

                <div className="profile-field">
                  <label>Gender</label>
                  <select
                    name="gender"
                    onChange={handelChange}
                    value={formvalue?.gender}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* DOB */}
              <div className="profile-field full">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  onChange={handelChange}
                  value={formvalue?.dob}
                />
              </div>

              {/* Address */}
              <div className="profile-field full">
                <label>Address</label>
                <textarea
                  name="address"
                  placeholder="Enter full address"
                  onChange={handelChange}
                  value={formvalue?.address}
                />
              </div>

              {/* City | State | Pincode */}
              <div className="profile-row">
                <div className="profile-field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handelChange}
                    value={formvalue?.city}
                  />
                </div>

                <div className="profile-field">
                  <label>State</label>
                  <select
                    name="state"
                    onChange={handelChange}
                    value={formvalue?.state}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    <option>Delhi</option>
                    <option>Uttar Pradesh</option>
                    <option>Bihar</option>
                    <option>Maharashtra</option>
                    <option>Gujarat</option>
                  </select>
                </div>

                <div className="profile-field">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    placeholder="ZIP"
                    pattern="\d*"
                    value={formvalue?.pincode}
                    onChange={handelChange}
                  />
                </div>
              </div>

              {/* Height | Weight | Blood Group */}
              <div className="profile-row">
                <div className="profile-field">
                  <label>Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    placeholder="170"
                    onChange={handelChange}
                    value={formvalue?.height}
                  />
                </div>

                <div className="profile-field">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    placeholder="65"
                    onChange={handelChange}
                    value={formvalue?.weight}
                  />
                </div>

                <div className="profile-field">
                  <label>Blood Group</label>
                  <select
                    name="bloodgroup"
                    onChange={handelChange}
                    value={formvalue?.bloodgroup}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>A+</option>
                    <option>O+</option>
                    <option>B+</option>
                    <option>AB+</option>
                    <option>A-</option>
                    <option>O-</option>
                    <option>B-</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              {/* Lifestyle */}
              <div className="profile-row">
                <div className="profile-field">
                  <label>Alcohol</label>
                  <select
                    name="alcohol"
                    onChange={handelChange}
                    value={formvalue?.alcohol}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Occasionally</option>
                  </select>
                </div>

                <div className="profile-field">
                  <label>Smoking</label>
                  <select
                    name="smoking"
                    onChange={handelChange}
                    value={formvalue?.smoking}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Occasionally</option>
                  </select>
                </div>

                <div className="profile-field">
                  <label>Exercise Routine</label>
                  <input
                    type="text"
                    name="exerciseroutine"
                    placeholder="Daily exercise"
                    onChange={handelChange}
                    value={formvalue?.exerciseroutine}
                  />
                </div>
              </div>

              {/* Medical */}
              <div className="profile-field full">
                <label>Genetic Diseases</label>
                <textarea
                  name="geneticdiseases"
                  onChange={handelChange}
                  value={formvalue?.geneticdiseases}
                />
              </div>

              <div className="profile-field full">
                <label>Allergies</label>
                <textarea
                  name="allergies"
                  onChange={handelChange}
                  value={formvalue?.allergies}
                />
              </div>

              {/* Alternate Contact */}
              <div className="profile-field full">
                <label>Alternate Mobile No</label>
                <input
                  type="tel"
                  name="alternatemobileno"
                  maxLength={10}
                  placeholder="0000000000"
                  value={formvalue?.alternatemobileno}
                  onChange={handelChange}
                />
              </div>

              {/* Submit */}
              <div className="profile-actions">
                <button type="submit" className="profile-submit-btn">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Patientlayout>
  );
};

export default Patientprofviewupdate;
