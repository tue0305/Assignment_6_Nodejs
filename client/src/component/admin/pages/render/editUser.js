import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";

import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
import { color, margin, width } from "@mui/system";
import { useHistory, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
    getDetailUsers,
    addUsers,
} from "../../../../redux/actions/admin/handleUser";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 50,
        marginLeft: 600,
        display: "inline",
        "& > *": {
            margin: theme.spacing(1),
            width: "45ch",
        },
    },
    avatar: {
        backgroundColor: "blue",
        width: "25ch",
        margin: 10,
        marginRight: 50,
        height: 100,
        display: "inline-block",
    },
}));
const EditUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const { email, password, confirmPassword } = state;

    const [error, setError] = useState("");

    let history = useHistory();
    let dispatch = useDispatch();
    let { _id } = useParams();
    const { user } = useSelector((state) => state.data);
    console.log(user);
    useEffect(() => {
        dispatch(getDetailUsers(_id));
    }, []);

    useEffect(() => {
        if (user) {
            setState({ ...user });
            //  console.log(state);
        }
    }, []);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setError("Please input all the field");
        } else {
            const user = { email, password };
            dispatch(addUsers(user));
            history.push("/admin/manage-user");
            setError("");
        }
    };
    return (
        <div>
            <div>
                <div className={classes.avatar}>Avatar</div>
                <div style={{ display: "inline", backgroundColor: "green" }}>
                    Thong tin Username + Role ...
                </div>
            </div>
        </div>
    );
};
export default EditUser;
