import {
  validateEmail,
  validateNIP,
  validatePhoneNumber,
  validateBankAccountNumber,
  validateTextField,
  validatePostCode,
} from './validations';

interface Validator {
  [key: string]: (value: string) => boolean;
}

const validator: Validator = {
  email: validateEmail,
  nip: validateNIP,
  phone: validatePhoneNumber,
  bankAccount: validateBankAccountNumber,
  companyName: validateTextField,
  city: validateTextField,
  street: validateTextField,
  postcode: validatePostCode,
};

export default validator;
