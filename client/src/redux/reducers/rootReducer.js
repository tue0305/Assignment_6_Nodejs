import { combineReducers } from "redux";

        // USER 
import SignUser from './user/signIn-Up-user/signIn';

        // ADMIN 
import userReducer from './admin/userReducer';

const rootReducers = combineReducers({
    SignUser,
    data: userReducer
});

export default rootReducers;
