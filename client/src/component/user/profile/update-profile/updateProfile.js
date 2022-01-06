import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { updateInformationAPI } from "../../../../redux/actions/user/signIn-signUp/userSignIn";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function UpdateProfile() {
  const classes = useStyles();
  let dispatch = useDispatch();

  let history = useHistory();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState();

  const { userId } = useParams();

  const [state, setState] = useState({
    email: "",
  });

  const { email } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Hãy nhập email của bạn");
    } else {
      dispatch(updateInformationAPI(userId));
    }
  };

  useEffect(() => {
    dispatch(updateInformationAPI(userId));
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="update-profile">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
      </form>
    </div>
  );
}
