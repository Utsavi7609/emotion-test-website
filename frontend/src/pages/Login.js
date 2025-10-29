import React, { useState } from "react";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom"; // ✅ import this

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, form);
      if (res.status === 200) { // ✅ check success
        
        // ✅ Store user info locally so other pages can access it
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/study"); // redirect to study page
      }
      setMsg({ text: res.data.message, type: "success" });
    } catch (err) {
      console.error(err);
      setMsg({ text: err.response?.data?.error || "Login failed", type: "error" });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/>
        <button type="submit">Login</button>
      </form>
      <MessageBox message={msg?.text} type={msg?.type} />
    </div>
  );
}
