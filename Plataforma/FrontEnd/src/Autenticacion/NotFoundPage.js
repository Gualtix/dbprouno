import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Label } from 'reactstrap';
import { BrowserRouter as Route, } from 'react-router-dom';
const useStyles = makeStyles(() => ({
    bloque: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginTop: '-800px',
        marginLeft: '-160px',
    }
}));

const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <Route exact path='/NotFoundPage'>
            <div>
                <div className={classes.bloque}>
                    <div></div>
                    <Label style={{ fontSize: '200px' }}>404</Label>
                    <h3>This page could not be found</h3>
                </div>
            </div>
        </Route>
    )
}

export default NotFoundPage;