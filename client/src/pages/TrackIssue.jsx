import {
  useState,
  useMemo,
  useEffect,
} from "react";

import axios from "axios";

import "./TrackIssue.css";


// =====================
// ICON COMPONENT
// =====================

const Icon = ({
  d,
  size = 18,
  color = "currentColor",
}) => (

  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >

    <path d={d} />

  </svg>
);


// =====================
// ICONS
// =====================

const ICONS = {

  search:
    "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",

  inbox:
    "M22 12h-6l-2 3h-4l-2-3H2",
};


// =====================
// STATUS CONFIG
// =====================

const STATUS_CONFIG = {

  pending: {
    label: "Pending",
    color: "#f59e0b",
  },

  resolved: {
    label: "Resolved",
    color: "#10b981",
  },

  "in-progress": {
    label: "In Progress",
    color: "#3b82f6",
  },
};


// =====================
// CATEGORY EMOJIS
// =====================

const CAT_EMOJI = {

  Garbage: "🗑️",
  Road: "🛣️",
  Water: "💧",
  Electricity: "⚡",
  Other: "📌",
};


// =====================
// TABS
// =====================

const TABS = [
  "All",
  "Pending",
  "In Progress",
  "Resolved",
];


// =====================
// ISSUE CARD
// =====================

function IssueCard({ issue }) {

  const st =
    STATUS_CONFIG[
      issue.status?.toLowerCase()
    ] || STATUS_CONFIG.pending;

  return (

    <div className="tk-card">

      {/* IMAGE */}

      {issue.image && (

        <img
          src={issue.image}
          alt="issue"
          className="tk-card__img"
        />

      )}

      <div className="tk-card__body">

        <div className="tk-card__top">

          <span className="tk-card__id">

            JS-{issue._id.slice(-5)}

          </span>

          <span
            className="tk-status"
            style={{
              background: st.color,
            }}
          >

            {st.label}

          </span>

        </div>

        {/* TITLE */}

        <h3 className="tk-card__title">

          {issue.title}

        </h3>

        {/* DESCRIPTION */}

        <p className="tk-card__desc">

          {issue.description}

        </p>

        {/* META */}

        <div className="tk-card__meta">

          <span>

            {
              CAT_EMOJI[
                issue.category
              ]
            }{" "}

            {issue.category}

          </span>

          <span>

            📍 {issue.location}

          </span>

          <span>

            🕒{" "}

            {new Date(
              issue.createdAt
            ).toLocaleString()}

          </span>

        </div>

      </div>

    </div>
  );
}


// =====================
// MAIN COMPONENT
// =====================

function TrackIssue({ user }) {

  const [issues, setIssues] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("All");

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
  // USER ISSUES
  // =====================

  const userIssues = useMemo(() => {

    return issues.filter(
      (issue) =>
        issue.user === user?.name
    );

  }, [issues, user]);

  // =====================
  // STATS
  // =====================

  const stats = useMemo(() => ({

    total:
      userIssues.length,

    pending:
      userIssues.filter(
        i =>
          i.status
            ?.toLowerCase() ===
          "pending"
      ).length,

    inProgress:
      userIssues.filter(
        i =>
          i.status
            ?.toLowerCase() ===
          "in-progress"
      ).length,

    resolved:
      userIssues.filter(
        i =>
          i.status
            ?.toLowerCase() ===
          "resolved"
      ).length,

  }), [userIssues]);

  // =====================
  // FILTER
  // =====================

  const filtered = useMemo(() => {

    return userIssues.filter((i) => {

      const tabMatch =

        activeTab === "All"
          ? true

        : activeTab ===
          "Pending"
          ? i.status
              ?.toLowerCase() ===
            "pending"

        : activeTab ===
          "In Progress"
          ? i.status
              ?.toLowerCase() ===
            "in-progress"

        : i.status
            ?.toLowerCase() ===
          "resolved";

      const searchMatch =

        i.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        i.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        tabMatch &&
        searchMatch
      );

    });

  }, [
    userIssues,
    activeTab,
    search,
  ]);

  return (

    <div className="tk-page">

      {/* HERO */}

      <div className="tk-hero">

        <div className="tk-hero__badge">

          Smart Civic Tracker

        </div>

        <h1 className="tk-hero__title">

          Track Your Complaints

        </h1>

        <p className="tk-hero__sub">

          Monitor all issues reported
          by you in real-time.

        </p>

      </div>

      {/* STATS */}

      <div className="tk-stats">

        <div className="tk-stat">

          <h2>{stats.total}</h2>

          <p>Total Reports</p>

        </div>

        <div className="tk-stat">

          <h2>{stats.pending}</h2>

          <p>Pending</p>

        </div>

        <div className="tk-stat">

          <h2>{stats.inProgress}</h2>

          <p>In Progress</p>

        </div>

        <div className="tk-stat">

          <h2>{stats.resolved}</h2>

          <p>Resolved</p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="tk-search">

        <Icon
          d={ICONS.search}
          size={16}
        />

        <input
          type="text"
          placeholder="Search issues..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      {/* TABS */}

      <div className="tk-tabs">

        {TABS.map((tab) => (

          <button
            key={tab}
            className={
              activeTab === tab
                ? "tk-tab active"
                : "tk-tab"
            }

            onClick={() =>
              setActiveTab(tab)
            }
          >

            {tab}

          </button>

        ))}

      </div>

      {/* GRID */}

      {filtered.length === 0 ? (

        <div className="tk-empty">

          <Icon
            d={ICONS.inbox}
            size={50}
          />

          <h3>No issues found</h3>

        </div>

      ) : (

        <div className="tk-grid">

          {filtered.map((issue) => (

            <IssueCard
              key={issue._id}
              issue={issue}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default TrackIssue;