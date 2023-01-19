import { Box, Container, styled, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import AppProgressBar from '../components/atoms/AppProgressBar';
import AppNav from '../components/molecules/AppNav';
import useProgressInterceptor from '../hooks/useProgressInterceptor';
import theme from '../theme';

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

  return (
    <ThemeProvider theme={theme}>
      <AppProgressBar loading={loading}></AppProgressBar>
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
