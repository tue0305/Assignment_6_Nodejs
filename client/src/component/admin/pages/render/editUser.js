import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@material-ui/core/Button";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core";
import { color, margin, width } from "@mui/system";
import { useHistory, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
    getDetailUsers,
    addUsers,
} from "../../../../redux/actions/admin/handleUser";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import "./editUser.scss";

const divStyle = { color: "#ffc300" };
const iconStyle = {
    background: "$primary-bg-color",
    borderRadius: "50%",
    color: "$secondary-bg-color",
    fontSize: "24px",
    marginRight: "5px",
    padding: "10px",
    transform: "rotate(-45deg)",
};
const useStyles = makeStyles((theme) => ({
    // root: {
    //     margin: 50,
    //     marginLeft: 600,
    //     display: "inline",
    //     "& > *": {
    //         margin: theme.spacing(1),
    //         width: "45ch",
    //     },
    // },
    // avatar: {
    //     backgroundColor: "blue",
    //     width: "25ch",
    //     margin: 10,
    //     marginRight: 50,
    //     height: 100,
    //     display: "inline-block",
    // },
}));
const EditUser = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        avatar: "",
        phone: "+84xxxxxxx",
        birthDay: "20/xx/19xx",
    });
    const { email, avatar, phone, birthDay, role } = state;

    const [error, setError] = useState("");

    let history = useHistory();
    let dispatch = useDispatch();
    let { _id } = useParams();
    const { user } = useSelector((state) => state.data);
    useEffect(() => {
        dispatch(getDetailUsers(_id));
    }, []);

    useEffect(() => {
        if (user) {
            setState({ ...user });
            //  console.log(state);
        }
    }, [user]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    console.log(state.birthDay);
    const handleSubmit = () => {
        Swal.fire({
            icon: "success",
            title: "Update Successfully",
            width: "400px",
            padding: "0 0 20px 0",
        });
        history.push("/admin/manage-user");
    };

    return (
        <div>
            <div className="signup-container">
                <div className="left-container">
                    <h2 style={divStyle}>
                        <i style={iconStyle}>
                            <PermContactCalendarIcon />
                        </i>
                        PROFILE
                    </h2>
                    <div className="puppy">
                        <img src={state.avatar} />
                    </div>
                </div>
                <div className="right-container">
                    <header>
                        <h2>EDIT USER FORM</h2>
                        <div className="set">
                            <div className="pets-name">
                                <label for="pets-name">Email</label>
                                <input
                                    id="pets-name"
                                    placeholder="User's email"
                                    value={state.email}
                                    type="text"
                                    name="email"
                                ></input>
                            </div>
                            <div className="pets-photo">
                                <input
                                    placeholder="Upload photo"
                                    id="pets-upload"
                                    type="file"
                                    name="avarta"
                                />
                            </div>
                        </div>
                        <div className="set">
                            <div className="pets-breed">
                                <label for="pets-breed">Phone</label>
                                <input
                                    id="pets-breed"
                                    placeholder="Mobile phone"
                                    type="text"
                                    value={state.phone}
                                ></input>
                            </div>
                            <div className="pets-birthday">
                                <label for="pets-birthday">Birthday</label>
                                <input
                                    id="pets-birthday"
                                    placeholder="MM/DD/YYYY"
                                    type="text"
                                    value={state.birthDay}
                                ></input>
                            </div>
                        </div>
                        <div className="set">
                            <div className="pets-gender">
                                <label for="pet-gender-female">Gender</label>
                                <div className="radio-container">
                                    <input
                                        id="pet-gender-female"
                                        name="pet-gender"
                                        type="radio"
                                        value="female"
                                    ></input>
                                    <label for="pet-gender-female">
                                        Female
                                    </label>
                                    <input
                                        id="pet-gender-male"
                                        name="pet-gender"
                                        type="radio"
                                        value="male"
                                    ></input>
                                    <label for="pet-gender-male">Male</label>
                                </div>
                            </div>
                        </div>
                        <div className="pets-weight">
                            <label for="pet-weight-0-25">Role</label>

                            <input
                                id="pet-weight-100-plus"
                                name="role"
                                type="text"
                                value={state.role}
                            ></input>
                        </div>
                    </header>
                    <footer>
                        <div className="set">
                            <Button
                                id="back"
                                onClick={() =>
                                    history.push("/admin/manage-user")
                                }
                            >
                                Back
                            </Button>
                            <Button onClick={handleSubmit} id="next">
                                Submit
                            </Button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};
export default EditUser;
