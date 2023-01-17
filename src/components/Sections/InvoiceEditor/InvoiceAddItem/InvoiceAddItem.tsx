import { FieldError, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledItemsContainer, StyledFieldsRow } from './InvoiceAddItem.styles';
import { useErrorDetails } from '../../../../utils/helpers/useErrorDetails';

export const AddItem = () => {
  const { hasErrorItemForm } = useErrorDetails();
  const { register, control } = useFormContext();

  const { t } = useTranslation();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'item',
  });

  const handleAppend = () => {
    append({});
  };

  return (
    <>
      {fields.map((field, index) => (
        <StyledItemsContainer key={`item${index}`}>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="standard"
                id={`item.name`}
                label={'name'}
                key={`item.${field.id}.name`}
                error={hasErrorItemForm(index, 'name')}
                helperText={hasErrorItemForm(index, 'name') && 'This field is required'}
                {...register(`item[${index}].name`, { required: 'This field is required' })}
              />
            </Grid>

            <Grid item xs={6}>
              <StyledFieldsRow>
                <TextField
                  type="number"
                  variant="standard"
                  id={`item.${index}.amount`}
                  key={`item.${field.id}.amount`}
                  error={hasErrorItemForm(index, 'amount')}
                  label={'amount'}
                  style={{ marginRight: '16px' }}
                  {...register(`item[${index}].amount`, {
                    required: 'This field is required',
                    valueAsNumber: true,
                  })}
                />

                <TextField
                  type="number"
                  variant="standard"
                  id={`item.${index}.unit`}
                  key={`item.${field.id}.unit`}
                  error={hasErrorItemForm(index, 'unit')}
                  label={'unit'}
                  style={{ marginRight: '16px' }}
                  {...register(`item[${index}].unit`, { required: 'This field is required' })}
                />

                <TextField
                  type="number"
                  variant="standard"
                  id={`item.${index}.id`}
                  key={`item.${field.id}.id`}
                  error={hasErrorItemForm(index, 'tax')}
                  label={'tax'}
                  style={{ marginRight: '16px' }}
                  {...register(`item[${index}].tax`, { required: 'This field is required' })}
                />

                <TextField
                  type="number"
                  variant="standard"
                  id={`item.${index}.price`}
                  key={`item.${field.id}.price`}
                  error={hasErrorItemForm(index, 'price')}
                  label={'price'}
                  style={{ marginRight: '16px' }}
                  {...register(`item[${index}].price`, { required: 'This field is required' })}
                />
                <Button onClick={() => remove(index)}>
                  <DeleteIcon color="action" />
                </Button>
              </StyledFieldsRow>
            </Grid>
          </Grid>
        </StyledItemsContainer>
      ))}
      <Grid container justifyContent="flex-end">
        <Button
          style={{ marginBottom: '5em', marginTop: '1em' }}
          variant="contained"
          onClick={handleAppend}
        >
          {t('addItem')}
        </Button>
      </Grid>
    </>
  );
};
