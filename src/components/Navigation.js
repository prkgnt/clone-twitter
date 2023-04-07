import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ position: "absolute" }}>
        <Menu>
          <Link to="/" style={{ color: "white" }}>
            {" "}
            Home{" "}
          </Link>
        </Menu>
        <Menu>
          <Link to="/profile" style={{ color: "white" }}>
            {" "}
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : "Profile"}{" "}
          </Link>
        </Menu>
      </ul>
    </nav>
  );
};

const Menu = styled.li`
  color: white;
  padding-top: 50px;
`;

export default Navigation;
