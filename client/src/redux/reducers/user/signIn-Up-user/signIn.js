import * as ActionType from '../../../constants/constans';

let initialState = {
    user:{}
};

const SignUser = (state = initialState, action) => {
    switch(action.type){
        case ActionType.SIGN_IN_USER:
            return {
                ...state,
                user: action.payload,
            };
        case ActionType.FORGOT_PASSWORD_USER:
            return {
                ...state,
                user: action.payload
            };
        case ActionType.SIGN_UP_USER:
            return {
                ...state,
                user: action.payload
            }
        case ActionType.RESET_PASSWORD_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return { ...state};
    }
};

export default SignUser;