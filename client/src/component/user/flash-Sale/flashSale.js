import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
//Carousel
import KimChiCaiThao from '../../../images/Flash Sale/KimChiCaiThao.jpeg'
import NhoDenMy from '../../../images/Flash Sale/NhoDenMy.jpeg';
import RauNgotNhat from '../../../images/Flash Sale/RauNgotNhat.jpeg';
import suonNonHeo from '../../../images/Flash Sale/suonNonHeo.jpeg';
import SuSu from '../../../images/Flash Sale/SuSu.jpeg';
import ThanBoXaoBongThienLi from '../../../images/Flash Sale/ThanBoXaoBongThienLi.jpeg';

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

export default function FlashSale() {
    const classes = useStyles();
    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='flash-sale-icon'>
                            <img src={KimChiCaiThao} alt={"KimChiCaiThao"} />
                        </div>
                        <div className='flash-sale-title'>
                            <span>Giảm giá 99%</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='flash-sale-icon'>
                            <img src={NhoDenMy} alt={"NhoDenMy"} />
                        </div>
                        <div className='flash-sale-title'>
                            <span>Giảm 50%</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='flash-sale-icon'>
                            <img src={RauNgotNhat} alt={"RauNgotNhat"} />
                        </div>
                        <div className='flash-sale-title'>
                            <span>Chỉ 19k</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='flash-sale-icon'>
                            <img src={suonNonHeo} alt={"suonNonHeo"} />
                        </div>
                        <div className='flash-sale-title'>
                            <span>Chỉ 29k</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='flash-sale-icon'>
                            <img src={SuSu} alt={"SuSu"} />
                        </div>
                        <div className='flash-sale-title'>
                            <span>Deal nấm hội tụ</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='flash-sale-icon'>
                            <img src={ThanBoXaoBongThienLi} alt={"ThanBoXaoBongThienLi"} />
                        </div>
                        <div className='category-title'>
                            <span>Món ngon ấm bụng</span>
                        </div>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    };
    return (
        <div className='flash-sale'>
            <div className={classes.root}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <h1>Flash Sale</h1>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            <FormRow />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>

    )
}
