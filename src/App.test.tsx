/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor, act } from '@testing-library/react';

import App from './App';

describe('Testin App component', () => {
  test('render Suspens component', () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<App></App>);
    });
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  test('render layout navigation', () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<App></App>);
    });
    const invoicesLink = screen.getByText('INVOICES');
    const addNewInvoiceLink = screen.getByText('ADD NEW INVOICE');
    expect(invoicesLink).toBeInTheDocument();
    expect(addNewInvoiceLink).toBeInTheDocument();
    expect(invoicesLink.closest('a')).toHaveAttribute('href', '/');
    expect(addNewInvoiceLink.closest('a')).toHaveAttribute('href', '/create');
  });

  test('render table', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      render(<App></App>);
    });

    // TODO fix later
    setTimeout(async () => {
      const table = screen.getByRole('table');
      await waitFor(() => expect(table).toBeInTheDocument());
    }, 1000);
  });
});
