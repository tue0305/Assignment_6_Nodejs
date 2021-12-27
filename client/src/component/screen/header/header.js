import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//Carousel
import strawberry from '../../../images/Carousel/strawberry.jpg'
import cabbageSoup from '../../../images/Carousel/cabbageSoup.jpg';
import greenTea from '../../../images/Carousel/greenTea.jpg';
import lemonSalt from '../../../images/Carousel/lemonSalt.jpg';
import hongCloud from '../../../images/Carousel/hongCloud.jpg';
//Category
import kDongGia1 from '../../../images/icons/1kDongGia.png';
import kDongGia9 from '../../../images/icons/9kDongGia.png';
import k19 from '../../../images/icons/19k.png';
import k29 from '../../../images/icons/29k.png';
import deal from '../../../images/icons/deal.png';
import deal1 from '../../../images/icons/deal1.png';
import fish from '../../../images/icons/fish.png';
import maggi from '../../../images/icons/maggi.png';
import pack from '../../../images/icons/pack.png';
import pack2 from '../../../images/icons/pack2.png';
import reice from '../../../images/icons/reice.png';
import today from '../../../images/icons/today.png';
import drink from '../../../images/icons/drink.png';
import dungcubep from '../../../images/icons/dungvubep.png';
import eggs from '../../../images/icons/today.png';
import food from '../../../images/icons/food.png';
import friut from '../../../images/icons/fruit.png';
import giaVi from '../../../images/icons/giaVI.jpeg';
import hoaPham from '../../../images/icons/hoapham.png';
import lau from '../../../images/icons/lau.png';
import meatCow from '../../../images/icons/meatCow.png';
import meatPig from '../../../images/icons/meatPig.png';
import milk from '../../../images/icons/milk.png';

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

export default function Header() {
    const classes = useStyles();
    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={kDongGia1} alt={"kDongGia1"} />
                        </div>
                        <div className='category-title'>
                            <span>Giảm giá 99%</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={kDongGia9} alt={"kDongGia9"} />
                        </div>
                        <div className='category-title'>
                            <span>Giảm 50%</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={k19} alt={"k19"} />
                        </div>
                        <div className='category-title'>
                            <span>Chỉ 19k</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={k29} alt={"k29"} />
                        </div>
                        <div className='category-title'>
                            <span>Chỉ 29k</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={deal} alt={"deal"} />
                        </div>
                        <div className='category-title'>
                            <span>Deal nấm hội tụ</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={deal1} alt={"deal1"} />
                        </div>
                        <div className='category-title'>
                            <span>Món ngon ấm bụng</span>
                        </div>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    };
    function FormRow1() {
        return (
            <React.Fragment>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={fish} alt={"fish"} />
                        </div>
                        <div className='category-title'>
                            <span>Deal món sườn ngon</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                       <div className='category-icon'>
                            <img src={maggi} alt={"maggi"} />
                       </div>
                       <div className='category-title'>
                            <span>Today's Special</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={pack} alt={"pack"} />
                        </div>
                        <div className='category-title'>
                            <span>MAGGI Pack</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={pack2} alt={"pack2"} />
                        </div>
                        <div className='category-title'>
                            <span>Mua lẻ giá sỉ</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={reice} alt={"reice"} />
                        </div>
                        <div className='category-title'>
                            <span>Cooky Pack</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={today} alt={"today"} />
                        </div>
                        <div className='category-title'>
                            <span>Pack ướp sẵn</span>
                        </div>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    };
    function FormRow2() {
        return (
            <React.Fragment>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={drink} alt={"drink"} />
                        </div>
                        <div className='category-title'>
                            <span>Deal món sườn ngon</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                       <div className='category-icon'>
                            <img src={dungcubep} alt={"dungcubep"} />
                       </div>
                       <div className='category-title'>
                            <span>Today's Special</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={eggs} alt={"eggs"} />
                        </div>
                        <div className='category-title'>
                            <span>MAGGI Pack</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={food} alt={"food"} />
                        </div>
                        <div className='category-title'>
                            <span>Mua lẻ giá sỉ</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={friut} alt={"friut"} />
                        </div>
                        <div className='category-title'>
                            <span>Cooky Pack</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={giaVi} alt={"giaVi"} />
                        </div>
                        <div className='category-title'>
                            <span>Pack ướp sẵn</span>
                        </div>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    };
    function FormRow3() {
        return (
            <React.Fragment>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={hoaPham} alt={"hoaPham"} />
                        </div>
                        <div className='category-title'>
                            <span>Deal món sườn ngon</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                       <div className='category-icon'>
                            <img src={lau} alt={"lau"} />
                       </div>
                       <div className='category-title'>
                            <span>Today's Special</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={meatCow} alt={"meatCow"} />
                        </div>
                        <div className='category-title'>
                            <span>MAGGI Pack</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={meatPig} alt={"meatPig"} />
                        </div>
                        <div className='category-title'>
                            <span>Mua lẻ giá sỉ</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={friut} alt={"friut"} />
                        </div>
                        <div className='category-title'>
                            <span>Cooky Pack</span>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={milk} alt={"milk"} />
                        </div>
                        <div className='category-title'>
                            <span>Pack ướp sẵn</span>
                        </div>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    };
    return (
        <div id='Header'>
            <div className='header-banner'>
                <Carousel>
                    <div>
                        <img src={strawberry} alt={"strawberry"} />
                    </div>
                    <div>
                        <img src={cabbageSoup} alt={"cabbageSoup"} />
                    </div>
                    <div>
                        <img src={greenTea} alt={"greenTea"} />
                    </div>
                    <div>
                        <img src={lemonSalt} alt={"lemonSalt"} />
                    </div>
                    <div>
                        <img src={hongCloud} alt={"hongCloud"} />
                    </div>
                </Carousel>
            </div>
            <div className='header-category container'>
                <Carousel>
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={3}>
                                <FormRow />
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <FormRow1 />
                            </Grid>
                        </Grid>
                    </div>
                    <div className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={3}>
                                <FormRow2 />
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                                <FormRow3 />
                            </Grid>
                        </Grid>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
