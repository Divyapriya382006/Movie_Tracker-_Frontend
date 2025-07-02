import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      setAuthLoading(true);
      setAuthError("");

      const response = await fetch(
        "https://todobackend-bi77.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      setAuthLoading(false);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/app");
      } else {
        setAuthError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setAuthError("Something went wrong. Please try again.");
      setAuthLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="logintitle">Login</h2>

      {authError && <div className="auth-error">{authError}</div>}

      <form
        className="loginarea"
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
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
          {authLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="form-footer">
        Don’t have an account?{" "}
        <Link to="/signup" className="form-link">
          Signup
        </Link>
      </div>
    </div>
  );
}
