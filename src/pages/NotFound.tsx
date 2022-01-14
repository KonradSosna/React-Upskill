import React from 'react';

import { Box, Grid, Typography, styled } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';

const Error = styled('span')({
  color: grey[500],
  fontWeight: 700,
});

const Info = styled('span')({
  color: grey[600],
});

const BoxStyled = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <BoxStyled>
        <Typography variant="h1" component="div" gutterBottom>
          <Error>404</Error>
        </Typography>
        <Typography variant="h3" component="div" gutterBottom>
          <Info>{t('commons.page_not_found')}</Info>
        </Typography>
      </BoxStyled>
    </Grid>
  );
}
