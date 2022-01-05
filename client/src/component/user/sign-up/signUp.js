import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Loading from "../../screen/loading/loading";
// IMAGES
import salad from "../../../images/Sign-in-up/salad.jpg";
import { signUpAPI } from "../../../redux/actions/user/signIn-signUp/userSignIn";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const divStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const styleButton = divStyle();
  let dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const { email, password } = state;
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please input field");
    } else {
      dispatch(signUpAPI(state));
      setError("");
    }
  };
  const [error, setError] = useState("");
  return (
    <div className="sign-up">
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={6}>
              <Container>
                <div className="sign-up-left">
                  <h2>SIGN UP</h2>
                  <div className="sign-up-form">
                    <form onSubmit={handleSubmit}>
                      <div className="form-input" className={styleButton.root}>
                        <TextField
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          name="email"
                          value={state.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-input" className={styleButton.root}>
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="outlined"
                          name="password"
                          type="password"
                          value={state.password}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-button">
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          SIGN UP NOW
                        </Button>
                      </div>
                    </form>
                    <div className="sign-up-landing">
                      <span className="landing">
                        <Link to="/sign-in">SIGN IN NOW</Link>
                      </span>
                    </div>
                  </div>
                </div>
              </Container>
            </Grid>
            {/* -- */}
            <Grid item xs={6}>
              <div className="sign-up-right">
                <div className="sign-in-background">
                  <img src={salad} alt="salad" />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default SignUp;
