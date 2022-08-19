import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Links, Toolbar } from "./styles";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = ["Home", "About", "Contact"];
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        SISTEMA DE GESTION DE RESERVAS
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Links to='/'>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary='OFERTAS' />
            </ListItemButton>
          </Links>
        </ListItem>
        <ListItem disablePadding>
          <Links to='/reservations'>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary='RESERVACIONES' />
            </ListItemButton>
          </Links>
        </ListItem>
        <ListItem disablePadding>
          <Links to='/voucher'>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary='VOUCHER' />
            </ListItemButton>
          </Links>
        </ListItem>
        <ListItem disablePadding>
          <Links to='/profits'>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary='GANANCIAS' />
            </ListItemButton>
          </Links>
        </ListItem>
      </List>
    </Box>
  );

  const container = window.document.body;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component='nav' position='static'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            SISTEMA DE GESTION DE RESERVAS
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Links to='/'>
              <Button sx={{ color: "#fff" }}>OFERTAS</Button>
            </Links>
            <Links to='/reservations'>
              <Button sx={{ color: "#fff" }}>RESERVACIONES</Button>
            </Links>
            <Links to='/voucher'>
              <Button sx={{ color: "#fff" }}>VOUCHER</Button>
            </Links>
            <Links to='/profits'>
              <Button sx={{ color: "#fff" }}>GANANCIAS</Button>
            </Links>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
