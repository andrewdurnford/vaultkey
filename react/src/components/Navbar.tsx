import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0.5rem 0;
`;

const Item = styled.li`
  padding: 0;
  list-style-type: none;
`;

export const StyledNavLink = styled(NavLink).attrs({
  style: ({ isActive }) => (isActive ? { textDecoration: "underline" } : {}),
})`
  color: black;
  padding: 0 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export function Navbar() {
  const { token } = useAuth();

  return token ? (
    <nav>
      <List>
        <Item>
          <StyledNavLink to="/">Vault</StyledNavLink>
        </Item>
        <Item>
          <StyledNavLink to="/logout">Log out</StyledNavLink>
        </Item>
      </List>
    </nav>
  ) : (
    <nav>
      <List>
        <Item>
          <StyledNavLink to="/login">Log in</StyledNavLink>
        </Item>
        <Item>
          <StyledNavLink to="/signup">Sign up</StyledNavLink>
        </Item>
      </List>
    </nav>
  );
}
