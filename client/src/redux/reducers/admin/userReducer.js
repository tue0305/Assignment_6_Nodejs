import * as actType from "../../constants/constans";

let initialState = {
    users: [],
    user: [],
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
        case actType.SIGN_IN_ADMIN:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case actType.GET_DETAIL_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
