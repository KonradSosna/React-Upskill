import React from 'react';

import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

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

export default function AppLink(props: {
  to: string;
  label: string;
  exact: boolean;
}) {
  return <StyledLink {...props}>{props.label}</StyledLink>;
}
