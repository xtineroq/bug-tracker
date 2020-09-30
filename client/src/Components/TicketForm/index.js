import React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import './style.css';

function TicketForm({}) {

    return (
      <form className="form">
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Project Title"
          name="title"
          onChange={}
          autoFocus
        />
        <FormControlLabel
          control={
            <TextareaAutosize
            rowsMin={3}
            margin="normal"
            required
            fullWidth
            name="summary"
            onChange={}
            label="Summary"
            id="summary"
            placeholder="Issue Summary"
          />
        }
        />
        <InputLabel id="status">Status</InputLabel>
        <Select
          labelId="status"
          id="status"
          value={status}
          onChange={}
        >
          <MenuItem value={1}>Ten</MenuItem>
          <MenuItem value={2}>Twenty</MenuItem>
          <MenuItem value={3}>Thirty</MenuItem>
        </Select>

      </form>
    );
}

export default TicketForm;