import React, { useState, useEffect } from "react";
import "./../../styles/patientdoctorlist.css";
import { Link, useFetcher } from "react-router-dom";
import Patientlayout from "./Patientlayout";
import Patientheader from "./Patientheader";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { FaUserMd } from "react-icons/fa";

const Patientdoctorlist = () => {
  const [page, setPage] = useState(1);
  const [doctor, setDoctor] = useState([]);
  const [totalrecords, setTotalrecords] = useState("");
  const [totalpages, setTotalpages] = useState("");
  const [currentpage, setCurrentpage] = useState(1);
  const [pagelimit, setpageLimit] = useState(2);
  // const [exp, setExp]=useState(5);
  const [minExp, setMinExp]=useState(10);
  // const [maxExp, setMaxExp]=useState(10);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("Hospital/patient/getdoctors", {
        params: {
          page: currentpage,
          limit: pagelimit,
          // experience: exp,
          // minexp: minExp,
          // maxexp: maxExp,
        },
      });
      console.log(response);

      setDoctor(response.data.doctors);
      setTotalpages(response.data.pagination.totalpages);
      setTotalrecords(response.data.pagination.totalrecords);
    } catch (error) {
      console.log("Error fetching doctors", error);
    }
  };

  const handelpageclick = (event, page) => {
    console.log(page);
    setCurrentpage(page);
  };

  const handelpagelimit = (e) => {
    setCurrentpage(1);
    setpageLimit(e.target.value);
  };

  useEffect(() => {
    fetchDoctors();
  }, [currentpage, pagelimit]);

  return (
    <Patientlayout>
      <div className="vrdentamaincontent">
        <Patientheader />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          className="doctors-header"
        >
          <h2 className="title">
            <FaUserMd className="icon" /> Doctors List
          </h2>

          <div className="total-box">
            <span>Total Doctors:</span>
            <strong>{totalrecords}</strong>
          </div>
        </div>
        {/* Card details for doctors */}
        <div className="doctor-grid">
          {doctor.map((doc) => (
            <div key={doc._id} className="doctor-card-wrapper">
              <div className="doctor-card-box">
                <div className="doctor-image-section">
                  <Link to="/doctor-details">
                    <img
                      src={doc.profileimage}
                      alt={doc.doctorname}
                      className="doctor-image"
                    />
                  </Link>
                </div>

                <div className="doctor-details-section">
                  <div className="doctor-header">
                    <h4 className="doctor-name">
                      <Link to="/doctor-details">{doc.doctorname}</Link>
                    </h4>

                    <div className="menu-wrapper">
                      <button className="menu-btn">⋮</button>
                      <ul className="menu-dropdown">
                        <li>
                          <Link to="/edit-doctor">Edit</Link>
                        </li>
                        <li>
                          <button className="delete-action">Delete</button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="doctor-specialty">{doc.department}</p>
                  <p className="doctor-availability-text">
                    <strong>Available: </strong>
                  </p>

                  <div className="doctor-footer">
                    <p className="doctor-fees">
                      <span>Starts From:</span> ₹500
                    </p>

                    <Link to="/appointment-calendar" className="calendar-icon">
                      📅
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div class="doctpagination">
          <Stack spacing={2}>
            <Pagination
              onChange={handelpageclick}
              count={totalpages}
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </Patientlayout>
  );
};

export default Patientdoctorlist;
