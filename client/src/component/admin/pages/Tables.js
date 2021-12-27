
import {
  Row,
  Col,
  Card,
  Radio,
} from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useHistory, useParams } from 'react-router-dom';
// Images
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from '@react-spring/web';
import { addUsers, deleteUsers, getDetailUsers , loadUsers, updateUsers } from "../../../redux/actions/admin/handleUser";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ContactsIcon from '@material-ui/icons/Contacts';
import * as action from '../../../redux/actions/admin/handleUser';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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

const divInput = {
  margin: '30px 0px'
}

function Tables(props) {

  const sample = modelSample();
  const classes = useStyles();

  let dispatch = useDispatch();
  const { userId } = useParams();
  const { users } = useSelector(state => state.data);
  // console.log(user,'detail')
  /*----- */
  const [open, setOpen] = React.useState(false);
  /*----- */
  // const [currUser, setCurrUser] = useState(user);
  // useEffect(()=>{
  //   setCurrUser(user);
  // }, [user]);
  const handleOpen = () => {
    setOpen(true);
    // useEffect(() =>{
      dispatch(getDetailUsers(userId))
      // console.log(userId,'userId');
    // })
  };

  const handleOpenHigh =() =>{
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  /*----- */
  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  /*----- */

  /*----- */

  // useEffect(() => {
  //   if(user){
  //     setState({...user})
  //   }
  // }, [user]);
  /*----- */
  const handleDelete = (userId) => {
    if (window.confirm('d')) {
      dispatch(deleteUsers(userId))
    }
  };
  /*----- */
  // const handleUpdate = (userId) => {
  //     dispatch(getDetailUsers(userId))
  // };
  /*----- */
  const [state, setState] = useState({
    email: '',
    password: '',
    role: 'NORMAL'
  });
  const { email, password, role } = state;
  /*----- */
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value })
  };
  /*----- */
  const [error, setError] = useState('');
  /*----- */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please input field');
    }
    else {
      dispatch(addUsers(state));
      setError('');
    }
  };
  /*----- */
  // const handleSubmitUpdate = (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     setError('Please input field');
  //   }
  //   else {
  //     dispatch(updateUsers(state));
  //     setError('');
  //   }
  // };
  /*----- */
  const [value, setValue] = React.useState('NORMAL');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  /*----- */
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
            >
              <div className="table-responsive">
                <div className="table-add-user">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenHigh}
                  >
                    <ContactsIcon />
                  </Button>
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
                      <form onSubmit={handleSubmit}>
                        <div className={sample.paper}>
                          <div className={divInput}>
                            <TextField
                              id="outlined-basic"
                              label="Email"
                              variant="outlined"
                              type="email"
                              name='email'
                              value={email}
                              onChange={handleInputChange}
                            />
                            {error && <h3 style={{ color: 'red' }}>{error}</h3>}
                          </div>
                          <div className={divInput}>
                            <TextField
                              id="outlined-basic"
                              label="Password"
                              variant="outlined"
                              name='password'
                              type="password"
                              value={password}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className={divInput}>
                            <RadioGroup className="Register-form" value={value} onChange={handleChange}>
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
                              Create User
                            </Button>
                          </div>
                        </div>
                      </form>
                    </Fade>
                  </Modal>
                </div>
                {/* --- */}
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Avatar</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Password</TableCell>
                        <TableCell align="center">Role</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* ----- */}
                    <TableBody>
                      {users && users.map((user) => (
                        <TableRow key={user.userId}>
                          <TableCell component="th" scope="row" align="center">
                            {user.email}
                          </TableCell>
                          <TableCell align="center"><p>{user.password}</p></TableCell>
                          <TableCell align="center">{user.role}</TableCell>
                          <TableCell align="right">
                            {/* ----- */}
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => { handleDelete(user.userId) }}
                            >
                              <DeleteForeverIcon />
                            </Button>
                            {/* ----- */}
                            {/* ----- */}
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={()=>handleOpen(user.userId)}
                            >
                              <EditIcon />
                            </Button>
                            {/* ----- */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default (Tables);
