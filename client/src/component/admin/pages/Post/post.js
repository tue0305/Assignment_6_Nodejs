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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Post() {
  const classes = useStyles();

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
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Image</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Content</TableCell>
                        <TableCell align="center">Gradients</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {managePosts?.posts?.map((post) => (
                        <TableRow>
                          <TableCell component="th" scope="row" align="center">
                            <div className="table-image">
                              <img src={post.image} />
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            {post.category.title}
                          </TableCell>
                          <TableCell align="center">{post.title}</TableCell>
                          <TableCell align="center">
                            <div className="table-content">
                              <span> {post.content}</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="table-content">
                              {post.gradients.map((gradient) => (
                                <span>{gradient.name}</span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <Link
                              to={`/admin/manage-post/detail-post/${post._id}`}
                            >
                              <Button variant="contained" color="secondary">
                                <EditIcon />
                              </Button>
                            </Link>
                            <Button variant="contained" color="secondary">
                              <DeleteForeverIcon />
                            </Button>
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
      {/* ---- */}
    </>
  );
}

export default Post;
