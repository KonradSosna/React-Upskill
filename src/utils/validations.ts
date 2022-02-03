export const regexpValidation = {
  bankAccountNumber:
    /^((\d{2}[- ]\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}))$/,
  phoneNumber:
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
  postcode: /^\d{2}-\d{3}$/,
};
