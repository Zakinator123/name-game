import React, { Component } from 'react';
import TopBar from './Layouts/TopBar';
import BottomBar from './Layouts/BottomBar';
import LoginDialog from './Components/LoginDialog';
import AuthenticatedHome from './Components/AuthenticatedHome';
import "./index.css";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#b2ebf2',
            main: '#0097a7',
            dark: '#006064',
            contrastText: '#fff',
        },
        secondary: {
            light: '#6f74dd',
            main: '#3949ab',
            dark: '#00227b',
            contrastText: '#fff',
        },
    },
});

class App extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: false,
        };

        this.apiHost = 'https://api.the-name-game.com';

        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    // Event handler called upon successful login.
   logIn() {
        this.setState({loggedIn: true})
    }

    //Event handler called upon logout
    logOut() {
        this.setState({loggedIn: false});
        let storedToken = sessionStorage.getItem('token');
        fetch(this.apiHost + '/logout', {
            method: 'POST',
            body: JSON.stringify({token: storedToken}),
            headers:{
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => response.json())
            .catch(error => console.error('Error with HTTP request:', error))
            .then(response => console.log(response));

        // Remove token from local storage.
        sessionStorage.removeItem('token');
    }

    render() {

        let nonAuthenticatedHomePage = (
            <div style={{height: '100%', marginBottom: '12vh'}}>

                <Grid container
                      alignItems='center'
                      direction="column"
                      alignContent="stretch"
                      style={{height:"100%"}}>

                    <Grid md={6} lg={6} xl={6} style={{margin: '10vh'}} item>
                        <LoginDialog logIn={this.logIn} apiHost={this.apiHost} type="Signup"/>
                    </Grid>
                    <Grid md={6} lg={6} xl={6} style={{margin: '3vh'}} item>
                        <LoginDialog logIn={this.logIn} apiHost={this.apiHost} type="Login"/>
                    </Grid>
                </Grid>
            </div>
        );

        return (
            <div>
                <MuiThemeProvider theme={theme} >
                    <TopBar loggedIn={this.state.loggedIn} apiHost={this.apiHost} logOut={this.logOut}/>
                    {(this.state.loggedIn) ?
                        <AuthenticatedHome data={this.state.data} loggedIn={this.state.loggedIn} apiHost={this.apiHost}/> :
                        nonAuthenticatedHomePage
                    }
                    <BottomBar />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
