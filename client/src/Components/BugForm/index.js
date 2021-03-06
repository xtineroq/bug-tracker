import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css";
import Typography from "@material-ui/core/Typography";
import BugReportRoundedIcon from "@material-ui/icons/BugReportRounded";
import Axios from "axios";
import { AuthContext } from "../../Context/Auth";
import API from "../../utils/API";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    minWidth: "40vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3, 4),
    outline: "none",
  },
  textarea: {
    marginTop: "1rem",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "16px",
    lineHeight: "1.5",
    borderRadius: "3px",
  },
  selectGroup: {
    display: "flex",
    flexDirection: "column",
  },
  selectBox: {
    width: "60%",
    marginTop: "1rem",
  },
  reporter: {
    paddingTop: "2rem",
    textTransform: "Capitalize",
    color: "#00334d",
  },
  btnBox: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

function BugForm({ fetchBugs, open, handleClose, bugFormData }) {
  const { user } = React.useContext(AuthContext);
  const classes = useStyles();
  let [title, setTitle] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [stage, setStage] = React.useState("");
  let [priority, setPriority] = React.useState("");
  let [assignee, setAssignee] = React.useState("");
  let [reporter, setReporter] = React.useState(user);
  const [assigneeList, setAssigneeList] = React.useState([]);

  React.useEffect(() => {
    /** fetch all users with developer role to use as options for Assignee */
    async function fetchAssignees() {
      try {
        const res = await Axios.get("/users");
        if (res.data) {
          setAssigneeList(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAssignees();
  }, []);

  /** display data from db to bugForm when bugCard is clicked */
  React.useEffect(() => {
    setTitle(bugFormData.title);
    setDescription(bugFormData.description);
    setStage(bugFormData.stage);
    setPriority(bugFormData.priority);
    setAssignee(bugFormData.assignee);
    setReporter(bugFormData.reporter);
  }, [bugFormData]);

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionInput = (event) => {
    setDescription(event.target.value);
  };

  const handleStageSelect = (event) => {
    setStage(event.target.value);
  };

  const handlePrioritySelect = (event) => {
    setPriority(event.target.value);
  };

  const handleAssigneeSelect = (event) => {
    setAssignee(event.target.value);
  };

  const handleCancel = () => {
    handleClose();
  };

  /** Form save handler */
  const handleSave = async () => {
    /** Send bug form data to server */
    try {
      await API.saveBug({
        title,
        description,
        stage,
        priority,
        assignee,
        reporter: user,
      });
      fetchBugs();
      setStage({ stage: "" });
      setPriority({ priority: "" });
      setAssignee({ assignee: "" });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  /** Form update handler */
  const handleUpdate = async () => {
    /** Send bug form data to server */
    try {
      await API.updateBug(bugFormData._id, {
        title,
        description,
        stage,
        priority,
        assignee,
        reporter,
      });
      fetchBugs();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        disableBackdropClick={true}
      >
        <div className={classes.paper}>
          <form className="form">
            <Typography className="form-title">
              <BugReportRoundedIcon />
              &nbsp;Create Issue
            </Typography>
            <hr />
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Issue Summary"
              name="title"
              value={title}
              onChange={handleTitleInput}
              autoFocus
            />
            <TextareaAutosize
              rowsMin={3}
              margin="normal"
              className={classes.textarea}
              required
              name="description"
              onChange={handleDescriptionInput}
              id="description"
              value={description}
              placeholder="Detailed description of the issue"
            />
            <Box className={classes.selectGroup}>
              <FormControl className={classes.selectBox}>
                <InputLabel id="stage-label" required>
                  Status
                </InputLabel>
                <Select
                  labelId="stage-label"
                  id="stage"
                  value={stage}
                  onChange={handleStageSelect}
                >
                  <MenuItem value={"backlog"}>Backlog</MenuItem>
                  <MenuItem value={"todo"}>To Do</MenuItem>
                  <MenuItem value={"in-progress"}>In Progress</MenuItem>
                  <MenuItem value={"on-staging"}>On Staging</MenuItem>
                  <MenuItem value={"ready-for-uat"}>Ready for UAT</MenuItem>
                  <MenuItem value={"uat-approved"}>UAT Approved</MenuItem>
                  <MenuItem value={"live"}>Live on Production</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.selectBox}>
                <InputLabel id="priority" required>
                  Priority
                </InputLabel>
                <Select
                  labelId="priority"
                  id="priority"
                  value={priority}
                  onChange={handlePrioritySelect}
                >
                  <MenuItem value={"blocker"}>Blocker</MenuItem>
                  <MenuItem value={"critical"}>Critical</MenuItem>
                  <MenuItem value={"major"}>Major</MenuItem>
                  <MenuItem value={"minor"}>Minor</MenuItem>
                  <MenuItem value={"trivial"}>Trivial</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.selectBox}>
                <InputLabel id="assignee" required>
                  Assignee
                </InputLabel>
                <Select
                  labelId="assignee"
                  id="assignee"
                  value={assignee}
                  onChange={handleAssigneeSelect}
                >
                  {assigneeList.map((user, index) => (
                    <MenuItem key={index} value={user}>
                      {user}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Typography className={classes.reporter}>
              Reporter: {reporter}
            </Typography>
            <Box className={classes.btnBox}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              {!bugFormData.title ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              )}
            </Box>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default BugForm;
