import React from 'react';

import { Box, Container, styled } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import AppNav from '../components/molecules/AppNav';
import theme from '../theme';

const BoxStyled = styled(Box)({
  margin: '2rem 0',
});

export default function Layout() {
  const { t } = useTranslation();
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

  return (
    <ThemeProvider theme={theme}>
      <AppNav navigation={navigation}></AppNav>
      <main>
        <Container>
          <BoxStyled>
            <Outlet />
          </BoxStyled>
        </Container>
      </main>
    </ThemeProvider>
  );
}
