import AuthForm from "../components/AuthForm";

import "./AuthPage.css";

function AuthPage({ setUser }) {
  return (
    <div className="container">
     
      <AuthForm setUser={setUser} />
    </div>
  );
}

export default AuthPage;