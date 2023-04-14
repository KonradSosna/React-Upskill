import { useState, MouseEvent, FC } from 'react';
import TranslateIcon from '@mui/icons-material/Translate';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
} from '@mui/material';
import i18n from '../../i18n';
import AppLink from '../atoms/AppLink';
import styled from 'styled-components';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../store/store';
import { ReducerType } from '../../store/types';

interface Nav {
  to: string;
  label: string;
}

interface AppNav {
  navigation: Nav[];
  themed: string;
}

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  margin: '0 20px',
});

const StyledButton = styled(Button)({
  color: 'white',
});

export const AppNav: FC<AppNav> = ({ navigation }) => {
  const dispatch = useDispatch();
  const themed = useSelector((state: ReducerType) => state.invoiceList.theme);

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

  const onChange = (lng: any) => {
    setLanguage(lng);
    i18n.changeLanguage(lng.code);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const themeToggler = () => {
    themed === 'light'
      ? dispatch(setTheme('dark'))
      : dispatch(setTheme('light'));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {navigation.map((nav) => (
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
            data-testid="lng-switch"
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
        <LightModeIcon />
        <Switch
          checked={themed === 'dark'}
          value={themed}
          onChange={themeToggler}
        />
        <DarkModeIcon />
      </Toolbar>
    </AppBar>
  );
};

export default AppNav;
