import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Patientheader = () => {
  const patientprofile=useSelector((state)=>state?.patientdata);
  console.log(patientprofile)
  return (
    <div className="vrdentaheader">
      <div className="vrdentaheaderleft">
        <button className="vrdentamenutoggle" onClick="vrdentatoggleSidebar()">
          <i className="fas fa-bars" />
        </button>
        <div className="vrdentasearchbox">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search for projects, reports, users..."
          />
        </div>
      </div>
      <div className="vrdentaheaderright">
        <div className="vrdentaicongroup">4
          <button
            className="vrdentadropdown"
            onclick="vrdentatoggleDropdown(event)"
          >
            <i className="fas fa-check-square" />
          </button>
          <button
            className="vrdentadropdown"
            onclick="vrdentatoggleDropdown(event)"
          >
            <i className="fas fa-th-large" />
          </button>
          <div
            className="vrdentadropdown"
            onclick="vrdentatoggleDropdown(event)"
          >
            <button>
              <i className="fas fa-bell" />
              <span className="vrdentabadge">5</span>
            </button>
            <div className="vrdentadropdownmenu">
              <a href="#" className="vrdentadropdownitem">
                <i className="fas fa-box-open" />
                New Appointment Booked
              </a>
              <a href="#" className="vrdentadropdownitem">
                <i className="fas fa-server" />
                Server Down
              </a>
              <a href="#" className="vrdentadropdownitem">
                <i className="fas fa-comment-alt" />
                New Message
              </a>
            </div>
          </div>
          <div
            className="vrdentadropdown"
            onclick="vrdentatoggleDropdown(event)"
          >
            <img
              src={patientprofile?.patientprofileimage}
              alt="User Avatar"
              className="vrdentaavatar"
              // onClick={()=>Navigate("/patientprofileview")}
            />
            <div className="vrdentadropdownmenu" style={{ width: 200 }}>
              <a href="#" className="vrdentadropdownitem">
                <i className="fas fa-user" />
                Profile
              </a>
              <a href="#" className="vrdentadropdownitem">
                <i className="fas fa-cog" />
                Settings
              </a>
              <div
                style={{
                  borderTop: "1px solid var(--border-color)",
                  margin: "5px 0",
                }}
              />
              <a href="#" className="vrdentadropdownitem">
                <i className="fas fa-sign-out-alt" />
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patientheader;
