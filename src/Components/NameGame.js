import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    demo: {
        height: '100%',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit,
        height: '100%',
        color: theme.palette.text.secondary,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

class NameGame extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            snackbarVisible: false,
            snackbarMessage: '',
            variant: 'info'
        };
    }

    handleNewGame = (e) => {
        this.props.startNewGame(e.target.innerHTML);
    };


    render() {
        const { classes } = this.props;

        let jsx;
        if (this.props.gameOn){
            let data = this.props.gameData;
            let choices = data.question.choices;

            if (data.question.choice_type == "image")
            {
                let image_choices = choices.map((image) => (
                    <Grid onClick={e => this.props.submitAnswer(image.choice.id, e)} xs={12} sm={6} md={6} lg={6} xl={2} key={image.choice.id} item>
                        <Button><img width="95%" height="100%" src={"https://" + image.choice.url} alt={image.choice.alt}/></Button>
                    </Grid>)
                );


                jsx = (
                    <div style={{height: '100%', marginBottom: '12vh'}}>
                        <Grid container
                              alignItems='center'
                              direction="column"
                              alignContent="center"
                              style={{height:"100%"}}>

                            <Grid item>
                                <Paper className={classes.paper}>
                                    <Typography variant="title">Current Session Stats: </Typography><br/>
                                    <Typography color='inherit'>Number of Correct Guesses:{" " + data.session_number_right}</Typography><br/>
                                    <Typography color='error'>Number of Wrong Guesses: {" " + data.session_number_wrong}</Typography><br/>

                                </Paper>
                                <br/>
                            </Grid>
                            <Grid item>
                                <Typography variant="title">{data.question.question_text + "?"}</Typography>
                                <br/>
                            </Grid>
                            <Divider/>
                            <Grid container
                                  alignItems='center'
                                  direction="row"
                                  alignContent="stretch"
                                  style={{height:"100%"}}>

                                {image_choices}

                            </Grid>
                            <br/>
                            <Grid item>
                                <Button variant="contained" onClick={this.props.stopGame} color='primary' fullWidth>End Game</Button>
                            </Grid>
                        </Grid>
                    </div>
                )
            }
            else //reverse mode
            {
                let text_choices = choices.map((text) => (
                    <Grid md={6} lg={6} xl={3} key={text.id} item>
                        <Button onClick={e => this.props.submitAnswer(text.id, e)}><Typography>{text.choice}</Typography></Button>
                    </Grid>)
                );

                jsx = (
                    <div style={{height: '100%', marginBottom: '12vh'}}>
                        <Grid container
                              alignItems='center'
                              direction="column"
                              alignContent="center"
                              style={{height:"100%"}}>

                            <Grid item>
                                <Paper className={classes.paper}>
                                    <Typography variant="title">Current Session Stats: </Typography><br/>
                                    <Typography color='inherit'>Number of Correct Guesses:{" " + data.session_number_right}</Typography><br/>
                                    <Typography color='error'>Number of Wrong Guesses: {" " + data.session_number_wrong}</Typography><br/>
                                </Paper>
                                <br/>
                            </Grid>
                            <Grid item>
                                <Typography variant="title">{"Who is in this picture?"}</Typography>
                                <br/>
                            </Grid>
                            <Grid item md={6} lg={6} xl={3}>
                                <img width="95%" height="100%" src={"https://" + data.question.question_image.url} alt={data.question.question_image.alt}/>
                            </Grid>
                            <Divider/>
                            <Grid container
                                  alignItems='center'
                                  direction="column"
                                  alignContent="center"
                                  style={{height:"100%"}}>

                                {text_choices}

                            </Grid>
                            <Grid item>
                                <Button onClick={this.props.stopGame} fullWidth><Typography style={{color:'red'}}>End Game</Typography></Button>
                            </Grid>
                        </Grid>
                    </div>
                )
            }

        }
        else {
            jsx = (
                <div style={{height: '100%', marginBottom: '12vh'}}>
                    <Grid container
                          alignItems='center'
                          direction="column"
                          alignContent="center"
                          style={{height:"100%"}}>

                        <Grid md={6} lg={6} xl={6} style={{margin: '5vh'}} item>
                            <Typography variant="title">Choose a game mode!</Typography>
                        </Grid>

                        <Grid md={6} lg={6} xl={6} style={{margin: '5vh'}} item>
                            <Button fullWidth color="primary" variant="contained" onClick={this.handleNewGame}>standard</Button>
                        </Grid>
                        <Grid md={6} lg={6} xl={6} onClick={this.handleNewGame} style={{margin: '5vh'}} item>
                            <Button fullWidth color="secondary" variant="contained" >reverse</Button>
                        </Grid>
                        <Grid md={6} lg={6} xl={6} style={{margin: '5vh'}} item>
                            <Button color="inherit" variant="contained" fullWidth onClick={this.handleNewGame}>Matt</Button>
                        </Grid>
                    </Grid>
                </div>
            );
        }
        return jsx;
    }
}

export default withStyles(styles)(NameGame);