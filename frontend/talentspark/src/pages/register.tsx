import { useState } from "react";
import { register } from "../Services/AuthService";

type Props = {
  onSwitchToLogin: () => void;
};

function Register({ onSwitchToLogin }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Candidate");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register({ name, email, password, role });
      alert("Registration successful! Please login.");
      onSwitchToLogin();
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <p className="eyebrow">Create account</p>
      <h2>Start managing talent</h2>
      <label>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
      </label>
      <label>
        Email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Choose a password" required />
      </label>
      <label>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="Candidate">Candidate</option>
          <option value="Recruiter">Recruiter</option>
          <option value="Admin">Admin</option>
        </select>
      </label>
      <button className="primary-button" type="submit" disabled={submitting}>{submitting ? "Creating..." : "Register"}</button>
      <p className="auth-switch">Already have an account? <button type="button" onClick={onSwitchToLogin}>Login</button></p>
    </form>
  );
}

export default Register;
