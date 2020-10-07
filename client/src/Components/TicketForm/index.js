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
  label: {
    paddingTop: "1rem"
  },
  selectBox: {
    width: "20%"
  },
  btnBox: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));

function TicketForm({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          label="Project Title"
          name="title"
          // onChange={}
          autoFocus
        />
        <TextareaAutosize
          rowsMin={3}
          margin="normal"
          className={classes.textarea}
          required
          name="summary"
          // onChange={}
          label="Summary"
          id="summary"
          placeholder="Issue Summary"
        />
        <InputLabel id="stage" className={classes.label} required>Status</InputLabel>
        <Select labelId="stage" id="stage" className={classes.selectBox}>
          <MenuItem value={1}>Backlog</MenuItem>
          <MenuItem value={2}>To Do</MenuItem>
          <MenuItem value={3}>In Progress</MenuItem>
        </Select>
        <InputLabel id="priority" className={classes.label} required>Priority</InputLabel>
        <Select labelId="priority" id="priority" className={classes.selectBox}>
          <MenuItem value={1}>Blocker</MenuItem>
          <MenuItem value={2}>Critical</MenuItem>
          <MenuItem value={3}>Major</MenuItem>
          <MenuItem value={3}>Minor</MenuItem>
          <MenuItem value={3}>Trivial</MenuItem>
        </Select>
        <InputLabel id="assignee" className={classes.label} required>Assignee</InputLabel>
        <Select labelId="assignee" id="assignee" className={classes.selectBox}>
          <MenuItem value={1}>User1</MenuItem>
          <MenuItem value={2}>User2</MenuItem>
          <MenuItem value={3}>User3</MenuItem>
        </Select>
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

export default TicketForm;
