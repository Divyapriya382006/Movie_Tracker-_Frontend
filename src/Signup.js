import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "https://todobackend-bi77.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setAuthLoading(false);

      if (data.message === "User registered") {
        setSuccess(true);
        setTimeout(() => navigate("/"), 1500);
      } else {
        setAuthError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAuthError(error.message || "Something went wrong. Try again.");
      setAuthLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>
      {authError && <div className="auth-error">{authError}</div>}
      {success && (
        <div className="auth-success">
          Registration successful! Redirecting to login...
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(username, password);
        }}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          placeholder="Username"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          placeholder="Password"
          required
        />

        <button type="submit" className="submit-button" disabled={authLoading}>
          {authLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <div className="form-footer">
        Already have an account?{" "}
        <Link to="/" className="form-link">
          Login
        </Link>
      </div>
    </div>
  );
}
