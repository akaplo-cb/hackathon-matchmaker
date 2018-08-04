import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginTop: '15%',
        width: '50%',
        marginLeft: '25%',
        height: '25rem'
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class Login extends Component {
    state = { email: undefined };
    render() {
        const { classes, onLoginClicked } = this.props;
        const { email } = this.state;
        return(
            <Paper className={ classes.root }>
                <Typography variant="headline" component="h3">
                    Welcome to the Cb Hackathon Matchmaker
                </Typography>
                <Typography component="p">
                    Let's find you someone to work with.
                </Typography>
                <TextField
                    required
                    id="required"
                    label="Email"
                    placeholder={ 'Enter Cb email' }
                    margin="normal"
                    onChange={ (e) => this.setState({ email: e.target.value })}
                />
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Are you a team or an individual?</FormLabel>
                    <RadioGroup
                        className={classes.group}
                        value={ this.state.type }
                        onChange={ e => this.setState({ type: e.target.value }) }
                    >
                        <FormControlLabel
                            value="team"
                            control={<Radio color="primary" />}
                            label="Team"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="individual"
                            control={<Radio color="primary" />}
                            label="Individual"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" color="primary" onClick={ () => onLoginClicked(this.state) }>
                    See Matches
                </Button>
            </Paper>
        );
    }
}

export default withStyles(styles)(Login);