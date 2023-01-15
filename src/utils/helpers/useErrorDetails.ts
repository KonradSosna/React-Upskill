import { FieldError, useFormContext } from 'react-hook-form';
import { CompanyType } from '../../models/Invoice-model';

export const useErrorDetails = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const hasErrorCompanyForm = (type: CompanyType, fieldName: string): string => {
    //@ts-ignore
    return errors?.[type]?.[fieldName]?.message;
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
