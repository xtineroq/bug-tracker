import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import "./style.css";

function BugCard({title, description, stage, priority, assignee}) {
    return(
        <Card className="card-root">
        <CardContent>
            <Typography className="title" gutterBottom style={{fontSize: "14px"}}>
            {title}
            </Typography>
            <Typography className="desc" color="textSecondary" component="p" style={{fontSize: "12px"}}>
            {description}
            </Typography>
            <Typography>
            {stage}
            </Typography>
            <Typography>
            {priority}
            </Typography>
            <Typography>
            {assignee}
            </Typography>
        </CardContent>
        <CardActions>
            <IconButton style={{width: "30px", height: "30px"}}>
                <EditIcon />
            </IconButton>
        </CardActions>
        </Card>
    );
}

export default BugCard;