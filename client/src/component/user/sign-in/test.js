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
import * as userSignIn from '../../../redux/actions/user/signIn-signUp/userSignIn';
import { useFormik } from "formik";
import Index from '../../screen/index';
import * as Yup from 'yup';
import { connect } from "react-redux";
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
// const Schema = yup.object.shape({
//     email: yup.string.email('Invalid email address').required('Email is required'),
//     password: yup.string.required('Password is required')
// })
function SignIn(props) {
    const classes = useStyles();
    const styleButton = divStyle();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('invalid'),
            password: Yup.string()
        }),
        onSubmit: (values,e) => {
            console.log(values);
            e.preventDefault();
        }
    });
    const handleOnSubmit = (user, e) => {
        props.signIn({
            user
        });
    };
    return (
        <div className='Sign-In'>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Container>
                            <div className='sign-in-left'>
                                <h2>SIGN IN</h2>
                                <div className='sign-in-form'>
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        onSubmit={handleOnSubmit}
                                    >
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                type="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                name='email'
                                                type='email'
                                            />
                                            {
                                                formik.touched.email && formik.errors.email
                                                    ? <div className='error_msg'>{formik.errors.email}</div> : null
                                            }
                                        </div>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Password"
                                                variant="outlined"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                name='password'
                                                type='password'
                                            />
                                            {
                                                formik.touched.password && formik.errors.password
                                                    ? <div className='error_msg'>{formik.errors.password}</div> : null
                                            }
                                        </div>
                                        <div className='form-button'>
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
                                <img src={signIn} alt='signIn' />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        signIn: data => {
            dispatch(userSignIn.signIn(data));
        }
    };
};
export default connect(null, mapDispatchToProps)(SignIn)
// const Schema = yup.object.shape({
//     email: yup.string.email('Invalid email address').required('Email is required'),
//     password: yup.string.required('Password is required')
// })