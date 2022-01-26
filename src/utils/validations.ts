export const validateEmail = (email: string): boolean => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateNIP = (NIP: string): boolean => NIP.length === 10;

export const validateBankAccountNumber = (bankAccountNumber: string): boolean =>
  !!bankAccountNumber.match(
    /^((\d{2}[- ]\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}[- ]\d{4}))$/
  );

export const validatePhoneNumber = (phoneNumber: string): boolean =>
  !!phoneNumber.match(
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  );

export const validateTextField = (textField: string): boolean => !!textField;

export const validatePostCode = (postCode: string): boolean =>
  !!postCode.match(/^\d{2}-\d{3}$/);
