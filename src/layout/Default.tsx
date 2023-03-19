import {
  Box,
  Container,
  createTheme,
  Paper,
  ThemeProvider,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { red } from '@mui/material/colors';

import AppProgressBar from '../components/atoms/AppProgressBar';
import AppNav from '../components/molecules/AppNav';
import useProgressInterceptor from '../hooks/useProgressInterceptor';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

const BoxStyled = styled(Box)({
  margin: '2rem 0',
});

export default function Layout() {
  const { t } = useTranslation();
  const [themed, setTheme] = useState('light');
  const loading = useProgressInterceptor();
  const navigation = [
    {
      to: '/',
      label: t('nav.invoices'),
    },
    {
      to: '/create',
      label: t('nav.add_new_invoice'),
    },
  ];

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themed as 'light' | 'dark',
          primary: {
            main: '#556cd6',
          },
          secondary: {
            main: '#19857b',
          },
          error: {
            main: red.A400,
          },
          info: {
            main: '#ccc',
          },
        },
      }),
    [themed]
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: '100vh' }}>
        <GlobalStyle />
        <AppProgressBar loading={loading} />
        <AppNav
          navigation={navigation}
          theme={theme}
          themed={themed}
          setTheme={setTheme}
        />
        <main>
          <Container>
            <BoxStyled>
              <Outlet />
            </BoxStyled>
          </Container>
        </main>
      </Paper>
    </ThemeProvider>
  );
}
