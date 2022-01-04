import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryAPI } from "../../../../redux/actions/user/category/category";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

const divInput = {
    margin: "15px 0px",
};

const useStyles = makeStyles((theme) => ({
    button: {
        display: "block",
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function AddPost() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const { categorys } = useSelector((state) => state.categoryReducer);
    // const [state, setState] = useState({
    //     title:'',
    //     content:'',

    // })
    useEffect(() => {
        dispatch(getCategoryAPI());
    }, []);
    return (
        <div className="add-post-user">
            <Button onClick={handleOpen}>Tạo bài viết</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="add-form">
                        <form>
                            <h4>TẠO BÀI VIẾT</h4>
                            <div className="add-form-input" style={divInput}>
                                <input
                                    type="file"
                                    placeholder="Chọn hình ảnh"
                                />
                            </div>
                            <div className="add-form-input" style={divInput}>
                                <TextField
                                    id="outlined-basic"
                                    label="TIÊU ĐỀ"
                                    variant="outlined"
                                />
                            </div>
                            <div className="add-form-input" style={divInput}>
                                {categorys?.data?.reverse().map((post) => (
                                    <>
                                        <FormControl
                                            className={classes.formControl}
                                        >
                                            <InputLabel id="demo-controlled-open-select-label">
                                                Age
                                            </InputLabel>
                                            <Select
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
                                                open={open}
                                                onClose={handleClose}
                                                onOpen={handleOpen}
                                                // value={age}
                                                // onChange={handleChange}
                                            >
                                                <MenuItem value="">
                                                    <em>{post.title}</em>
                                                </MenuItem>
                                                <MenuItem value={10}></MenuItem>
                                            </Select>
                                        </FormControl>
                                    </>
                                ))}
                            </div>
                            <div className="add-form-input" style={divInput}>
                                <TextareaAutosize
                                    maxRows={20}
                                    aria-label="maximum height"
                                    placeholder="Công Thức"
                                    defaultValue="Công Thức."
                                />
                            </div>
                            <div className="add-form-input" style={divInput}>
                                <TextareaAutosize
                                    maxRows={20}
                                    aria-label="maximum height"
                                    placeholder="Nguyên liệu"
                                    defaultValue="Nguyên liệu."
                                />
                            </div>
                            <div className="add-form-button" style={divInput}>
                                <Button color="secondary" variant="contained">
                                    Tạo bài viết
                                </Button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
