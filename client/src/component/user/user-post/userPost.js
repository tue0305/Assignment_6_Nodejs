import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostUserAPI,
  getPostUserAPI,
} from "../../../redux/actions/user/category/category";
import AddPost from "./add-post/addPost";
import { useParams } from "react-router-dom";
export default function ManagePost() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state) => state.categoryReducer);
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getPostUserAPI(userId));
  }, []);

  const onClose = () => {
    dispatch(getPostUserAPI(userId));
  };

  const handleDelete = (userPosts) => {
    dispatch(deletePostUserAPI(userPosts));
  };

  return (
    <div className="user-posts">
      <div>
        <Button variant="contained" color="secondary">
          <AddPost onClose={onClose} />
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>HÌNH ẢNH</TableCell>
              <TableCell align="center">TIÊU ĐỀ</TableCell>
              <TableCell align="center">Danh mục</TableCell>
              <TableCell align="center">Bước thực hiện</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* START --- */}
            {userPosts?.data?.reverse().map((post) => (
              <>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {/* {post.image} */}
                  </TableCell>
                  <TableCell align="center">{post.title}</TableCell>
                  <TableCell align="center">{post.category.title}</TableCell>
                  <TableCell align="center">{post.content}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="secondary">
                      Sửa
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(post._id)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          History
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Nguyên liệu</TableCell>
                              <TableCell>Customer</TableCell>
                              <TableCell align="center">Amount</TableCell>
                              <TableCell align="center">
                                Total price ($)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {post?.gradients?.map((gradient) => (
                            <>
                              <TableBody>
                                <TableRow>
                                  <TableCell component="th" scope="row">
                                    {gradient.name}
                                  </TableCell>
                                  <TableCell></TableCell>
                                  <TableCell align="center"></TableCell>
                                  <TableCell align="center"></TableCell>
                                </TableRow>
                              </TableBody>
                            </>
                          ))}
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
            {/* END ----- */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
