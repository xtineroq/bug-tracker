import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import NavBar from "../NavBar";
import Footer from "../Footer";
import "./style.css";
import Container from "@material-ui/core/Container";

export default function Board() {
  return (
    <div className="root">
      <CssBaseline />
      <Box className="nav">
        <NavBar />
        <Container className="main">
          <Box my={2}>
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className="addBtn"
            >
              + Add New Ticket
            </Button>
          </Box>
        </Container>
        <Footer />
      </Box>
    </div>
  );
}
