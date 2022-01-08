import * as actType from "../../../constants/constans";

let initialState = {
  manageCategories: [],
  category: {},
  loading: true,
};

const manageCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actType.MANAGE_GET_CATEGORIES:
      return {
        ...state,
        manageCategories: action.payload,
        loading: false,
      };
    default:
      break;
  }
  return { ...state };
};

export default manageCategoriesReducer;
