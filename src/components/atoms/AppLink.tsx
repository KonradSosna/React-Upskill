import React from 'react';

import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  color: white;
  font-weight: 600;
  margin: 0 10px;
`;

export default function AppLink(props: {
  to: string;
  label: string;
  exact: boolean;
}) {
  const activeStyle = {
    textDecoration: 'underline',
  };
  const inActiveStyle = {
    textDecoration: 'none',
  };

  return (
    <StyledLink
      style={({ isActive }) => (isActive ? activeStyle : inActiveStyle)}
      {...props}
    >
      {props.label}
    </StyledLink>
  );
}
