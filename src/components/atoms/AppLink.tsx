import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: 600;
  margin: 0 10px;
  &:focus,
  &:active {
    text-decoration: underline;
  }
`;

export default function AppLink(props: NavLinkProps) {
  return <StyledLink {...props} />;
}
