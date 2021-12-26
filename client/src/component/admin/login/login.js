import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as adminSignIn from '../../../redux/actions/admin/signIn';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { connect } from "react-redux";
// IMAGES 
import gogd from '../../../images/Sign-in-up/vincentgogh.jpg';

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
function Login(props) {
    const classes = useStyles();
    const styleButton = divStyle();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Must have address email!'),
            password: Yup.string()
        }),
        onSubmit: (values, e) => {
            console.log(values);
            e.preventDefault();
        }
    });
    const handleOnSubmit = (user) => {
        props.signIn({
            user
        });
    };
    return (
        <div className='login-admin-backround'>
            <div className='login-admin'>
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Container>
                                <div className='login-admin-left'>
                                    <h2>SIGN IN</h2>
                                    <div className='login-admin-form'>
                                        <form
                                            onSubmit={formik.handleSubmit}
                                            method='POST'
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
                                                <Button variant="contained" color="secondary" type='submit' onClick={handleOnSubmit}>
                                                    SIGN IN NOW
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Container>
                        </Grid>
                        {/* -- */}
                        <Grid item xs={6}>
                            <div className='login-admin-right'>
                                <div className='sign-in-background'>
                                    <img src={gogd} alt='gogd' />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        signIn: data => {
            dispatch(adminSignIn.actSignInAdmin(data));
        }
    };
};
export default connect(null, mapDispatchToProps)(Login)