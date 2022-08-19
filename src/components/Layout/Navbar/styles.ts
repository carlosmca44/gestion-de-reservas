import { Toolbar as MuiToolbar } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const Toolbar = styled(MuiToolbar)(() => ({
  justifyContent: "space-between",
}));

export const Links = styled(Link)(() => ({
  textDecoration: "none",
}));
