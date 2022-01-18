import React, { useState } from 'react';

import TranslateIcon from '@mui/icons-material/Translate';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  styled,
} from '@mui/material';

import i18n from '../../i18n';
import AppLink from '../atoms/AppLink';

interface Nav {
  to: string;
  label: string;
}

export default function AppNav(props: { navigation: Nav[] }) {
  const languages = [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'pl',
      name: 'Polski',
    },
  ];
  const [en, pl] = languages;
  const [lang, setLanguage] = useState(en);
  const onChange = (lang: any) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.code);
    handleClose();
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    margin: '0 20px',
  });

  const StyledButton = styled(Button)({
    color: 'white',
  });

  return (
    <AppBar position="static">
      <Toolbar>
        {props.navigation.map((nav) => (
          <AppLink key={nav.to} to={nav.to}>
            {nav.label.toUpperCase()}
          </AppLink>
        ))}
        <StyledBox>
          <TranslateIcon></TranslateIcon>
          <StyledButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {lang.name}
          </StyledButton>
        </StyledBox>
        <Menu
          anchorEl={anchorEl}
          id="basic-menu"
          open={open}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => onChange(en)}>{en.name}</MenuItem>
          <MenuItem onClick={() => onChange(pl)}>{pl.name}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
