import { AppBar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Toolbar } from "./styles";

const Navbar: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h1' fontSize={32}>
          SISTEMA DE GESTIÓN DE RESERVACINES
        </Typography>
        <Box display='flex' gap={2}>
          <Typography>gestión</Typography>
          <Typography>ganancias</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
