import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { StyledItemsContainer, StyledFieldsRow } from "./InvoiceAddItem.styles";
import { items } from "../invoiceFieldsData";
import DeleteIcon from "@mui/icons-material/Delete";

export const AddItem = () => {
  //   const { register } = useFormContext();
  const [itemsArray, setItemsArray] = useState(items);

  const handleAddItem = () => {
    const newItem = itemsArray.concat({
      id: itemsArray.length + 1,
      name: "Name",
      amount: "Amount",
      unit: "Unit",
      tax: "Tax",
      price: "Price",
    });
    setItemsArray(newItem);
  };

  const handleDeleteItem = (id: number) => {
    const newArray = itemsArray.filter((i) => i.id !== id);
    setItemsArray(newArray);
  };

  return (
    <>
      {itemsArray.map(({ name, amount, unit, tax, price, id }) => (
        <StyledItemsContainer>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="standard"
                id={name}
                label={name}
                key={name}
              />
            </Grid>

            <Grid item xs={6}>
              <StyledFieldsRow>
                <TextField
                  variant="standard"
                  id={amount}
                  key={amount}
                  label={amount}
                  style={{ marginRight: "16px" }}
                />

                <TextField
                  variant="standard"
                  id={unit}
                  key={unit}
                  label={unit}
                  style={{ marginRight: "16px" }}
                />

                <TextField
                  variant="standard"
                  id={tax}
                  key={tax}
                  label={tax}
                  style={{ marginRight: "16px" }}
                />

                <TextField
                  variant="standard"
                  id={price}
                  key={price}
                  label={price}
                  style={{ marginRight: "16px" }}
                />
                <Button onClick={() => handleDeleteItem(id)}>
                  <DeleteIcon color="action" />
                </Button>
              </StyledFieldsRow>
            </Grid>
          </Grid>
        </StyledItemsContainer>
      ))}
      <Grid container justifyContent="flex-end">
        <Button
          style={{ marginBottom: "5em", marginTop: "1em" }}
          variant="contained"
          onClick={() => handleAddItem()}
        >
          Add item
        </Button>
      </Grid>
    </>
  );
};
