import { rest } from 'msw';

import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import { server } from '../mock/server';
import { invoicesApi, setupStore } from '../store/store';

const store = setupStore({});

afterAll(() => {
  cleanup();
});

describe('Testin Suspense component', () => {
  test('render table skeleton', () => {
    act(() => {
      render(<App />);
    });

    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument();
  });
});

describe('Testin App component', () => {
  beforeEach(async () => {
    act(() => {
      render(<App />);
    });
    await waitForElementToBeRemoved(() => screen.getByTestId('table-skeleton'));
  });

  test('render layout navigation', () => {
    const invoicesLink = screen.getByText('INVOICES');
    const addNewInvoiceLink = screen.getByText('ADD NEW INVOICE');
    expect(invoicesLink).toBeInTheDocument();
    expect(addNewInvoiceLink).toBeInTheDocument();
    expect(invoicesLink.closest('a')).toHaveAttribute('href', '/');
    expect(addNewInvoiceLink.closest('a')).toHaveAttribute('href', '/create');
  });

  test('render lng switch', () => {
    waitFor(() =>
      expect(screen.getByTestId('lng-switch')).toHaveTextContent('English')
    );
  });

  test('render layout switch', () => {
    expect(screen.getByRole('checkbox', { name: '' })).toBeInTheDocument();
  });

  test('render table', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('navigate to add invoice', () => {
    userEvent.click(screen.getByRole('link', { name: 'ADD NEW INVOICE' }));

    waitFor(() => {
      expect(screen.getByTestId('formSub')).toBeInTheDocument();
    });
  });
});

describe('Testing API calls', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    store.dispatch(invoicesApi.util.resetApiState());
  });

  afterAll(() => {
    server.close();
  });

  test('render list after fetching data', async () => {
    act(() => {
      render(<App />);
    });
    await waitForElementToBeRemoved(() => screen.getByTestId('table-skeleton'));
    expect(screen.getByRole('table')).toBeInTheDocument();

    const allRows = await screen.findAllByRole('row');
    const allCol = await screen.findAllByRole('columnheader');

    await waitFor(() => {
      expect(allRows.length).toBe(2);
      expect(allRows[1].childNodes[0].textContent).toBe('20/2022');

      expect(allCol[1].textContent).toBe('Created');
      expect(allCol.length).toBe(4);
    });
  });

  test('render message after deleting invoice', async () => {
    act(() => {
      render(<App />);
    });
    await waitForElementToBeRemoved(() => screen.getByTestId('table-skeleton'));
    expect(screen.getByRole('table')).toBeInTheDocument();

    const deleteButton = await screen.findByTestId('delete-invoice-20/2022');

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText('Invoice deleted')).toBeInTheDocument();
    });
  });

  test('render error message if API fails on page load', async () => {
    server.use(
      rest.get('*', (_req, res, ctx) =>
        res.once(ctx.status(500), ctx.json({ message: 'there was an error' }))
      )
    );

    act(() => {
      render(<App />);
    });
    const allRows = await screen.findAllByRole('row');

    const errorText = await screen.findByText(
      'There was an error while featching invoices'
    );

    await waitFor(() => {
      expect(errorText.textContent).toBe(
        'There was an error while featching invoices'
      );
      expect(allRows[1].childNodes[0].textContent).toBe(
        'Error while featching data'
      );
    });
  });
});
