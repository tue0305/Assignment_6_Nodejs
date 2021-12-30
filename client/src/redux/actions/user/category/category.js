import * as actionType from '../../../constants/constans';
import axios from 'axios';

const getCategory = (categorys) =>({
    type: actionType.GET_CATEGORY,
    payload: categorys
});

export const getCategoryAPI = () => {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: 'http://localhost:8002/api/category/',
        })
        .then((res) =>{
            dispatch(getCategory(res.data))
        })
    }
};
        // -----
const getCategoryPost = (categorys) =>({
    type: actionType.GET_CATEGORY_POST,
    payload: categorys
});

export const getCategoryPostAPI = () =>{
    return function(dispatch) {
        axios({
            method: 'GET',
            url: 'http://localhost:8002/api/category'
        })
        .then((res) =>{
            dispatch(getCategoryPost(res.data))
        })
        .catch((err) =>{
            console.log(err,'err');
        })
    }
};

      // -----
const detailCategory = (category) =>({
    type: actionType.GET_DETAIL_CATEGORY,
    payload: category
});

export const getDetailCategoryAPI = (categoryId) =>{
    return function (dispatch){
        axios({
            method: 'GET',
            url: `http://localhost:8002/api/category/get-detail-category/${categoryId}`
        })
        .then((res) =>{
            dispatch(detailCategory(res.data))
        })
    }
};

    // -----
const detailCategoryPost = (category) =>({
    type: actionType.GET_DETAIL_CATEGORY_POST,
    payload: category
});

export const getDetailCategoryPostAPI = (postId) =>{
    return function(dispatch){
        axios({
            method: 'GET',
            url: `http://localhost:8002/api/post/detail/${postId}`
        })
        .then((res) =>{
           dispatch(detailCategoryPost(res.data))
        })
        .catch((err) =>{
            console.log(err,'err');
        })
    }
};

    // -----
const getPostUser = (categorys) =>({
    type: actionType.GET_USER_POST,
    payload: categorys
});
export const getPostUserAPI = (userId) =>{
    const token = localStorage.getItem('accessToken');
    return function(dispatch){
        axios({
            method: 'GET',
            url: `http://localhost:8002/api/post/user/${userId}`,
            headers: {'Authorization': 'Bearer '+ token}
        })
        .then((res) =>{
            dispatch(getPostUser(res.data))
        })
        .catch((err) =>{
            console.log(err,'err');
        })
    }
}