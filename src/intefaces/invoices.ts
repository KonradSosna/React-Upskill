export interface Invoice {
  id: string;
  number: string;
  createdDate: string;
  validDate: string;
  recipient: {
    companyName: string;
    city: string;
    street: string;
    postcode: string;
    nip: string;
    phone: number;
    email: string;
    bankAccount: string;
  };
  sender: {
    companyName: string;
    city: string;
    street: string;
    postcode: string;
    nip: string;
    phone: number;
    email: string;
    bankAccount: string;
  };
  items: [
    {
      id: string;
      name: string;
      amount: number;
      unit: string;
      tax: number;
      price: number;
    },
    {
      id: string;
      name: string;
      amount: number;
      unit: string;
      tax: number;
      price: number;
    }
  ];
}

export interface Headers {
  name: string;
  align: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}
