import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {setPatientdata} from "./../../Userreducers/reducers.js"


const Patientsidebar = () => {
  const Dispatch=useDispatch()
  const Navigate=useNavigate()
  const[active,setActive]=useState("Dashboard")



  const handelLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("userID")
    Dispatch(setPatientdata(null))
    Navigate("/login")

  }



  return (
    <div id="vrdentasidebar" className="vrdentasidebar">
      <div className="vrdentasidebarheader">
        <i className="fas fa-cube" />
          GLOBALDENTAL
      </div>
      <ul className="vrdentasidemenu">
        <li className="vrdentamenuitem">
          <span className="vrdentamenutext vrdentamenutextheading">
            Dashboards
          </span>
        </li>
        <li className={active==="Dashboard"?"vrdentamenuitem vrdentaopen":"vrdentamenuitem"} onClick={()=>setActive(active==="Dashboard"?"":"Dashboard")}>
          <Link
            to={"/patient-dashboard"}
            className="vrdentamenulink vrdentaactive"
           
          >
            <i className="fas fa-home" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={active==="Widgets"?"vrdentamenuitem vrdentaopen":"vrdentamenuitem"} onClick={()=>setActive(active==="Widgets"?"":"Widgets")}>
          <a
            href="#"
            className="vrdentamenulink"
          
          >
            <i className="fas fa-chart-line" />
            <span>Widgets</span>
          </a>
        </li>
        <li className="vrdentamenuitem">
          <span className="vrdentamenutext vrdentamenutextheading">
            Elements
          </span>
        </li>
        <li className={active==="Components"?"vrdentamenuitem vrdentaopen":"vrdentamenuitem"}  onClick={()=>setActive(active==="Components"?"":"Components")}>
          <a
            href="#"
            className="vrdentamenulink vrdentacollapsedtoggle"
         
          >
            <i className="fas fa-layer-group" />
            <span>Patient</span>
            <i className="fas fa-angle-right vrdentaarrow" />
          </a>
          <ul className="vrdentasubmenu">
            <li>
              <Link to={`/patient-profile-view/${localStorage.getItem("userID")}`} className="vrdentasubmenulink">
                Profile
              </Link>
            </li>

            

            {/* <li>
              <a href="#" className="vrdentasubmenulink">
                Buttons
              </a>
            </li> */}
            {/* <li>
              <a href="#" className="vrdentasubmenulink">
                Modals
              </a>
            </li> */}
          </ul>
        </li>
        <li className={active==="Doctors"?"vrdentamenuitem vrdentaopen":"vrdentamenuitem"}  onClick={()=>setActive(active==="Doctors"?"":"Doctors")}>
          <a
            href="#"
            className="vrdentamenulink vrdentacollapsedtoggle"
         
          >
            <i className="fas fa-layer-group" />
            <span>Doctors</span>
            <i className="fas fa-angle-right vrdentaarrow" />
          </a>
          <ul className="vrdentasubmenu">
            <li>
              <Link to={`/patientdoctorlist`} className="vrdentasubmenulink">
                Doctors List
              </Link>
            </li>

            

            {/* <li>
              <a href="#" className="vrdentasubmenulink">
                Buttons
              </a>
            </li> */}
            {/* <li>
              <a href="#" className="vrdentasubmenulink">
                Modals
              </a>
            </li> */}
          </ul>
        </li>
        <li className={active==="formTable"?"vrdentamenuitem vrdentaopen":"vrdentamenuitem"}  onClick={()=>setActive(active==="formTable"?"":"formTable")}>
          <a
            href="#"
            className="vrdentamenulink"
         
          >
            <i className="fas fa-table" />
            <span>Appointments</span>
            <i className="fas fa-angle-right vrdentaarrow" />
          </a>
          <ul className="vrdentasubmenu">
            <li>
              <a
                href="#"
                className="vrdentasubmenulink"
               
              >
                Forms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="vrdentasubmenulink"
                
              >
                Tables
              </a>
            </li>
          </ul>
        </li>
        <li className="vrdentamenuitem">
          <span className="vrdentamenutext vrdentamenutextheading">
            Apps &amp; Pages
          </span>
        </li>
        <li className="vrdentamenuitem">
          <a
            href="#"
            className="vrdentamenulink"
          
          >
            <i className="fas fa-calendar-alt" />
            <span>Calendar</span>
          </a>
        </li>
        <li className="vrdentamenuitem" onClick={handelLogout}>
          <Link
            to={""}
            className="vrdentamenulink"
           
          >
            <i className="fas fa-user-circle" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Patientsidebar;
