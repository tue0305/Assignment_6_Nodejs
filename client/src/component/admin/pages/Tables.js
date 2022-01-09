import { Row, Col, Card, Radio } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// Images
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "@react-spring/web";

import {
    addUsers,
    deleteUsers,
    getDetailUsers,
    loadUsers,
    updateUsers,
} from "../../../redux/actions/admin/handleUser";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ContactsIcon from "@material-ui/icons/Contacts";
import * as action from "../../../redux/actions/admin/handleUser";

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 500,
    },
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
        width: 800,
    },
    detail_input: {
        margin: 15,
        width: 300,
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
    margin: "30px 0px",
};

function Tables(props) {
    // const sample = modelSample();
    const classes = useStyles();

    let history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUsers());
    }, []);
    const users = useSelector((state) => state.userData.users);
    //----------------------Delete
    const handleDelete = (id) => {
        console.log(id);
        if (window.confirm("Do you want to delete the user ?")) {
            dispatch(deleteUsers(id));
            dispatch(loadUsers());
        }
    };
    const handleAdd = () => {
        console.log(history);
        history.push("/addUser");
        console.log(history);
    };

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
                                    <Table
                                        className={classes.table}
                                        aria-label="simple table"
                                    >
                                        {/* <button
                                            type="button"
                                            onClick={handleOpen}
                                        >
                                            react-spring
                                        </button> */}

                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">
                                                    Avatar
                                                </TableCell>
                                                <TableCell align="center">
                                                    Email
                                                </TableCell>
                                                <TableCell align="center">
                                                    Ngày Đăng Ký
                                                </TableCell>
                                                <TableCell align="center">
                                                    ID
                                                </TableCell>
                                                <TableCell align="center">
                                                    Số lượng bài Post
                                                </TableCell>
                                                <TableCell align="center">
                                                    Role
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button
                                                        color="success"
                                                        variant="contained"
                                                        size="small"
                                                    >
                                                        <Link
                                                            to="/admin/manage-user/addUser"
                                                            color="primary"
                                                        >
                                                            Add User
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {/* ----- */}
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        align="center"
                                                        key={user._id}
                                                    >
                                                        <img
                                                            src={user.avatar}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <p>{user.createdAt}</p>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <p>{user._id}</p>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <p>
                                                            {
                                                                user
                                                                    .created_posts
                                                                    .length
                                                            }
                                                        </p>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        {user.role}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup
                                                            variant="contained"
                                                            aria-label="outlined button group"
                                                            color="secondary"
                                                            size="small"
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    history.push(
                                                                        `/admin/manage-user/editUser/${user._id}`
                                                                    )
                                                                }
                                                            >
                                                                <EditIcon>
                                                                    {/* <Link to={`/admin/manage-user/addUser/${user._id}`} /> */}
                                                                </EditIcon>
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        user._id
                                                                    )
                                                                }
                                                            >
                                                                <DeleteForeverIcon></DeleteForeverIcon>
                                                                Delete
                                                            </Button>
                                                        </ButtonGroup>
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
// const mapStateToProps = (state, ownProps) => {
//     const { userData } = state;
//     console.log(userData);
//     return {
//         users: userData,
//     };
// };
export default Tables;
