import { combineReducers } from "redux";

// USER
import SignUser from "./user/signIn-Up-user/signIn";
import categoryReducer from "./user/categoryReducer/categoryReducer";
import commentPostReducer from "./user/comment-post/commentPostReducer";
// ADMIN
import userReducer from "./admin/userReducer";
import managePostReducer from "./admin/manage-post/managePostReducer";
import manageCategoriesReducer from "./admin/manage-categories/manageCategoriesReducer";

const rootReducers = combineReducers({
    SignUser,
    categoryReducer,
    manageCategoriesReducer,
    commentPostReducer,
    managePostReducer,
    data: userReducer,
});

export default rootReducers;
