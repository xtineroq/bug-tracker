import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import "./style.css";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: "absolute",
    width: "50vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3, 4),
    outline: "none"
  },
  textarea: {
    marginTop: "1rem",
    width: "100%",
    fontFamily: "inherit",
    fontSize: "16px",
    lineHeight: "1.5"
  },
  selectBox: {
    width: "30%"
  },
  btnBox: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));

function BugForm({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stage, setStage] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [assignee, setAssignee] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  }

  const handleDescriptionInput = (event) => {
    setDescription(event.target.value);
  }

  const handleStageSelect = (event) => {
    setStage(event.target.value);
  }

  const handlePrioritySelect = (event) => {
    setPriority(event.target.value);
  }

  const handleAssigneeSelect = (event) => {
    setAssignee(event.target.value);
  }

  return (
    <>
    <Button 
      color="secondary"
      variant="contained"
      onClick={handleOpen}
      startIcon={<AddIcon />}
    >
      {children}
    </Button>

    <Modal
      open={open}
      onClose={handleClose}
      className={classes.modal}
    >
      <div className={classes.paper}>
      <form className="form">
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Issue Summary"
          name="title"
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
          placeholder="Bug description"
        />
        <FormControl className={classes.selectBox}>
          <InputLabel id="stage" required>Status</InputLabel>
          <Select labelId="stage" id="stage" value={stage} onChange={handleStageSelect}>
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
          <InputLabel id="priority" required>Priority</InputLabel>
          <Select labelId="priority" id="priority" value={priority} onChange={handlePrioritySelect}>
            <MenuItem value={"blocker"}>Blocker</MenuItem>
            <MenuItem value={"critical"}>Critical</MenuItem>
            <MenuItem value={"major"}>Major</MenuItem>
            <MenuItem value={"minor"}>Minor</MenuItem>
            <MenuItem value={"trivial"}>Trivial</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.selectBox}>
          <InputLabel id="assignee" required>Assignee</InputLabel>
          <Select labelId="assignee" id="assignee" value={assignee} onChange={handleAssigneeSelect}>
            <MenuItem value={1}>User1</MenuItem>
            <MenuItem value={2}>User2</MenuItem>
            <MenuItem value={3}>User3</MenuItem>
          </Select>
        </FormControl>
        <Box className={classes.btnBox}>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="secondary">
            Save
          </Button>
        </Box>
      </form>
      </div>
    </Modal>
    </>
  );
}

export default BugForm;