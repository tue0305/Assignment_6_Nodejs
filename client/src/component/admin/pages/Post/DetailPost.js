import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { manageGetPostDetailAPI } from "../../../../redux/actions/admin/manage-post/managePost";

export default function DetailPost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.managePostReducer);
  console.log(post, "post");
  useEffect(() => {
    dispatch(manageGetPostDetailAPI(postId));
  }, []);

  return <div></div>;
}
