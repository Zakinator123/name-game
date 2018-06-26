import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

export default class LoginDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            username: '',
            password: '',
            error: false,
            errorMessageVisibility: 'hidden',
            errorMessage: ''
        };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeUsername = event => {
        this.setState({username: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
    };

    handleSubmit = () => {
        this.setState({error: false, errorMessageVisibility: 'hidden'});

        //if signup, signup, else if login login
        let signupOrLogin = this.props.type.toLowerCase();
        fetch(this.props.apiHost + "/" + signupOrLogin, {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
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
                    sessionStorage.setItem('token', response['token']);
                    this.handleClose();
                    if (signupOrLogin == "login")
                        this.props.logIn();
                }
            });
    };

    render() {
        return (
            <div style={this.props.style}>
                <Button style={{width: '50vw', height: '20vh'}} color="primary" variant="contained" onClick={this.handleClickOpen}><Typography variant="title" style={{color:"#ffffff"}}>{this.props.type}</Typography> </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.props.type}</DialogTitle>
                    <DialogContent style={{marginTop: '-4vh'}}>
                        <div style={{visibility:this.state.errorMessageVisibility}}><br/><Typography variant="caption" style={{color:'red'}}>{this.state.errorMessage}</Typography></div>
                        <TextField
                            error={this.state.error}
                            margin="dense"
                            id="name"
                            onChange={this.handleChangeUsername}
                            label="Username"
                            fullWidth
                        />
                        <TextField
                            error={this.state.error}
                            margin="dense"
                            id="pass"
                            label="Password"
                            onChange={this.handleChangePassword}
                            type="password"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            <Typography variant="button" style={{color:'red'}} align="left">Cancel</Typography>
                        </Button>
                        <Button style={{backgroundColor: '#0097a7'}} color="primary" onClick={this.handleSubmit}>
                            <Typography variant="button" style={{color:'white'}} align="left">{this.props.type}</Typography>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}