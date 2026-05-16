import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Report.css";
import axios from "axios";

function Report({ user }) {

  const navigate = useNavigate();

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const categories = ["Garbage", "Road", "Water", "Electricity"];

  // =====================
  // IMAGE TO BASE64
  // =====================

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);

    });

  // =====================
  // IMAGE CHANGE
  // =====================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  // =====================
  // REVERSE GEOLOCATION
  // =====================

  const getLocationName = async (lat, lon) => {

    try {

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      const data = await res.json();

      return data.display_name || "Unknown location";

    } catch (err) {

      return "Location unavailable";
    }
  };

  // =====================
  // GET CURRENT LOCATION
  // =====================

  const getLocation = () => {

    if (!navigator.geolocation) {

      alert("Geolocation not supported");

      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const { latitude, longitude } = position.coords;

          const locationName = await getLocationName(
            latitude,
            longitude
          );

          setLocation(locationName);

        } catch (err) {

          alert("Unable to fetch location");

        } finally {

          setLoadingLocation(false);
        }
      },

      () => {

        setLoadingLocation(false);

        alert("Permission denied or unable to fetch location");

      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =====================
  // SUBMIT ISSUE
  // =====================

  const handleSubmit = async () => {

    if (!title || !desc || !category || !location) {

      alert("Please fill all required fields");

      return;
    }

    try {

      let imgBase64 = "";

      if (image) {
        imgBase64 = await toBase64(image);
      }

      const newIssue = {
  title,
  description: desc,
  category,
  location,
  image: imgBase64,

  user:
    user?.name ||
    "Anonymous",
};

      const response = await axios.post(
        "http://localhost:5000/api/issues",
        newIssue
      );

      console.log(response.data);

      alert("Issue Submitted Successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Submission Failed");
    }
  };

  return (

    <div className="report-page">

      {/* HERO */}

      <div className="report-hero">
        <h1>Report an Issue</h1>
        <p>
          Help improve your community by reporting problems quickly
        </p>
      </div>

      {/* MAIN */}

      <div className="report-main">

        {/* LEFT */}

        <div className="report-left">

          <h3>Tips</h3>

          <ul>
            <li>Add clear title</li>
            <li>Upload image for faster action</li>
            <li>Choose correct category</li>
            <li>Provide accurate location</li>
          </ul>

          <div className="process-box">

            <h4>What happens next?</h4>

            <ul>
              <li>Your issue is reviewed</li>
              <li>Authorities take action</li>
              <li>You can track progress</li>
            </ul>

          </div>
        </div>

        {/* RIGHT */}

        <div className="report-right">

          <div className="report-card">

            {/* CATEGORY */}

            <div className="field full">

              <label>Category</label>

              <div className="category-container">

                {categories.map((cat) => (

                  <button
                    key={cat}
                    type="button"
                    className={
                      category === cat
                        ? "cat-btn active"
                        : "cat-btn"
                    }
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>

                ))}

              </div>

            </div>

            {/* TITLE */}

            <div className="field">

              <label>Issue Title</label>

              <input
                type="text"
                placeholder="e.g. Garbage not cleaned"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

            </div>

            {/* LOCATION */}

            <div className="field">

              <label>Location</label>

              <div className="location-box">

                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <button
                  type="button"
                  className={`loc-btn ${
                    loadingLocation ? "loading" : ""
                  }`}
                  onClick={getLocation}
                  disabled={loadingLocation}
                >

                  {loadingLocation ? (

                    <div className="location-loading">

                      <div className="loader"></div>

                      <span>Detecting Location...</span>

                    </div>

                  ) : (
                    "📍 Use Current"
                  )}

                </button>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="field full">

              <label>Description</label>

              <textarea
                placeholder="Describe the issue clearly..."
                value={desc}
                maxLength={200}
                onChange={(e) => setDesc(e.target.value)}
              />

              <p className="char-count">
                {desc.length}/200
              </p>

            </div>

            {/* IMAGE */}

            <div
              className="upload-box full"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {

                e.preventDefault();

                const file = e.dataTransfer.files[0];

                if (file) {
                  setImage(file);
                }
              }}
            >

              <p>Drag & drop image here</p>

              <div className="upload-divider">
                <span>or</span>
              </div>

              <label className="upload-btn">

                Browse File

                <input
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />

              </label>

            </div>

            {/* PREVIEW */}

            {image && (

              <div className="image-box">

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="preview-img"
                />

              </div>

            )}

            {/* ACTIONS */}

            <div className="report-actions">

              <button
                className="cancel"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                className="submit"
                onClick={handleSubmit}
              >
                Submit Issue
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Report;
