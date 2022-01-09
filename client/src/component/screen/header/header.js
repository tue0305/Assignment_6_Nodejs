import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//Carousel
import strawberry from "../../../images/Carousel/strawberry.jpg";
import cabbageSoup from "../../../images/Carousel/cabbageSoup.jpg";
import greenTea from "../../../images/Carousel/greenTea.jpg";
import lemonSalt from "../../../images/Carousel/lemonSalt.jpg";
import hongCloud from "../../../images/Carousel/hongCloud.jpg";
//Category
import {
    getCategoryAPI,
    getCategoryPostAPI,
} from "../../../redux/actions/user/category/category";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { categorys } = useSelector((state) => state.categoryReducer);
    useEffect(() => {
        //  dispatch(getCategoryAPI());
        dispatch(getCategoryPostAPI());
    }, []);
    function FormRow() {
        return (
            <React.Fragment>
                {categorys?.categories?.reverse().map((category) => (
                    <Grid item xs={2} key={category._id}>
                        <Paper className={classes.paper}>
                            <Link to={`/detail-category/${category._id}`}>
                                <div className="category-icon">
                                    <img src={category.image} />
                                </div>
                                <div className="category-title">
                                    <span>{category.title}</span>
                                </div>
                            </Link>
                        </Paper>
                    </Grid>
                ))}
            </React.Fragment>
        );
    }
    return (
        <div id="Header">
            <div className="header-banner">
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
            <div className="header-category container">
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
    );
}
