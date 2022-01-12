import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { manageCreateCategoriesAPI } from "../../../../redux/actions/admin/manage-categories/manageCategories";
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
export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [state, setState] = useState({
    title: "",
    categoryImage: "",
  });

  const handleInputOnchange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const { title, categoryImage } = state;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setError("Có thể bạn đã thiếu");
    } else {
      dispatch(manageCreateCategoriesAPI());
      setError("");
    }
  };
  const handleFileChange = (e) => {
    setState({ categoryImage: e.target.files[0] || null });
  };
  return (
    <div className="add-post-user">
      <Button onClick={handleOpen}>Create Category</Button>
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
                  onChange={handleFileChange}
                  name="categoryImage"
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
              <div className="add-form-button" style={divInput}>
                <Button color="secondary" variant="contained" type="submit">
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
