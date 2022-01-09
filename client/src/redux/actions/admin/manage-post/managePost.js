import axios from "axios";
import * as actType from "../../../constants/constans";

export const manageGetPostAPI = () => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: "http://localhost:8002/post",
    })
      .then((res) => {
        dispatch({
          type: actType.MANAGE_GET_POST,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
};
