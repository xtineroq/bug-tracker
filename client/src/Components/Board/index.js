import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import NavBar from "../NavBar";
import Footer from "../Footer";
import "./style.css";
// import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TicketForm from '../TicketForm';
import { Typography } from "@material-ui/core";

export default function Board() {

  return (
    <div className="root">
      <CssBaseline />
      <Box className="nav">
        <NavBar />
        <div className="main">
          <Box my={2}>
            <TicketForm
              className="addBtn"
            >
              New Bug
            </TicketForm>
          </Box>
          <Box className="panel-container">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    BACKLOG
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    TO DO
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    IN PROGRESS
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    ON STAGING
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    READY FOR UAT
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    UAT APPROVED
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    LIVE ON PRODUCTION
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Footer />
      </Box>
    </div>
  );
}
