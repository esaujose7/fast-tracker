import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
`;

const NavigationBar = () => {
  return (
    <StyledNav>
      <ul>
        <li>Home</li>
        <li>About</li>
        <Link to="/register">Register</Link>
      </ul>
    </StyledNav>
  )
}

export default NavigationBar;
