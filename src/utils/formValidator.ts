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
  default: (value: string) => boolean;
}

const validator: Validator = {
  email: validateEmail,
  nip: validateNIP,
  phone: validatePhoneNumber,
  bankAccount: validateBankAccountNumber,
  postcode: validatePostCode,
  default: validateTextField,
};

export default validator;
