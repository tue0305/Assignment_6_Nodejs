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
import { manageGetCategoriesAPI } from "../../../redux/actions/admin/manage-categories/manageCategories";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Categories() {
  const classes = useStyles();

  // ---------

  // --------
  const dispatch = useDispatch();

  const { manageCategories } = useSelector(
    (state) => state.manageCategoriesReducer
  );
  console.log(manageCategories, "manageCategories");
  useEffect(() => {
    dispatch(manageGetCategoriesAPI());
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
                        <TableCell align="left">Image</TableCell>
                        <TableCell align="center">Title</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {manageCategories?.categories?.map((category) => (
                        <TableRow>
                          <TableCell component="th" scope="row" align="center">
                            <div className="table-image">
                              <img src={category.image} />
                            </div>
                          </TableCell>
                          <TableCell align="center">{category.title}</TableCell>
                          <TableCell align="center">
                            <Button variant="contained" color="secondary">
                              <EditIcon />
                            </Button>
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

export default Categories;
