import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';


function BugCard() {
    return(
        <Card className="root">
        <CardContent>
            <Typography className="title" gutterBottom style={{fontSize: "14px"}}>
            Bug Title
            </Typography>
            <Typography className="desc" color="textSecondary" component="p" style={{fontSize: "12px"}}>
            Description goes here...
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