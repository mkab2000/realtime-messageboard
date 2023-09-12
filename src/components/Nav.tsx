// import logo from '../logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function Nav() {
  return (
    <StyledNav>
      <div>
        {/* <img src={logo} alt="LOGO" /> */}
        <h1>Realtime Glassdit</h1>
      </div>

      <Link to={'/posts/new'} className='postCreate'><button>Create new post</button></Link>
    </StyledNav>
  );
}

const StyledNav = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
  background-color: none;
  margin: 0 50px 0 50px;

  div {
      display: flex;
      flex-direction: row;
      align-items: center;
  }

  img {
      width: 50px;
      margin-right: 15px;
  }

  h1 {
      margin: 0;
  }

  button {
      padding: 15px 20px;
      font-size: 16px;
      background-color: #a72951;
      color: white;
      border-radius: 25px;
      cursor: pointer;
      transition: 0.5s;
  }

  button: hover {
    background-color: #303030;
  }

  @media only screen and (max-width: 600px) {
      margin: 0;
      flex-direction: column;
      height: 120px;
      align-items: center;

      h1 {
      text-align: center;
      font-size: 28px;
      }
`;
export default Nav;