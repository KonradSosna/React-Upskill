import { useNavigate } from 'react-router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, LinearProgress } from '@mui/material';
import { formatDate } from '../../../utils/helpers/parseDate';
import { useDeleteInvoice, useGetInvoiceData } from '../../../services/UseGetInvoice';
import { Invoice } from '../../../models/Invoice-model';

export const BasicTable = () => {
  const { data, isLoading, refetch } = useGetInvoiceData();

  const { deleteInv } = useDeleteInvoice();
  const navigate = useNavigate();

  const handleEditInvoice = (id: string) => {
    navigate('/edit', { state: { id } });
  };

  const handleDeleteInvoice = (id: string) => {
    deleteInv(id);
    refetch();
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>No.</b>
                </TableCell>
                <TableCell align="right">
                  <b>Created</b>
                </TableCell>
                <TableCell align="right">
                  <b>Valid until</b>
                </TableCell>
                <TableCell align="right">
                  <b>Amount</b>
                </TableCell>
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row: Invoice) => (
                <TableRow key={row.no} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.no}
                  </TableCell>
                  <TableCell align="right">{formatDate(row.createdDate)}</TableCell>
                  <TableCell align="right">{formatDate(row.validUntilDate)}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => handleEditInvoice(row.id)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDeleteInvoice(row.id)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
