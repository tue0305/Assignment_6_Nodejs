import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
export default function ResetPassword() {
    const classes = useStyles();
    const styleButton = divStyle();
    return (
        <div className='reset-password'>
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <Container>
                        <div className='reset-password-left'>
                            <h2>RESET PASSWORD</h2>
                            <div className='reset-password-form'>
                                <form >
                                    <div className='form-input' className={styleButton.root}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Enter your password, Please!"
                                            variant="outlined"
                                            name='email'
                                            // value={state.email}
                                            // onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='form-input' className={styleButton.root}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Confirm password, Please!"
                                            variant="outlined"
                                            name='email'
                                            // value={state.email}
                                            // onChange={handleInputChange}
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
