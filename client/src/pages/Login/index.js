import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import ErrorsMessages from "../../components/ErrorsMessages";
import { Redirect } from 'react-router-dom';

const Login = () => {
  const { login, error, isAuthenticated } = useContext(AuthContext);

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

  const isLoginAvailable = () => Object.values(formData).some(value => value === "");

  if (isAuthenticated) {
    return (<Redirect to={{ pathname: "/" }}/>);
  }

  return (
    <>
      <ErrorsMessages error={error} />
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
        <input type="submit" value="Login" disabled={isLoginAvailable()} />
      </form>
    </>
  );
};

export default Login;
