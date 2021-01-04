import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import API from "../../utils/API";
import "./style.css";

function BugCard({issues, handleOpen, setBugFormData, fetchBugs}) {

  const clickHandler = (bug) => {
    handleOpen()
    setBugFormData(bug)
  }

  const handleDelete = async (bug) => {
    await API.deleteBug(bug._id);
    fetchBugs();
  }

  return (
    <>
      {issues.map((bug) => {

      /** change the color of the circle icon depending on priority */
      let colorSwitch =  "circle-icon";

        switch (bug.priority) {
          case "blocker" :
            colorSwitch += " red";
            break;
          case "critical" :
            colorSwitch += " orange";
            break;
          case "major" :
            colorSwitch += " yellow";
            break;
          case "minor" :
            colorSwitch += " green";
            break;
          case "trivial" :
            colorSwitch += " blue";
            break;
          default :
            break;
        }

        return (
          <Card
            className="card-root"
            key={bug._id}
          >
            <CardContent
              className="card-content"
              onClick={() => clickHandler(bug)}
            >
            <Typography className="bug-title" gutterBottom>
              {bug.title}
            </Typography>
            <Typography
              className="card-text"
              color="textSecondary"
              component="p"
            >
              {bug.description}
            </Typography>
            <Typography
              className="card-text"
              color="textSecondary"
              component="p"
            >
              Assigned to: <span className="card-users">{bug.assignee}</span>
            </Typography>
            <Typography
              className="card-text"
              color="textSecondary"
              component="p"
            >
              Reported by: <span className="card-users">{bug.reporter}</span>
            </Typography>
          </CardContent>
          <CardActions>
            <Icon className={colorSwitch}>
              <FiberManualRecordIcon />
            </Icon>
            <IconButton
              className="delete-icon"
              onClick={() => handleDelete(bug)}
            >
              <DeleteIcon style={{color: "#005780"}}/>
            </IconButton>
          </CardActions>
        </Card>
        );
      })}
    </>
  );
}

export default React.memo(BugCard);
