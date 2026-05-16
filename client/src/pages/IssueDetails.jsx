import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import "./IssueDetails.css";

function IssueDetails({ user }) {

  const { id } = useParams();

  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);

  const [newComment, setNewComment] =
    useState("");

  // =====================
  // FETCH ISSUE
  // =====================

  useEffect(() => {

    fetchIssue();

  }, []);

  const fetchIssue = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/issues/${id}`
      );

      setIssue(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =====================
  // LOADING
  // =====================

  if (!issue) {

    return (
      <h2 style={{ padding: "40px" }}>
        Loading...
      </h2>
    );
  }

  // =====================
  // LIKE ISSUE
  // =====================

  const handleLike = () => {

    setIssue((prev) => ({
      ...prev,
      liked: !prev.liked,
      likes: prev.liked
        ? (prev.likes || 0) - 1
        : (prev.likes || 0) + 1,
    }));
  };

  // =====================
  // ADD COMMENT
  // =====================

  const handleAddComment = () => {

    if (!newComment.trim()) return;

    const updatedComments = [
      ...(issue.comments || []),

      {
        user:
          user?.name ||
          user ||
          "Anonymous",

        text: newComment,

        time:
          new Date().toLocaleTimeString(),

        likes: 0,
      },
    ];

    setIssue({
      ...issue,
      comments: updatedComments,
    });

    setNewComment("");
  };

  return (

    <div className="details">

      <div className="details-wrapper">

        {/* BACK */}

        <button
          className="back"
          onClick={() => navigate(-1)}
        >

          ← Back

        </button>

        {/* CARD */}

        <div className="details-card">

          {/* IMAGE */}

          <img
            src={
              issue.image ||
              "https://via.placeholder.com/500"
            }
            alt="issue"
          />

          <div className="info">

            {/* TITLE */}

            <h2>{issue.title}</h2>

            {/* STATUS */}

            <p
              className={
                issue.status === "Pending"
                  ? "pending"
                  : "resolved"
              }
            >

              {issue.status}

            </p>

            {/* META */}

            <p className="meta-info">

              👤 {issue.user || "Anonymous"}

              {" • "}

              📍{" "}
              {issue.location ||
                "Location unavailable"}

            </p>

            {/* TIME */}

            <p className="time">

              📅{" "}

              {new Date(
                issue.createdAt
              ).toLocaleString()}

            </p>

            {/* DESCRIPTION */}

            <p className="desc">

              {issue.description}

            </p>

            {/* ACTIONS */}

            <div className="actions">

              <span
                onClick={handleLike}
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

                💬{" "}

                {(issue.comments || []).length}

              </span>

            </div>

            {/* COMMENTS */}

            <div className="comment-section">

              <h3>Comments</h3>

              {(issue.comments || []).length >
              0 ? (

                issue.comments.map(
                  (c, index) => (

                    <div
                      key={index}
                      className="comment-row"
                    >

                      {/* AVATAR */}

                      <div className="avatar-sm">

                        {c.user
                          ?.charAt(0)
                          .toUpperCase()}

                      </div>

                      {/* BODY */}

                      <div className="comment-body">

                        <div className="comment-top">

                          <span className="user">

                            {c.user}

                          </span>

                          <span className="time">

                            {c.time}

                          </span>

                        </div>

                        <p className="text">

                          {c.text}

                        </p>

                      </div>

                    </div>

                  )
                )

              ) : (

                <p className="no-comments">

                  No comments yet

                </p>

              )}

              {/* INPUT */}

              <div className="comment-input">

                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) =>
                    setNewComment(
                      e.target.value
                    )
                  }
                />

                <button
                  onClick={handleAddComment}
                >

                  Post

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default IssueDetails;