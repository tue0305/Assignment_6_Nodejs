import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as userSignUp from '../../../redux/actions/user/signIn-signUp/userSignUp';
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
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

function SignUp(props) {
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
        onSubmit: (values, e) => {
            console.log(values);
            e.preventDefault();
        }
    });
    const handleOnSubmit = (user) => {
        props.signUp({
            user
        });
    };
    return (
        <div className='sign-up'>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={6}>
                        <Container>
                            <div className='sign-up-left'>
                                <h2>SIGN UP</h2>
                                <div className='sign-up-form'>
                                    <form onSubmit={formik.handleSubmit}
                                        method='POST'>
                                        <div className='form-input' className={styleButton.root}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Email"
                                                variant="outlined"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                name='email'
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
                                        {/* <div className='form-input' className={styleButton.root}>
                                            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
                                        </div> */}
                                        <div className='form-button'>
                                            <Button variant="contained" color="secondary" onClick={handleOnSubmit}  type='submit'>
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
                                <img src={salad} alt='salad' />
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
        signUp: data => {
            dispatch(userSignUp.actSignUp(data));
        }
    };
};
export default connect(null, mapDispatchToProps)(SignUp)