import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// IMAGES 
import signIn from '../../../images/Sign-in-up/signIn.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));
const divStyle = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const styleButton = divStyle();
    return (
        <div className='sign-up'>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Container>
                            <div className='sign-up-left'>
                                <h2>SIGN UP</h2>
                                <div className='sign-up-form'>
                                    <form>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Email" variant="outlined" />
                                        </div>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                                        </div>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
                                        </div>
                                        <div className='form-button'>
                                            <Button variant="contained" color="secondary">
                                                SIGN UP NOW
                                            </Button>
                                        </div>
                                    </form>
                                    <div className='sign-up-landing'>
                                        <span className='landing'>
                                            <Link to='/sign-in'>
                                                SIGN IN NOW
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                    {/* -- */}
                    <Grid item xs={6}>
                        <div className='sign-up-right'>
                            <div className='sign-in-background'>
                                <img src={signIn} alt='signIn' />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
