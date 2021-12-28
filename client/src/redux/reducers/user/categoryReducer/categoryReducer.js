import * as actionType from '../../../constants/constans';

const initialState = {
    categorys: [],
    category: {},
    loading: true
};

const categoryReducer = (state = initialState, action) =>{
    switch (action.type) {
        case actionType.GET_CATEGORY:
            return {
                ... state,
                categorys: action.payload,
                loading: false
            }
        default:
            return {...state};
    }
}

export default categoryReducer;