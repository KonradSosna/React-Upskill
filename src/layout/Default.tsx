import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import {
  Box,
  Container,
  createTheme,
  Paper,
  ThemeProvider,
} from '@mui/material';

import AppProgressBar from '../components/atoms/AppProgressBar';
import AppNav from '../components/molecules/AppNav';
import useProgressInterceptor from '../hooks/useProgressInterceptor';
import { GlobalStyle } from '../utils/theme';
import { ReducerType } from '../store/types';

const BoxStyled = styled(Box)({
  margin: '2rem 0',
});

export default function Layout() {
  const { t } = useTranslation();
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

  const themed = useSelector((state: ReducerType) => state.invoiceList.theme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themed as 'light' | 'dark',
          primary: {
            main: '#556cd6',
          },
          secondary: {
            main: '#851919',
          },
          error: {
            main: '#b92424',
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
        <AppNav navigation={navigation} />
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
