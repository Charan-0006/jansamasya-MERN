import {
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "./Settings.css";

export default function Settings() {

  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  if (!storedUser) {

    return <Navigate to="/" />;
  }

  const [name, setName] =
    useState(storedUser.name);

  const [email, setEmail] =
    useState(storedUser.email);

  // =====================
  // SAVE CHANGES
  // =====================

  const handleSave = async () => {

    try {

      const response =
        await axios.put(

           `https://jansamasya-mern.onrender.com/api/auth/${storedUser._id}`,

          {
            name,
            email,
          }
        );

      // UPDATE LOCAL STORAGE

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      alert(
        "Profile updated successfully ✅"
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);

      alert("Failed to update profile");
    }
  };

  return (

    <div className="settings-container">

      <div className="settings-card">

        <h2>Account Settings</h2>

        {/* PROFILE INFO */}

        <div className="section">

          <h3>Profile Info</h3>

          <label>Name</label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <label>Email</label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* PASSWORD */}

        <div className="section">

          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Old Password"
          />

          <input
            type="password"
            placeholder="New Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

        </div>

        {/* ACTIONS */}

        <div className="actions">

          <button
            className="save-btn"
            onClick={handleSave}
          >

            Save Changes

          </button>

          <button
            className="cancel-btn"

            onClick={() =>
              navigate("/profile")
            }
          >

            Cancel

          </button>

        </div>

      </div>

    </div>
  );
}