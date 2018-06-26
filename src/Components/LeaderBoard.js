import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'scroll',
    },
});


class Leaderboard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [{"game_type":"Loading","number_right": 0,"number_wrong":0,"session_id":0,"username":"Loading"}],
        };

        fetch(this.props.apiHost + "/leaderboard", {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(response => response.json())
            .catch(error => console.error('Error with HTTP request:', error))
            .then(response => {
                if (response['status'] != 'Success')
                    console.log(response);
                else {
                    let leaderboard = response['leaderboard'].sort(function(a, b){return a.number_right-b.number_right});

                    let top_10 = leaderboard.slice(10).reverse();
                    this.setState({data : top_10});
                }
            });
    }


    render () {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell numeric>Number Right</TableCell>
                            <TableCell numeric>Number Wrong</TableCell>
                            <TableCell numeric>Game Type</TableCell>
                            <TableCell numeric>Session ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(session => {
                            return (
                                <TableRow key={session.session_id}>
                                    <TableCell component="th" scope="row">
                                        {session.username}
                                    </TableCell>
                                    <TableCell numeric>{session.number_right}</TableCell>
                                    <TableCell numeric>{session.number_wrong}</TableCell>
                                    <TableCell numeric>{session.game_type}</TableCell>
                                    <TableCell numeric>{session.session_id}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}


export default withStyles(styles)(Leaderboard);