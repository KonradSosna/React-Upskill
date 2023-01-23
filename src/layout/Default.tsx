import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import AppProgressBar from '../components/atoms/AppProgressBar';
import AppNav from '../components/molecules/AppNav';
import useProgressInterceptor from '../hooks/useProgressInterceptor';
import theme from '../theme';

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
    </ThemeProvider>
  );
}
