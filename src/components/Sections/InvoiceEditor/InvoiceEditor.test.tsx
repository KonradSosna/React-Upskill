import axiosMock from 'axios-mock-adapter';
import { waitFor, screen, getByTestId, act } from '@testing-library/react';
import { renderElementWithProviders } from '../../../utils/helpers/renderElementWithProviders';
import { InvoiceEditor } from './InvoiceEditor';
import { newAxios } from '../../../services/AxiosInstance';
import { mockInvoice } from '../../../utils/mockData';
import userEvent from '@testing-library/user-event';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    state: { id: '1' },
  }),
}));
describe('BasicTable', () => {
  let mock: axiosMock;

  beforeEach(() => {
    mock = new axiosMock(newAxios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should fulfill form with data in edit mode', async () => {
    mock.onGet(`http://localhost:3001/invoices/1`).reply(200, mockInvoice);
    let input, recipientMailInput;
    await act(async () => {
      const { debug, container } = await renderElementWithProviders(
        <InvoiceEditor isEditMode={true} />
      );
      input = await container.querySelectorAll('[data-testid^="noField"]');
      recipientMailInput = await container.querySelectorAll('[data-testid^="recipient.mail"]');
      debug();
    });
    expect(input).toContain(mockInvoice.no);
    expect(recipientMailInput).toContain(mockInvoice.recipient.mail);
  });

  it('should valid empty form', async () => {
    renderElementWithProviders(<InvoiceEditor isEditMode={false} />);

    const buttonElement = await screen.findByText('Save');
    userEvent.click(buttonElement);

    await waitFor(async () => {
      expect(screen.getAllByText('This field is required')).toBeTruthy();
    });
  });
});
