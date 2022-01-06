import * as ActionType from "../../../constants/constans";

let initialState = {
  user: {},
  loading: true,
};

const SignUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGN_IN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.FORGOT_PASSWORD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.SIGN_UP_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.RESET_PASSWORD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionType.GET_INFORMATION_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case ActionType.EDIT_PROFILE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    default:
      return { ...state };
  }
};

export default SignUser;
