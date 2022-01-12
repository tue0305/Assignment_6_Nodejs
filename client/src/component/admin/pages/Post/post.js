import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { manageGetPostAPI } from "../../../../redux/actions/admin/manage-post/managePost";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Post() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // ---------

  // --------
  const dispatch = useDispatch();

  const { managePosts } = useSelector((state) => state.managePostReducer);
  console.log(managePosts);

  useEffect(() => {
    dispatch(manageGetPostAPI());
  }, []);

  // -----

  // -------
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Manage Category"
            >
              <div className="table-responsive">
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
                      {managePosts?.posts?.map((item) => (
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
                              <img src={item.image} />
                            </TableCell>
                            <TableCell align="center">{item.title}</TableCell>
                            <TableCell align="center">
                              {item.category.title}
                            </TableCell>
                            <TableCell align="center">{item.content}</TableCell>
                            <TableCell align="center">
                              <Button variant="contained" color="secondary">
                                Sửa
                              </Button>
                              <Button variant="contained" color="secondary">
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
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                  >
                                    History
                                  </Typography>
                                  <Table size="small" aria-label="purchases">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Nguyên liệu</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="center">
                                          Amount
                                        </TableCell>
                                        <TableCell align="center">
                                          Total price ($)
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    {item?.gradients?.map((gradient) => (
                                      <>
                                        <TableBody>
                                          <TableRow>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
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
            </Card>
          </Col>
        </Row>
      </div>
      {/* ---- */}
    </>
  );
}

export default Post;
