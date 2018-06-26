import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Leaderboard from './LeaderBoard';
import NameGame from './NameGame';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import blue from "@material-ui/core/colors/blue";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import Snackbar from '@material-ui/core/Snackbar';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class AuthenticatedHome extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            value: 0,
            gameType: '',
            gameOn: false,
            gameData: '',
            snackbarVisible: false,
            snackbarMessage: '',
            variant: 'info'
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    startNewGame = (gameType) => {

        fetch(this.props.apiHost + "/game", {
            method: 'POST',
            body: JSON.stringify({token: sessionStorage.getItem('token'), game_type: gameType}),
            headers:{
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => response.json())
            .catch(error => console.error('Error with HTTP request:', error))
            .then(response => {
                console.log(response);
                if (response['status'] != 'Success')
                    this.setState({error: true, errorMessageVisibility: 'visible', errorMessage: response['message']});
                else {
                    this.setState({gameData: response, gameOn: true, gameType: gameType})
                }
            });
    };

    stopGame = (e) => {
        fetch(this.props.apiHost + "/stop_game", {
            method: 'POST',
            body: JSON.stringify({token: sessionStorage.getItem('token')}),
            headers:{
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => response.json())
            .catch(error => console.error('Error with HTTP request:', error))
            .then(response => {
                console.log(response);
                if (response['status'] != 'Success')
                    this.setState({snackbarVisible: true, snackbarMessage:response['message'], variant: 'error'});
                else {
                    this.setState({gameOn: false, gameData: ''})
                }
            });
    };

    handleSnackbarClose = () => {
        this.setState({snackbarVisible : false})
    };

    submitAnswer = (id, e) => {
        console.log(id);

        fetch(this.props.apiHost + "/game", {
            method: 'POST',
            body: JSON.stringify({token: sessionStorage.getItem('token'), answer: id}),
            headers:{
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => response.json())
            .catch(error => console.error('Error with HTTP request:', error))
            .then(response => {
                console.log(response);
                if (response['status'] != 'Success')
                    this.setState({error: true, errorMessageVisibility: 'visible', errorMessage: response['message']});
                else {
                    (response['last_answer_submission'] == 'Correct') ?
                        this.setState({gameData: response, snackbarVisible: true, snackbarMessage:response['last_answer_submission'], variant: 'success'}) :
                        this.setState({gameData: response, snackbarVisible: true, snackbarMessage:response['last_answer_submission'], variant: 'error'})
                }
            });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        scrollButtons="on"
                        className={classes.tabs}>

                        <Tab label="Play the Name Game" />
                        <Tab label="Leaderboard" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer><NameGame submitAnswer={this.submitAnswer} stopGame={this.stopGame} startNewGame={this.startNewGame} gameOn={this.state.gameOn} gameData={this.state.gameData}/></TabContainer>}
                {value === 1 && <Leaderboard apiHost={this.props.apiHost}/>}

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={{margin: '2vh'}}
                    open={this.state.snackbarVisible}
                    autoHideDuration={1000}
                    onClose={this.handleSnackbarClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleSnackbarClose}
                        variant={this.state.variant}
                        message={this.state.snackbarMessage}
                    />
                </Snackbar>

            </div>
        );
    }
}



AuthenticatedHome.propTypes = {
    classes: PropTypes.object.isRequired,
};



const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};


const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: '#B71C1C',
    },
    info: {
        backgroundColor: blue[900],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    close:{marginTop: -20},
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
        </span>
            }
            action={
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>
            }
            {...other}
        />
    );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

export default withStyles(styles)(AuthenticatedHome);