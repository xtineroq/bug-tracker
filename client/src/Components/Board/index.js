import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Footer from '../Footer';

function Board() {
    return (
        <div className="root">
            <CssBaseline />
            <Container component="main" className="main" maxWidth="sm">
                <Footer />
            </Container>
        </div>
    );
}

export default Board;