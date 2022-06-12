import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";

export const StyledNavLink = styled(NavLink).attrs({
  style: ({ isActive }) => (isActive ? { textDecoration: "underline" } : {}),
})`
  color: black;
  text-decoration: none;
`;

export function Navbar() {
  const { token } = useAuth();

  return token ? (
    <nav>
      <ul>
        <li>
          <StyledNavLink to="/">Vault</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/logout">Log out</StyledNavLink>
        </li>
      </ul>
    </nav>
  ) : (
    <nav>
      <ul>
        <li>
          <StyledNavLink to="/login">Log in</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/signup">Sign up</StyledNavLink>
        </li>
      </ul>
    </nav>
  );
}
