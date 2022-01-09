import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { signinAdminAPI } from "../../../redux/actions/admin/signIn";
import Loading from "../../screen/loading/loading";
// IMAGES
import gogd from "../../../images/Sign-in-up/vincentgogh.jpg";

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
function Login() {
  const classes = useStyles();
  const styleButton = divStyle();
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;
  //   console.log(state, "state");
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please input field");
    }
    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    //   setError("Email must be email address ex: @gmail");
    // }
    // if( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)){
    //     setError('The password must contain at least 8  characters including at least 1 uppercase, 1 lowercase, one digit.')
    // }
    else {
      dispatch(signinAdminAPI(state));
      setError("");
    }
  };
  const [error, setError] = useState("");
  return (
    <div className="login-admin-backround">
      {loading ? (
        <Loading />
      ) : (
        <div className="login-admin">
          <div className={classes.root}>
            <Grid container>
              <Grid item xs={6}>
                <Container>
                  <div className="login-admin-left">
                    <h2>SIGN IN</h2>
                    <div className="login-admin-form">
                      <form onSubmit={handleSubmit}>
                        <div
                          className="form-input"
                          className={styleButton.root}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={state.email}
                            name="email"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div
                          className="form-input"
                          className={styleButton.root}
                        >
                          <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            value={state.password}
                            onChange={handleInputChange}
                            name="password"
                            type="password"
                          />
                        </div>
                        <div className="form-button">
                          <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                          >
                            SIGN IN NOW
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Container>
              </Grid>
              {/* -- */}
              <Grid item xs={6}>
                <div className="login-admin-right">
                  <div className="sign-in-background">
                    <img src={gogd} alt="gogd" />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
