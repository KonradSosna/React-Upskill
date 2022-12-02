import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import uuid from 'react-uuid';
import { Button, Grid, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledItemsContainer, StyledFieldsRow } from './InvoiceAddItem.styles';

export const AddItem = () => {
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
        <StyledItemsContainer>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="standard"
                id={`item.${index}.name`}
                label={'name'}
                key={`item.${uuid}.name`}
                {...register(`item.${index}.name`)}
              />
            </Grid>

            <Grid item xs={6}>
              <StyledFieldsRow>
                <TextField
                  variant="standard"
                  id={`item.${index}.amount`}
                  key={`item.${uuid}.amount`}
                  label={'amount'}
                  style={{ marginRight: '16px' }}
                  {...register(`item.${index}.amount`)}
                />

                <TextField
                  variant="standard"
                  id={`item.${index}.unit`}
                  key={`item.${uuid}.unit`}
                  label={'unit'}
                  style={{ marginRight: '16px' }}
                  {...register(`item.${index}.unit`)}
                />

                <TextField
                  variant="standard"
                  id={`item.${index}.id`}
                  key={`item.${uuid}.id`}
                  label={'tax'}
                  style={{ marginRight: '16px' }}
                  {...register(`item.${index}.tax`)}
                />

                <TextField
                  variant="standard"
                  id={`item.${index}.price`}
                  key={`item.${uuid}.price`}
                  label={'price'}
                  style={{ marginRight: '16px' }}
                  {...register(`item.${index}.price`)}
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
