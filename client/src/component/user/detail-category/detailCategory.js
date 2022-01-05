import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetailCategoryAPI } from "../../../redux/actions/user/category/category";
import Loading from "../../screen/loading/loading";

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

export default function Detailcategory() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const { category } = useSelector((state) => state.categoryReducer);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  useEffect(() => {
    dispatch(getDetailCategoryAPI(categoryId));
  }, []);
  return (
    <div className="detail-category">
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Container>
            <Grid container>
              <Grid item xs={4}>
                {category?.getDetail?.posts.map((post) => (
                  <>
                    <div className="detail-category-item-left">
                      <img src={post.image} />
                    </div>
                    <div className="detail-category-item-right">
                      <div className="item-right-name">
                        <h4>{post.title}</h4>
                      </div>
                    </div>
                  </>
                ))}
              </Grid>
              <Grid item xs={4}>
                <Grid item xs={2}>
                  <div className="detail-category-item">
                    <h2>d</h2>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Grid item xs={2}>
                  <div className="detail-category-item">
                    <h2>d</h2>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}
