import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.get('http://localhost:3001/invoices', (req, res, ctx) => {
    // successful response
    return res(
      ctx.json([
        {
          id: 'b4044cd9-5953-498e-83e3-2c2a7fb6d717',
          number: '20/2022',
          createdDate: '10/10/2022',
          validDate: '01/01/2022',
          recipient: {
            companyName: 'Test Company',
            city: 'Ustrzyki Dolne',
            street: 'Gombrowicza',
            postcode: '38-700',
            nip: '523 047 86 53',
            phone: '500100200',
            email: 'test@gmail.com',
            bankAccount: '55 1020 1909 3868 8738 5139 0913',
          },
          sender: {
            companyName: 'Sender',
            city: 'Wroclaw',
            street: 'Poniatowskiego',
            postcode: '01-200',
            nip: '701 193 81 27',
            phone: '123123123',
            email: 'sender@gmail.com',
            bankAccount: '51 1020 1909 3868 8738 5139 0913',
          },
          items: [
            {
              id: 'a784ea0c-761b-40e6-a964-04ff8e6f8296',
              name: 'Test',
              amount: 1,
              unit: 'szt.',
              tax: 23,
              price: '23',
            },
            {
              id: 'a785ea0c-761b-40e6-a964-04ff8e6f8296',
              name: 'Test2',
              amount: 1,
              unit: 'szt.',
              tax: 23,
              price: '23',
            },
          ],
        },
      ])
    );
  }),
  rest.delete('http://localhost:3001/invoices/:id', (req, res, ctx) => {
    // successful response
    return res(ctx.json({}));
  })
);
