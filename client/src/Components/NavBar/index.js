import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "./style.css";
import { AuthContext } from "../../Context/Auth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function NavBar() {
  const { logoutHandler, user } = React.useContext(AuthContext);
  return (
    <div className="root">
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className="appBar"
      >
        <Toolbar className="toolbar">
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className="toolbarTitle"
          >
            BugTracker
          </Typography>
          <Box mx={2}>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className="link"
            >
              {user}
            </Link>
          </Box>
          <Button
            onClick={logoutHandler}
            color="secondary"
            variant="contained"
            className="link"
            endIcon={<ExitToAppIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
