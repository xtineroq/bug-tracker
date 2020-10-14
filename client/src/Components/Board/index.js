import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Button from "@material-ui/core/Button";
import BugCard from "../BugCard";
import "./style.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import API from "../../utils/API";
import BugForm from "../BugForm";

export default function Board() {
  /** States to store each bug data depending on status */
  const [backlogState, setBacklogState] = React.useState([]);
  const [todoState, setTodoState] = React.useState([]);
  const [inProgressState, setInProgressState] = React.useState([]);
  const [onStagingState, setOnStagingState] = React.useState([]);
  const [readyUatState, setReadyUatState] = React.useState([]);
  const [uatApprovedState, setUatApprovedState] = React.useState([]);
  const [liveState, setLiveState] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [bugFormData, setBugFormData] = React.useState(null);

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

        res.data.forEach((bug) => {
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
    // retrieveData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="board-root">
      <CssBaseline />
      <NavBar />
      <div className="board-main">
        <Box my={2}>
          <Button
            className="addBtn"
            color="secondary"
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddIcon />}
          >
            New Bug
          </Button>
        </Box>
        {/* Outer wrapper */}
        <Grid className="panel-container">
          {/* Inner wrapper */}
          <div className="column-wrapper">
            <div className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                BACKLOG
              </Typography>
              <BugCard issues={backlogState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </div>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                TO DO
              </Typography>
              <BugCard issues={todoState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                IN PROGRESS
              </Typography>
              <BugCard issues={inProgressState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                ON STAGING
              </Typography>
              <BugCard issues={onStagingState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                READY FOR UAT
              </Typography>
              <BugCard issues={readyUatState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </Paper>
            <Paper className="panel">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                UAT APPROVED
              </Typography>
              <BugCard issues={uatApprovedState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </Paper>
            <Paper className="panel panel-0__right-margin">
              <Typography className="panel-title" style={{ fontSize: "14px" }}>
                LIVE ON PRODUCTION
              </Typography>
              <BugCard issues={liveState} handleOpen={handleOpen} setBugFormData={setBugFormData}/>
            </Paper>
          </div>
        </Grid>
      </div>
      <BugForm open={open} handleClose={handleClose} bugFormData={bugFormData}/>
      <Footer />
    </div>
  );
}
