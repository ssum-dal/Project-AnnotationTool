import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const logout = () => {
  axios.get("/logout");
};

export default withRouter(({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Home</SLink>
      </Item>
      <Item current={pathname === "/work"}>
        <SLink to="/work">Go Work!</SLink>
      </Item>
      <Item current={pathname === "/test"}>
        <SLink to="/test">Test</SLink>
      </Item>
    </List>
    <LeftList>
      <Item current={pathname === "/login"}>
        <SLink to="/login">Login</SLink>
      </Item>
      <Item>
        <SLink to="/" onClick={logout}>
          Logout
        </SLink>
      </Item>
    </LeftList>
  </Header>
));

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.3);
`;

const List = styled.ul`
  display: flex;
`;

const LeftList = styled.ul`
  display: flex;
  margin-left: auto;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${(props) => (props.current ? "#495464" : "transparent")};
  transition: border-bottom 0.2s ease-in-out;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
