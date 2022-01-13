import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AppNav from '../components/molecules/AppNav';
import theme from '../theme';

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
          <Box sx={{ my: 4 }}>
            <Outlet />
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}
