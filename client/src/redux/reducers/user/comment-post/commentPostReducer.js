import * as actType from "../../../constants/constans";

let initialState = {
  comments: [],
  comment: {},
  commentHighlight: [],
  detailUser: {},
  loading: true,
};

const commentPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actType.GET_COMMENT_POST:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case actType.GET_USER_COMMENT_POST:
      return {
        ...state,
        detailUser: action.payload,
        loading: false,
      };
    case actType.USER_PROFILE_COMMENT:
      return {
        ...state,
        detailUser: action.payload,
        loading: false,
      };
    case actType.USER_CREATE_COMMENT_POST:
      return {
        ...state,
        loading: false,
      };
    case actType.USER_CREATE_COMMENT_HIGHTLIGHT:
      return {
        ...state,
        loading: false,
      };
    case actType.USER_GET_COMMENT_HIGHTLIGHT:
      return {
        ...state,
        commentHighlight: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};
export default commentPostReducer;
