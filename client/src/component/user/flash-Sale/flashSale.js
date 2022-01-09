import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

//Carousel
import { getCategoryPostAPI } from "../../../redux/actions/user/category/category";

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

export default function FlashSale() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.categoryReducer);
  console.log(categorys, "categorys");
  useEffect(() => {
    dispatch(getCategoryPostAPI());
  }, []);
  return (
    <div className="category-post">
      <Container maxWidth="lg">
        {categorys?.categories?.map((category) => (
          <>
            <div className="category-post-item">
              <h2>{category.title}</h2>
              <div className={classes.root}>
                <Grid container spacing={3}>
                  {category.posts.reverse().map((post) => (
                    <Grid item xs={3}>
                      <>
                        <Link to={`/detail-recipe/${post._id}`}>
                          <div className="category-post-icon">
                            <img src={post.image} />
                          </div>
                          <div className="category-post-title">
                            <span>{post.title}</span>
                          </div>
                        </Link>
                      </>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </>
        ))}
      </Container>
    </div>
  );
}
