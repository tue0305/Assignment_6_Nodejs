import * as ActionType from '../../../constants/constans';

let initialState = {
    user:{}
};

const SignUser = (state = initialState, action) => {
    console.log(action.type,'dd');
    switch(action.type){
        case ActionType.SIGN_IN_USER:
            return {
                ...state,
                user: action.payload,
                
            };
        case ActionType.FORGOT_PASSWORD_USER:
            return {...state}
        default:
            return { ...state};
    }
};

export default SignUser;