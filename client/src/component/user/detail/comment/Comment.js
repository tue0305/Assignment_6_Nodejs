import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import {
  getCommmentPostAPI,
  getDetailUserCommentAPI,
  getUserCommentAPI,
  userCreateCommentAPI,
} from "../../../../redux/actions/user/comment-posts/commentPosts";
import { getInformationUserAPI } from "../../../../redux/actions/user/signIn-signUp/userSignIn";
const divIcon = {
  paddingTop: "18px",
  fontSize: "70px",
};
export default function Comment() {
  const dispatch = useDispatch();

  const { postId, userId } = useParams();

  const { user } = useSelector((state) => state.SignUser);

  const [error, setError] = useState("");

  const [state, setState] = useState({
    text: "",
  });

  const { text } = state;

  const { comments } = useSelector((state) => state.commentPostReducer);
  // console.log(comments, "comments");
  useEffect(() => {
    dispatch(getCommmentPostAPI(postId));
  }, []);

  useEffect(() => {
    localStorage.getItem("accessToken") && dispatch(getInformationUserAPI());
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      setError("Hãy nhập bình luận của bạn");
    } else {
      dispatch(userCreateCommentAPI(postId, state));
      setError("");
    }
  };

  return (
    <div className="comment">
      <Container>
        <h2>Bình Luận</h2>
        <div className="recipe-right">
          <div className="recipe-right-comment">
            <form onSubmit={handleSubmit}>
              <span>
                {user && (
                  <>
                    <Avatar>
                      <img src={user.avatar} />
                    </Avatar>
                    <div className="comment-input">
                      <TextField
                        id="standard-basic"
                        label="what's your on mind?"
                        value={text}
                        name="text"
                        type="text"
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                {error && <h3 style={{ color: "red" }}>{error}</h3>}
              </span>
              <div className="recipe-right-comment-button">
                <Button variant="contained" color="primary" type="submit">
                  {" "}
                  Bình luận
                </Button>
              </div>
            </form>
          </div>
          <div className="commented">
            {comments?.map((item) => (
              <span>
                <div>
                  {/* {item.comment.text} */}
                  {/* {console.log(item.comment)} */}
                </div>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
