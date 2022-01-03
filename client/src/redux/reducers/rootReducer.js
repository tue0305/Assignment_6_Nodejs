import { combineReducers } from "redux";

<<<<<<< HEAD
// USER
import SignUser from "./user/signIn-Up-user/signIn";
=======
        // USER 
import SignUser from './user/signIn-Up-user/signIn';
import categoryReducer from './user/categoryReducer/categoryReducer';
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d

// ADMIN
import userReducer from "./admin/userReducer";

const rootReducers = combineReducers({
<<<<<<< HEAD
    SignUser,
    userReducer,
=======
        SignUser,
        categoryReducer,
    data: userReducer
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d
});

export default rootReducers;
