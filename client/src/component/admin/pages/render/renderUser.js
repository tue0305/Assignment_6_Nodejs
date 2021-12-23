import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function RenderUser(props) {
    const { renderUser } = props;
    return (
        <div>
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        <img src={renderUser.email}/>
                    </TableCell>
                    <TableCell align="right">
                        {renderUser.email}
                    </TableCell>
                    <TableCell align="right">
                        {renderUser.role}
                    </TableCell>
                    <TableCell align="right">
                        <Button variant="contained" color="secondary"><EditIcon /></Button>
                        <Button variant="contained" color="secondary"><DeleteForeverIcon /></Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </div>
    )
}
