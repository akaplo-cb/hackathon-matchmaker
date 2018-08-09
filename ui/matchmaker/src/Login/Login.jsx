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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


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
    red: {
        color: 'red'
    }
});

class Login extends Component {
    state = { email: 'cbrewer@carbonblack.com', type: 'individual' };

    validateAll(email, type) {
        return this.validateEmail(email) && this.validateType(type);
    }
    validateEmail(email) {
        return email && email.toLowerCase().trim().endsWith('@carbonblack.com')
    }

    validateType(type) {
        return !!type
    }

    render() {
        const { classes, onLoginClicked, incomingMessage } = this.props;
        const { email, error } = this.state;
        return(
            <Paper className={ classes.root }>
                <Typography className={ classes.red } component="i">
                    { incomingMessage }
                </Typography>
                <Typography variant="headline" component="h3">
                    Welcome to the Cb Hackathon Matchmaker
                </Typography>
                <Typography component="p">
                    Let's find you someone to work with.
                </Typography>
                <TextField
                    required
                    id="required"
                    error={ !this.validateEmail(email) && error }
                    label="Email"
                    defaultValue={'cbrewer@carbonblack.com'}
                    placeholder={ 'Enter Cb email' }
                    margin="normal"
                    onChange={ (e) => this.setState({ email: e.target.value })}
                />
                <FormControl error={ !this.state.type && error } component="fieldset" className={classes.formControl} required>
                    <FormLabel component="legend">Are you a team or an individual?</FormLabel>
                    <RadioGroup
                        className={classes.group}
                        value={ this.state.type }
                        onChange={ e => this.setState({ type: e.target.value }) }
                    >
                        <FormControlLabel
                            value="individual"
                            control={<Radio color="primary" />}
                            label="Individual"
                            labelPlacement="start"
                        />
                        <FormControlLabel
                            value="team"
                            control={<Radio color="primary" />}
                            label="Team (coming soon)"
                            labelPlacement="start"
                        />
                    </RadioGroup>
                </FormControl>
                <Button variant="contained" color="primary" onClick={ () => {
                    if (this.validateAll(email, this.state.type)) {
                        onLoginClicked(this.state);
                    } else if (!this.validateEmail(email)){
                        this.setState({ error: true, showSnackbar: true, errorString: 'Email must end in @carbonblack.com' });
                    } else if (!this.validateType(this.state.type)) {
                        this.setState({ error: true, showSnackbar: true, errorString: 'Must specify team or individual' });
                    }
                } }>
                    See Matches
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={ this.state.showSnackbar }
                    autoHideDuration={6000}
                    onClose={() => this.setState({ showSnackbar: false })}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{ this.state.errorString }</span>}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(Login);