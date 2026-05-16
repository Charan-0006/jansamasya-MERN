import { useState } from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

const ADMIN_EMAIL = "admin@jansamasya.com";
const ADMIN_PASSWORD = "admin123";

function AuthForm({ setUser }) {

  // PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);

  // LOGIN / REGISTER
  const [isLogin, setIsLogin] = useState(true);

  // USER / ADMIN
  const [role, setRole] = useState("user");

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // VALIDATION STATES
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // SUCCESS STATES
  const [emailSuccess, setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const navigate = useNavigate();

  // =========================================
  // HANDLE SUBMIT
  // =========================================

  const handleSubmit = async () => {

  // EMPTY VALIDATION
  if (
    !email ||
    !password ||
    (!isLogin && role === "user" && !name)
  ) {

    alert("Please enter all fields");

    return;
  }

  // EMAIL VALIDATION
  if (!email.includes("@")) {

    setEmailError("Email must include @");

    return;
  }

  // PASSWORD VALIDATION
  if (password.length < 6) {

    setPasswordError(
      "Password must be at least 6 characters"
    );

    return;
  }

  // =========================
  // ADMIN LOGIN
  // =========================

  if (role === "admin") {

    if (
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {

      navigate("/admin");

    } else {

      alert("Invalid admin credentials");
    }

    return;
  }

  try {

    // =========================
    // LOGIN
    // =========================

    if (isLogin) {

      const response = await axios.post(
        "https://jansamasya-mern.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      // STORE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setUser(response.data.user);

      alert("Login Successful");

      navigate("/dashboard");

    }

    // =========================
    // REGISTER
    // =========================

    else {

      const response = await axios.post(
        "https://jansamasya-mern.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");

      setIsLogin(true);
    }

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};
  // =========================================
  // UI
  // =========================================

  return (

    <div className="auth-page">
      <div className="flag-wave"></div>

      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <div className="auth-left">

        <div className="hero-animation">

  <Player
    autoplay
    loop
    src="https://assets10.lottiefiles.com/packages/lf20_jcikwtux.json"
    className="hero-player"
  />

</div>


       
        

        {/* LOGO */}
        <div className="auth-logo-wrap">

          <div className="auth-brand">
            JanSamasya 🇮🇳
          </div>

        </div>

        {/* HERO TEXT */}
        <div className="auth-hero-text">

          <h1>
            Report. Track. <span>Resolve.</span>
          </h1>

          <p>
            A smart civic platform connecting
            citizens with authorities for faster
            resolution of public problems across India.
          </p>

        </div>

        {/* FEATURES */}
        <div className="auth-features">

          {[
            "Report civic issues with photos & location",
            "Track real-time resolution progress",
            "Community upvoting for priority issues",
            "Transparent admin dashboard"
          ].map((feature) => (

            <div
              key={feature}
              className="auth-feature-item"
            >

              <div className="dot" />

              <span>{feature}</span>

            </div>

          ))}

        </div>

      </div>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <div className="auth-right">

        <div className="auth-card">

          {/* TITLE */}
          <h2 className="auth-card-title">

            {role === "admin"
              ? "Admin Portal"
              : isLogin
                ? "Welcome back"
                : "Create account"}

          </h2>

          {/* SUBTITLE */}
          <p className="auth-card-sub">

            {role === "admin"
              ? "Sign in with admin credentials"
              : isLogin
                ? "Sign in to your account"
                : "Join the civic movement"}

          </p>

          {/* =========================================
              ROLE TABS
          ========================================= */}

          <div className="role-tabs">

            <button
              className={`role-tab ${role === "user"
                  ? "active"
                  : ""
                }`}

              onClick={() =>
                setRole("user")
              }
            >

              👤 User

            </button>

            <button
              className={`role-tab ${role === "admin"
                  ? "active"
                  : ""
                }`}

              onClick={() =>
                setRole("admin")
              }
            >

              🛡️ Authority

            </button>

          </div>

          {/* =========================================
              LOGIN / REGISTER TOGGLE
          ========================================= */}

          {role === "user" && (

            <div className="auth-toggle-tabs">

              <button
                className={`auth-toggle-tab ${isLogin
                    ? "active"
                    : ""
                  }`}

                onClick={() =>
                  setIsLogin(true)
                }
              >

                Login

              </button>

              <button
                className={`auth-toggle-tab ${!isLogin
                    ? "active"
                    : ""
                  }`}

                onClick={() =>
                  setIsLogin(false)
                }
              >

                Register

              </button>

            </div>

          )}

          {/* =========================================
              FORM
          ========================================= */}

          <div className="auth-form">

            {/* NAME FIELD */}
            {role === "user" && !isLogin && (

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"

                  placeholder="Enter your full name"

                  value={name}

                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            )}

            {/* =========================================
                EMAIL FIELD
            ========================================= */}

            <div className="form-group">

              <label>

                {role === "admin"
                  ? "Admin Email"
                  : "Email Address"}

              </label>

              <input
                type="email"

                placeholder={
                  role === "admin"
                    ? "admin@jansamasya.com"
                    : "you@example.com"
                }

                value={email}

                onChange={(e) => {

                  const value =
                    e.target.value;

                  setEmail(value);

                  // EMAIL VALIDATION
                  if (!value.includes("@")) {

                    setEmailError(
                      "Must include @"
                    );

                    setEmailSuccess("");
                  }

                  else {

                    setEmailError("");

                    setEmailSuccess(
                      "Looks good!"
                    );
                  }
                }}
              />

              {/* EMAIL ERROR */}
              {emailError && (

                <span className="input-hint error">

                  ⚠ {emailError}

                </span>

              )}

              {/* EMAIL SUCCESS */}
              {emailSuccess && !emailError && (

                <span className="input-hint success">

                  ✓ {emailSuccess}

                </span>

              )}

            </div>

            {/* =========================================
                PASSWORD FIELD
            ========================================= */}

            <div className="form-group">

              <label>

                {role === "admin"
                  ? "Admin Password"
                  : "Password"}

              </label>

              {/* PASSWORD WRAPPER */}
              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Enter password"

                  value={password}

                  onChange={(e) => {

                    const value =
                      e.target.value;

                    setPassword(value);

                    // PASSWORD VALIDATION
                    if (value.length < 6) {

                      setPasswordError(
                        "At least 6 characters"
                      );

                      setPasswordSuccess("");
                    }

                    else {

                      setPasswordError("");

                      setPasswordSuccess(
                        "Strong password"
                      );
                    }
                  }}
                />

                {/* EYE TOGGLE */}
                <span
                  className="password-toggle"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />}

                </span>

              </div>

              {/* PASSWORD ERROR */}
              {passwordError && (

                <span className="input-hint error">

                  ⚠ {passwordError}

                </span>

              )}

              {/* PASSWORD SUCCESS */}
              {passwordSuccess && !passwordError && (

                <span className="input-hint success">

                  ✓ {passwordSuccess}

                </span>

              )}

            </div>

            {/* =========================================
                SUBMIT BUTTON
            ========================================= */}

            <button
              className="auth-submit-btn"

              onClick={handleSubmit}
            >

              {role === "admin"
                ? "Sign in as Authority"
                : isLogin
                  ? "Sign In →"
                  : "Create Account →"}

            </button>

          </div>

          {/* =========================================
              FOOTER
          ========================================= */}

          {role === "user" && (

            <p className="auth-footer">

              {isLogin
                ? "New here? "
                : "Already registered? "}

              <span
                onClick={() =>
                  setIsLogin(!isLogin)
                }
              >

                {isLogin
                  ? "Create an account"
                  : "Sign in"}

              </span>

            </p>

          )}

          {/* =========================================
              ADMIN HINT
          ========================================= */}

          {role === "admin" && (

            <p className="auth-hint">

              Demo:
              admin@jansamasya.com / admin123

            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default AuthForm;