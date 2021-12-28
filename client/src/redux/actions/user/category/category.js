import * as actionType from '../../../constants/constans';
import axios from 'axios';

const getCategory = (categorys) =>({
    type: actionType.GET_CATEGORY,
    payload: categorys
})

export const getCategoryAPI = () => {
    return function (dispatch) {
        axios({
            method: 'GET',
            url: 'http://localhost:8002/api/category/',
        })
        .then((res) =>{
            console.log(res.data);
            dispatch(getCategory(res.data))
        })
    }
}