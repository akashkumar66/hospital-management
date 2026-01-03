import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
// import "./../styles/patientprofcreate.css";
import "./../styles/patientprofilecreate.css";

function Patientprofcreate() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientprofimage, setPatientprofimage] = useState(null);
  const [patientprofurl, setPatientprofurl] = useState(null);

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

  //function for change in the form input and the current value will the value in the input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalue({
      ...formvalue,
      [name]: value,
    });
  };

  const handlepatientprofimage = (e) => {
    const image = e.target.files[0];
    setPatientprofimage(image);
    setPatientprofurl(URL.createObjectURL(image));
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      if (  formvalue?.alternatemobileno.length < 10) {
        Swal.fire({
          icon: "error",
          title: "Please enter a valid mobile number",
          text: "Something went wrong!",
        });

        return;
      }

      setLoading(true);

      const formdata = new FormData();
      formdata.append("patientname",   formvalue?.patientname);
      formdata.append("age",   formvalue?.age);
      formdata.append("gender",   formvalue?.gender);
      formdata.append("address",   formvalue?.address);
      formdata.append("city",   formvalue?.city);
      formdata.append("state",   formvalue?.state);
      formdata.append("pincode",   formvalue?.pincode);
      formdata.append("alternatemobileno",   formvalue?.alternatemobileno);
      formdata.append("alcohol",   formvalue?.alcohol);
      formdata.append("height", `${  formvalue?.height} cm`);
      formdata.append("weight", `${  formvalue?.weight} kg`);
      formdata.append("smoking",   formvalue?.smoking);
      formdata.append("dob",   formvalue?.dob);
      formdata.append("geneticdiseases",   formvalue?.geneticdiseases);
      formdata.append("bloodgroup",   formvalue?.bloodgroup);
      formdata.append("allergies",   formvalue?.allergies);
      formdata.append("previoussurgeries",   formvalue?.previoussurgeries);
      formdata.append("exerciseroutine",   formvalue?.exerciseroutine);
      formdata.append("patientprofileimage", patientprofimage);
      formdata.append("userID", localStorage.getItem("userID"));

      const createresponse = await axios.post(
        "/Hospital/patient/addpatient",
        formdata
      );

      if (createresponse.data.status == "success") {
       Swal.fire({
                 title: createresponse.data.message,
                 icon: "success",
                 draggable: true,
               });
        setLoading(false)
        Navigate(`/patient-profile-view/${localStorage.getItem("userID")}`);
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: createresponse.data.message,
          text: "Something went wrong!",
        });
        Navigate(`/patient-profile-view/${localStorage.getItem("userID")}`);
      }
    } catch (error) {
      setLoading(false);
      console.log(" Patient create profile error is", error);
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
      <div className="patient-wrapper">
        <div className="patient-container">
          {/* <header>Create Patient Profile</header> */}
          <form action="#" className="patient-form" onSubmit={handlesubmit}>
              <div class="profilecontainer">
              <h1>
                Create Patient profile
                <small>Upload profile image</small>
              </h1>
              <div class="profileavatar-upload">
                <div class="profileavatar-edit">
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={handlepatientprofimage}
                    name="profileimage"
                  />
                  <label for="imageUpload"></label>
                </div>
                <div class="profileavatar-preview">
                  <div
                    id="imagePreview"
                    style={
                      patientprofurl === null
                        ? {
                            backgroundImage:
                              "url(http://i.pravatar.cc/500?img=7)",
                          }
                        : { backgroundImage: `url(${patientprofurl})` }
                    }
                  ></div>
                </div>
              </div>
            </div>

            {/* Row - Basic Info */}
            <div className="row">
              <div className="field">
                <label htmlFor="patientname">Patient Name</label>
                <input
                  type="text"
                  id="patientname"
                  name="patientname"
                  placeholder="Full name"
                  required
                  onChange={handleChange}
                  value={formvalue?.patientname}
                />
              </div>

              <div className="field">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  min={0}
                  max={150}
                  placeholder="e.g. 32"
                  required
                  onChange={handleChange}
                  value={formvalue?.age}
                />
              </div>

              <div className="field">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  onChange={handleChange}
                  value={formvalue?.gender}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* DOB */}
            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                onChange={handleChange}
                value={  formvalue?.dob}
              />
            </div>

            {/* Address Row */}
            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Street, building, landmark..."
                required
                onChange={handleChange}
                value={  formvalue?.address}
              />
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  required
                  onChange={handleChange}
                  value={  formvalue?.city}
                />
              </div>

              <div className="field">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  required
                  onChange={handleChange}
                  value={  formvalue?.state}
                >
                  <option value="" disabled>
                    Select State / Province
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
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
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  placeholder="Postal / ZIP code"
                  inputMode="numeric"
                  pattern="\d*"
                  required
                  onChange={handleChange}
                  value={  formvalue?.pincode}
                />
              </div>
            </div>

            {/* Health Details */}
            <div className="row">
              <div className="field">
                <label htmlFor="height">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  min={0}
                  placeholder="e.g. 170"
                  onChange={handleChange}
                  value={  formvalue?.height}
                />
              </div>

              <div className="field">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  min={0}
                  placeholder="e.g. 65"
                  onChange={handleChange}
                  value={  formvalue?.weight}
                />
              </div>

              <div className="field">
                <label htmlFor="bloodgroup">Blood Group</label>
                <select
                  id="bloodgroup"
                  name="bloodgroup"
                  onChange={handleChange}
                  value={  formvalue?.bloodgroup}
                >
                  <option value="" disabled>
                    Select blood group
                  </option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label htmlFor="alcohol">Alcohol Consumption</label>
                <select
                  id="alcohol"
                  name="alcohol"
                  onChange={handleChange}
                  value={  formvalue?.alcohol}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="occasionally">Occasionally</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="smoking">Smoking</label>
                <select
                  id="smoking"
                  name="smoking"
                  onChange={handleChange}
                  value={  formvalue?.smoking}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="occasionally">Occasionally</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="exerciseroutine">Exercise Routine</label>
                <input
                  type="text"
                  id="exerciseroutine"
                  name="exerciseroutine"
                  placeholder="e.g. Daily jogging"
                  onChange={handleChange}
                  value={  formvalue?.exerciseroutine}
                />
              </div>
            </div>

            {/* Medical History */}
            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="geneticdiseases">Genetic Diseases</label>
              <textarea
                id="geneticdiseases"
                name="geneticdiseases"
                placeholder="Mention if any"
                onChange={handleChange}
                value={  formvalue?.geneticdiseases}
              />
            </div>

            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="allergies">Allergies</label>
              <textarea
                id="allergies"
                name="allergies"
                placeholder="e.g. Dust, nuts, medications..."
                onChange={handleChange}
                value={  formvalue?.allergies}
              />
            </div>

            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="previoussurgeries">Previous Surgeries</label>
              <textarea
                id="previoussurgeries"
                name="previoussurgeries"
                placeholder="List surgeries if any"
                onChange={handleChange}
                value={  formvalue?.previoussurgeries}
              />
            </div>

            {/* Profile Image
            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="patientprofimage">Profile Image</label>
              <input
                type="file"
                id="patientprofimage"
                name="patientprofileimage"
                accept="image/*"
                onChange={handlepatientprofimage}
              />
            </div> */}

            {/* Alternate Contact */}
            <div className="field" style={{ width: "100%" }}>
              <label htmlFor="alternatemobileno">Alternate Mobile No</label>
              <input
                type="tel"
                id="alternatemobileno"
                name="alternatemobileno"
                placeholder="+91 00000 00000"
                maxLength={10}
                onChange={handleChange}
                value={  formvalue?.alternatemobileno}
              />
            </div>

            <div className="actions">
              <button type="submit">Save Profile</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Patientprofcreate;
