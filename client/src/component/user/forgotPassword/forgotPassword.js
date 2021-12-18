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

export default function ForgotPassword() {
    const classes = useStyles();
    const styleButton = divStyle();
    return (
        <div className='forgot-password'>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Container>
                            <div className='forgot-password-left'>
                                <h2>SIGN UP</h2>
                                <div className='forgot-password-form'>
                                    <form>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Enter your Email, Please!" variant="outlined" />
                                        </div> 
                                        <div className='form-button'>
                                            <Button variant="contained" color="secondary">
                                                SEND EMAIL NOW
                                            </Button>
                                        </div>
                                    </form>
                                    <div className='forgot-password-landing'>
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
                        <div className='forgot-password-right'>
                            <div className='forgot-password-background'>
                                <img src={signIn} alt='signIn' />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
