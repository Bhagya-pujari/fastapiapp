import { useState } from "react";
import { login } from "../Services/AuthService";

type Props = {
  onLogin: (token: string) => void;
  onSwitchToRegister: () => void;
};

function Login({ onLogin, onSwitchToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await login({ email, password });
      onLogin(response.access_token);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <p className="eyebrow">Welcome back</p>
      <h2>Login to your workspace</h2>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
      </label>
      <button className="primary-button" type="submit" disabled={submitting}>{submitting ? "Logging in..." : "Login"}</button>
      <p className="auth-switch">Don't have an account? <button type="button" onClick={onSwitchToRegister}>Register</button></p>
    </form>
  );
}

export default Login;
