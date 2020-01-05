import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) return;
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        name="email"
        onChange={onChange}
        value={email}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        onChange={onChange}
        value={password}
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
