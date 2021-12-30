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
        case actionType.GET_CATEGORY_POST:
            return {
                ... state,
                categorys: action.payload,
                loading: false
            }
        case actionType.GET_DETAIL_CATEGORY:
            return {
                ... state,
                category: action.payload,
                loading: false
            }
        case actionType.GET_DETAIL_CATEGORY_POST:
            return {
                ... state,
                category: action.payload,
                loading: false
            }
        case actionType.GET_USER_POST:
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