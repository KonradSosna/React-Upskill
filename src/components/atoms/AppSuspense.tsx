import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

export default function Suspense() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h4" component="div" gutterBottom>
          loading...
        </Typography>
        <CircularProgress />
      </Box>
    </Grid>
  );
}
