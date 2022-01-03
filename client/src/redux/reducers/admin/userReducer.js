import * as actType from "../../constants/constans";

let initialState = {
    users: [],
    loading: true,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actType.GET_ALL_USER:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case actType.DELETE_USER:
            return {
                ...state,
                loading: false,
            };
        case actType.ADD_USER:
        case actType.GET_DETAIL_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case actType.GET_DETAIL_USER:
            return {
                ...state,
                user: action.payload,
<<<<<<< HEAD
                loading: false,
            };
        case "test":
            return {
                ...state,
                user: null,
                loading: false,
            };
=======
                loading: false
            }
        case actType.SIGN_IN_ADMIN:
            return{
                ...state,
                user: action.payload,
                loading: false
            }
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d
        default:
            break;
    }
    return { ...state };
};

export default userReducer;
