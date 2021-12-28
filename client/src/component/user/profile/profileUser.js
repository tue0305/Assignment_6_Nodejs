import React, {  useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import test from '../../../images/logo/cooking.png';
import { getInformationUserAPI } from '../../../redux/actions/user/signIn-signUp/userSignIn';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default function ProfileUser() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    let dispatch = useDispatch();

    const { user } = useSelector(state => state.SignUser);

    useEffect(() => {
        dispatch(getInformationUserAPI());
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };


    return (
        <div className='profile-user'>
            <Container fixed>
                <div className='profile-user-box'>
                    <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="THÔNG TIN CÁ NHÂN" {...a11yProps(0)} />
                                <Tab label="BÀI VIẾT" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <div className='box-tap-one'>
                                    <Container>
                                        <Grid container >
                                            {user && ( <>
                                                <Grid item xs={5} >
                                                    <div className='tap-one-image'>
                                                        <img src={user.avatar} alt='test' />
                                                    </div>
                                                </Grid>
                                                
                                            {/* ---- */}
                                            <Grid item xs={5} >
                                                <div className='tap-one-info-email'>
                                                    <span>Email:{user.email}</span>
                                                </div>
                                            </Grid>
                                            </>)}
                                        </Grid>
                                    </Container>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                Item Two
                            </TabPanel>
                        </SwipeableViews>
                    </Box>
                </div>
            </Container>
        </div>
    )
}
