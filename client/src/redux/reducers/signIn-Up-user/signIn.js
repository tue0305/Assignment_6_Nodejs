import * as ActionType from '../../constants/constans';

let initialState = {};

const SignUser = (state = initialState, action) => {
    switch(action.type){
        case ActionType.SIGN_IN_USER:
            return {...state};
        default:
            return { ...state};
    }
};

export default SignUser;