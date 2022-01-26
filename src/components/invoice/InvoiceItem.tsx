import React from 'react';

import { Delete } from '@mui/icons-material';
import { Box, Grid, IconButton, styled } from '@mui/material';

import AppInput from '../atoms/AppInput';

const ItemsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 6,
});

export default function ItemRow(props: {
  items: any[];
  deleteItem: (index: number) => void;
  onFieldChange: ({
    index,
    key,
    value,
  }: {
    index: number;
    key: string;
    value: string;
  }) => void;
}) {
  return (
    <>
      {props.items.map(([name, amount, unit, tax, price], index) => (
        <Grid container spacing={4} key={index}>
          <Grid item xs={6}>
            <AppInput
              field={name}
              onFieldChange={(payload) =>
                props.onFieldChange({ index, ...payload })
              }
            ></AppInput>
          </Grid>
          <Grid item xs={6}>
            <ItemsBox>
              <AppInput
                field={amount}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <AppInput
                field={unit}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <AppInput
                field={tax}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <AppInput
                field={price}
                onFieldChange={(payload) =>
                  props.onFieldChange({ index, ...payload })
                }
              ></AppInput>
              <IconButton onClick={() => props.deleteItem(index)}>
                <Delete></Delete>
              </IconButton>
            </ItemsBox>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
