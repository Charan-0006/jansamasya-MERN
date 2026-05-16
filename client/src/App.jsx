import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import IssueDetails from "./pages/IssueDetails";
import About from "./pages/About";
import Report from "./pages/Report";
import ViewIssues from "./pages/ViewIssues";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import TrackIssue from "./pages/TrackIssue";

function App() {

  const location = useLocation();

  // =====================
  // USER STATE
  // =====================

  const [user, setUser] = useState(null);

  // =====================
  // LOAD USER
  // =====================

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(JSON.parse(savedUser));
    }

  }, []);

  // =====================
  // SAVE USER
  // =====================

  useEffect(() => {

    if (user) {

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    }

  }, [user]);

  return (

    <>

      {/* NAVBAR */}

      {
  location.pathname !== "/" &&
  location.pathname !== "/admin" && (

    <Navbar
      user={user}
      setUser={setUser}
    />
  )
}

      <Routes>

        {/* AUTH PAGE */}

        <Route
          path="/"
          element={
            <AuthPage setUser={setUser} />
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard
                user={user}
              />

            </ProtectedRoute>
          }
        />

        {/* REPORT */}

        <Route
          path="/report"
          element={
            <ProtectedRoute>

              <Report
                user={user}
              />

            </ProtectedRoute>
          }
        />

        {/* ISSUE DETAILS */}

        <Route
          path="/issue/:id"
          element={
            <ProtectedRoute>

              <IssueDetails
                user={user}
              />

            </ProtectedRoute>
          }
        />

        {/* VIEW ISSUES */}

        <Route
          path="/issues"
          element={
            <ProtectedRoute>

              <ViewIssues />

            </ProtectedRoute>
          }
        />

        {/* TRACK */}

        <Route
          path="/track"
          element={
            <ProtectedRoute>

              <TrackIssue
                user={user}
              />

            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

        <Route
          path="/admin"
          element={
            <Admin />
          }
        />

        {/* STATIC PAGES */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </>
  );
}

export default App;