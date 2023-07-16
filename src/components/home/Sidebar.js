import { Container } from "@mui/material";
import React from "react";
import NameCard from "./NameCard";

function Sidebar() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <NameCard />
    </Container>
  );
}

export default Sidebar;
