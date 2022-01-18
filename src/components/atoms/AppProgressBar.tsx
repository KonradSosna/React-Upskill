import React from 'react';

import { Box, LinearProgress } from '@mui/material';

export default function AppProgressBar({
  loading = false,
}: {
  loading: boolean;
}) {
  return <Box>{loading && <LinearProgress color="secondary" />}</Box>;
}
