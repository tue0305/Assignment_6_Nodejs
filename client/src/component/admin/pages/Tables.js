
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

                        <TableRow >
                          <TableCell component="th" scope="row" align="center">
                            <img src=""/> a
                          </TableCell>
                          <TableCell align="center">email</TableCell>
                          <TableCell align="center"><p>password</p></TableCell>
                          <TableCell align="center">admin</TableCell>
                          <TableCell align="center">
                            {/* ----- */}
                            <Button
                              variant="contained"
                              color="secondary"
                            >
                              <DeleteForeverIcon />
                            </Button>
                            {/* ----- */}
                            <Button
                              variant="contained"
                              color="secondary"
                            >
                              <EditIcon />
                            </Button>
                            {/* ----- */}
                          </TableCell>
                        </TableRow>
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
