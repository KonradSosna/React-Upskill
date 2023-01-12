import { FieldError, useFormContext } from 'react-hook-form';

export const useErrorDetails = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const getFieldError = (errors: any, fieldName: string) => {
    const path = fieldName.split('.');
    let current = errors;
    for (const key of path) {
      if (!current[key]) return undefined;
      current = current[key];
    }
    return current;
  };

  const hasErrorCompanyForm = (fieldName: string): boolean => {
    return !!getFieldError(errors, fieldName);
  };

  const errorDetails = (errors: any, index: number, fieldName: string) => {
    if (!errors.item || !errors.item[index]) return;
    return errors.item[index][fieldName] as FieldError;
  };

  const hasErrorItemForm = (index: number, value: string): boolean => {
    return !!errorDetails(errors, index, value);
  };

  return { hasErrorItemForm, hasErrorCompanyForm };
};
