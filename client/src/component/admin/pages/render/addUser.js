import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";

import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
import { margin, width } from "@mui/system";
import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
    addUsers,
    loadUsers,
} from "../../../../redux/actions/admin/handleUser";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 50,
        marginLeft: 600,
        "& > *": {
            margin: theme.spacing(1),
            width: "45ch",
        },
    },
}));
const AddUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { email, password, confirmPassword } = state;

    const [error, setError] = useState("");

    let history = useHistory();
    let dispatch = useDispatch();

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
            dispatch(loadUsers());
            history.push("/admin/manage-user");
            setError("");
        }
    };
    return (
        <div>
            <Button
                style={{ width: "100px", marginTop: "20px" }}
                color="secondary"
                variant="contained"
                size="small"
                onClick={() => history.push("/admin/manage-user")}
            >
                Go Back
            </Button>
            <h2 style={{ marginLeft: "47%" }}>Add User</h2>
            {error && (
                <h3 style={{ color: "red", marginLeft: "47%" }}>{error}</h3>
            )}
            <form
                action=""
                className={classes.root}
                noValidate
                autoComplete="off"
                style={{ marginLeft: "40%" }}
                onSubmit={handleSubmit}
            >
                <TextField
                    id="standard-basic"
                    label="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <TextField
                    id="standard-basic"
                    label="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <TextField
                    id="standard-basic"
                    label="confirm password"
                    type="password"
                    value={confirmPassword}
                    name="confirmPassword"
                    onChange={handleInputChange}
                />
                <br />
                <Button
                    style={{ width: "100px", marginLeft: "12%" }}
                    color="primary"
                    variant="contained"
                    size="small"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};
export default AddUser;
