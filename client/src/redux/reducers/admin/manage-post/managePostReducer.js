import * as actType from "../../../constants/constans";

let initialState = {
    managePosts: [],
    post: {},
    loading: true,
};

const managePostReducer = (state = initialState, action) => {
    switch (action.type) {
        case actType.MANAGE_GET_POST:
            return {
                ...state,
                managePosts: action.payload,
                loading: false,
            };
        case actType.GET_DETAIL_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        default:
            break;
    }
    return { ...state };
};

export default managePostReducer;
