import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../screen/loading/loading";
import { useParams, useHistory } from "react-router-dom";
import { getInformationUserAPI } from "../../../redux/actions/user/signIn-signUp/userSignIn";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);
const divButton = {
  marginRight: "20px",
};
export default function ProfileUser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let dispatch = useDispatch();

  let history = useHistory();

  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.SignUser);

  useEffect(() => {
    dispatch(getInformationUserAPI());
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="profile-user">
      {loading ? (
        <Loading />
      ) : (
        <Container fixed>
          <div className="profile-user-box">
            <div className="box-tap-one">
              <Container>
                <Grid container>
                  {user && (
                    <>
                      <div className="edit-profile">
                        <Button
                          style={divButton}
                          variant="contained"
                          color="primary"
                          type="button"
                          onClick={handleOpen}
                        >
                          CHỈNH SỬA
                        </Button>
                        {/* ----- */}
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={classes.modal}
                          open={open}
                          onClose={handleClose}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={open}>
                            <div className={classes.paper}>
                              <div>
                                <TextField id="standard-basic" label="Email" />
                              </div>
                            </div>
                          </Fade>
                        </Modal>
                        {/* ------ */}
                      </div>
                      <Grid item xs={5}>
                        <div className="tap-one-image">
                          <img src={user.avatar} alt="test" />
                        </div>
                      </Grid>

                      {/* ---- */}
                      <Grid item xs={5}>
                        <div className="tap-one-info-email">
                          <span>Email:{user.email}</span>
                        </div>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Container>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
