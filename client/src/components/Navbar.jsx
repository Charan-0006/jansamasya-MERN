import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

import logo from "../assets/janSamasa_Logo.png";

function Navbar({ user, setUser }) {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  // =====================
  // LOGOUT
  // =====================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    alert("Logged out successfully");

    navigate("/");
  };

  return (

    <div className="navbar">

      {/* LEFT SIDE */}

      <div className="nav-left">

        <img
          src={logo}
          alt="logo"
          className="nav-logo"
          onClick={() => navigate("/dashboard")}
        />

        <span onClick={() => navigate("/dashboard")}>
          Home
        </span>

        <span onClick={() => navigate("/about")}>
          About
        </span>

        <span onClick={() => navigate("/report")}>
          Report Problem
        </span>

        <span onClick={() => navigate("/track")}>
          History
        </span>

        <span onClick={() => navigate("/contact")}>
          Contact Us
        </span>

      </div>

      {/* RIGHT SIDE */}

      <div className="nav-right">

        <div className="profile-box">

          <div
            className="avatar"
            onClick={() => setOpen(!open)}
          >

            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}

          </div>

          {open && (

            <div className="dropdown">

              <p onClick={() => navigate("/profile")}>
                My Profile
              </p>

              <p onClick={() => navigate("/settings")}>
                Settings
              </p>

              {/* LOGOUT */}

              <p onClick={handleLogout}>
                Logout
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;