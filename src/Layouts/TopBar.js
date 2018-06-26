import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
});


function TopBar(props) {
    const {classes} = props;

    let LogoutButton;

    if (props.loggedIn == false)
        LogoutButton = <Button style={{visibility: 'hidden' }} color="primary" variant="contained" ><Typography variant="button" style={{visibility: 'hidden'}}>Login</Typography> </Button>;
    else {
        LogoutButton = (
            <Button color="primary" variant="contained" onClick={props.logOut}>
                <Typography variant="button" style={{color: "#FFFFFF"}}>Logout</Typography>
            </Button>
        );
    }

    return (
        <div className="TopBar">
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant='title' color="inherit" align="left" className={classes.flex}>
                            The Name Game
                        </Typography>
                        {LogoutButton}
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);