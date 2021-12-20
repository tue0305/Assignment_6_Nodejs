import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
export default function Login() {
    const classes = useStyles();
    const styleButton = divStyle();
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
