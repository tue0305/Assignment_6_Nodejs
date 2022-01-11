import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  createPostUserAPI,
  getCategoryAPI,
} from "../../../../redux/actions/user/category/category";
import { useHistory } from "react-router-dom";
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

export default function AddPost(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const { categorys } = useSelector((state) => state.categoryReducer);
  // console.log(categorys, "categorys");
  let history = useHistory();
  const [state, setState] = useState({
    title: "",
    content: "",
    categoryId: "",
  });

  const [gradients, setGradients] = useState([]);

  const [name, setName] = useState("");

  const [error, setError] = useState("");

  const { title, content, categoryId } = state;

  useEffect(() => {
    dispatch(
      getCategoryAPI((error, data) => {
        if (data?.categories && data?.categories.length > 0) {
          setState({ ...state, categoryId: data?.categories[0]._id });
        }
      })
    );
  }, []);

  const handleInputOnchange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setError("Có thể bạn đã thiếu");
    } else {
      const { onClose } = props;
      const params = {
        title: state?.title || "",
        image: null,
        content: state?.content || "",
        gradients,
        categoryId: state?.categoryId || "",
      };
      dispatch(
        createPostUserAPI(params, (err, data) => {
          if (onClose) onClose();
        })
      );
      setError("");
    }
  };

  const handleAddGradients = () => {
    setGradients([
      ...gradients,
      {
        name: name,
      },
    ]);
    setName("");
  };

  const listCategory = useMemo(
    () => categorys?.categories?.reverse() || [],
    [categorys]
  );

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
                <input type="file" placeholder="Chọn hình ảnh" />
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
                  style={divSelect}
                  onChange={handleInputOnchange}
                  value={categoryId}
                  name="categoryId"
                >
                  {listCategory?.map((category) => {
                    // console.log("111category", category);
                    return (
                      <option value={category._id}>{category.title}</option>
                    );
                  })}
                </select>
              </div>
              <div className="add-form-input" style={divInput}>
                <textarea
                  style={divTextArea}
                  id="w3review"
                  rows="5"
                  cols="50"
                  placeholder="Công thức"
                  value={content}
                  name="content"
                  onChange={handleInputOnchange}
                ></textarea>
              </div>
              <span onClick={handleAddGradients}>Thêm Nguyên liệu</span>
              <input
                value={name}
                placeholder="Nguyên liệu"
                onChange={(e) => setName(e.target.value)}
              />
              <ul>
                {gradients.map((item) => (
                  <li>{item.name}</li>
                ))}
              </ul>
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
