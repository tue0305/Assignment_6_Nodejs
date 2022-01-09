import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
    createPostUserAPI,
    getCategoryAPI,
    getCategoryPostAPI,
} from "../../../../redux/actions/user/category/category";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

const divInput = {
    margin: "15px 0px",
};

const divTextArea = {
    border: "1px solid black",
    borderRadius: "14px",
};

const divSelect = {
    width: "80px",
    height: "30px",
    borderRadius: "6px",
};

export default function AddPost() {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categoryReducer);

    useEffect(() => {
        dispatch(getCategoryAPI());
    }, []);
    console.log(categories, "cate cc");

    const [state, setState] = useState({
        title: "",
        content: "",
        categoryTitle: "",
        name: "",
    });

    const [error, setError] = useState("");

    const { title, content, categoryTitle, name } = state;

    // console.log(state,'state');
    const handleInputOnchange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title, content, categoryTitle, name);
        if (!title || !content || !categoryTitle || !name) {
            setError("Có thể bạn đã thiếu");
        } else {
            dispatch(createPostUserAPI(state));
            setError("");
        }
    };

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
                        {error && <h3 style={{ color: "red" }}>{error}</h3>}
                        <form onSubmit={handleSubmit}>
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
                                    value={title}
                                    name="title"
                                    onChange={handleInputOnchange}
                                />
                            </div>
                            <div className="add-form-input" style={divInput}>
                                <select
                                    value={state.categoryTitle}
                                    onChange={handleInputOnchange}
                                    style={divSelect}
                                    name="categoryTitle"
                                >
                                    {categories?.categories?.map((category) => (
                                        <>
                                            <option value={category.title}>
                                                {category.title}
                                            </option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <div className="add-form-input" style={divInput}>
                                <textarea
                                    style={divTextArea}
                                    id="w3review"
                                    name="w3review"
                                    rows="5"
                                    cols="50"
                                    placeholder="Công thức"
                                    value={content}
                                    name="content"
                                    onChange={handleInputOnchange}
                                ></textarea>
                            </div>
                            <div className="add-form-input" style={divInput}>
                                <textarea
                                    style={divTextArea}
                                    id="w3review"
                                    name="w3review"
                                    rows="5"
                                    cols="50"
                                    placeholder="Nguyên liệu"
                                    value={name}
                                    name="name"
                                    onChange={handleInputOnchange}
                                ></textarea>
                            </div>
                            <div className="add-form-button" style={divInput}>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                >
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
