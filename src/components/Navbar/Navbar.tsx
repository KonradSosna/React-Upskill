import * as React from "react";
import { Button, AppBar, Box, IconButton } from "@mui/material";
import { StyledButton, StyledButtonGroup } from "./Navbar.styles";
import TranslateIcon from "@mui/icons-material/Translate";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleCreateInvoice = () => {
    navigate("/create")
  }
  return (
    <AppBar position="static">
      <StyledButtonGroup>
        <StyledButton>
          <Button variant="contained" onClick={() => navigate("/invoices")}>INVOICES</Button>
        </StyledButton>
        <StyledButton>
          <Button variant="contained" onClick={handleCreateInvoice}>ADD NEW INVOICE</Button>
        </StyledButton>
          <IconButton aria-label="delete">
            <TranslateIcon />
          </IconButton>
      </StyledButtonGroup>
    </AppBar>
  );
};
