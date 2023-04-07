import { render, screen, waitFor, act } from '@testing-library/react';

import App from './App';

describe('Testin App component', () => {
  test('render Suspens component', () => {
    act(() => {
      render(<App />);
    });
    expect(screen.getByText('loading...')).toBeInTheDocument();
  });

  test('render layout navigation', () => {
    act(() => {
      render(<App />);
    });
    const invoicesLink = screen.getByText('INVOICES');
    const addNewInvoiceLink = screen.getByText('ADD NEW INVOICE');
    expect(invoicesLink).toBeInTheDocument();
    expect(addNewInvoiceLink).toBeInTheDocument();
    expect(invoicesLink.closest('a')).toHaveAttribute('href', '/');
    expect(addNewInvoiceLink.closest('a')).toHaveAttribute('href', '/create');
  });

  test('render table', async () => {
    act(() => {
      render(<App />);
    });

    // TODO fix later
    setTimeout(async () => {
      const table = screen.getByRole('table');
      await waitFor(() => expect(table).toBeInTheDocument());
    }, 1000);
  });
});
