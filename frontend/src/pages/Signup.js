import React, { useState } from "react";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import { useNavigate, Link } from "react-router-dom"; // ✅ added Link + navigate

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate(); // ✅ used for redirect after signup

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/signup`, form);
      setMsg({ text: res.data.message, type: "success" });
      // ✅ after successful signup, go to login
      if (res.status === 201) {
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (err) {
      console.error(err);
      setMsg({ text: err.response?.data?.error || "Signup failed", type: "error" });
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} /><br/>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/>
        <button type="submit">Signup</button>
      </form>
      {/* ✅ Added below line */}
      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>
          Go to Login
        </Link>
      </p>
      <MessageBox message={msg?.text} type={msg?.type} />
    </div>
  );
}
