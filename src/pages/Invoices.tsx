import { useSnackbar } from 'notistack';

import { Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import AppTable from '../components/organisms/AppTable';
import useInvoice from '../hooks/useInvoice';
import { Headers } from '../intefaces/invoices';
import { invoicesApi } from '../store/store';
import { createArrayFromNumber } from '../utils';
import { useEffect } from 'react';

const headers: Headers[] = [
  { name: 'No', align: 'inherit' },
  {
    name: 'Created',
    align: 'right',
  },
  {
    name: 'Valid until',
    align: 'right',
  },
  {
    name: 'Actions',
    align: 'right',
  },
];

export const TableSkeleton = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) => {
  return (
    <Grid container spacing={2} data-testid="table-skeleton">
      {createArrayFromNumber(columns).map((key: number) => (
        <Grid key={key} item xs={3}>
          {createArrayFromNumber(rows).map((col: number) => (
            <Skeleton key={col} animation="wave" height={70} />
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default function Home() {
  const { handleDeleteInvoice } = useInvoice();
  const {
    data: invoices,
    isFetching,
    error,
  } = invoicesApi.useGetInvoicesQuery();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      enqueueSnackbar('There was an error while featching invoices', {
        variant: 'error',
      });
    }
  }, [error]);

  return (
    <>
      {isFetching ? (
        <TableSkeleton columns={headers.length} rows={4} />
      ) : (
        <AppTable
          list={invoices}
          headers={headers}
          deleteInvoice={handleDeleteInvoice}
          error={error}
        />
      )}
    </>
  );
}
