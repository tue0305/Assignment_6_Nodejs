import { combineReducers } from "redux";

// USER
import SignUser from "./user/signIn-Up-user/signIn";
import categoryReducer from "./user/categoryReducer/categoryReducer";

// ADMIN
import userReducer from "./admin/userReducer";

const rootReducers = combineReducers({
    SignUser,
    categoryReducer,
    userData: userReducer,
});

export default rootReducers;
