import React, { useEffect, useState } from "react";
import Doctorlayout from "./Doctorlayout";
import Doctorheader from "./Doctorheader";
import "./../../styles/pannel.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Doctorpannel = () => {
  const Navigate=useNavigate()


  const handelBack=()=>{
    Navigate(-1)
  }



  return (
    <Doctorlayout>
      <div className="vrdentamaincontent">
        {/* Header/Top Bar */}
        <Doctorheader />
        {/* <div class="vrdentaheader">
              <div class="vrdentaheaderleft">
                  <button class="vrdentamenutoggle" onclick="vrdentatoggleSidebar()">
                      <i class="fas fa-bars"></i>
                  </button>
                  <div class="vrdentasearchbox">
                      <i class="fas fa-search"></i>
                      <input type="text" placeholder="Search for projects, reports, users...">
                  </div>
              </div>
              <div class="vrdentaheaderright">
                  <div class="vrdentaicongroup">
                      <button class="vrdentadropdown" onclick="vrdentatoggleDropdown(event)">
                          <i class="fas fa-check-square"></i>
                      </button>
                      <button class="vrdentadropdown" onclick="vrdentatoggleDropdown(event)">
                          <i class="fas fa-th-large"></i>
                      </button>
                      <div class="vrdentadropdown" onclick="vrdentatoggleDropdown(event)">
                          <button><i class="fas fa-bell"></i><span class="vrdentabadge">5</span></button>
                          <div class="vrdentadropdownmenu">
                              <a href="#" class="vrdentadropdownitem"><i class="fas fa-box-open"></i>New Order Received</a>
                              <a href="#" class="vrdentadropdownitem"><i class="fas fa-server"></i>Server Down</a>
                              <a href="#" class="vrdentadropdownitem"><i class="fas fa-comment-alt"></i>New Message</a>
                          </div>
                      </div>
                      <div class="vrdentadropdown" onclick="vrdentatoggleDropdown(event)">
                          <img src="https://placehold.co/35x35/009ef7/ffffff?text=U" alt="User Avatar" class="vrdentaavatar">
                          <div class="vrdentadropdownmenu" style="width: 200px;">
                              <a href="#" class="vrdentadropdownitem"><i class="fas fa-user"></i>Profile</a>
                              <a href="#" class="vrdentadropdownitem"><i class="fas fa-cog"></i>Settings</a>
                              <div style="border-top: 1px solid var(--border-color); margin: 5px 0;"></div>
                              <a href="#" class="vrdentadropdownitem"><i class="fas fa-sign-out-alt"></i>Log Out</a>
                          </div>
                      </div>
                  </div>
              </div>
          </div> */}
        {/* End Header/Top Bar */}
        {/* Dashboard Body */}
        <div className="vrdentadashboardcontent">
          {/* Dashboard Section */}
          <div id="dashboard" className="vrdentacontentsection active">
            {/* Row 1: Dashboard Title & Stat Cards */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                Dashboard Overview
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
            {/* Row 2: Weekly Sales Chart & Icon Stats */}
            <div className="vrdentagrid vrdentagrid41">
              <div className="vrdentacard vrdentaspan2">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">
                    Average Weekly Sales Performance
                  </h2>
                  <div className="vrdentachartstats">
                    <span className="vrdentavalue">$9,568</span>
                    <span className="vrdentachange vrdentaup">
                      <i className="fas fa-caret-up" /> 8.6%
                    </span>
                  </div>
                </div>
                <div className="vrdentacardbody">
                  <canvas id="vrdentaweeklySalesChart" height={150} />
                </div>
              </div>
              <div className="vrdentacard vrdentaspan2">
                <div className="vrdentaiconstatgrid">
                  <div className="vrdentaiconstatcard">
                    <div className="vrdentastaticon vrdentablue">
                      <i className="fas fa-shopping-cart" />
                    </div>
                    <span className="vrdentastatvalue">85,246</span>
                    <span className="vrdentastatlabel">Total Orders</span>
                  </div>
                  <div className="vrdentaiconstatcard">
                    <div className="vrdentastaticon vrdentagreen">
                      <i className="fas fa-dollar-sign" />
                    </div>
                    <span className="vrdentastatvalue">$96,147</span>
                    <span className="vrdentastatlabel">Net Income</span>
                  </div>
                  <div className="vrdentaiconstatcard">
                    <div className="vrdentastaticon vrdentapink">
                      <i className="fas fa-bell" />
                    </div>
                    <span className="vrdentastatvalue">846</span>
                    <span className="vrdentastatlabel">
                      Alerts &amp; Messages
                    </span>
                  </div>
                  <div className="vrdentaiconstatcard">
                    <div className="vrdentastaticon vrdentaorange">
                      <i className="fas fa-users" />
                    </div>
                    <span className="vrdentastatvalue">3,472</span>
                    <span className="vrdentastatlabel">New Customers</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Row 3: Total Users, Active Users, Sales & Views - UPDATED LAYOUT */}
            <div className="vrdentagrid vrdentagridusercharts">
              <div className="vrdentacard vrdentauserchartcard">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">
                    Monthly User Registrations
                  </h2>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </button>
                </div>
                <div className="vrdentacardbody">
                  <canvas id="vrdentatotalUsersChart" height={150} />
                </div>
                <div className="vrdentauserchartfooter">
                  <p>
                    Data shows a{" "}
                    <span className="vrdentachange vrdentadown">
                      <i className="fas fa-caret-down" /> 12.5%
                    </span>
                    decrease from last month's peak.
                  </p>
                </div>
              </div>
              <div className="vrdentacard vrdentauserchartcard">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">Daily Active Users</h2>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </button>
                </div>
                <div className="vrdentacardbody">
                  <div className="vrdentaprogresscirclewrapper">
                    <canvas id="vrdentaactiveUsersChart" />
                    <span className="vrdentaprogresscirclelabel">78%</span>
                  </div>
                </div>
                <div className="vrdentauserchartfooter">
                  <p>
                    An increase of{" "}
                    <span className="vrdentachange vrdentaup">
                      <i className="fas fa-caret-up" /> 24K
                    </span>{" "}
                    users compared to the previous period.
                  </p>
                </div>
              </div>
              <div className="vrdentacard vrdentaspan2">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">
                    Revenue Comparison: Sales &amp; Views
                  </h2>
                  <div
                    style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                  >
                    <span
                      style={{ marginRight: 15, color: "var(--primary-color)" }}
                    >
                      Sales
                    </span>
                    <span style={{ color: "var(--primary-light)" }}>Views</span>
                  </div>
                </div>
                <div className="vrdentacardbody">
                  <canvas id="vrdentasalesViewsChart" height={150} />
                </div>
              </div>
            </div>
            {/* Row 4: Monthly/Yearly Stats & Ongoing Projects */}
            <div className="vrdentagrid vrdentagrid11">
              <div className="vrdentacard vrdentasalessyearcard">
                <div className="vrdentacardheader">
                  <div className="vrdentachartstats">
                    <span className="vrdentavalue">$65,129</span>
                    <span className="vrdentachange vrdentaup">
                      <i className="fas fa-caret-up" /> 8.6%
                    </span>
                  </div>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </button>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Sales This Year
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    marginBottom: 15,
                  }}
                >
                  285 left to Goal
                </p>
                {/* Goal Chart Fix: Wrapped canvas in a square container */}
                <div className="vrdentagoalchartcontainer">
                  <div className="vrdentagoalchartwrapper">
                    <canvas id="vrdentagoalChart" />
                  </div>
                  <div className="vrdentasalessyearstats">
                    <div className="vrdentasalessstatitem">
                      <span className="vrdentasalessstatlabel">
                        Monthly Target
                      </span>
                      <span
                        className="vrdentasalessstatvalue"
                        style={{ color: "var(--primary-color)" }}
                      >
                        $65,127
                      </span>
                    </div>
                    <div className="vrdentasalessstatitem">
                      <span className="vrdentasalessstatlabel">
                        Yearly Projection
                      </span>
                      <span
                        className="vrdentasalessstatvalue"
                        style={{ color: "#ffc700" }}
                      >
                        $984,246
                      </span>
                    </div>
                    <div className="vrdentasalessstatitem">
                      <span className="vrdentasalessstatlabel">
                        Avg. Daily Sales
                      </span>
                      <span
                        className="vrdentasalessstatvalue"
                        style={{ color: "var(--primary-light)" }}
                      >
                        $2,847
                      </span>
                    </div>
                    <div className="vrdentasalessstatitem">
                      <span className="vrdentasalessstatlabel">
                        Top Product :
                      </span>
                      <span
                        className="vrdentasalessstatvalue"
                        style={{ color: "#f1416c" }}
                      >
                        Smart Watch Pro
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="vrdentacard">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">Ongoing Projects Status</h2>
                  <button
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: 6,
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    View All
                  </button>
                </div>
                <div className="vrdentascrollablesection">
                  <ul className="vrdentalistgroup">
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#f1416c" }}
                        >
                          <i className="fas fa-code" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Backend Refactor (Laravel)
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Lead: Jane Doe
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#f1416c", fontWeight: 600 }}>
                        25%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#009ef7" }}
                        >
                          <i className="fab fa-react" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Frontend Dashboard UI
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Team: React Devs
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#009ef7", fontWeight: 600 }}>
                        90%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#50cd89" }}
                        >
                          <i className="fas fa-chart-bar" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Q4 Marketing Analytics
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Lead: Marketing Dept
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#50cd89", fontWeight: 600 }}>
                        70%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#ffc700" }}
                        >
                          <i className="fas fa-server" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Cloud Migration Prep
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Team: Infrastructure
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#ffc700", fontWeight: 600 }}>
                        55%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#f1416c" }}
                        >
                          <i className="fas fa-mobile-alt" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Mobile App Development
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Team: iOS &amp; Android
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#f1416c", fontWeight: 600 }}>
                        40%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#009ef7" }}
                        >
                          <i className="fas fa-database" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Database Optimization
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Lead: Database Team
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#009ef7", fontWeight: 600 }}>
                        75%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Row 5: Campaign, Recent Transactions, Popular Products */}
            <div className="vrdentagrid vrdentagrid32">
              <div className="vrdentacard">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">Campaign Social Reach</h2>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </button>
                </div>
                <div className="vrdentascrollablesection">
                  <ul className="vrdentalistgroup">
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#1a73e8" }}
                        >
                          <i className="fab fa-facebook-f" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Facebook Ads
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            CPC: $0.85
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#1a73e8", fontWeight: 600 }}>
                        55%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#0e76a8" }}
                        >
                          <i className="fab fa-linkedin-in" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            LinkedIn B2B
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Conversion: 1.2%
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#0e76a8", fontWeight: 600 }}>
                        67%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#e84c88" }}
                        >
                          <i className="fab fa-instagram" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Instagram Stories
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Impressions: 42K
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#e84c88", fontWeight: 600 }}>
                        78%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#ffc700" }}
                        >
                          <i className="fab fa-twitter" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            X (Twitter) Engagement
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Growth: 3.4K followers
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#ffc700", fontWeight: 600 }}>
                        45%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#4285f4" }}
                        >
                          <i className="fab fa-google" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Google Search
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            SEO Score: 92/100
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#4285f4", fontWeight: 600 }}>
                        88%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#ff0000" }}
                        >
                          <i className="fab fa-youtube" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            YouTube Campaign
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Views: 125K
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#ff0000", fontWeight: 600 }}>
                        62%
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#25d366" }}
                        >
                          <i className="fab fa-whatsapp" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            WhatsApp Business
                          </div>
                          <div className="vrdentalistitemsubtitle">
                            Engagement: 3.2K
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "#25d366", fontWeight: 600 }}>
                        71%
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="vrdentacard">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">Recent Transactions</h2>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </button>
                </div>
                <div className="vrdentascrollablesection">
                  <ul className="vrdentalistgroup vrdentatransactionlist">
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#f1416c" }}
                        >
                          <i className="fas fa-shopping-basket" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Online Store Purchase
                          </div>
                          <div className="vrdentatransactiondate">
                            03/10/2024 - ID: #84672
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "#f1416c" }}
                      >
                        -$97.89
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#009ef7" }}
                        >
                          <i className="fas fa-university" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Salary Deposit (Payroll)
                          </div>
                          <div className="vrdentatransactiondate">
                            01/10/2024 - Ref: ABC123
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "var(--primary-light)" }}
                      >
                        +$8,646.90
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#ffc700" }}
                        >
                          <i className="fas fa-credit-card" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Marketing Software Subscription
                          </div>
                          <div className="vrdentatransactiondate">
                            30/09/2024 - Card: 4525
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "#f1416c" }}
                      >
                        -$45.25
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#50cd89" }}
                        >
                          <i className="fas fa-laptop-code" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Client Project Payment
                          </div>
                          <div className="vrdentatransactiondate">
                            28/09/2024 - Invoice: PJT005
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "var(--primary-light)" }}
                      >
                        +$3,524.90
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#4285f4" }}
                        >
                          <i className="fas fa-tools" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Office Supplies Purchase
                          </div>
                          <div className="vrdentatransactiondate">
                            25/09/2024 - ID: #98765
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "#f1416c" }}
                      >
                        -$135.00
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#9c27b0" }}
                        >
                          <i className="fas fa-gem" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Premium Subscription
                          </div>
                          <div className="vrdentatransactiondate">
                            24/09/2024 - ID: #75321
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "#f1416c" }}
                      >
                        -$29.99
                      </span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <div
                          className="vrdentalistitemicon"
                          style={{ backgroundColor: "#50cd89" }}
                        >
                          <i className="fas fa-chart-line" />
                        </div>
                        <div className="vrdentalistiteminfo">
                          <div className="vrdentalistitemtitle">
                            Investment Return
                          </div>
                          <div className="vrdentatransactiondate">
                            22/09/2024 - Ref: INV045
                          </div>
                        </div>
                      </div>
                      <span
                        className="vrdentatransactionamount"
                        style={{ color: "var(--primary-light)" }}
                      >
                        +$1,250.00
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="vrdentacard vrdentaspan2">
                <div className="vrdentacardheader">
                  <h2 className="vrdentacardtitle">Top Selling Products</h2>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </button>
                </div>
                <div className="vrdentascrollablesection">
                  <ul className="vrdentalistgroup vrdentaproductlist">
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/009ef7/ffffff?text=W"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Premium Smart Watch Pro
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 2,580 units | Stock: 450
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$199.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/50cd89/ffffff?text=P"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Ultra HD Portable Projector
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 1,690 units | Stock: 205
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$678.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/f1416c/ffffff?text=C"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Ergonomic Office Chair
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 2,680 units | Stock: 1,200
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$279.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/ffc700/ffffff?text=S"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Professional Bluetooth Speaker
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 859 units | Stock: 90
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$389.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/4285f4/ffffff?text=L"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Lightweight Travel Laptop
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 1,120 units | Stock: 350
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$1,299.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/9c27b0/ffffff?text=T"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Wireless Earbuds Pro
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 3,250 units | Stock: 180
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$149.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/ff5722/ffffff?text=M"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Smart Home Hub
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 980 units | Stock: 75
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$89.00</span>
                    </li>
                    <li className="vrdentalistitem">
                      <div className="vrdentalistitemcontent">
                        <img
                          src="https://placehold.co/45x45/607d8b/ffffff?text=G"
                          alt="Product Image"
                        />
                        <div className="vrdentaproductinfo">
                          <div className="vrdentalistitemtitle">
                            Gaming Console Pro
                          </div>
                          <div className="vrdentaproductsalecount">
                            Sales: 2,150 units | Stock: 320
                          </div>
                        </div>
                      </div>
                      <span className="vrdentaproductprice">$499.00</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Tables Section */}
          <div id="tables" className="vrdentacontentsection">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                Data Tables
              </h1>
              <button
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
                <i className="fas fa-plus" /> Add New
              </button>
            </div>
            <div className="vrdentacard">
              <div className="vrdentacardheader">
                <h2 className="vrdentacardtitle">User Management</h2>
                <div className="vrdentasearchbox">
                  <i className="fas fa-search" />
                  <input type="text" placeholder="Search users..." />
                </div>
              </div>
              <div className="vrdentatablecontainer">
                <table className="vrdentatable">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Join Date</th>
                      <th>Last Login</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>John Doe</td>
                      <td>john.doe@example.com</td>
                      <td>(555) 123-4567</td>
                      <td>Engineering</td>
                      <td>Administrator</td>
                      <td>2023-01-15</td>
                      <td>2024-10-05</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Jane Smith</td>
                      <td>jane.smith@example.com</td>
                      <td>(555) 987-6543</td>
                      <td>Marketing</td>
                      <td>Editor</td>
                      <td>2023-03-22</td>
                      <td>2024-10-04</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Robert Brown</td>
                      <td>robert.brown@example.com</td>
                      <td>(555) 456-7890</td>
                      <td>Sales</td>
                      <td>Author</td>
                      <td>2023-05-10</td>
                      <td>2024-09-28</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-pending">
                          Pending
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Emily Wilson</td>
                      <td>emily.wilson@example.com</td>
                      <td>(555) 234-5678</td>
                      <td>HR</td>
                      <td>Subscriber</td>
                      <td>2023-07-18</td>
                      <td>2024-09-15</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-inactive">
                          Inactive
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Michael Davis</td>
                      <td>michael.davis@example.com</td>
                      <td>(555) 876-5432</td>
                      <td>Finance</td>
                      <td>Contributor</td>
                      <td>2023-09-05</td>
                      <td>2024-10-06</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>John Doe</td>
                      <td>john.doe@example.com</td>
                      <td>(555) 123-4567</td>
                      <td>Engineering</td>
                      <td>Administrator</td>
                      <td>2023-01-15</td>
                      <td>2024-10-05</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Jane Smith</td>
                      <td>jane.smith@example.com</td>
                      <td>(555) 987-6543</td>
                      <td>Marketing</td>
                      <td>Editor</td>
                      <td>2023-03-22</td>
                      <td>2024-10-04</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Robert Brown</td>
                      <td>robert.brown@example.com</td>
                      <td>(555) 456-7890</td>
                      <td>Sales</td>
                      <td>Author</td>
                      <td>2023-05-10</td>
                      <td>2024-09-28</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-pending">
                          Pending
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Emily Wilson</td>
                      <td>emily.wilson@example.com</td>
                      <td>(555) 234-5678</td>
                      <td>HR</td>
                      <td>Subscriber</td>
                      <td>2023-07-18</td>
                      <td>2024-09-15</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-inactive">
                          Inactive
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Michael Davis</td>
                      <td>michael.davis@example.com</td>
                      <td>(555) 876-5432</td>
                      <td>Finance</td>
                      <td>Contributor</td>
                      <td>2023-09-05</td>
                      <td>2024-10-06</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>John Doe</td>
                      <td>john.doe@example.com</td>
                      <td>(555) 123-4567</td>
                      <td>Engineering</td>
                      <td>Administrator</td>
                      <td>2023-01-15</td>
                      <td>2024-10-05</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Jane Smith</td>
                      <td>jane.smith@example.com</td>
                      <td>(555) 987-6543</td>
                      <td>Marketing</td>
                      <td>Editor</td>
                      <td>2023-03-22</td>
                      <td>2024-10-04</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Robert Brown</td>
                      <td>robert.brown@example.com</td>
                      <td>(555) 456-7890</td>
                      <td>Sales</td>
                      <td>Author</td>
                      <td>2023-05-10</td>
                      <td>2024-09-28</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-pending">
                          Pending
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Emily Wilson</td>
                      <td>emily.wilson@example.com</td>
                      <td>(555) 234-5678</td>
                      <td>HR</td>
                      <td>Subscriber</td>
                      <td>2023-07-18</td>
                      <td>2024-09-15</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-inactive">
                          Inactive
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="./../aarif/doctor img.png" alt="User Image" />
                      </td>
                      <td>Michael Davis</td>
                      <td>michael.davis@example.com</td>
                      <td>(555) 876-5432</td>
                      <td>Finance</td>
                      <td>Contributor</td>
                      <td>2023-09-05</td>
                      <td>2024-10-06</td>
                      <td>
                        <span className="vrdentastatus vrdentastatus-active">
                          Active
                        </span>
                      </td>
                      <td>
                        <div className="vrdentatableactions">
                          <button className="vrdentatablebtn vrdentatablebtn-edit">
                            Edit
                          </button>
                          <button className="vrdentatablebtn vrdentatablebtn-delete">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Forms Section */}
          <div id="forms" className="vrdentacontentsection">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Forms</h1>
              <button
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
                <i className="fas fa-save" /> Save Form
              </button>
            </div>
            <div className="vrdentacard">
              <div className="vrdentacardheader">
                <h2 className="vrdentacardtitle">User Registration Form</h2>
              </div>
              <div style={{ padding: "20px 0" }}>
                <p>
                  Forms functionality will be implemented here. This is a
                  placeholder for the forms section.
                </p>
              </div>
            </div>
          </div>
          {/* Other Sections (Widgets, Calendar, Profile) */}
          <div id="widgets" className="vrdentacontentsection">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Widgets</h1>
            </div>
            <div className="vrdentacard">
              <div className="vrdentacardheader">
                <h2 className="vrdentacardtitle">Widgets Section</h2>
              </div>
              <div style={{ padding: "20px 0" }}>
                <p>Widgets content will be displayed here.</p>
              </div>
            </div>
          </div>
          <div id="calendar" className="vrdentacontentsection">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Calendar</h1>
            </div>
            <div className="vrdentacard">
              <div className="vrdentacardheader">
                <h2 className="vrdentacardtitle">Calendar Section</h2>
              </div>
              <div style={{ padding: "20px 0" }}>
                <p>Calendar content will be displayed here.</p>
              </div>
            </div>
          </div>
          <div id="profile" className="vrdentacontentsection">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                User Profile
              </h1>
            </div>
            <div className="vrdentacard">
              <div className="vrdentacardheader">
                <h2 className="vrdentacardtitle">Profile Section</h2>
              </div>
              <div style={{ padding: "20px 0" }}>
                <p>User profile content will be displayed here.</p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <footer
            style={{
              textAlign: "center",
              padding: "20px 0",
              borderTop: "1px solid var(--border-color)",
              marginTop: 30,
              fontSize: "0.8rem",
              color: "var(--text-muted)",
            }}
          >
            Copyright © 2024 VRDENTA Dashboard. All rights reserved.
          </footer>
        </div>
        {/* End Dashboard Body */}
      </div>
    </Doctorlayout>
  );
};

export default Doctorpannel;
