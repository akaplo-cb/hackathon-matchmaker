import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const muiStyle = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        height: '30rem'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

const TeamCard = ({ classes, isBestMatch, team }) => (
    <Card className={classes.card} key={ team.name }>
        <CardContent>
            { isBestMatch &&
            <i>Best Match For You</i>
            }
            <Typography gutterBottom variant="headline" component="h2">
                { team.name }
            </Typography>
            <Typography component="i">
                { team.members.join(', ') }
            </Typography>
            <Typography component="i">
                { team.languages.join(', ')}
            </Typography>
            <Typography component="i">
                { team.environments.join(', ')}
            </Typography>
            <Typography component="p">
                { team.description}
            </Typography>
            <Typography component="p">
                { team.points}
            </Typography>
        </CardContent>
        <CardActions>
            <Button href='https://carbonblack.slack.com' size="small" color="primary">
                Learn more
            </Button>
        </CardActions>
    </Card>
);

export default withStyles(muiStyle)(TeamCard);