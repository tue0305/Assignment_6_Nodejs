import {
    Row,
    Col,
    Card,
    Radio,
  } from "antd";
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from '@react-spring/web';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";

const modelSample = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));
const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
});
  
Fade.propTypes = {
children: PropTypes.element,
in: PropTypes.bool.isRequired,
onEnter: PropTypes.func,
onExited: PropTypes.func,
};
  
function EditUser(props) {
    const sample = modelSample();
    /*----- */
    const [open, setOpen] = React.useState(false);
    /*----- */
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={sample.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <form >
                        <div className={sample.paper}>
                            <div >
                                <TextField
                                    id="outlined-basic"
                                    label="Phat"
                                    variant="outlined"
                                    type="email"
                                    name='email'
                                />
                            </div>
                            <div >
                                <TextField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    name='password'
                                    type="password"
                                />
                            </div>
                            <div>
                                <RadioGroup className="Register-form" >
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="ADMIN"
                                        value="ADMIN"
                                        name="type"
                                    />
                                    <FormControlLabel
                                        control={<Radio />}
                                        label="USER"
                                        value="NORMAL"
                                        name="type"
                                    />
                                </RadioGroup>
                            </div>
                            <div className="form-buttton">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Update User
                                </Button>
                            </div>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    )
};

export default (EditUser)
