import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Profile.css";

export default function Profile() {

  const navigate = useNavigate();

  const [issues, setIssues] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =====================
  // PROTECT ROUTE
  // =====================

  if (!user) {

    return <Navigate to="/" />;
  }

  // =====================
  // FETCH ISSUES
  // =====================

  useEffect(() => {

    fetchIssues();

  }, []);

  const fetchIssues = async () => {

    try {

      const response = await axios.get(
         `https://jansamasya-mern.onrender.com/api/issues/${id}`
      );

      setIssues(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =====================
  // USER ISSUES
  // =====================

  const userIssues = issues.filter(
    (issue) =>
      issue.user === user?.name
  );

  // =====================
  // STATS
  // =====================

  const total =
    userIssues.length;

  const pending =
    userIssues.filter(
      (i) =>
        i.status
          ?.toLowerCase() ===
        "pending"
    ).length;

  const resolved =
    userIssues.filter(
      (i) =>
        i.status
          ?.toLowerCase() ===
        "resolved"
    ).length;

  return (

    <div className="profile-container">

      {/* HEADER */}

      <div className="profile-header glass">

        <div className="avatar-lg">

          {user.name
            .charAt(0)
            .toUpperCase()}

        </div>

        <div>

          <h2>{user.name}</h2>

          <p>{user.email}</p>

          <span>

            Joined:{" "}

            {user.createdAt
              ? new Date(
                  user.createdAt
                ).toDateString()
              : "Recently"}

          </span>

        </div>

        {/* ACTIONS */}

        <div className="profile-actions">

          <button
            className="btn secondary"
            onClick={() =>
              navigate("/dashboard")
            }
          >

            ⬅ Dashboard

          </button>

          <button
            className="btn"
            onClick={() =>
              navigate("/settings")
            }
          >

            Edit Profile

          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="profile-stats">

        <div className="stat-card glass">

          <h3>{total}</h3>

          <p>Total Issues</p>

        </div>

        <div className="stat-card glass">

          <h3>{pending}</h3>

          <p>Pending</p>

        </div>

        <div className="stat-card glass">

          <h3>{resolved}</h3>

          <p>Resolved</p>

        </div>

      </div>

      {/* MY ISSUES */}

      <div className="profile-issues">

        <h2>My Issues</h2>

        {userIssues.length === 0 ? (

          <p className="no-issues">

            No issues reported yet

          </p>

        ) : (

          userIssues.map((issue) => (

            <div
              className="issue-card glass"

              key={issue._id}

              onClick={() =>
                navigate(
                  `/issue/${issue._id}`
                )
              }
            >

              <div className="issue-left">

                <h4>
                  {issue.title}
                </h4>

                <span className="time">

                  📅{" "}

                  {new Date(
                    issue.createdAt
                  ).toLocaleString()}

                </span>

              </div>

              <div
                className={`status ${issue.status}`}
              >

                {issue.status}

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}