import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {Link} from 'react-router-dom';
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
export default function SignIn() {
    const classes = useStyles();
    const styleButton = divStyle();
    return (
        <div className='Sign-In'>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Container>
                            <div className='sign-in-left'>
                                <h2>SIGN IN</h2>
                                <div className='sign-in-form'>
                                    <form>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Email" variant="outlined" />
                                        </div>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Password" variant="outlined" />
                                        </div>
                                        <div className='form-button'>
                                            <Button variant="contained" color="secondary">
                                                SIGN IN NOW
                                            </Button>
                                        </div>
                                    </form>
                                    <div className='sign-in-landing'>
                                        <span className='landing'>
                                            <Link to='/forgot-password'>
                                                FORGOT PASSWORD
                                            </Link>
                                        </span>
                                        <span className='landing'>
                                            <Link to='/sign-up'>
                                                SIGN UP NOW
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className='sign-in-social'>
                                    <div className='social-button'>
                                        <Button variant="contained" color="primary">
                                           <FacebookIcon/> SIGN IN WITH FACEBOOK
                                        </Button>
                                    </div>
                                    <div className='social-button'>
                                        <Button variant="contained" color="primary">
                                           <GTranslateIcon/> SIGN IN WITH Google
                                        </Button>
                                    </div>
                                    <div className='social-button'>
                                        <Button variant="contained" color="primary">
                                           <AccountBalanceIcon/> SIGN IN WITH FPT SOFTWARE
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                    {/* -- */}
                    <Grid item xs={6}>
                        <div className='sign-in-right'>
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
