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
    dispatch(getDetailCategoryAPI(categoryId));
  }, []);

  useEffect(() => {
    // setLoading(true);
    setLoading()
      ? dispatch(getDetailCategoryAPI(categoryId))
      : setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="detail-category">
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Container>
            <Grid container>
              {category?.getDetail?.posts.map((post) => (
                <Grid item xs={4}>
                  <>
                    <Link to={`/detail-recipe/${post._id}`}>
                      <div className="detail-category-item">
                        <div className="detail-category-item-left">
                          <img src={post.image} />
                        </div>
                        <div className="detail-category-item-right">
                          <div className="item-right-name">
                            <h4>{post.title}</h4>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
}
