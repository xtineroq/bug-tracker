import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import './style.css';

function Copyright() {
    return (
      <Typography variant="body2" align="center" style={{color: "#cccccc"}}>
        {'Copyright © '}
        <Link href="https://material-ui.com/" style={{color: "#cccccc"}}>
            BugTracker
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

export default function Footer() {
    return (
      <footer className="footer">
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    );
}