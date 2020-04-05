import React from 'react'
import styled from 'styled-components';

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
      </ul>
    </StyledNav>
  )
}

export default NavigationBar;
