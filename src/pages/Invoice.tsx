import React from 'react';

import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Invoice() {
  const params = useParams();

  return (
    <Typography variant="h1" component="div" gutterBottom>
      {params.id}
    </Typography>
  );
}
