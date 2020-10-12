import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import NavBar from "../NavBar";
import Footer from "../Footer";
import BugCard from "../BugCard";
import "./style.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BugForm from '../BugForm';
import Typography from "@material-ui/core/Typography";
import API from "../../utils/API";

export default function Board() {

  /** state to store each bug data depending on status */
  const [backlogState, setBacklogState] = React.useState([]);
  const [todoState, setTodoState] = React.useState([]);
  const [inProgressState, setInProgressState] = React.useState([]);
  const [onStagingState, setOnStagingState] = React.useState([]);
  const [readyUatState, setReadyUatState] = React.useState([]);
  const [uatApprovedState, setUatApprovedState] = React.useState([]);
  const [liveState, setLiveState] = React.useState([]);

  /** retrieve all bugs from db */
  const fetchBugs = () => {
    API.getBugs()
      .then((res) => {
        const backlogList = [];
        const todoList = [];
        const inProgressList = [];
        const onStagingList = [];
        const readyUatList = [];
        const uatApprovedList = [];
        const liveList = [];

        res.data.forEach(bug => {
          if (bug.stage === "backlog") {
            backlogList.push(bug);
          } else if (bug.stage === "todo") {
            todoList.push(bug);
          } else if (bug.stage === "in-progress") {
            inProgressList.push(bug);
          } else if (bug.stage === "on-staging") {
            onStagingList.push(bug);
          } else if (bug.stage === "ready-for-uat") {
            readyUatList.push(bug);
          } else if (bug.stage === "uat-approved") {
            uatApprovedList.push(bug);
          } else if (bug.stage === "live") {
            liveList.push(bug);
          }
        });

        /**  */
        setBacklogState(backlogList);
        setTodoState(todoList);
        setInProgressState(inProgressList);
        setOnStagingState(onStagingList);
        setReadyUatState(readyUatList);
        setUatApprovedState(uatApprovedList);
        setLiveState(liveState);

      })
      .catch((err) => console.log(err));
  };

  /** load all bugs */
  React.useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className="root">
      <CssBaseline />
      <Box className="nav">
        <NavBar />
        <div className="main">
          <Box my={2}>
            <BugForm
              className="addBtn"
            >
              New Bug
            </BugForm>
          </Box>
          <Box className="panel-container">
            <Grid
              container
              spacing={1}
            >
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    BACKLOG
                  </Typography>
                  <BugCard issues={backlogState}/>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    TO DO
                  </Typography>
                  <BugCard issues={todoState}/>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    IN PROGRESS
                  </Typography>
                  <BugCard issues={inProgressState}/>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    ON STAGING
                  </Typography>
                  <BugCard issues={onStagingState}/>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    READY FOR UAT
                  </Typography>
                  <BugCard issues={readyUatState}/>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    UAT APPROVED
                  </Typography>
                  <BugCard issues={uatApprovedState}/>
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper className="panel">
                  <Typography className="panel-title" style={{ fontSize: "14px" }}>
                    LIVE ON PRODUCTION
                  </Typography>
                  <BugCard issues={liveState}/>
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
