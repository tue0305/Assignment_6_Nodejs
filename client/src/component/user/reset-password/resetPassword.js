import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// IMAGES 
import salad from '../../../images/Sign-in-up/salad.jpg';
import { resetPasswordAPI } from '../../../redux/actions/user/signIn-signUp/userSignIn';
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
export default function ResetPassword() {
    const classes = useStyles();
    const styleButton = divStyle();
    let dispatch = useDispatch();
    const [state, setState] = useState({
        password: '',
        confirmPassword: '',
    });
    const { password, confirmPassword } = state;
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    };
    console.log(state,'state');
    const handleSubmit = (e) => {
        console.log('d');
        e.preventDefault();
        if (!confirmPassword || !password) {
            setError('Please input field');
        }
        // if( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)){
        //     setError('The password must contain at least 8  characters including at least 1 uppercase, 1 lowercase, one digit.')
        // }
        else {
            dispatch(resetPasswordAPI(state));
            setError('');
        }
    };
    const [error, setError] = useState('');
    return (
        <div className='reset-password'>
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Container>
                        <div className='reset-password-left'>
                            <h2>RESET PASSWORD</h2>
                            <div className='reset-password-form'>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-input' className={styleButton.root}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Enter your password, Please!"
                                            variant="outlined"
                                            name='password'
                                            value={state.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-input' className={styleButton.root}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Confirm password, Please!"
                                            variant="outlined"
                                            name='confirmPassword'
                                            value={state.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-button'>
                                        <Button variant="contained" color="secondary" type='submit'>
                                            CHANGE PASSWORD
                                        </Button>
                                    </div>
                                </form>
                                <div className='reset-password-landing'>
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
                    <div className='reset-password-right'>
                        <div className='reset-password-background'>
                            <img src={salad} alt='salad' />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
    )
}
