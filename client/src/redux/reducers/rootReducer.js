import { combineReducers } from "redux";

// USER
import SignUser from "./user/signIn-Up-user/signIn";
import categoryReducer from "./user/categoryReducer/categoryReducer";

// ADMIN
import userReducer from "./admin/userReducer";
import managePostReducer from "./admin/manage-post/managePostReducer";
import manageCategoriesReducer from "./admin/manage-categories/manageCategoriesReducer";

const rootReducers = combineReducers({
  SignUser,
  categoryReducer,
  manageCategoriesReducer,
  managePostReducer,
  data: userReducer,
});

export default rootReducers;
