import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { loginWithEmail } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LEFT BRAND SECTION */}
        <div className="login-brand">
          <h1>🍽 Foodie</h1>
          <p>Order your favorite food instantly</p>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="login-form">

          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue</p>

          {error && <div className="error-box">{error}</div>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="primary-btn"
            onClick={handleEmailLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn" onClick={handleGoogleLogin}>
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="google"
            />
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
}

export default Login;