import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function Login() {
  // controlled form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const usernameRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate("/watchlist");
    } else {
      setError(true);
      if (usernameRef.current) {
        usernameRef.current.focus(); // فوکوس فقط هنگام خطا
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
        placeholder="User Name:"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password: "
      />
      <button type="submit">Enter</button>
      {error && <p style={{ color: "red" }}>Username or password is wrong.</p>}
      {/* <p>(admin / 1234)</p> */}
    </form>
  );
}
