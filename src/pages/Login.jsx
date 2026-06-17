import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const usernameRef = useRef(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      setError(false);

      // برگشت به صفحه قبلی واقعی
      navigate(from, { replace: true });
    } else {
      setError(true);

      // فوکوس روی username
      if (usernameRef.current) {
        usernameRef.current.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Please login to system</h2>

      <input
        ref={usernameRef}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="User Name"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">Enter</button>

      {error && <p style={{ color: "red" }}>Username or password is wrong.</p>}
    </form>
  );
}
