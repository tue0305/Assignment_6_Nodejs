import React, { useState, useEffect, useRef, useMemo } from "react";
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
import DOMPurify from "dompurify"; //libary change  jsx to html
import Comment from "./comment/Comment";
//IMAGES
import logo from "../../../images/logo/cooking.png";
import { getDetailCategoryPostAPI } from "../../../redux/actions/user/category/category";
import {
  userCreateCommentHighlightAPI,
  userGetCommentHighlightAPI,
} from "../../../redux/actions/user/comment-posts/commentPosts";

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

export default function DetailRecipe({ comments }) {
  const classes = useStyles();

  const { category } = useSelector((state) => state.categoryReducer);
  const { commentHighlight } = useSelector((state) => state.commentPostReducer); //reducer nè ông

  // const { commentHighlight } = useSelector((state) => state.commentPostReducer);
  console.log(commentHighlight, "commentHighlight");
  const dispatch = useDispatch();

  const { postId } = useParams();

  const [loading, setLoading] = useState(false);

  const timerAddEvent = useRef(null);

  const [popupCmt, setPopupCmt] = useState({
    open: false,
    anchorEl: null,
    content: null,
  });
  const listComments = useRef([]);
  useEffect(() => {
    listComments.current = commentHighlight;
  }, [commentHighlight]);
  console.log(listComments, "listComments");
  //  -----

  // -----
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  console.log("listComments.current", listComments.current);

  const loadDetailCategoryPost = () => {
    dispatch(getDetailCategoryPostAPI(postId));
  };

  const loadGetCommentHighlight = () => {
    dispatch(userGetCommentHighlightAPI(postId)); /// ap ôngi nè
  };

  useEffect(() => {
    loadDetailCategoryPost();
    loadGetCommentHighlight();
    // setEventShowComments();
    return () => {
      const cmtSelection = document.getElementsByClassName(
        "extracted-simple-text"
      );
      for (let el of cmtSelection) {
        el.removeEventListener("mouseover", null);
        el.removeEventListener("mouseenter", null);
        el.removeEventListener("mouseleave", null);
      }
    };
  }, []);

  useEffect(() => {
    const position = document.getElementsByClassName("possition");
    window.addEventListener("scroll", function (event) {
      var scroll_y = this.scrollY;
      var scroll_x = this.scrollX;
      // console.log(scroll_x, scroll_y);
      position.innerHTML = " X-axis : " + scroll_x + " và Y-axis : " + scroll_y;
    });
  }, []);

  useEffect(() => {
    setEventShowComments();
  });

  const setEventShowComments = () => {
    if (timerAddEvent.current) clearTimeout(timerAddEvent.current);
    timerAddEvent.current = setTimeout(() => {
      const cmtSelection = document.getElementsByClassName(
        "extracted-simple-text"
      );
      for (let el of cmtSelection) {
        el.removeEventListener("click", null);
        el.removeEventListener("mouseleave", null);

        el.addEventListener("click", onMouseOver11);
        el.addEventListener("mouseleave", onMouseLeave);
      }
    }, 500);
  };

  const [content, setContent] = React.useState(null);

  const handleSelectText = () => {
    console.log(`Selected text: ${window.getSelection().toString()}`);
    setContent(window.getSelection().toString());
  };

  const onMouseOver11 = (e) => {
    // console.log("mouseover", e.target, e.target.getAttribute("id"));
    const commentHighlightId = commentHighlight.filter(
      (state) => state._id === e.target.id
    );
    if (e.target) {
      const el = e.target;
      setTimeout(() => {
        setPopupCmt({
          open: true,
          anchorEl: el,
          content: (
            <>
              {/* {commentHighlight.map((item) => ( */}
              <>
                <AccountCircleIcon style={divIcon} />
                <span style={{ color: "red" }}>
                  {commentHighlightId[0].text}
                </span>
              </>
              {/* ))} */}
            </>
          ), // render content
        });
      }, 300);
    }
  };

  const onMouseLeave = (e) => {
    // console.log("mouseleave", e.target, e.target.getAttribute("id"));
    setPopupCmt({
      open: false,
      anchorEl: null,
      content: null,
    });
  };

  const loadText = useMemo(
    (text) => {
      text = category.posts && category.posts.content;

      commentHighlight.forEach((item) => {
        console.log(item._id, "id");
        const posFound = text.indexOf(item.highlight_text);
        const lenText = item.highlight_text.length;
        text =
          text.slice(0, posFound + lenText) +
          "</span>" +
          text.slice(posFound + lenText);
        text =
          text.slice(0, posFound) +
          '<span class="extracted-simple-text" id="' +
          item._id +
          '">' +
          text.slice(posFound);
      });

      setEventShowComments();

      return (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
      );
    },
    [commentHighlight, category]
  );

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
    const randomOtp = (max = 99999, min = 10000) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const [state, setState] = useState({
      highlight_text: "",
      text: "",
      _id: randomOtp(),
    });

    const { highlight_text, text } = state;
    const handeleInputChange = (e) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    useEffect(() => {
      setState({ ...state, highlight_text: content });
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!highlight_text || !text) {
        setError("Hãy nhập bình luận của bạn!");
      } else {
        setContent(null);
        dispatch(userCreateCommentHighlightAPI(postId, state));
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
                    name="text"
                    value={state.text}
                    onChange={handeleInputChange}
                  />
                  {error && <h3 style={{ color: "red" }}>{error}</h3>}
                </div>
                <p
                  id="transition-modal-description"
                  style={divP}
                  name="highlight_text"
                  value={state.highlight_text}
                  onChange={handeleInputChange}
                >
                  {content}
                </p>

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
                          <span>
                            {/* {category.posts.content} */}
                            {loadText}
                          </span>
                        </div>
                      </div>
                      <div className="recipe-ingredient">
                        <h3>Thành Phần</h3>
                        {category.posts.gradients.map((gradient, index) => (
                          <div key={index}>
                            <div className="recipe-ingredient-item">
                              {gradient.name}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="detail-recipe-right">
                        <Comment comments={comments} key={postId} />
                      </div>
                    </Grid>
                    {/* ----- */}
                    <Grid item xs={4}>
                      <div className="detail-recipe-right">
                        <Container>
                          <div className="recipe-right">
                            <div className="recipe-right-comment">
                              <form>
                                <span className="position">
                                  <AccountCircleIcon style={divIcon} />
                                  <input
                                    placeholder="what's your on mind?"
                                    open={popupCmt.open || false}
                                    anchorEl={popupCmt.anchorEl || null}
                                    onClose={null}
                                  />
                                  {popupCmt.content}
                                </span>

                                <div
                                  className="recipe-right-comment-button"
                                  // style={divButtonComment}
                                ></div>
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
