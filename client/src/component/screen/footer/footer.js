import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import appStore from '../../../images/footer-icon/apple-app-store-icon-app-store-icon-white-background-editable-vector-illustration-132994322.jpg';
import googlePlay from '../../../images/footer-icon/download.jpg'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div id='Footer'>
            <div className={classes.root}>
                <Container>
                    <Grid container >
                        {/* -- */}
                        <Grid item xs={3} >
                            <div className='Footer-title1'>
                                <h2>Về chúng tôi</h2>
                                <div className='left-content'>
                                    <span>Wiki</span>
                                </div>
                                <div className='left-content'>
                                    <span>Liên hệ</span>
                                </div>
                                <div className='left-content'>
                                    <span>Quên mật khẩu</span>
                                </div>
                            </div>
                        </Grid>
                        {/* --- */}
                        <Grid item xs={3} >
                            <div className='Footer-title2'>
                                <div className='left-content'>
                                    <span>Việc làm</span>
                                </div>
                                <div className='left-content'>
                                    <span>Góp ý</span>
                                </div>
                                <div className='left-content'>
                                    <span>Đăng kí thành viên</span>
                                </div>
                            </div>
                        </Grid>
                        {/* -- */}
                        <Grid item xs={3} >
                            <div className='Footer-title3'>
                                <h2>Chính sách</h2>
                                <div className='left-content'>
                                    <span>Chính sách bảo mật</span>
                                </div>
                                <div className='left-content'>
                                    <span>Quy định sử dụng</span>
                                </div>
                                <div className='left-content'>
                                    <span>Giải quyết khiểu nại</span>
                                </div>
                                <div className='left-content'>
                                    <span>Quy định đăng tin</span>
                                </div>
                            </div>
                        </Grid>
                        {/* -- */}
                        <Grid item xs={3}>
                            <div className='Footer-title4'>
                                <h2>Ứng dụng</h2>
                                <div className='title4-icon'>
                                    <img src={appStore} alt={"appStore"} />
                                </div>
                                <div className='title4-icon'>
                                    <img src={googlePlay} alt={"googlePlay"} />
                                </div>
                            </div>
                        </Grid>
                        {/* -- */}
                    </Grid>
                </Container>
            </div>
        </div>
    )
}
