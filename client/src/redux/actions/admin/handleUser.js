import Axios from 'axios';
import * as actType from '../admin/handleUser';

export const actGetAllUserAPI = () =>{
    return(dispatch) => {
        Axios({
            method:'GET',
            url: 'http://localhost:8001/api/user/get-all-users',
        })
        .then((rs) =>{
            dispatch(actGetAllUser(rs.data));
        })
        .catch((err) =>{
            console.log(err);
        })
    }
};


    //   -------

const actGetAllUser = (listUser) => {
    return {
        type: actType.GET_ALL_USER,
        data: listUser,
    };
};