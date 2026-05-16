import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FaWhatsapp } from "react-icons/fa";

import { useState, useEffect } from "react";

import axios from "axios";

function Dashboard({ user }) {

  const navigate = useNavigate();

  const [filter, setFilter] = useState("all");

  const [issues, setIssues] = useState([]);

  // =====================
  // FETCH ISSUES
  // =====================

  useEffect(() => {

    fetchIssues();

  }, []);

  const fetchIssues = async () => {

    try {

      const response = await axios.get(
        "https://jansamasya-mern.onrender.com/api/issues"
      );

      setIssues(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // =====================
  // HANDLE LIKE
  // =====================

  const handleLike = (id) => {

    setIssues((prev) =>
      prev.map((issue) => {

        if (issue._id === id) {

          return {
            ...issue,
            liked: !issue.liked,
            likes: issue.liked
              ? (issue.likes || 0) - 1
              : (issue.likes || 0) + 1,
          };
        }

        return issue;

      })
    );
  };

  // =====================
  // STATS
  // =====================

  const totalIssues = issues.length;

  const pendingIssues = issues.filter(
    (i) => i.status?.toLowerCase() === "pending"
  ).length;

  const resolvedIssues = issues.filter(
    (i) => i.status?.toLowerCase() === "resolved"
  ).length;

  return (

    <div className="dash">

      {/* CONTENT */}

      <div className="content">

        <h1 className="title">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="subtitle">
          Here’s what’s happening in your area
        </p>

        {/* STATS */}

        <div className="stats">

          <div className="stat-card">
            <h2>{totalIssues}</h2>
            <p>Issues Reported</p>
          </div>

          <div className="stat-card">
            <h2>{pendingIssues}</h2>
            <p>Pending</p>
          </div>

          <div className="stat-card">
            <h2>{resolvedIssues}</h2>
            <p>Resolved</p>
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="actions">

          <div
            className="action-card"
            onClick={() => navigate("/report")}
          >
            <h3>📢</h3>
            <p>Report New Issue</p>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/issues")}
          >
            <h3>📋</h3>
            <p>View Issues</p>
          </div>

          <div
            className="action-card"
            onClick={() => navigate("/track")}
          >
            <h3>📍</h3>
            <p>Track Issue</p>
          </div>

        </div>

        {/* FILTERS */}

        <div className="filters">

          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "pending" ? "active" : ""}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={filter === "resolved" ? "active" : ""}
            onClick={() => setFilter("resolved")}
          >
            Resolved
          </button>

        </div>

        {/* RECENT ISSUES */}

        <div className="recent">

          <h2>Recent Issues</h2>

          <div className="recent-list">

            {issues.length === 0 ? (

              <p style={{ color: "#777" }}>
                No issues reported yet
              </p>

            ) : (

              issues
                .filter((issue) => {

                  if (filter === "all") return true;

                  return (
                    issue.status?.toLowerCase() === filter
                  );
                })

                .map((issue) => (

                  <div
                    className="recent-card"
                    key={issue._id}
                    onClick={() =>
                      navigate(`/issue/${issue._id}`)
                    }
                  >

                    <img
                      src={
                        issue.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt="issue"
                    />

                    <div className="recent-content">

                      {/* TITLE */}

                      <h4>{issue.title}</h4>

                      {/* STATUS */}

                      <p
                        className={
                          issue.status?.toLowerCase() ===
                          "pending"
                            ? "pending"
                            : "resolved"
                        }
                      >

                        {issue.status}

                      </p>

                      {/* DESCRIPTION */}

                      <p className="issue-desc">
                        {issue.description}
                      </p>

                      {/* META */}

                      <div className="issue-meta">

                        <span>
                          📍 {issue.location || "Unknown"}
                        </span>

                        <span>
                          👤 {issue.user || "Anonymous"}
                        </span>

                        <span>
                          🏷️ {issue.category || "General"}
                        </span>

                      </div>

                      {/* TIME */}

                      <span className="time">

                        📅{" "}
                        {new Date(
                          issue.createdAt
                        ).toLocaleString()}

                      </span>

                      {/* ACTIONS */}

                      <div className="actions-row">

                        <span
                          onClick={(e) => {

                            e.stopPropagation();

                            handleLike(issue._id);

                          }}
                          style={{
                            cursor: "pointer",
                            color: issue.liked
                              ? "red"
                              : "#555",
                          }}
                        >

                          ❤️ {issue.likes || 0}

                        </span>

                        <span>
                          💬 {issue.comments?.length || 0}
                        </span>

                      </div>

                    </div>

                  </div>

                ))
            )}

          </div>

        </div>

      </div>

      {/* WHATSAPP */}

      <a
        href="https://wa.me/917013650700"
        className="whatsapp-btn"
        target="_blank"
        rel="noreferrer"
      >

        <FaWhatsapp />

      </a>

    </div>
  );
}

export default Dashboard;