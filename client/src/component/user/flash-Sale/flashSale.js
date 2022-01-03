import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector, usePa } from 'react-redux';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
//Carousel
import { getCategoryPostAPI } from '../../../redux/actions/user/category/category';

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
    const dispatch = useDispatch();
    const { categorys } = useSelector(state => state.categoryReducer);
    useEffect(() => {
        dispatch(getCategoryPostAPI());
    }, [])
    return (
        <div className='category-post'>
            <div className={classes.root}>
                <CssBaseline />
                <Container maxWidth="lg">
                    {categorys?.categories?.map((category) => (<>
                        <div className='category-post-item'>
                            <h1>{category.title}</h1>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={3}>
                                    {category.posts.reverse().map((post) => (<>
                                        <Link to = {`/detail-recipe/${post._id}`}>
                                            <Grid item xs={2}>
                                                <div className='category-post-icon'>
                                                    <img src={post.image} />
                                                </div>
                                                <div className='category-post-title'>
                                                    <span>{post.title}</span>
                                                </div>
                                            </Grid>
                                        </Link>
                                    </>))}
                                </Grid>
                            </Grid>
                        </div>
                    </>))}
                </Container>
            </div>
        </div>
    )
};
{/* <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            {categorys?.categories?.map((category) => (
                                <Grid item xs={2}>
                                    <h1>{category.title}</h1>
                                    <Paper className={classes.paper}>

                                        {category.posts.reverse().map((post) => (<>
                                            <div className='flash-sale-icon'>
                                                <img src={post.image} />
                                            </div>
                                            <div className='flash-sale-title'>
                                                <span>{post.title}</span>
                                            </div>
                                        </>))}

                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
</Grid> */}
