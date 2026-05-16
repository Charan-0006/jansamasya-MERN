import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./ViewIssues.css";

function ViewIssues() {

  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

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
  // FILTER + SEARCH
  // =====================

  const filteredIssues = issues.filter((issue) => {

    const status =
      issue.status?.toLowerCase() || "pending";

    const matchStatus =

      filter === "all"
        ? true
        : status === filter;

    const matchSearch =

      issue.title
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      issue.location
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      issue.category
        ?.toLowerCase()
        .includes(search.toLowerCase());

    return (
      matchStatus &&
      matchSearch
    );
  });

  return (

    <div className="view-page">

      {/* TOP BAR */}

      <div className="top-bar">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/dashboard")
          }
        >

          ← Dashboard

        </button>

      </div>

      {/* HEADER */}

      <div className="view-header">

        <h1>All Issues</h1>

        <p>
          Explore and track all reported problems
        </p>

      </div>

      {/* SEARCH */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search by title, category, or location..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* STATS */}

      <div className="stats">

        <span>
          Total: {issues.length}
        </span>

        <span>

          Pending:

          {
            issues.filter(
              i =>
                i.status
                  ?.toLowerCase() === "pending"
            ).length
          }

        </span>

        <span>

          Resolved:

          {
            issues.filter(
              i =>
                i.status
                  ?.toLowerCase() === "resolved"
            ).length
          }

        </span>

      </div>

      {/* FILTERS */}

      <div className="filters">

        <button
          className={
            filter === "all"
              ? "active"
              : ""
          }

          onClick={() =>
            setFilter("all")
          }
        >

          All

        </button>

        <button
          className={
            filter === "pending"
              ? "active"
              : ""
          }

          onClick={() =>
            setFilter("pending")
          }
        >

          Pending

        </button>

        <button
          className={
            filter === "resolved"
              ? "active"
              : ""
          }

          onClick={() =>
            setFilter("resolved")
          }
        >

          Resolved

        </button>

      </div>

      {/* ISSUES GRID */}

      <div className="issues-grid">

        {filteredIssues.length === 0 ? (

          <p className="empty">
            No issues found
          </p>

        ) : (

          filteredIssues.map((issue) => (

            <div
              key={issue._id}
              className="issue-card"

              onClick={() =>
                navigate(`/issue/${issue._id}`)
              }
            >

              {/* IMAGE */}

              <img
                src={
                  issue.image ||
                  "https://via.placeholder.com/300"
                }
                alt="issue"
              />

              <div className="issue-content">

                {/* CATEGORY */}

                <span className="category">

                  {issue.category}

                </span>

                {/* TITLE */}

                <h3>
                  {issue.title}
                </h3>

                {/* LOCATION */}

                <p className="location">

                  📍 {issue.location}

                </p>

                {/* USER */}

                <p className="user">

                  👤 {issue.user || "Anonymous"}

                </p>

                {/* STATUS */}

                <span
                  className={`status ${
                    issue.status?.toLowerCase()
                  }`}
                >

                  {issue.status}

                </span>

                {/* META */}

                <div className="meta">

                  <span>
                    ❤️ {issue.likes || 0}
                  </span>

                  <span>
                    💬 {issue.comments?.length || 0}
                  </span>

                </div>

                {/* TIME */}

                <p className="time">

                  📅{" "}

                  {new Date(
                    issue.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          ))
        )}

      </div>

    </div>
  );
}

export default ViewIssues;