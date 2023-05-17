import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const UserTable = ({ users, getAgeCategory }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Age Category</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Posts</TableCell>
            <TableCell>Todos</TableCell>
            <TableCell>Carts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{getAgeCategory(user.age)}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <Button component={Link} to={`/user/${user.id}/post`} target="_blank" rel="noopener noreferrer">View Posts</Button>
              </TableCell>
              <TableCell>
                <Button component={Link} to={`/user/${user.id}/todo`} target="_blank" rel="noopener noreferrer">View Todos</Button>
              </TableCell>
              <TableCell>
                <Button component={Link} to={`/user/${user.id}/cart`} target="_blank" rel="noopener noreferrer">View Carts</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  getAgeCategory: PropTypes.func.isRequired,
};

export default UserTable;
