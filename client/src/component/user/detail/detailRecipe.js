import React, { useState, useEffect, useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "@material-ui/core/Button";
import InstagramIcon from "@material-ui/icons/Instagram";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TextSelector from "text-selection-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loading from "../../screen/loading/loading";
//IMAGES
import logo from "../../../images/logo/cooking.png";
import { getDetailCategoryPostAPI } from "../../../redux/actions/user/category/category";

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
const divIcon = {
  paddingTop: "18px",
  fontSize: "70px",
};
const divInput = {
  height: "100px",
  textAlign: "center",
  border: "1px solid",
  borderRadius: "7px",
  width: "250px",
};
const divButton = {
  marginTop: "15px",
  marginLeft: "70px",
};
const divP = {
  textAlign: "center",
  marginTop: "15px",
  width: "250px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};
export default function DetailRecipe() {
  const classes = useStyles();

  const { category } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  const { postId } = useParams();

  const [loading, setLoading] = useState(false);
  //  -----

  // -----
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    dispatch(getDetailCategoryPostAPI(postId));
  }, []);

  const [content, setContent] = React.useState(null);
  const handleSelectText = () => {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    setContent(window.getSelection().toString());
  };

  const resetContent = () => {
    setContent(null);
  };

  function PopUp() {
    const useStyles = makeStyles((theme) => ({
      modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));

    const classes = useStyles();

    const [error, setError] = useState("");

    const [state, setState] = useState({
      comment: "",
      text: "",
    });

    const { comment, text } = state;

    const handeleInputChange = (e) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    console.log(state, "state");
    useEffect(() => {
      setState({ ...state, text: content });
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!comment || !text) {
        setError("Hãy nhập bình luận của bạn!");
      } else {
        dispatch(console.log("aa"));
        console.log("a");
        setError("");
      }
    };

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={!!content}
          onClose={resetContent}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={true}>
            <form onSubmit={handleSubmit}>
              <div className={classes.paper}>
                <h2 id="transition-modal-title">Bình luận</h2>
                <div className="modal-input">
                  <input
                    placeholder="Nhập bình luận"
                    style={divInput}
                    name="comment"
                    value={state.comment}
                    onChange={handeleInputChange}
                  />
                  {error && <h3>{error}</h3>}
                </div>
                <div className="modal-button">
                  <Button
                    variant="contained"
                    color="primary"
                    style={divButton}
                    type="submit"
                  >
                    Bình luận
                  </Button>
                </div>
                <p
                  id="transition-modal-description"
                  style={divP}
                  name="text"
                  value={state.text}
                  onChange={handeleInputChange}
                >
                  {content}
                </p>
              </div>
            </form>
          </Fade>
        </Modal>
      </div>
    );
  }

  return (
    <>
      <div className="detail-recipe">
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.root}>
            <Container>
              {category.posts && (
                <>
                  <Grid container>
                    <Grid item xs={8}>
                      <div className="detail-recipe-header">
                        <div className="recipe-title">
                          <h2>{category.posts.title}</h2>
                        </div>
                        <div className="detail-recipe-images">
                          <img src={category.posts.image} />
                        </div>
                      </div>
                      <div className="recipe-rating">
                        <Grid container>
                          <Grid item xs={5}>
                            <div className="recipe-rate">
                              <StarBorderIcon />
                              <StarBorderIcon />
                              <StarBorderIcon />
                              <StarBorderIcon />
                              <StarHalfIcon />
                              <span className="recipe-like">
                                <ThumbUpAltIcon />
                              </span>
                              <span className="recipe-view">
                                <VisibilityIcon />
                              </span>
                            </div>
                          </Grid>
                          <Grid item xs={5}>
                            <div className="recipe-made-it">
                              <Button variant="contained" color="primary">
                                <InstagramIcon />
                                <span>I made it</span>
                              </Button>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                      <div className="recipe-owner">
                        <span className="recipe-owner-icons">
                          <img src={logo} alt="logo" />
                        </span>
                        <span className="recipe-owner-title">
                          1k công thức, 15k người theo dõi
                        </span>
                        <div className="recipe-owner-content">
                          <span>{category.posts.content}</span>
                        </div>
                      </div>
                      <div className="recipe-ingredient">
                        <h3>Thành Phần</h3>
                        {category.posts.gradients.map((gradient) => (
                          <>
                            <div className="recipe-ingredient-item">
                              {gradient.name}
                            </div>
                          </>
                        ))}
                      </div>
                    </Grid>
                    {/* ----- */}
                    <Grid item xs={4}>
                      <div className="detail-recipe-right">
                        <Container>
                          <h2>Bình Luận</h2>
                          <div className="recipe-right">
                            <div className="recipe-right-comment">
                              <form>
                                <span>
                                  <AccountCircleIcon style={divIcon} />
                                  <input placeholder="what's your on mind?" />
                                </span>
                                <div className="recipe-right-comment-button">
                                  <Button variant="contained" color="primary">
                                    {" "}
                                    Bình luận
                                  </Button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </Container>
                      </div>
                    </Grid>
                  </Grid>
                </>
              )}
            </Container>
          </div>
        )}
        <TextSelector
          events={[
            {
              text: "BÌNH LUẬN",
              handler: handleSelectText,
            },
          ]}
          unmark={true}
          unmarkText="XÓA"
          color={"yellow"}
          colorText={true}
        />
      </div>
      {content && <PopUp />}
    </>
  );
}
