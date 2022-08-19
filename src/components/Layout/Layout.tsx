import { Container } from "@mui/material";
import React from "react";
import Navbar from "./Navbar/Navbar";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
