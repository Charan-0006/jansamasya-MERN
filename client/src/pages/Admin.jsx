import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import "./Admin.css";

export default function Admin() {

  const navigate = useNavigate();

  // =====================
  // STATES
  // =====================

  const [issues, setIssues] =
    useState([]);

  const [contacts, setContacts] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [showMessages,
    setShowMessages] =
    useState(false);

  // =====================
  // FETCH DATA
  // =====================

  useEffect(() => {

    fetchIssues();

    fetchContacts();

  }, []);

  // =====================
  // FETCH ISSUES
  // =====================

  const fetchIssues = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/issues"
        );

      setIssues(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =====================
  // FETCH CONTACTS
  // =====================

  const fetchContacts = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/contact"
        );

      // NEWEST FIRST

      const sorted =
        response.data.reverse();

      setContacts(sorted);

    } catch (error) {

      console.log(error);
    }
  };

  // =====================
  // TOGGLE STATUS
  // =====================

  const toggleStatus = async (
    id,
    currentStatus
  ) => {

    try {

      const updatedStatus =

        currentStatus === "Pending"
          ? "Resolved"
          : "Pending";

      await axios.put(
        `http://localhost:5000/api/issues/${id}`,
        {
          status: updatedStatus,
        }
      );

      fetchIssues();

    } catch (error) {

      console.log(error);
    }
  };

  // =====================
  // DELETE ISSUE
  // =====================

  const deleteIssue = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/issues/${id}`
      );

      fetchIssues();

    } catch (error) {

      console.log(error);
    }
  };

  // =====================
  // LOGOUT
  // =====================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/");
  };

  // =====================
  // FILTER ISSUES
  // =====================

  const filteredIssues =
    issues.filter((issue) => {

      if (filter === "all")
        return true;

      return (
        issue.status
          ?.toLowerCase() ===
        filter
      );
    });

  return (

    <div className="admin-page">

      {/* HEADER */}

      <div className="admin-header">

        <div>

          <h1>Admin Panel</h1>

          <p>
            Manage city complaints
          </p>

        </div>

        {/* RIGHT SIDE */}

        <div className="admin-top-right">

          {/* MESSAGES */}

          <div
            className="message-btn"

            onClick={() =>
              setShowMessages(
                !showMessages
              )
            }
          >

            💬 Messages

            {contacts.length > 0 && (

              <span className="badge">

               {
  contacts.filter(
    (msg) => !msg.read
  ).length
}

              </span>

            )}

          </div>

          {/* LOGOUT */}

          <button
            className="logout-btn"

            onClick={handleLogout}
          >

            Logout

          </button>

        </div>

      </div>

      {/* MESSAGE POPUP */}

      {showMessages && (

        <div className="message-popup">

          <h2>
            Contact Messages
          </h2>

          {contacts.length === 0 ? (

            <p>No messages</p>

          ) : (

            contacts.map((msg) => (

              <div
                className="message-card"

                key={msg._id}
              >

                <div className="message-top">

                  <h3>{msg.name}</h3>

                  <span>

                    {new Date(
                      msg.createdAt
                    ).toLocaleString()}

                  </span>

                </div>

                <p>
                  📧 {msg.email}
                </p>

                <p>
                  📌 {msg.subject}
                </p>

                <p>
                  {msg.message}
                </p>

              </div>

            ))
          )}

        </div>

      )}

      {/* STATS */}

      <div className="admin-stats">

        <div className="stat total">

          <h3>{issues.length}</h3>

          <p>Total Issues</p>

        </div>

        <div className="stat pending">

          <h3>

            {
              issues.filter(
                (i) =>
                  i.status
                    ?.toLowerCase() ===
                  "pending"
              ).length
            }

          </h3>

          <p>Pending</p>

        </div>

        <div className="stat resolved">

          <h3>

            {
              issues.filter(
                (i) =>
                  i.status
                    ?.toLowerCase() ===
                  "resolved"
              ).length
            }

          </h3>

          <p>Resolved</p>

        </div>

      </div>

      {/* FILTERS */}

      <div className="admin-filters">

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

      {/* ISSUES */}

      <div className="admin-list">

        {filteredIssues.length ===
        0 ? (

          <p>No issues found</p>

        ) : (

          filteredIssues.map(
            (issue) => (

              <div
                className="admin-card"
                key={issue._id}
              >

                {issue.image && (

                  <img
                    src={issue.image}
                    alt="issue"
                  />

                )}

                <div className="admin-content">

                  <h3>
                    {issue.title}
                  </h3>

                  <p>
                    📍 {issue.location}
                  </p>

                  <p>
                    👤 {issue.user}
                  </p>

                  <span
                    className={`status ${issue.status}`}
                  >

                    {issue.status}

                  </span>

                  <div className="admin-actions">

                    <button
                      className="resolve"

                      onClick={() =>
                        toggleStatus(
                          issue._id,
                          issue.status
                        )
                      }
                    >

                      {issue.status ===
                      "Pending"

                        ? "Resolve"

                        : "Reopen"}

                    </button>

                    <button
                      className="delete"

                      onClick={() =>
                        deleteIssue(
                          issue._id
                        )
                      }
                    >

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))
        )}

      </div>

    </div>
  );
}