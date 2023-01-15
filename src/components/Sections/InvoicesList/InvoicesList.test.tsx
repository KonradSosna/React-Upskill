import axiosMock from 'axios-mock-adapter';
import { waitFor, screen } from '@testing-library/react';
import { renderElementWithProviders } from '../../../utils/helpers/renderElementWithProviders';
import { mockData } from '../../../utils/mockData';
import { newAxios } from '../../../services/AxiosInstance';
import { Invoices } from './InvoicesList';

describe('BasicTable', () => {
  let mock: axiosMock;

  beforeEach(() => {
    mock = new axiosMock(newAxios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should render the table with invoice data', async () => {
    mock.onGet('http://localhost:3001/invoices').reply(200, mockData);

    renderElementWithProviders(<Invoices />);

    await waitFor(() =>
      mockData.forEach((data) => {
        expect(screen.getByText(data.no)).toBeTruthy();
        expect(screen.getByText(data.amount)).toBeTruthy();
      })
    );
  });
});
