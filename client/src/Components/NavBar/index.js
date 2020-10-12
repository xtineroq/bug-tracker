import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import "./style.css";
import { AuthContext } from "../../Context/Auth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../../Images/trace-logo-small.png';

function NavBar() {
  const { logoutHandler, user } = React.useContext(AuthContext);
  return (
    <div className="nav-root">
      <AppBar
        position="static"
        color="default"
        elevation={2}
        className="appBar"
      >
        <Toolbar className="toolbar">
          <Box className="toolbarTitle">
            <img src={logo} alt="trace-logo" width="76px" height="32px"/>
          </Box>
          <Box mx={2}>
            <Typography
              className="user-label"
            >
              Signed in as <span className="username">{user}</span>
            </Typography>
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
