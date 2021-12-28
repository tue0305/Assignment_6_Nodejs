import React, { useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
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
import { getCategoryAPI } from '../../../redux/actions/user/category/category';

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
    const dispatch = useDispatch();
    const { categorys } = useSelector(state => state.categoryReducer);
    useEffect(() => {
        dispatch(getCategoryAPI());
    },[])
    function FormRow() {
        return (
            <React.Fragment>
                 { categorys?.categories?.map((category) => (
                <Grid item xs={2}>
                    <Paper className={classes.paper}>
                        <div className='category-icon'>
                            <img src={kDongGia1} alt={"kDongGia1"} />
                        </div>
                        <div className='category-title'>
                            <span>{category.title}</span>
                        </div>
                    </Paper>
                </Grid>
                  ))}
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
                        </Grid>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}
