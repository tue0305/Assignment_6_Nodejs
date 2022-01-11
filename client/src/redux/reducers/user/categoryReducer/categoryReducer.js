import * as actionType from "../../../constants/constans";

const initialState = {
  categorys: [],
  category: {},
  categoryPosts: [],
  userPosts: [],
  getUserPost: [],
  loading: true,
};

//loi là do tất cả các action em đều gắn vào 1 thằng reducer đó
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_CATEGORY:
      return {
        ...state,
        categorys: action.payload,
        loading: false,
      };
    case actionType.GET_CATEGORY_POST:
      return {
        ...state,
        categoryPosts: action.payload,
        loading: false,
      };
    case actionType.GET_DETAIL_CATEGORY:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case actionType.GET_DETAIL_CATEGORY_POST:
      return {
        ...state,
        category: action.payload,
        loading: false,
      };
    case actionType.GET_USER_POST:
      return {
        ...state,
        userPosts: action.payload,
        loading: false,
      };
    case actionType.DELETE_USER_POST:
      return {
        ...state,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default categoryReducer;
