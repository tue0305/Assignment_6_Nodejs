import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { Link } from 'react-router-dom';
import {signInAPI} from '../../../redux/actions/user/signIn-signUp/userSignIn'
import { useDispatch, useSelector } from 'react-redux';
// IMAGES 
import salad from '../../../images/Sign-in-up/salad.jpg';

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
function SignIn(props) {
    const classes = useStyles();
    const styleButton = divStyle();
    let dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const { email, password } = state;
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please input field');
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            setError('Email must be email address ex: @gmail')
        }
        if( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)){
            setError('The password must contain at least 8  characters including at least 1 uppercase, 1 lowercase, one digit.')
          }
        else {
            dispatch(signInAPI(state));
            console.log(dispatch(signInAPI(state)),'st');
            setError('');
        }
    };
    const [error, setError] = useState('');
    return (
       <div className='bg-signIn'>
            <div className='Sign-In'>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Container>
                            <div className='sign-in-left'>
                                <h2>SIGN IN</h2>
                                <div className='sign-in-form'>
                                    <form
                                        onSubmit={handleSubmit}
                                    >
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                type="email"
                                                value={state.email}
                                                name='email'
                                                onChange={handleInputChange}
                                            />
                                             {error && <h3>{error}</h3>}
                                        </div>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Password"
                                                variant="outlined"
                                                value={state.password}
                                                onChange={handleInputChange}
                                                name='password'
                                                type='password'
                                            />
                                           
                                        </div>
                                        <div className='form-button' >
                                            <Button variant="contained" color="secondary" type='submit'>
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
                                            <FacebookIcon /> SIGN IN WITH FACEBOOK
                                        </Button>
                                    </div>
                                    <div className='social-button'>
                                        <Button variant="contained" color="primary">
                                            <GTranslateIcon /> SIGN IN WITH Google
                                        </Button>
                                    </div>
                                    <div className='social-button'>
                                        <Button variant="contained" color="primary">
                                            <AccountBalanceIcon /> SIGN IN WITH FPT SOFTWARE
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
                                <img src={salad} alt='salad' />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
       </div>
    )
}
export default (SignIn)