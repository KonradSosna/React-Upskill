import React from 'react';
import { Box, CircularProgress, Grid } from '@mui/material';

export default function Suspense() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <CircularProgress />
      </Box>
    </Grid>
  );
}
