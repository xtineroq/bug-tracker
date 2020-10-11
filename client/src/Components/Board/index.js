import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import NavBar from "../NavBar";
import Footer from "../Footer";
import BugCard from "../BugCard";
import "./style.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import BugForm from "../BugForm";
import Typography from "@material-ui/core/Typography";

export default function Board() {
  return (
    <div className="board-root">
      <CssBaseline />
      <NavBar />
      <div className="board-main">
        <Box my={2}>
          <BugForm className="addBtn">New Bug</BugForm>
        </Box>
        {/* Outer wrapper */}
        <Grid className="panel-container">
          {/* Inner wrapper */}
          <div className="column-wrapper">
            <div className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                BACKLOG
              </Typography>
              <BugCard />
            </div>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                TO DO
              </Typography>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                IN PROGRESS
              </Typography>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                ON STAGING
              </Typography>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                READY FOR UAT
              </Typography>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                UAT APPROVED
              </Typography>
            </Paper>
            <Paper className="panel panel-0__right-margin">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                LIVE ON PRODUCTION
              </Typography>
            </Paper>
          </div>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
