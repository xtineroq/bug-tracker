import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import "./style.css";

function BugCard({issues}) {
  console.log({issues})
  return (
    <>
      {/* if State array is not empty proceed to mapping */}
      {issues.map((bug) => {
        return (
          <Card className="card-root" key={bug._id}>
            <CardContent>
            <Typography className="title" gutterBottom style={{ fontSize: "14px" }}>
              {bug.title}
            </Typography>
            <Typography
              className="desc"
              color="textSecondary"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {bug.description}
            </Typography>
            <Typography
              color="textSecondary"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {bug.stage}
            </Typography>
            <Typography
              color="textSecondary"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {bug.priority}
            </Typography>
            <Typography
              color="textSecondary"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {bug.assignee}
            </Typography>
            <Typography
              color="textSecondary"
              component="p"
              style={{ fontSize: "12px" }}
            >
              {bug.reporter}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton style={{ width: "30px", height: "30px" }}>
              <EditIcon />
            </IconButton>
          </CardActions>
        </Card>
        );
      })}
    </>
  );
}

export default BugCard;
