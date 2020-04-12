import React, { useContext, useState } from 'react';
import authContext from '../../context/auth/authContext';
import ErrorMessages from '../../components/ErrorsMessages';
import { Redirect } from 'react-router-dom';

const Register = () => {
  // TODO: Repeated code similar to Login.js. Abstract
  const { register, error, isAuthenticated } = useContext(authContext);

  const [formData, setFormData] = useState({ email: "", password: "", lastName: "", firstName: "" });
  const { email, password, firstName, lastName } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);

    if (!email || !password || !firstName || !lastName) return;
    register(formData);
  };

  const isRegisterAvailable = () => Object.values(formData).some(value => value === "");

  if (isAuthenticated) {
    return (<Redirect to={{ pathname: "/" }}/>);
  }

  return (
    <>
      <ErrorMessages error={error} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" value={firstName} onChange={onChange}/>

        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" value={lastName} onChange={onChange}/>

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={onChange}/>

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={onChange}/>

        <input type="submit" value="Submit" disabled={isRegisterAvailable}/>
      </form>
    </>
  )
}

export default Register;
