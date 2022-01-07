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
import DOMPurify from "dompurify";
import Popover from "@material-ui/core/Popover";
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

  const timerAddEvent = useRef(null);

  const [popupCmt, setPopupCmt] = useState({
    open: false,
    anchorEl: null,
    content: null,
  });

  const listComments = useRef([
    {
      cmtId: 1,
      postId: 2,
      cmtOnText: "refrigerate for 15 minutes",
      comment: "aaaa",
    },
  ]); /// load list comment from api
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
    setEventShowComments();
  });

  const setEventShowComments = () => {
    if (timerAddEvent.current) clearTimeout(timerAddEvent.current);
    timerAddEvent.current = setTimeout(() => {
      const cmtSelection = document.getElementsByClassName(
        "extracted-simple-text"
      );
      for (let el of cmtSelection) {
        el.removeEventListener("mouseenter", null);
        el.removeEventListener("mouseleave", null);

        el.addEventListener("mouseenter", onMouseOver11);
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
    console.log("mouseover", e.target, e.target.getAttribute("id"));
    //xu ly hover
    if (e.target) {
      const el = e.target;
      setTimeout(() => {
        setPopupCmt({
          open: true,
          anchorEl: el,
          content: <span style={{ color: "red" }}>test</span>, // render content
        });
      }, 300);
    }
  };

  const onMouseLeave = (e) => {
    console.log("mouseleave", e.target, e.target.getAttribute("id"));
    setPopupCmt({
      open: false,
      anchorEl: null,
      content: null,
    });
  };

  const loadText = (text) => {
    text =
      "Combine the flour, sugar (if using), and salt in a large bowl; refrigerate for 15 minutes.Add the shortening to the dry ingredients and toss it with your hands to coat, then break it up into smaller pieces. Using a pastry blender, cut the shortening into the dry ingredients until the pieces of fat are roughly the size of small peas and everything looks like it has been touched by the fat. There should be no dry, floury areas.Mound the ingredients in the center of the bowl. Drizzle about half of the water down the sides of the bowl, turning the bowl as you pour so the water doesn’t end up in one spot. Using a large fork, lightly mix the dough, tossing it from the perimeter toward the center of the bowl. Drizzle most of the remaining water here and there over the dough and toss again.Mix the dough vigorously now. The dough should start to gather in large clumps, but if it is dry in places, stir in the rest of the water.Turn the dough out onto a lightly floured work surface and pack it into a ball, then knead it several times to smooth it out. Put the dough on a sheet of plastic wrap and flatten it into a ¾-inch-thick disk. Wrap the disk and refrigerate for about 1 hour before rolling";

    listComments.current.forEach((obj) => {
      const posFound = text.indexOf(obj.cmtOnText);
      const lenText = obj.cmtOnText.length;
      text =
        text.slice(0, posFound + lenText) +
        "</span>" +
        text.slice(posFound + lenText);
      text =
        text.slice(0, posFound) +
        '<span class="extracted-simple-text" id="' +
        obj.cmtId +
        '">' +
        text.slice(posFound);
    });

    setEventShowComments();

    return (
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }} />
    );
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
      <Popover
        open={popupCmt.open || false}
        anchorEl={popupCmt.anchorEl || null}
        onClose={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {popupCmt.content}
      </Popover>
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
                            {loadText()}
                          </span>
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
